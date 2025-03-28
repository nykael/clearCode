import { RemoteAuthentucation } from "./remote-authentication"
import { HttpPostClientSpy } from "../../test/mock-http-client"

describe('RemoteAuthentucation', () => {
    test('Should call HttpPostClient with correct URL', async () => {
        const url = 'any_url'
        const httpPostClientSpy = new HttpPostClientSpy()
        const sut = new RemoteAuthentucation(url, httpPostClientSpy)
        await sut.auth()
        expect(httpPostClientSpy.url).toBe(url)
    })
})