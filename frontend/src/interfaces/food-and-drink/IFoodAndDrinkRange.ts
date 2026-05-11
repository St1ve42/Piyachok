export interface AverageReceipt {
    gte?: number;
    lte?: number;
    lt?: number;
    gt: number
}

export interface IFoodAndDrinkRange {
    averageReceipt?: AverageReceipt;
}