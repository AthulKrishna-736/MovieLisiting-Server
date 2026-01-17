
export enum HTTP_STATUS_CODES {
    created = 201,
    success = 200,

    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    tooManyReqeust = 429,

    serverError = 500,
    badGateway = 502,
}
