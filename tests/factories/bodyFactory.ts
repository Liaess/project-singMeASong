import faker from "faker";

export function bodyCreateSong(){
    return {
        name: faker.random.word(),
        youtubeLink: faker.internet.url()
    }
}

export function bodyWithoutLink(){
    return {
        name: faker.random.word(),
    }
}