import { Expose } from 'class-transformer';

export class RolePresenter {
    @Expose()
    name: string;
}
