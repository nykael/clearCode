import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { UnexpectedError } from "@/domain/erros/unexpected-error";
import { AccountModel } from "@/domain/models/account-model";
import { Authentication, AuthenticationParams } from "@/domain/usecasses/authentication";

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