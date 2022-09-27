const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const animalsData = require('../src/data/animals.json');

describe('inserção usuários', () => {
    beforeEach(() => {
        animalsData.push({
            'id':'idteste',
            'nome':'Dog',
            'especie':'Cachorro',
            'idade': 4,
        });
        animalsData.push({
            'id':'idteste2',
            'nome':'Dog2',
            'especie':'Cachorro',
            'idade': 4,
        });
        animalsData.push({
            'id':'idteste3',
            'nome':'Dog3',
            'especie':'Cachorro',
            'idade': 4,
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    if('deve retornar uma lista com todos os usuarios',  async() => {
        const res = await request(app).get('/animais');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });

    it('deve cadastrar o usuário com sucesso', async() => {
        const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3')
        expect(res.status).toBe(201);
    });

    it('deve cadastrar o usuário com sucesso', async() => {
        const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem')
        expect(res.status).toBe(400);
    });

    
    it('deve cadastrar o usuário com sucesso', async() => {
        const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1')
        expect(res.status).toBe(400);
    });

    if('A idade do animal deve ser um número.', async() => {
        const res = await request(app).post('/animais?nome=Dog&especie=Cachorro&idade=a')
        expect(res.status).toBe(400);
    });

    if('O nome deve ter pelo menso 3 caracteres.', async() => {
        const res = await request(app).post('/animais?nome=D2&especie=Cachorro&idade=a')
        expect(res.status).toBe(400);
    });
});
