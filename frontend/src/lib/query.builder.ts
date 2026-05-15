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
                else{
                    this.endpoint += `&${key}=${value}`
                }
            }
        })
        return this
    }

    addSort(sort: Record<string, 'asc' | 'desc'>): this {
        Object.entries(sort).forEach(([key, value]) => {
            this.endpoint += `&sort[${key}]=${value}`
        })
        return this
    }

    addRange(range: Record<string, {gte?: number, lte?: number, gt?: number, lt?: number}>): this {
        Object.entries(range).forEach(([key, value]) => {
            Object.entries(value).forEach(([rangeKey, rangeValue]) => {
                this.endpoint += `&range[${key}][${rangeKey}]=${rangeValue}`
            })
        })
        return this
    }

    build(): string {
        return this.endpoint
    }
}