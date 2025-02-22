interface Intervalo {
    inicio: number;
    fim: number;
}

const intervalos: Intervalo[] = [];


const inputInicio = document.getElementById("inicio") as HTMLInputElement;
const inputFim = document.getElementById("fim") as HTMLInputElement;
const listaIntervalos = document.getElementById("listaIntervalos") as HTMLUListElement;
const mensagemErro = document.getElementById("mensagemErro") as HTMLParagraphElement;
const btnAdicionar = document.getElementById("btnAddicionar") as HTMLButtonElement;
const btnEditar = document.getElementById("btnEditar") as HTMLButtonElement;
const btnExcluir = document.getElementById("btnExcluir") as HTMLButtonElement;

function renderLista(): void {
    listaIntervalos.innerHTML = '';
    intervalos.forEach((intervalo) => {
        const li = document.createElement("li");
        li.textContent = `Intervalo: [${intervalo.inicio}, ${intervalo.fim}]`;
        listaIntervalos.appendChild(li);
    });
}

function typeEfeito(mensagem: string, elemento: HTMLElement): void {
    elemento.innerHTML = '';
    elemento.classList.add('digitando');

    let i = 0;
    const velocidade = 50;

    function adicionarCaractere() {
        if (i < mensagem.length) {
            elemento.textContent += mensagem.charAt(i);
            i++;
            setTimeout(adicionarCaractere, velocidade);
        } else {
            elemento.classList.remove('digitando');
        }
    }
    adicionarCaractere();
}

function adicionarIntervalo(inicio: number, fim: number): void {
    mensagemErro.textContent = "";

    if (inicio >= fim) {
        typeEfeito("O início deve ser menor que o fim!", mensagemErro);
        return;
    }
    if (intervalos.length === 0) {
        if (inicio !== 0) {
            typeEfeito("O primeiro intervalo deve começar em 0!", mensagemErro);
            return;
        }
    } else {
        const ultimoIntervalo = intervalos[intervalos.length - 1];
        if (inicio !== ultimoIntervalo.fim) {
            typeEfeito(`O novo intervalo deve começar em ${ultimoIntervalo.fim}`, mensagemErro);
            return;
        }
    }


    intervalos.push({ inicio, fim });
    renderLista();

    const todosItens = document.querySelectorAll('#listaIntervalos li');
    const ultimoItem = todosItens[todosItens.length - 1] as HTMLElement;
    ultimoItem.classList.add("itemList");

    setTimeout(() => {
        ultimoItem.classList.remove("itemList");
    }, 500);

    inputInicio.value = "";
    inputFim.value = "";
}


function editarUltimoIntervalo(): void {
    if (intervalos.length === 0) {
        typeEfeito("Não há intervalos para editar!", mensagemErro);
        return;
    }

    mensagemErro.textContent = "";

    const novoInicio = parseFloat(inputInicio.value);
    const novoFim = parseFloat(inputFim.value);

    if (isNaN(novoInicio)) {
        typeEfeito("Valor de início inválido!", mensagemErro);
        return;
    }
    if (isNaN(novoFim)) {
        typeEfeito("Valor de fim inválido!", mensagemErro);
        return;
    }

    if (novoInicio >= novoFim) {
        typeEfeito("O início deve ser menor que o fim.", mensagemErro);
        return;
    }

    if (intervalos.length === 1) {
        if (novoInicio !== 0) {
            typeEfeito("O primeiro intervalo deve começar em 0!", mensagemErro);
            return;
        }
    } else {
        const penultimo = intervalos[intervalos.length - 2];
        if (novoInicio !== penultimo.fim) {
            typeEfeito(`O novo início deve ser igual a ${penultimo.fim}.`, mensagemErro);
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


function removerUltimoIntervalo(): void {
    if (intervalos.length === 0) {
        typeEfeito("Não há intervalos para remover.", mensagemErro);
        return;
    }

    const listaItens = document.getElementsByTagName("li");
    const ultimoLi = listaItens[listaItens.length - 1];
    ultimoLi.classList.add("fadeOut");
    setTimeout(() => {
        intervalos.pop();
        renderLista();
    }, 500);
}

btnAdicionar.addEventListener("click", (event) => {
    event.preventDefault();

    const inicio = parseFloat(inputInicio.value);
    const fim = parseFloat(inputFim.value);

    adicionarIntervalo(inicio, fim);
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