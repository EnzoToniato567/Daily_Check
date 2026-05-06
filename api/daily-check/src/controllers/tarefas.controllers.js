const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const tarefas = await prisma.tarefa.findMany({ 
        orderBy: { data_criacao: "desc" } // para ordenar em data de criação
    });

    return res.status(200).json(tarefas);
};

const cadastrar = async (req, res) => {
    const data = req.body;

    const tarefa = await prisma.tarefa.create({
        data: {
            nome: data.nome,
            descricao: data.descricao,
            data_inicio: new Date(data.dataInicio),
            data_termino: new Date(data.dataFim),
            imagem: data.imagem
        }
    });

    return res.status(201).json(tarefa);
};

const buscar = async (req, res) => {
    const { id } = req.params;

    const tarefa = await prisma.tarefa.findUnique({
        where: { id: Number(id) }
    });

    return res.status(200).json(tarefa);
};

const atualizar = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const tarefa = await prisma.tarefa.update({
        where: { id: Number(id) },
        data: {
            nome: data.nome,
            descricao: data.descricao,
            data_inicio: data.data_inicio ? new Date(data.data_inicio) : undefined,
            data_termino: data.data_termino ? new Date(data.data_termino) : undefined,
            imagem: data.imagem
        }
    });

    return res.status(200).json(tarefa);
};

const excluir = async (req, res) => {
    const { id } = req.params;

    const tarefa = await prisma.tarefa.delete({
        where: { id: Number(id) }
    });

    return res.status(200).json(tarefa);
};

module.exports = {
    cadastrar,
    listar,
    buscar,
    atualizar,
    excluir
};