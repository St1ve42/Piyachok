export class QueryBuilder{
    private endpoint: string

    constructor(endpoint: string, page: number = 1) {
        this.endpoint = `${endpoint}?page=${page}`
    }

    addLimit(limit: number): this {
        this.endpoint += `&limit=${limit}`
        return this
    }

    addSkip(skip: number): this {
        this.endpoint += `&skip=${skip}`
        return this
    }

    addSearch(search: Record<string, unknown>): this {
        Object.entries(search).forEach(([key, value]) => {
            if(value){
                if(Array.isArray(value)){
                    value.map((element) => {
                        this.endpoint += `&${key}=${element}`
                    })
                }
                else if(typeof value === 'object'){
                    Object.entries(value).forEach(([rangeKey, rangeValue]) => {
                        this.endpoint += `&${key}[${rangeKey}]=${rangeValue}`
                    })
                }
                else{
                    this.endpoint += `&${key}=${value}`
                }
            }
        })
        return this
    }

    addSort(sort: 'asc' | 'desc'): this {
        this.endpoint += `&sort=${sort}`
        return this
    }

    addSortBy(sortBy: string): this {
        this.endpoint += `&sortBy=${sortBy}`
        return this
    }

    build(): string {
        return this.endpoint
    }
}