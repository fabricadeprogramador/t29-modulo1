class ClienteController {
  constructor() {
    this.nome = "";
    this.email = "";
    this.elementoSexo = null;
    this.cursos = null;
    this.estado = "";
    this.cidade = "";
    this.elementoEditar = "";
    this.contador = 0;
    this.ehValido = false;
  }

  lerDados() {
    this.nome = document.getElementById("nome").value;
    this.email = document.getElementById("email").value;
    this.elementoSexo = document.querySelector("input[type=radio]:checked");
    this.cursos = document.querySelector("input[type=checkbox]:checked");
    this.estado = document.getElementById("estado").value;
    this.cidade = document.getElementById("cidade").value;
  }

  salvar() {
    this.lerDados();
    this.validar();

    if (this.ehValido) {
      if (this.elementoEditar == "") {
        this.adicionar();
      } else {
        this.salvarEdicao();
      }

      this.limpar();
    }
  }

  validar() {
    let buffer = "";

    if (this.nome == "") {
      buffer += "O campo nome é obrigatório! \n";
    }

    if (this.email == "") {
      buffer += "O campo e-mail é obrigatório!\n";
    }
    if (this.elementoSexo == null) {
      buffer += "Selecione o sexo!\n";
    }

    if (this.cursos == null) {
      buffer += "Escolha pelo menos um curso de interesse!\n";
    }

    if (this.estado == "") {
      buffer += "Selecione um estado!\n";
    }

    if (this.cidade == "") {
      buffer += "O campo cidade é obrigatório!\n";
    }

    if (buffer != "") {
      document.getElementById("mensagem").innerText = buffer;
      document.getElementById("mensagens").classList.add("show");
      this.ehValido = false;
    } else {
      this.ehValido = true;
    }
  }

  editar(id) {
    let idLinha = "linha-" + id;
    this.elementoEditar = idLinha;

    let linha = document.getElementById(idLinha);

    let nomeEd = linha.children[0].innerText;
    document.getElementById("nome").value = nomeEd;

    let emailEd = linha.children[1].innerText;
    document.getElementById("email").value = emailEd;

    let sexoEd = linha.children[2].innerText;

    if (sexoEd == "M") {
      document.getElementById("masc").checked = true;
    } else {
      document.getElementById("fem").checked = true;
    }

    let cursosEd = linha.children[3].innerText;

    if (cursosEd.indexOf("Web") != -1) {
      document.getElementById("web").checked = true;
    }

    if (cursosEd.indexOf("Mobile") != -1) {
      document.getElementById("mobile").checked = true;
    }

    if (cursosEd.indexOf("Desktop") != -1) {
      document.getElementById("desktop").checked = true;
    }

    let cidadeEd = linha.children[4].innerText;
    document.getElementById("cidade").value = cidadeEd;

    let estadoEd = linha.children[5].innerText;
    document.getElementById("estado").value = estadoEd;
  }

  salvarEdicao() {
    document.getElementById(
      this.elementoEditar
    ).children[0].innerText = this.nome;
    document.getElementById(
      this.elementoEditar
    ).children[1].innerText = this.email;
    document.getElementById(
      this.elementoEditar
    ).children[2].innerText = this.elementoSexo.value;

    let cursosDeInteresse = "";

    if (document.getElementById("web").checked) {
      cursosDeInteresse += document.getElementById("web").value + ", ";
    }

    if (document.getElementById("mobile").checked) {
      cursosDeInteresse += document.getElementById("mobile").value + ", ";
    }

    if (document.getElementById("desktop").checked) {
      cursosDeInteresse += document.getElementById("desktop").value;
    }

    document.getElementById(
      this.elementoEditar
    ).children[3].innerText = cursosDeInteresse;
    document.getElementById(
      this.elementoEditar
    ).children[4].innerText = this.cidade;
    document.getElementById(
      this.elementoEditar
    ).children[5].innerText = this.estado;
  }

  excluir(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      document.getElementById("linha-" + id).remove();
    }
  }

  limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";

    if (document.getElementById("masc").checked) {
      document.getElementById("masc").checked = false;
    } else {
      document.getElementById("fem").checked = false;
    }

    if (document.getElementById("web").checked) {
      document.getElementById("web").checked = false;
    }

    if (document.getElementById("mobile").checked) {
      document.getElementById("mobile").checked = false;
    }

    if (document.getElementById("desktop").checked) {
      document.getElementById("desktop").checked = false;
    }

    this.elementoEditar = "";
    this.ehValido = false;
  }

  adicionar() {
    let tabela = document.getElementById("tabela");

    let linha = tabela.insertRow();
    linha.id = "linha-" + this.contador;

    let colunaNome = linha.insertCell();
    let colunaEmail = linha.insertCell();
    let colunaSexo = linha.insertCell();
    let colunaCursos = linha.insertCell();
    let colunaCidade = linha.insertCell();
    let colunaEstado = linha.insertCell();
    let colunaEditar = linha.insertCell();
    let colunaExcluir = linha.insertCell();

    colunaNome.innerText = this.nome;
    colunaEmail.innerText = this.email;
    colunaSexo.innerText = this.elementoSexo.value;
    colunaEstado.innerText = this.estado;
    colunaCidade.innerText = this.cidade;

    let cursosDeInteresse = "";

    if (document.getElementById("web").checked) {
      cursosDeInteresse += document.getElementById("web").value + ", ";
    }

    if (document.getElementById("mobile").checked) {
      cursosDeInteresse += document.getElementById("mobile").value + ", ";
    }

    if (document.getElementById("desktop").checked) {
      cursosDeInteresse += document.getElementById("desktop").value;
    }

    colunaCursos.innerText = cursosDeInteresse;

    let imagemEditar = document.createElement("img");
    let imagemExcluir = document.createElement("img");

    imagemEditar.src = "img/editar.svg";
    imagemEditar.setAttribute("onclick", `controller.editar(${this.contador})`);

    imagemExcluir.src = "img/deletar.svg";
    imagemExcluir.setAttribute(
      "onclick",
      `controller.excluir(${this.contador})`
    );

    colunaEditar.appendChild(imagemEditar);
    colunaExcluir.appendChild(imagemExcluir);

    this.contador++;
  }
}

let controller = new ClienteController();
