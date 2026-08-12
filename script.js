"use strict";

/*
=========================================================
CONFIGURAÇÕES DE ACESSIBILIDADE
=========================================================
*/

const body = document.body;

const aumentarFonte =
    document.getElementById("aumentarFonte");

const diminuirFonte =
    document.getElementById("diminuirFonte");

const altoContraste =
    document.getElementById("altoContraste");

const restaurar =
    document.getElementById("restaurar");

const mensagem =
    document.getElementById("mensagemAcessibilidade");


/*
=========================================================
TAMANHOS DE FONTE
=========================================================
*/

const tamanhos = [
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px"
];

let tamanhoAtual = 1;


/*
=========================================================
CARREGAR PREFERÊNCIAS
=========================================================
*/

function carregarPreferencias() {

    const tamanhoSalvo =
        localStorage.getItem("tamanhoFonte");

    const contrasteSalvo =
        localStorage.getItem("altoContraste");

    if (tamanhoSalvo !== null) {

        tamanhoAtual =
            Number(tamanhoSalvo);

        aplicarTamanhoFonte();
    }

    if (contrasteSalvo === "true") {

        ativarAltoContraste(false);
    }
}


/*
=========================================================
ALTERAR TAMANHO DA FONTE
=========================================================
*/

function aplicarTamanhoFonte() {

    document.documentElement.style
        .setProperty(
            "--tamanho-base",
            tamanhos[tamanhoAtual]
        );

    localStorage.setItem(
        "tamanhoFonte",
        tamanhoAtual
    );
}


function anunciar(mensagemTexto) {

    mensagem.textContent = "";

    /*
    Pequeno intervalo para garantir que leitores
    de tela percebam a alteração.
    */

    setTimeout(() => {

        mensagem.textContent =
            mensagemTexto;

    }, 50);
}


aumentarFonte.addEventListener(
    "click",
    function () {

        if (tamanhoAtual < tamanhos.length - 1) {

            tamanhoAtual++;

            aplicarTamanhoFonte();

            anunciar(
                `Tamanho do texto aumentado para ${tamanhos[tamanhoAtual]}`
            );

        } else {

            anunciar(
                "O texto já está no maior tamanho disponível."
            );

        }

    }
);


diminuirFonte.addEventListener(
    "click",
    function () {

        if (tamanhoAtual > 0) {

            tamanhoAtual--;

            aplicarTamanhoFonte();

            anunciar(
                `Tamanho do texto reduzido para ${tamanhos[tamanhoAtual]}`
            );

        } else {

            anunciar(
                "O texto já está no menor tamanho disponível."
            );

        }

    }
);


/*
=========================================================
ALTO CONTRASTE
=========================================================
*/

function ativarAltoContraste(anunciarAlteracao = true) {

    const ativado =
        body.classList.toggle("alto-contraste");

    altoContraste.setAttribute(
        "aria-pressed",
        ativado
    );

    localStorage.setItem(
        "altoContraste",
        ativado
    );

    if (anunciarAlteracao) {

        if (ativado) {

            anunciar(
                "Alto contraste ativado."
            );

        } else {

            anunciar(
                "Alto contraste desativado."
            );

        }

    }
}


altoContraste.addEventListener(
    "click",
    function () {

        ativarAltoContraste(true);

    }
);


/*
=========================================================
RESTAURAR CONFIGURAÇÕES
=========================================================
*/

restaurar.addEventListener(
    "click",
    function () {

        tamanhoAtual = 1;

        document.documentElement.style
            .setProperty(
                "--tamanho-base",
                tamanhos[tamanhoAtual]
            );

        body.classList.remove(
            "alto-contraste"
        );

        altoContraste.setAttribute(
            "aria-pressed",
            "false"
        );

        localStorage.removeItem(
            "tamanhoFonte"
        );

        localStorage.removeItem(
            "altoContraste"
        );

        anunciar(
            "As configurações de acessibilidade foram restauradas."
        );

    }
);


/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

carregarPreferencias();