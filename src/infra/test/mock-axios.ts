import { faker } from "@faker-js/faker/."
import axios from "axios"


export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue({
        data: faker.helpers.arrayElement(['cat', 'dog', 'mouse']),
        status: faker.string.numeric()
    }) 

    return mockedAxios
}