const { faker } = require('@faker-js/faker');
const _ = require('lodash');
const allUsers = require('./users');

const baseTeam = {
    id: 1,
    name: 'Micro-servicios',
    description: 'Equipo encargado del desarrollo de micro-servicios SAP',
    state: 1,
    leaderId: 1,
    leaderName: 'Juan Perez'
};

const teams = [baseTeam];
for (let i = 2; i <= 30; i++) {
    const leader = allUsers[_.random(1, 10)];
    teams.push({
        id: i,
        name: faker.company.name(),
        description: faker.word.words(4),
        state: 1,
        leaderId: leader.id,
        leaderName: leader.name
    });
}

module.exports = teams;
