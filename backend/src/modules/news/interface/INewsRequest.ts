import { IUserRequest } from '../../auth/interfaces/IUserRequest';
import { News } from '../entities/news.entity';

export interface INewsRequest extends IUserRequest {
    news: News;
}
