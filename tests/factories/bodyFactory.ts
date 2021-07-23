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

export function wrongLink(){
    return {
        name: faker.random.word(),
        youtubeLink: faker.random.word()
    }
}

export function bodyWithoutName(){
    return {
        youtubeLink: faker.internet.url()
    }
}