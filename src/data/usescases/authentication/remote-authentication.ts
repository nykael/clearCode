import { HttpPostClient, HttpStatusode } from "@/data/protocols/http";
import { Authentication, AuthenticationParams } from "@/domain/usecasses";
import { InvalidCredentialsError, UnexpectedError } from "@/domain/erros";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentucation implements Authentication{
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
    ) {}

    async auth (params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusode.ok: return httpResponse.body
            case HttpStatusode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpectedError()
        }
    }
}