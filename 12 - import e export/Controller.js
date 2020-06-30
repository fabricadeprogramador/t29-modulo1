import Cliente from "./Cliente.js";

function imprimirMaiorDeIdade() {
  let cliente = new Cliente("Jão", 35, "M", "000000", "Rua do Jão");

  if (cliente.maioridade()) {
    alert("MAIOR DE IDADE!!!");
  } else {
    alert("MENOR DE IDADE!!!");
  }
}

document
  .querySelector("#botao")
  .addEventListener("click", imprimirMaiorDeIdade);
