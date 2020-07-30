const faker = require('faker');
const times = require('lodash.times');

module.exports = () => {
    const fillMessages = (id) => ({
        id: id + 1,
        channelId: Math.floor(1 + Math.random() * 15),
        userId: Math.floor(1 + Math.random() * 100),
        date: faker.date.past(),
        text: faker.lorem.text(),
        images: [],
    });

    const fillChannels = (id) => ({
        id: id + 1,
        title: faker.random.word(),
        participantsCount: Math.floor(1 + Math.random() * 100),
        isFavourite: faker.random.boolean(),
    });

    const fillUsers = (id) => ({
        id: id + 1,
        firstName: faker.name.firstName(),
        surName: faker.name.lastName(),
        avatar: faker.internet.avatar(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        skype: faker.random.word(),
        timeZone: faker.date.past(),
        isFriend: faker.random.boolean(),
        isOnline: faker.random.boolean(),
        fb: faker.internet.url(),
        tw: faker.internet.url(),
        inst: faker.internet.url(),
        lkdn: faker.internet.url(),
    });

    const db = {
        users: times(100, fillUsers),
        channels: times(15, fillChannels),
        messages: times(100, fillMessages),
    }

    return db;
}
