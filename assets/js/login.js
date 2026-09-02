const email = "Hendrick@gmail.com";
const senha = "Senha07$";
const emailFormatado = email.split("@")[0];

function validarLogin(emailDigitado, senhaDigitada) {
    if(emailDigitado === "" && senhaDigitada === "") {
        alert("Os campos email e senha são obrigatórios");
    } else if (emailDigitado === email && senhaDigitada === senha) {
        localStorage.setItem("nomeUsuario", emailFormatado.trim());
        window.location.href = "dashboard.html";
    } else {
        alert("Dados inválidos!")
    }
}

const btnLogin = document.querySelector("#btn-login")

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;
    validarLogin(emailDigitado, senhaDigitada);
})