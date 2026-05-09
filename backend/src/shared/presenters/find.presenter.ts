import { Expose, Type } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { BaseQueryPresenter } from './base-query.presenter';
import { FoodAndDrinkFindOnePresenter } from '../../modules/food-and-drink/presenters/food-and-drink-find-one.presenter';
import { ProtectedFoodAndDrinkFindOnePresenter } from '../../modules/protected-food-and-drink/presenters/protected-food-and-drink-find-one.presenter';
import { ProtectedUserFindOnePresenter } from '../../modules/protected-users/dto/protected-user-find-one.presenter';
import { ApiProperty } from '@nestjs/swagger';

function createFindPresenter<T>(DataCls: ClassConstructor<T>) {
    class FindPresenter extends BaseQueryPresenter {
        @ApiProperty({ example: 10 })
        @Expose()
        total: number;

        @ApiProperty({
            type: () => [DataCls],
        })
        @Expose()
        @Type(() => DataCls)
        data: T[];
    }
    Object.defineProperty(FindPresenter, 'name', {
        value: `${DataCls.name}FindPresenter`,
        writable: false,
    });
    return FindPresenter;
}

export const FoodAndDrinkResponseFindPresenter =
    createFindPresenter<FoodAndDrinkFindOnePresenter>(
        FoodAndDrinkFindOnePresenter,
    );

export const ProtectedFoodAndDrinkFindPresenter =
    createFindPresenter<ProtectedFoodAndDrinkFindOnePresenter>(
        ProtectedFoodAndDrinkFindOnePresenter,
    );

export const ProtectedUserFindPresenter =
    createFindPresenter<ProtectedUserFindOnePresenter>(
        ProtectedUserFindOnePresenter,
    );
