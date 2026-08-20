const exibirSaudacao = document.querySelector("#saudacao");
 
const nomeCompleto = prompt("Digite seu nome completo:");

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

