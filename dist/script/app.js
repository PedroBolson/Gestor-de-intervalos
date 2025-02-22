"use strict";
const intervalos = [];
const inputInicio = document.getElementById("inicio");
const inputFim = document.getElementById("fim");
const listaIntervalos = document.getElementById("listaIntervalos");
const mensagemErro = document.getElementById("mensagemErro");
const btnAdicionar = document.getElementById("btnAddicionar");
const btnEditar = document.getElementById("btnEditar");
const btnExcluir = document.getElementById("btnExcluir");
function renderLista(novoItem = false) {
    listaIntervalos.innerHTML = '';
    intervalos.forEach((intervalo) => {
        const li = document.createElement("li");
        li.textContent = `Intervalo: [${intervalo.inicio}, ${intervalo.fim}]`;
        listaIntervalos.appendChild(li);
        if (novoItem) {
            li.classList.add("itemList");
            setTimeout(() => {
                li.classList.remove("itemList");
            }, 1000);
        }
    });
}
function adicionarIntervalo(inicio, fim) {
    mensagemErro.textContent = "";
    if (inicio >= fim) {
        mensagemErro.textContent = "O início deve ser menor que o fim!";
        return;
    }
    if (intervalos.length === 0) {
        if (inicio !== 0) {
            mensagemErro.textContent = "O primeiro intervalo deve começar em 0!";
            return;
        }
    }
    else {
        const ultimoIntervalo = intervalos[intervalos.length - 1];
        if (inicio !== ultimoIntervalo.fim) {
            mensagemErro.textContent = `O novo intervalo deve começar em ${ultimoIntervalo.fim}`;
            return;
        }
    }
    intervalos.push({ inicio, fim });
    renderLista(true);
}
function editarUltimoIntervalo() {
    if (intervalos.length === 0) {
        mensagemErro.textContent = "Não há intervalos para editar!";
        return;
    }
    mensagemErro.textContent = "";
    const novoInicio = parseFloat(inputInicio.value);
    const novoFim = parseFloat(inputFim.value);
    if (isNaN(novoInicio)) {
        mensagemErro.textContent = "Valor de início inválido!";
        return;
    }
    if (isNaN(novoFim)) {
        mensagemErro.textContent = "Valor de fim inválido!";
        return;
    }
    if (novoInicio >= novoFim) {
        mensagemErro.textContent = "O início deve ser menor que o fim.";
        return;
    }
    if (intervalos.length === 1) {
        if (novoInicio !== 0) {
            mensagemErro.textContent = "O primeiro intervalo deve começar em 0!";
            return;
        }
    }
    else {
        const penultimo = intervalos[intervalos.length - 2];
        if (novoInicio !== penultimo.fim) {
            mensagemErro.textContent = `O novo início deve ser igual a ${penultimo.fim}.`;
            return;
        }
    }
    const ultimo = intervalos[intervalos.length - 1];
    ultimo.inicio = novoInicio;
    ultimo.fim = novoFim;
    renderLista();
    const listaItens = document.getElementsByTagName("li");
    const ultimoLi = listaItens[listaItens.length - 1];
    ultimoLi.classList.add("highlight");
    setTimeout(() => {
        ultimoLi.classList.remove("highlight");
    }, 1500);
}
function removerUltimoIntervalo() {
    if (intervalos.length === 0) {
        mensagemErro.textContent = "Não há intervalos para remover.";
        return;
    }
    intervalos.pop();
    renderLista();
}
btnAdicionar.addEventListener("click", (event) => {
    event.preventDefault();
    const inicio = parseFloat(inputInicio.value);
    const fim = parseFloat(inputFim.value);
    adicionarIntervalo(inicio, fim);
    inputInicio.value = "";
    inputFim.value = "";
});
btnEditar.addEventListener("click", (event) => {
    event.preventDefault();
    editarUltimoIntervalo();
    inputInicio.value = "";
    inputFim.value = "";
});
btnExcluir.addEventListener("click", (event) => {
    event.preventDefault();
    removerUltimoIntervalo();
});
