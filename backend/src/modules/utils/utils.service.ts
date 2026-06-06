import { GetCoordinatesDto } from './dto/get-coordinates-dto';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ICoordinates } from '../../shared/interfaces/ICoordinates';
import { INominatim } from './interfaces/INominatim';

export class UtilsService {
    static outputArray(array: any[]): string {
        return array.reduce<string>((accum, value, index) => {
            if (index !== array.length - 1) {
                accum += `${value}, `;
            } else {
                accum += `${value}`;
            }
            return accum;
        }, '');
    }

    static async getCoordinates(dto: GetCoordinatesDto): Promise<ICoordinates> {
        const { region, city, street } = dto;
        let baseUrl = `https://nominatim.openstreetmap.org/search?city=${city.split(' ')[1]}&state=${region}&country=Україна&format=jsonv2`;
        if (street) {
            baseUrl += `&street=${street}`;
        }
        const response = await fetch(baseUrl, {
            headers: {
                'User-agent': 'Piyachok',
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new InternalServerErrorException(`Nominatim API Error`);
        }
        const data = (await response.json()) as INominatim[];
        if (data.length === 0) {
            throw new NotFoundException(`Локацію не знайдено за такою адресою`);
        }
        const { lat, lon: lng } = data[0];
        return { lat: Number(lat), lng: Number(lng) };
    }
}
