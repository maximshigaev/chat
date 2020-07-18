var faker = require('faker');
var times = require('lodash.times');

module.exports = () => {
    const fillMessages = (id) => ({
        id: id + 1,
        channelId: Math.floor(1 + Math.random() * 10),
        userId: Math.floor(1 + Math.random() * 100),
        author: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            avatar: faker.internet.avatar(),
        },
        date: new Date(Date.parse(faker.date.past())).toLocaleDateString(),
        text: faker.lorem.text(),
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
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar(),
        jobTitle: faker.name.jobTitle(),
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        skype: faker.random.word(),
        timeZone: new Date(Date.parse(faker.date.past())).toLocaleDateString(),
        isFriend: faker.random.boolean(),
        isOnline: faker.random.boolean(),
        social: {
            fb: faker.internet.url(),
            tw: faker.internet.url(),
            inst: faker.internet.url(),
            lkdn: faker.internet.url(),
        },
    });

    const db = {
        users: times(100, fillUsers),
        channels: times(10, fillChannels),
        messages: times(100, fillMessages),
    }

    return db;
}
