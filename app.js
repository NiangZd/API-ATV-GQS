const express = require('express');
const app = express();

app.use(express.json());

let produtos = [];

// RETORNA A LISTA DE TODOS OS PRODUTOS
app.get('/produtos', (req, res) => {
    res.status(200).json(produtos);
});

// ADICIONA UM NOVO PRODUTO À LISTA
app.post('/produtos', (req, res) => {
    const produto = { ...req.body, id: produtos.length + 1 };
    produtos.push(produto);
    res.status(201).json(produto);
});

// BUSCA UM PRODUTO PELO SEU ID
app.get('/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// ATUALIZA AS INFORMAÇÕES DE UM PRODUTO EXISTENTE PELO ID
app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);
    if (produtoIndex !== -1) {
        produtos[produtoIndex] = { id, ...req.body };
        res.status(200).json(produtos[produtoIndex]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
});

// REMOVE UM PRODUTO DA LISTA PELO ID
app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== id);
    res.status(204).send();
});

module.exports = app;
