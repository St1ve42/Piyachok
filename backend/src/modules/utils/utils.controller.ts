import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GetCoordinatesDto } from './dto/get-coordinates-dto';
import { UtilsService } from './utils.service';
import { CoordinatesPresenter } from '../food-and-drink/presenters/location.presenter';
import {
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ResponseBadRequestErrorDto } from '../../shared/dto/response-bad-request-error.dto';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@ApiTags('Утиліти')
@Controller('utils')
export class UtilsController {
    @ApiOperation({
        summary: 'Отримання координат',
        description:
            'Отримує географічні координати (широту та довготу) за заданою адресою (регіон, місто, вулиця).',
    })
    @ApiOkResponse({
        description: 'Успішно отримано координати',
        type: CoordinatesPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseBadRequestErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Місце не знайдено',
        type: ResponseErrorDto,
    })
    @ApiInternalServerErrorResponse({
        description: 'Помилка Nominatim API',
        type: ResponseErrorDto,
    })
    @Post('coordinates')
    @HttpCode(HttpStatus.OK)
    async getCoordinates(
        @Body() dto: GetCoordinatesDto,
    ): Promise<CoordinatesPresenter> {
        return UtilsService.getCoordinates(dto);
    }
}
