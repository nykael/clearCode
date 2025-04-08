import { HttpPostParams } from '@/data/protocols/http'
import {AxiosHttpClient} from './axios-http-client'
import {faker} from '@faker-js/faker'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const mockedAxiosResult = {
    data: faker.helpers.arrayElement(['cat', 'dog', 'mouse']),
    status: faker.string.numeric()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: faker.internet.url(),
    body: faker.helpers.arrayElement(['cat', 'dog', 'mouse'])
})

describe('AxiosHttpClient', () => {
    test('Should call axios with correct values', async () => {
        const request = mockPostRequest()
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return the correct status code and body', async () => {
        const sut = makeSut()
        const httpResponse = await sut.post(mockPostRequest())
        expect(httpResponse).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        })
    })
})