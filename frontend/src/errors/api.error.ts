export class ApiError extends Error{
    constructor(public data: any, public status: number) {
        super(data.message || 'Помилка сервера');
    }
}