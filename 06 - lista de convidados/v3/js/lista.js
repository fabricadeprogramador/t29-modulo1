var nomeConvidado = "";
var idadeConvidado = "";
var elementoSexo = "";
var contador = 0;
var elementoEditar = "";
var ehValido = false;

class GerenciadorLista {
  lerConvidado() {
    nomeConvidado = document.getElementById("nomeConvidado").value;
    idadeConvidado = document.getElementById("idadeConvidado").value;
    elementoSexo = document.querySelector("input[type=radio]:checked");
  }

  validar() {
    if (nomeConvidado != "" && idadeConvidado != "" && elementoSexo != null) {
      ehValido = true;
    } else {
      ehValido = false;
      alert("Preencha todos os campos!");
    }
  }

  salvar() {
    this.lerConvidado();
    this.validar();

    if (ehValido) {
      if (elementoEditar == "") {
        this.adicionarConvidado();
      } else {
        this.salvarEdicao();
      }
    }
    this.limpar();
  }

  salvarEdicao() {
    document.getElementById("nome-" + elementoEditar).innerText = nomeConvidado;
    document.getElementById(
      "idade-" + elementoEditar
    ).innerText = idadeConvidado;
    document.getElementById("sexo-" + elementoEditar).innerText =
      elementoSexo.value;
  }

  adicionarConvidado() {
    let tabela = document.getElementById("tabela");

    let linha = tabela.insertRow();

    let colunaNome = linha.insertCell();
    let colunaIdade = linha.insertCell();
    let colunaSexo = linha.insertCell();
    let colunaEditar = linha.insertCell();
    let colunaExcluir = linha.insertCell();

    let imagemEditar = document.createElement("img");
    let imagemExcluir = document.createElement("img");

    linha.id = "linha-" + contador;

    colunaNome.innerText = nomeConvidado;
    colunaIdade.innerText = idadeConvidado;
    colunaSexo.innerText = elementoSexo.value;

    colunaNome.id = "nome-" + contador;
    colunaIdade.id = "idade-" + contador;
    colunaSexo.id = "sexo-" + contador;

    imagemEditar.src = "img/editar.svg";
    imagemEditar.setAttribute("onclick", `gerenciador.editar(${contador})`);

    imagemExcluir.src = "img/deletar.svg";
    imagemExcluir.setAttribute("onclick", `gerenciador.excluir(${contador})`);

    colunaEditar.appendChild(imagemEditar);
    colunaExcluir.appendChild(imagemExcluir);

    contador++;
  }

  editar(idEd) {
    elementoEditar = idEd;

    document.getElementById("nomeConvidado").value = document.getElementById(
      "nome-" + idEd
    ).innerText;

    document.getElementById("idadeConvidado").value = document.getElementById(
      "idade-" + idEd
    ).innerText;

    if (document.getElementById("sexo-" + idEd).innerText == "M") {
      document.getElementById("masc").checked = true;
    } else {
      document.getElementById("fem").checked = true;
    }
  }

  excluir(idEx) {
    document.getElementById("linha-" + idEx).remove();
  }

  limpar() {
    document.getElementById("nomeConvidado").value = "";
    document.getElementById("idadeConvidado").value = "";
    ehValido = false;
    elementoEditar = "";
    let elSexo = document.querySelector("input[type=radio]:checked");

    if (elSexo != null) {
      elSexo.checked = false;
    }
  }
}

let gerenciador = new GerenciadorLista();
