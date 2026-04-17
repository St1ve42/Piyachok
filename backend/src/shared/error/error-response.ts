export class ErrorResponse {
    constructor(
        private error: string,
        private message: string,
        private context?: any,
    ) {}
}
