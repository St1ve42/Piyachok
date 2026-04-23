import { Expose } from 'class-transformer';
import { Tag } from '@aws-sdk/client-s3';

export class TagsPresenter {
    @Expose()
    name: string;

    constructor(tag: Partial<Tag>) {
        Object.assign(this, tag);
    }
}
