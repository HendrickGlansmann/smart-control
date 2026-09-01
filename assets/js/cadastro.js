document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-cadastro");
    const btnCadastrar = document.getElementById("btn-cadastrar");

    const campos = {
        nome: document.getElementById("nome"),
        email: document.getElementById("email"),
        senha: document.getElementById("senha"),
        nivel: document.getElementById("nivel_acesso"),
        termos: document.getElementById("termos"),
    };

    const erros = {
        nome: document.getElementById("erro-nome"),
        email: document.getElementById("erro-email"),
        senha: document.getElementById("erro-senha"),
        nivel: document.getElementById("erro-nivel"),
        termos: document.getElementById("erro-termos"),
    };

    const barraForca = document.getElementById("forca-senha");

    function mostrarErro(campo, elementoErro, mensagem) {
        elementoErro.textContent = mensagem;
        elementoErro.classList.add("visivel");
        campo.classList.remove("valido");
        campo.classList.add("invalido");
    }

    function mostrarSucesso(campo, elementoErro) {
        elementoErro.textContent = "";
        elementoErro.classList.remove("visivel");
        campo.classList.remove("invalido");
        campo.classList.add("valido");
    }

    function validarNome() {
        const valor = campos.nome.value.trim();
        if (valor.length < 3) {
            mostrarErro(campos.nome, erros.nome, "Digite seu nome completo (mín. 3 caracteres).");
            return false;
        }
        if (!valor.includes(" ")) {
            mostrarErro(campos.nome, erros.nome, "Digite nome e sobrenome.");
            return false;
        }
        mostrarSucesso(campos.nome, erros.nome);
        return true;
    }

    function validarEmail() {
        const valor = campos.email.value.trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(valor)) {
            mostrarErro(campos.email, erros.email, "Digite um e-mail válido.");
            return false;
        }
        mostrarSucesso(campos.email, erros.email);
        return true;
    }

    function avaliarForcaSenha(senha) {
        let pontos = 0;
        if (senha.length >= 8) pontos++;
        if (/[A-Z]/.test(senha)) pontos++;
        if (/[0-9]/.test(senha)) pontos++;
        if (/[^A-Za-z0-9]/.test(senha)) pontos++;
        return pontos;
    }

    function validarSenha() {
        const valor = campos.senha.value;
        const pontos = avaliarForcaSenha(valor);

        const niveis = [
            { largura: "0%", cor: "#e74c3c" },
            { largura: "25%", cor: "#e74c3c" },
            { largura: "50%", cor: "#f1c40f" },
            { largura: "75%", cor: "#3793cf" },
            { largura: "100%", cor: "#2ecc71" },
        ];
        barraForca.style.setProperty("--forca", niveis[pontos].largura);
        barraForca.style.setProperty("--cor-forca", niveis[pontos].cor);

        if (valor.length < 8) {
            mostrarErro(campos.senha, erros.senha, "A senha precisa ter no mínimo 8 caracteres.");
            return false;
        }
        if (pontos < 3) {
            mostrarErro(campos.senha, erros.senha, "Use letra maiúscula, número e símbolo para uma senha mais forte.");
            return false;
        }
        mostrarSucesso(campos.senha, erros.senha);
        return true;
    }

    function validarNivel() {
        if (!campos.nivel.value) {
            mostrarErro(campos.nivel, erros.nivel, "Selecione um nível de acesso.");
            return false;
        }
        mostrarSucesso(campos.nivel, erros.nivel);
        return true;
    }

    function validarTermos() {
        if (!campos.termos.checked) {
            erros.termos.textContent = "Você precisa aceitar os termos de uso.";
            erros.termos.classList.add("visivel");
            return false;
        }
        erros.termos.textContent = "";
        erros.termos.classList.remove("visivel");
        return true;
    }

    function validarTudo() {
        const nomeOk = campos.nome.value.trim().length >= 3 && campos.nome.value.trim().includes(" ");
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.value.trim());
        const senhaOk = campos.senha.value.length >= 8 && avaliarForcaSenha(campos.senha.value) >= 3;
        const nivelOk = !!campos.nivel.value;
        const termosOk = campos.termos.checked;
        return nomeOk && emailOk && senhaOk && nivelOk && termosOk;
    }

    function atualizarBotao() {
        btnCadastrar.disabled = !(validarTudo());
    }

    campos.nome.addEventListener("input", () => {
        validarNome();
        atualizarBotao();
    });
    campos.email.addEventListener("input", () => {
        validarEmail();
        atualizarBotao();
    });
    campos.senha.addEventListener("input", () => {
        validarSenha();
        atualizarBotao();
    });
    campos.nivel.addEventListener("input", () => {
        validarNivel();
        atualizarBotao();
    });
    campos.termos.addEventListener("change", () => {
        validarTermos();
        atualizarBotao();
    });

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        const valido = 
            validarNome() &&
            validarEmail() &&
            validarSenha() &&
            validarNivel() &&
            validarTermos();
        if (valido) {
            localStorage.setItem("nomeUsuario", campos.nome.value.trim());
            window.location.href = "dashboard.html";
        }
    });
});