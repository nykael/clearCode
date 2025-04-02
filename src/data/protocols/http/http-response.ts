
export enum HttpStatusode {
    noContent = 204,
    unathorized = 401 
}

export type HttpResponse = {
    statusCode: HttpStatusode;
    body?: any
}