import {IPiyachokDetail} from "@/src/interfaces/piyachok/IPiyachokDetail";
import {DateValue} from "@heroui/react";
import {Time} from "@internationalized/date"

export type IPiyachokCreate = Exclude<IPiyachokDetail, 'creator' | 'updatedAt' | 'createdAt' | 'id' | 'status' | 'foodAndDrink'> & {foodAndDrinkId: string}

export type IPiyachokUserInput = Omit<IPiyachokCreate, 'meetDate' | 'meetTime' | 'foodAndDrinkId'> & {meetDate: DateValue, meetTime: Time}