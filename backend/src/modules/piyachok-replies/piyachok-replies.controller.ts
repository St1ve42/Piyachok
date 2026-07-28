import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PiyachokRepliesService } from './piyachok-replies.service';
import { CreatePiyachokReplyDto } from './dto/create-piyachok-request.dto';
import { UpdatePiyachokReplyDto } from './dto/update-piyachok-request.dto';
import type { IUserRequest } from '../auth/interfaces/IUserRequest';
import { CanManagePiyachokRepliesGuard } from '../../shared/guards/can-manage-resource.guard';
import {
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
    ApiBadRequestResponse,
    ApiUnauthorizedResponse,
    ApiParam,
    ApiNoContentResponse,
    ApiBody,
    ApiNotFoundResponse,
    ApiForbiddenResponse,
} from '@nestjs/swagger';
import { PiyachokReplyPresenter } from '../piyachok/presenters';
import { ResponseErrorDto } from '../../shared/dto/response-error.dto';

@ApiTags('Відповіді пиячка')
@Controller('piyachok-replies')
export class PiyachokRepliesController {
    constructor(
        private readonly piyachokRepliesService: PiyachokRepliesService,
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Створити відповідь на пиячок' })
    @ApiCreatedResponse({
        description: 'Відповідь створена',
        type: PiyachokReplyPresenter,
    })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Відповідь не знайдено не знайдено',
        type: ResponseErrorDto,
    })
    @ApiBody({ type: CreatePiyachokReplyDto })
    create(
        @Body() createPiyachokReplyDto: CreatePiyachokReplyDto,
        @Req() req: IUserRequest,
    ) {
        return this.piyachokRepliesService.create(
            createPiyachokReplyDto,
            req.user.data.id,
        );
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), CanManagePiyachokRepliesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Оновити відповідь' })
    @ApiParam({
        name: 'id',
        description: 'ID відповіді',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiNoContentResponse({ description: 'Відповідь оновлена' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Відповідь не знайдено не знайдено',
        type: ResponseErrorDto,
    })
    update(
        @Param('id') id: string,
        @Body() updatePiyachokReplyDto: UpdatePiyachokReplyDto,
    ) {
        return this.piyachokRepliesService.update(id, updatePiyachokReplyDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), CanManagePiyachokRepliesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Видалити відповідь' })
    @ApiParam({
        name: 'id',
        description: 'ID відповіді',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    @ApiNoContentResponse({ description: 'Відповідь видалено' })
    @ApiBadRequestResponse({
        description: 'Дані не пройшли валідацію',
        type: ResponseErrorDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Користувач не авторизований',
        type: ResponseErrorDto,
    })
    @ApiForbiddenResponse({
        description: 'Заборонено',
        type: ResponseErrorDto,
    })
    @ApiNotFoundResponse({
        description: 'Відповідь не знайдено не знайдено',
        type: ResponseErrorDto,
    })
    @ApiNoContentResponse({ description: 'Відповідь видалена' })
    delete(@Param('id') id: string) {
        return this.piyachokRepliesService.delete(id);
    }
}
