export interface IFoodAndDrinReviewStatistics{
    rating: number,
    count: number
}

export interface IFoodAndDrinReviewStatisticsListData {
    total: number;
    data: IFoodAndDrinReviewStatistics[]
}