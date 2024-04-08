const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken');
const users = require('./dummy-data/users');
const teams = require('./dummy-data/teams');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth', (req, res) => {
    const { userName, password } = req.body;
    if (userName === 'master' && password === 'master') {
        const token = jwt.sign(
            {
                userId: 1,
                userName: faker.internet.userName(),
                userStatus: 1
            },
            'MY_SECRET_KEY'
        );
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/dashboard', (req, res) => {
    const sections = ['Solicitudes', 'Aprobaciones'];
    const data = sections.map((label) => {
        return {
            label,
            items: [
                {
                    status: 'Enviadas',
                    count: faker.number.int({
                        min: 2,
                        max: 40
                    }),
                    iconName: 'pi-send',
                    iconColor: faker.color.human()
                },
                {
                    status: 'Aprobadas',
                    count: faker.number.int({
                        min: 1,
                        max: 30
                    }),
                    iconName: 'pi-thumbs-up-fill',
                    iconColor: faker.color.human()
                },
                {
                    status: 'Denegadas',
                    count: faker.number.int({
                        min: 4,
                        max: 18
                    }),
                    iconName: 'pi-times-circle',
                    iconColor: faker.color.human()
                }
            ]
        };
    });

    res.json(data);
});

app.post('/teams/add', (req, res) => {
    const { description, leaderId, name, state } = req.body;
    const leader = users.find((user) => user.id === leaderId);
    const team = {
        id: teams.length + 1,
        name,
        description,
        state,
        leaderId,
        leaderName: leader.name
    };
    teams.push(team);
    res.json(team);
});

app.patch('/teams/edit', (req, res) => {
    const { id, name, description, state, leaderId } = req.body;
    const leader = users.find((user) => user.id === leaderId);
    const teamIndex = teams.findIndex((team) => team.id === id);
    const team = {
        id,
        name,
        description,
        state,
        leaderId,
        leaderName: leader.name
    };
    teams[teamIndex] = team;
    res.json(team);
});

app.get('/teams', (req, res) => {
    res.json(teams);
});

app.post('/team/addUser', (req, res) => {
    res.json();
});

app.get('/users/find', (req, res) => {
    const { name } = req.query;
    const filteredUsers = users.filter((user) =>
        user.name.toUpperCase().includes(name.toString().toUpperCase())
    );
    res.json(filteredUsers);
});

app.listen(3000, () => {
    console.log('Fake backend api listening on port 3000');
});
