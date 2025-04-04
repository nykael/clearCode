
export enum HttpStatusode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unathorized = 401,
    notFound = 404,
    serverError = 500,
}

export type HttpResponse<T> = {
    statusCode: HttpStatusode;
    body?: any
}