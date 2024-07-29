const request = require('supertest');
const app = require('../app.js');

describe('TESTES DA API DE PRODUTOS', () => {

    // TESTANDO A CRIAÇÃO DE UM PRODUTO
    it('DEVE ADICIONAR UM NOVO PRODUTO', async () => {
        const novoProduto = { nome: 'Notebook', preco: 1200 };
        const res = await request(app).post('/produtos').send(novoProduto);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toBe('Notebook');
        expect(res.body.preco).toBe(1200);
    });

    // TESTANDO A LISTAGEM DE TODOS OS PRODUTOS
    it('DEVE RETORNAR A LISTA DE PRODUTOS', async () => {
        const res = await request(app).get('/produtos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // TESTANDO A OBTENÇÃO DE UM PRODUTO PELO ID
    it('DEVE RETORNAR UM PRODUTO PELO ID', async () => {
        const { body: novoProduto } = await request(app)
            .post('/produtos')
            .send({ nome: 'Teclado', preco: 80 });
        const res = await request(app).get(`/produtos/${novoProduto.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe('Teclado');
        expect(res.body.preco).toBe(80);
    });

    // TESTANDO A ATUALIZAÇÃO DE UM PRODUTO PELO ID
    it('DEVE ATUALIZAR UM PRODUTO EXISTENTE PELO ID', async () => {
        const { body: produto } = await request(app)
            .post('/produtos')
            .send({ nome: 'Cadeira', preco: 300 });
        const atualizacao = { nome: 'Cadeira Ergonomica', preco: 450 };
        const res = await request(app)
            .put(`/produtos/${produto.id}`)
            .send(atualizacao);
        expect(res.statusCode).toBe(200);
        expect(res.body.nome).toBe(atualizacao.nome);
        expect(res.body.preco).toBe(atualizacao.preco);
    });

    // TESTANDO A REMOÇÃO DE UM PRODUTO PELO ID
    it('DEVE REMOVER UM PRODUTO PELO ID', async () => {
        const { body: produto } = await request(app)
            .post('/produtos')
            .send({ nome: 'Ar Condicionado', preco: 800 });
        const res = await request(app).delete(`/produtos/${produto.id}`);
        expect(res.statusCode).toBe(204);
        const checkRes = await request(app).get(`/produtos/${produto.id}`);
        expect(checkRes.statusCode).toBe(404);
    });

});
