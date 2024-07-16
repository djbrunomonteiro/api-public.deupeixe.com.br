export interface IResponse {
    error: boolean,
    message: string,
    status?: number,
    results?: any,
    metadata?: any
}