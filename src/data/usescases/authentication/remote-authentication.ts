import { HttpPostClient } from "@/data/protocols/http/http-post-client";
import { HttpStatusode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/usecasses/authentication";

export class RemoteAuthentucation {
    constructor (
        private readonly url: string,
        private readonly httpPostClient: HttpPostClient
    ) {}

    async auth (params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httpPostClient.post({
            url: this.url,
            body: params
        })
        switch (httpResponse.statusCode) {
            case HttpStatusode.unathorized: throw new InvalidCredentialsError()
            default: return Promise.resolve()
        }
    }
}