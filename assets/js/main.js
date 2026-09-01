const exibirSaudacao = document.querySelector("#saudacao");
 
const nomeCompleto = localStorage.getItem("nomeUsuario") || "Usuário";

const diasSemana = [
    "Domingo", 
    "Segunda-feira", 
    "Terça-feira", 
    "Quarta-feira", 
    "Quinta-feira", 
    "Sexta-feira", 
    "Sábado"
];

function atualizarSaudacao() {

const dataAtual = new Date();
const diaSemana = diasSemana[dataAtual.getDay()];
const dataFormatada = dataAtual.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const horaFormatada = dataAtual.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const offsetMinutos = dataAtual.getTimezoneOffset();
const offsetHoras = Math.floor(Math.abs(offsetMinutos) / 60);
const offsetMin = Math.abs(offsetMinutos) % 60;
const sinal = offsetMinutos > 0 ? "-" : "+";
const fusoFormatado = `${sinal}${String(offsetHoras).padStart(2, "0")}:${String(offsetMin).padStart(2, "0")}`;

const dataCompleta = `${diaSemana}, ${dataFormatada} - ${horaFormatada} (${fusoFormatado})`;

exibirSaudacao.innerHTML = `Olá, ${nomeCompleto}! Hoje é ${dataCompleta}`;

}

atualizarSaudacao();

setInterval(atualizarSaudacao,6*1000)

document.addEventListener("DOMContentLoaded", () => {

    const campoBusca = document.getElementById("campoBusca");
    const linhasTabela = document.querySelectorAll("table tbody tr");

    campoBusca.addEventListener("input", (event) => {
        const termo = event.target.value.toLowerCase().trim();

            linhasTabela.forEach((linha) => {
                const texto = linha.textContent.toLowerCase();
                linha.style.display = texto.includes(termo) ? "" : "none";
            });
    });

    const btnTema = document.getElementById("btnTema");

    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        const ativo = document.body.classList.contains("dark-theme");
        btnTema.textContent = ativo ? "Light Mode" : "Dark Mode";
    });

    const btnMenu = document.getElementById("btnMenu");
    const mainMenu = document.getElementById("mainMenu")

    btnMenu.addEventListener("click", () => {
        mainMenu.classList.toggle("aberto");
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768 && mainMenu.classList.contains("aberto")) {
            mainMenu.classList.remove("aberto");
        }
    });
});
