const request = require('supertest');
const app = require('../src/app');


describe('inserção usuários', () => {
    it('deve cadastrar o usuário com sucesso', async() => {
        const res = await request(app).post('/animais?nome=Dog&especie=Cachorro&idade=4')
        expect(res.status).toBe(201)
    });

    if('A idade do animal deve ser um número.', async() => {
        const res = await request(app).post('/animais?nome=Dog&especie=Cachorro&idade=a')
        expect(res.status).toBe(400)
    });

    if('O nome deve ter pelo menso 3 caracteres.', async() => {
        const res = await request(app).post('/animais?nome=D2&especie=Cachorro&idade=a')
        expect(res.status).toBe(400)
    });
});
