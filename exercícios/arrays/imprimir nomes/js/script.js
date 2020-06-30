let nomes = [];

function salvar() {
  let nome = document.getElementById("nome").value;

  if (nome != "") {
    nomes.push(nome);

    document.getElementById("nome").value = "";

    let resultado = document.getElementById("resultado");

    resultado.innerText = nomes;
  } else {
    alert("Preencha o campo nome!");
  }
}
