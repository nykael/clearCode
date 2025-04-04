import { HttpStatusode } from "@/data/protocols/http/http-response";
import { RemoteAuthentucation } from "./remote-authentication"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { mockAccountModel, mockAuthentication } from "@/domain/test/mock-account";

import { faker } from '@faker-js/faker';
import { UnexpectedError } from "@/domain/erros/unexpected-error";
import { AuthenticationParams } from "@/domain/usecasses/authentication";
import { AccountModel } from "@/domain/models/account-model";

type SutTypes =  {
    sut: RemoteAuthentucation;
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
    const sut = new RemoteAuthentucation(url, httpPostClientSpy)

    return {sut, httpPostClientSpy}
}

describe('RemoteAuthentucation', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = faker.internet.url()
        const {httpPostClientSpy, sut} = makeSut(url)
        await sut.auth(mockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)
    })

    test('Should call HttpPostClient with correct body', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        const authencticationParams = mockAuthentication()
        await sut.auth(authencticationParams)
        expect(httpPostClientSpy.body).toEqual(authencticationParams)
    })

    test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.unathorized
        }
        const promise =  sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.badRequest
        }
        const promise =  sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })
    test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.notFound
        }
        const promise =  sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.serverError
        }
        const promise =  sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new UnexpectedError())
    })

    test('Should return an AccountModel if HttpPostClient returns 200', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        const httpResult = mockAccountModel()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.ok,
            body: httpResult
        }
        const account = await sut.auth(mockAuthentication())
        expect(account).toEqual(httpResult)
    })
})

    