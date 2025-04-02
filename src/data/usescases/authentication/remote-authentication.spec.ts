import { HttpStatusode } from "@/data/protocols/http/http-response";
import { RemoteAuthentucation } from "./remote-authentication"
import { HttpPostClientSpy } from "@/data/test/mock-http-client"
import { InvalidCredentialsError } from "@/domain/erros/invalid-credentials-error";
import { mockAuthentication } from "@/domain/test/mock-authentication";

import { faker } from '@faker-js/faker';

type SutTypes =  {
    sut: RemoteAuthentucation;
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
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

    test('Should throwcinvalidCredentialsError if HttpPostClient returns 401', async () => {
        const {httpPostClientSpy, sut} = makeSut()
        httpPostClientSpy.response = {
            statusCode: HttpStatusode.unathorized
        }
        const promise =  sut.auth(mockAuthentication())
        expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
})

    