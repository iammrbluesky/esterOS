// NOMES DAS JANELAS

const nomes = {
    inicio: "portfolio.exe",
    projetos: "projetos.zip",
    sobre: "sobre_mim.txt",
    contato: "contato.msg",

    motion: "motion.aep",
    design: "design.psd",
    videos: "videos.mp4"
};

const icones = {
    inicio: "imagens/inicio.png",
    projetos: "imagens/projetos.png",
    sobre: "imagens/sobre.png",
    contato: "imagens/contatos.png",

    motion: "imagens/projetos.png",
    design: "imagens/projetos.png",
    videos: "imagens/projetos.png"
};


// JANELAS ABERTAS

const janelasAbertas = new Set(["inicio"]);

const barra = document.getElementById("tarefasAbertas");


// ATUALIZAR BARRA DE TAREFAS

// CONFIGURAÇÃO INICIAL DO DESKTOP

const janelasFechadas = [
    "projetos",
    "sobre",
    "contato",
    "motion",
    "design",
    "videos"
];

janelasFechadas.forEach((id) => {
    const janela = document.getElementById(id);

    if (janela) {
        janela.hidden = true;
    }
});
function atualizarBarra() {

    barra.replaceChildren();

    janelasAbertas.forEach((id) => {

        const janela = document.getElementById(id);

        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "tarefa-aberta";
        // Criar imagem do botão

const imagem = document.createElement("img");

imagem.src = icones[id];
imagem.alt = "";
imagem.className = "icone-tarefa";


// Criar nome do botão

const texto = document.createElement("span");

texto.textContent = nomes[id];


// Adicionar imagem e texto ao botão

botao.append(imagem, texto);

        if (!janela.hidden) {
            botao.classList.add("ativa");
        }

        botao.addEventListener("click", () => {

            if (janela.hidden) {

                abrirJanela(id);

            } else {

                janela.hidden = true;
                atualizarBarra();

            }

        });

        barra.appendChild(botao);

    });

}


// ABRIR UMA JANELA

function abrirJanela(id) {

    const janela = document.getElementById(id);

    if (!janela) return;

    janelasAbertas.add(id);

    janela.hidden = false;

    janela.classList.remove("minimizada");

    atualizarBarra();

    janela.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// CLICAR NOS ÍCONES DO DESKTOP

document.querySelectorAll("[data-abrir]").forEach((atalho) => {

    atalho.addEventListener("click", (evento) => {

        evento.preventDefault();

        abrirJanela(atalho.dataset.abrir);

    });

});


// MINIMIZAR JANELA

document.querySelectorAll("[data-minimizar]").forEach((botao) => {

    botao.addEventListener("click", () => {

        const janela = botao.closest(".janela");

        janela.hidden = true;

        atualizarBarra();

    });

});


// FECHAR JANELA

document.querySelectorAll("[data-fechar]").forEach((botao) => {

    botao.addEventListener("click", () => {

        const janela = botao.closest(".janela");

        janela.hidden = true;

        janelasAbertas.delete(janela.id);

        atualizarBarra();

    });

});


// MENU INICIAR

const iniciar = document.getElementById("botaoIniciar");

const menu = document.getElementById("menuIniciar");

iniciar.addEventListener("click", () => {

    menu.hidden = !menu.hidden;

    iniciar.setAttribute(
        "aria-expanded",
        String(!menu.hidden)
    );

});


// FECHAR MENU COM ESC

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {

        menu.hidden = true;

        iniciar.setAttribute("aria-expanded", "false");

    }

});


// INICIALIZAR BARRA DE TAREFAS

atualizarBarra();

// VISUALIZADOR DE IMAGENS: carrossel por projeto
const visualizador = document.getElementById("visualizador");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const contadorSlides = document.getElementById("contadorSlides");
const anterior = document.getElementById("slideAnterior");
const proximo = document.getElementById("slideProximo");

let slidesAtuais = [];
let indiceSlide = 0;

function mostrarSlide() {
    if (!slidesAtuais.length) return;
    imagemAmpliada.src = slidesAtuais[indiceSlide].src;
    imagemAmpliada.alt = slidesAtuais[indiceSlide].alt;
    contadorSlides.textContent = `${indiceSlide + 1} / ${slidesAtuais.length}`;
    anterior.disabled = slidesAtuais.length === 1;
    proximo.disabled = slidesAtuais.length === 1;
}

function mudarSlide(direcao) {
    indiceSlide = (indiceSlide + direcao + slidesAtuais.length) % slidesAtuais.length;
    mostrarSlide();
}

document.querySelectorAll("[data-galeria]").forEach((botao) => {
    botao.addEventListener("click", () => {
        const grupo = document.getElementById(botao.dataset.galeria);
        if (!grupo) return;
        slidesAtuais = Array.from(grupo.querySelectorAll("img")).map((img) => ({
            src: img.src,
            alt: img.alt
        }));
        if (slidesAtuais.length === 0) return;
        indiceSlide = 0;
        document.getElementById("visualizadorTitulo").textContent =
            `✦ ${botao.dataset.titulo}`;
        mostrarSlide();
        visualizador.showModal();
    });
});

anterior.addEventListener("click", () => mudarSlide(-1));
proximo.addEventListener("click", () => mudarSlide(1));
document.getElementById("fecharVisualizador").addEventListener("click", () => visualizador.close());
visualizador.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") mudarSlide(-1);
    if (evento.key === "ArrowRight") mudarSlide(1);
})