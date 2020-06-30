var nomeConvidado = "";
var contador = 0;
var elementoEditar = "";

class GerenciadorLista {
  lerConvidado() {
    nomeConvidado = document.getElementById("nomeConvidado").value;
  }

  salvar() {
    this.lerConvidado();

    if (nomeConvidado != "") {
      if (elementoEditar == "") {
        this.adicionarConvidado();
        contador++;
      } else {
        this.salvarEdicao();
      }

      this.limpar();
    } else {
      alert("Preencha o campo com o nome do convidado!");
    }
  }

  salvarEdicao() {
    document.getElementById(elementoEditar).innerText = nomeConvidado;
  }

  adicionarConvidado() {
    // Buscando elemento div raíz da lista
    let lista = document.getElementById("lista");

    // Criando elementos necessário para inserir o item da lista
    let div = document.createElement("div");
    let span = document.createElement("span");
    let imgExcluir = document.createElement("img");
    let imgEditar = document.createElement("img");

    //Setando valores nos elementos

    /////// DIV ////////
    div.id = "item-" + contador;
    div.classList.add("item-lista");

    /////// SPAN ////////
    span.innerText = nomeConvidado;
    span.id = "span-" + contador;

    /////// IMAGENS ////////
    imgEditar.setAttribute("src", "img/editar.svg");
    imgEditar.setAttribute(
      "onclick",
      "gerenciador.editar('span-" + contador + "')"
    );
    // imgEditar.setAttribute("onclick", `gerenciador.editar('item-${contador}')`);

    imgExcluir.setAttribute("src", "img/deletar.svg");
    imgExcluir.setAttribute(
      "onclick",
      "gerenciador.excluir('item-" + contador + "')"
    );

    // Definindo hierarquia dos elementos
    div.appendChild(span);
    div.appendChild(imgExcluir);
    div.appendChild(imgEditar);
    lista.appendChild(div);
  }

  editar(idEd) {
    elementoEditar = idEd;
    document.getElementById("nomeConvidado").value = document.getElementById(
      idEd
    ).innerText;
  }

  excluir(idEx) {
    document.getElementById(idEx).remove();
  }

  limpar() {
    document.getElementById("nomeConvidado").value = "";
    elementoEditar = "";
  }
}

let gerenciador = new GerenciadorLista();
