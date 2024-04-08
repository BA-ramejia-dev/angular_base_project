const { faker } = require('@faker-js/faker');

const baseUser = {
    id: 1,
    userName: faker.internet.userName(),
    name: 'Juan Perez',
    email: faker.internet.email()
};

const users = [baseUser];
for (let i = 2; i <= 20; i++) {
    users.push({
        id: i,
        userName: faker.internet.userName(),
        name: faker.person.fullName(),
        email: faker.internet.email()
    });
}

module.exports = users;
