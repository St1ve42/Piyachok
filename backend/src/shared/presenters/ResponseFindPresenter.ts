import { Expose, Type } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { BaseQueryPresenter } from './BaseQueryPresenter';
import { FoodAndDrinkResponseFindOnePresenter } from '../../modules/food-and-drink/presenters/food-and-drink-response-find-one.presenter';

function createResponseFindPresenter<T>(DataCls: ClassConstructor<T>) {
    class ResponseFindPresenter extends BaseQueryPresenter {
        @Expose()
        total: number;

        @Expose()
        @Type(() => DataCls)
        data: T[];

        constructor(partial: Partial<ResponseFindPresenter>) {
            super(partial);
            Object.assign(this, partial);
        }
    }

    Object.defineProperty(ResponseFindPresenter, 'name', {
        value: `ResponseFind${DataCls.name}Presenter`,
    });

    return ResponseFindPresenter;
}

export const FoodAndDrinkResponseFindPresenter =
    createResponseFindPresenter<FoodAndDrinkResponseFindOnePresenter>(
        FoodAndDrinkResponseFindOnePresenter,
    );
