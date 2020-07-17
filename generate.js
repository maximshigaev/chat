var faker = require('faker');
var times = require('lodash.times');

module.exports = () => {
    const fillFriends = (id) => ({
        id: id + 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.internet.avatar()
    });

    const fillMessage = (id) => ({
        id: id + 1,
        author: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            avatar: faker.internet.avatar()
        },
        date: new Date(Date.parse(faker.date.past())).toLocaleDateString(),
        text: faker.lorem.text()
    });

    const fillMessages = (id) => ({
        id: id + 1,
        content: times(20, fillMessage)
    });

    const fillChannels = (id) => ({
        id: id + 1,
        title: faker.random.word()
    });

    const db = {
        profile: {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            avatar: faker.internet.avatar(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
            userName: faker.internet.userName(),
            skype: faker.random.word(),
            timeZone: new Date(Date.parse(faker.date.past())).toLocaleDateString()
        },
        friends: times(100, fillFriends),
        channels: times(10, fillChannels),
        messages: times(10, fillMessages)
    }

    return db;
}
