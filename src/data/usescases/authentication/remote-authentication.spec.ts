import { RemoteAuthentucation } from "./remote-authentication"
import { HttpPostClientSpy } from "../../test/mock-http-client"
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
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})