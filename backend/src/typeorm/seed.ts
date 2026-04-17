import { DataSource } from 'typeorm';
import { DataSourceOptions } from '../shared/const/data.source.options';
import { GlobalUserRoleEnum } from '../modules/users/enums/global.user.role.enum';
import { Role } from '../modules/roles/entities/role.entity';
import { City } from '../modules/cities/entities/city.entity';
import { Region } from '../modules/regions/entities/region.entity';
import fs from 'fs/promises';
import path from 'path';
import * as process from 'node:process';
import type { IRawCity } from '../shared/interfaces/IRawCity';

async function seed() {
    const dataSource = new DataSource({
        ...DataSourceOptions,
        entities: [process.cwd() + '/**/*.entity.{js,ts}'],
        migrations: undefined,
    });
    await dataSource.initialize();
    const roles = Object.values(GlobalUserRoleEnum);
    const roleRepository = dataSource.getRepository(Role);
    for (const role of roles) {
        const createdRole = roleRepository.create({ name: role });
        await roleRepository.save(createdRole);
    }
    const regions = [
        'Вінницька область',
        'Волинська область',
        'Дніпропетровська область',
        'Донецька область',
        'Житомирська область',
        'Закарпатська область',
        'Запорізька область',
        'Івано-Франківська область',
        'Київська область',
        'Кіровоградська область',
        'Луганська область',
        'Львівська область',
        'Миколаївська область',
        'Одеська область',
        'Полтавська область',
        'Рівненська область',
        'Сумська область',
        'Тернопільська область',
        'Харківська область',
        'Херсонська область',
        'Хмельницька область',
        'Черкаська область',
        'Чернівецька область',
        'Чернігівська область',
        'Крим',
    ];
    const mappingRegionToId: { [key: string]: number } = {};
    const regionRepository = dataSource.getRepository(Region);
    for (const region of regions) {
        const createdRegion = regionRepository.create({ name: region });
        const { id } = await regionRepository.save(createdRegion);
        mappingRegionToId[region] = id;
    }
    const rawCitiesFilePath = path.join(
        process.cwd(),
        'src',
        'shared',
        'rawData',
        'cities.json',
    );
    const rawCities = JSON.parse(
        await fs.readFile(rawCitiesFilePath, { encoding: 'utf8' }),
    ) as IRawCity[];
    const citiesToSave: City[] = [];
    const cityRepository = dataSource.getRepository(City);
    for (let i = 0; i < rawCities.length; i++) {
        const currentCity = rawCities[i];
        const prevCity = rawCities[i - 1];
        const nextCity = rawCities[i + 1];

        const cityName = currentCity.city.trim();
        const regionRaw = currentCity.region.trim();
        const districtName = currentCity.district
            .trim()
            .replace('р-н', 'район');

        const isDuplicate =
            (nextCity &&
                cityName === nextCity.city.trim() &&
                regionRaw === nextCity.region.trim()) ||
            (prevCity &&
                cityName === prevCity.city.trim() &&
                regionRaw === prevCity.region.trim());

        let finalCityName = cityName;
        if (isDuplicate) {
            finalCityName = `${cityName} (${districtName})`;
        }

        const regionNameForSearch = regionRaw.replace('.', 'асть');
        const regionId = mappingRegionToId[regionNameForSearch];
        if (!regionId) {
            console.log(
                `Регіон "${regionNameForSearch}" не знайдено в базі для міста ${cityName}`,
            );
            continue;
        }

        citiesToSave.push(
            cityRepository.create({
                name: finalCityName,
                region: { id: regionId },
            }),
        );

        if (citiesToSave.length >= 500) {
            await cityRepository.save(citiesToSave);
            citiesToSave.length = 0;
        }
    }
    if (citiesToSave.length > 0) {
        await cityRepository.save(citiesToSave);
    }
    await dataSource.destroy();
}

seed()
    .then(() => console.log('Seed succeeded!'))
    .catch((reason) => console.log(`Error! Seed failed! Reason: ${reason}`));
