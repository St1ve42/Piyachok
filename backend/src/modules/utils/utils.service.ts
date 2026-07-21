import { GetCoordinatesDto } from './dto/get-coordinates-dto';
import {
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { ICoordinates } from '../../shared/interfaces/ICoordinates';
import { INominatim } from './interfaces/INominatim';
import dayjs, { ManipulateType } from 'dayjs';

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

    static addTime(
        initialDate: Date,
        value: number,
        unit: ManipulateType,
    ): Date {
        return dayjs(initialDate).add(value, unit).toDate();
    }

    static subtractTime(
        initialDate: Date,
        value: number,
        unit: ManipulateType,
    ): Date {
        return dayjs(initialDate).subtract(value, unit).toDate();
    }

    static diffInUnit(start: Date, end: Date, unit: ManipulateType): number {
        const date1 = dayjs(end);
        const date2 = dayjs(start);
        return date1.diff(date2, unit);
    }

    static calculateSkipRecords(
        page: number,
        limit: number,
        skip: number,
    ): number {
        return (page - 1) * limit + skip;
    }

    static calculateTotalPages(
        total: number,
        skip: number,
        limit: number,
    ): number {
        return Math.ceil((total - skip) / limit);
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
