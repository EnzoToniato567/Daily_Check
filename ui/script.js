const key = "7a91347383813b1f2c46194616ed1a2a";
const url = "http://localhost:3000";
const tarefas = [];
let tarefaAtual = null;

const tituloTarefa = document.getElementById("tituloTarefa");
const nomeEdit = document.getElementById("nomeEdit");
const descricaoEdit = document.getElementById("descricaoEdit");
const imgEdit = document.getElementById("imgEdit");
const imgTarefa = document.getElementById("imgTarefa");
const dataInicioEdit = document.getElementById("dataInicioEdit");
const dataTerminoEdit = document.getElementById("dataTerminoEdit");
const detalhes = document.getElementById("detalhes");
const cadastro = document.getElementById("cadastro");

if (!window.location.pathname.includes("temperatura")) carregarTarefas(); // adicionei para parar de mostrar tarefas em outras páginas

function colocarDadosNaTela(dados) {
    const container = document.querySelector("main");
    container.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3 class="cidade">Tempo em ${dados.name}</h3>
        <p class="temp">${Math.floor(dados.main.temp)}ºC</p>

        <div class="linha-clima">
            <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png">
            <p>${dados.weather[0].description}</p>
        </div>

        <p class="umidade">Umidade ${dados.main.humidity}%</p>
    `;

    container.appendChild(card);
}

async function buscarCidade(cidade) {
    const resposta = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    );
    const dados = await resposta.json();
    if (dados.cod != 200) {
        alert("Cidade não encontrada!");
        return;
    }
    colocarDadosNaTela(dados);
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

function carregarTarefas() {
    fetch(url + '/tarefas/listar')
    .then(res => res.json())
    .then(data => {
        tarefas.length = 0;
        tarefas.push(...data);
        listarCards();
    })
    .catch(() => alert('Problemas com a conexão da API'));
}

function listarCards() {
    const container = document.querySelector('main');
    container.innerHTML = '';

    tarefas.forEach(tarefa => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            ${tarefa.imagem ? `<img src="${tarefa.imagem}" alt="${tarefa.nome}">` : ''}
            <h3>${tarefa.nome}</h3>
            <p>${tarefa.descricao}</p>
            <p>${new Date(tarefa.data_inicio).toLocaleDateString('pt-BR')}</p>
            <p>${new Date(tarefa.data_termino).toLocaleDateString('pt-BR')}</p>
        `;
        card.onclick = () => abrirTarefa(tarefa);
        container.appendChild(card);
    });
}

function abrirTarefa(tarefa) {
    tarefaAtual = tarefa;
    tituloTarefa.innerHTML = tarefa.nome;
    nomeEdit.value = tarefa.nome;
    descricaoEdit.value = tarefa.descricao;
    imgEdit.value = tarefa.imagem ?? '';
    imgTarefa.src = tarefa.imagem ?? '';
    dataInicioEdit.value = tarefa.data_inicio.split('T')[0];
    dataTerminoEdit.value = tarefa.data_termino.split('T')[0];
    detalhes.classList.remove('oculto');
}

imgEdit.addEventListener("input", () => {
    imgTarefa.src = imgEdit.value;
});

document.querySelector('#formCad').addEventListener('submit', function(e) {
    e.preventDefault();

    const novaTarefa = {
        nome: nome.value,
        descricao: descricao.value,
        dataInicio: dataInicio.value,
        dataFim: dataFim.value,      
        imagem: urlImagem.value || null
    };

    fetch(url + '/tarefas/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa)
    })
    .then(() => {
        alert("Tarefa adicionada com sucesso!");
        cadastro.classList.add('oculto');
        carregarTarefas();
    })
    .catch(() => alert("Erro ao salvar tarefa"));
});

function salvarEdicao() {
    const tarefaEditada = {
        nome: nomeEdit.value,
        descricao: descricaoEdit.value,
        data_inicio: dataInicioEdit.value,
        data_termino: dataTerminoEdit.value,
        imagem: imgEdit.value || null
    };

    fetch(url + '/tarefas/atualizar/' + tarefaAtual.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefaEditada)
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(() => {
        alert("Tarefa atualizada com sucesso!");
        detalhes.classList.add('oculto');
        carregarTarefas();
    })
    .catch(() => alert("Erro ao editar tarefa"));
}

function excluirTarefaAtual() {
    if (!confirm("Deseja excluir a tarefa?")) return;

    fetch(url + '/tarefas/excluir/' + tarefaAtual.id, {
        method: 'DELETE'
    })
    .then(() => {
        alert("Tarefa excluída com sucesso!");
        detalhes.classList.add('oculto');
        carregarTarefas();
    })
    .catch(() => alert("Erro ao excluir tarefa"));
}

function cancelarEdicao() {
    tituloTarefa.innerHTML = "";
    nomeEdit.value = "";
    descricaoEdit.value = "";
    imgEdit.value = "";
    imgTarefa.src = "";
    dataInicioEdit.value = "";
    dataTerminoEdit.value = "";

    detalhes.classList.add('oculto');
}