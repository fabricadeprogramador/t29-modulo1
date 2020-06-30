class ToDoListController {
  constructor() {
    this.lista = [];
    this.indiceEdicao = null;
    this.geradorId = 0;
  }

  lerTarefa() {
    let tarefa = {};

    tarefa.descricao = document.getElementById("inputDescricao").value;
    tarefa.concluida = false;

    return tarefa;
  }

  validar(tarefa) {
    if (tarefa.descricao == "") {
      alert("Preencha a descrição da tarefa!");
      return false;
    }
    return true;
  }

  salvar() {
    let tarefa = this.lerTarefa();

    if (this.validar(tarefa)) {
      if (this.indiceEdicao == null) this.adicionar(tarefa);
      else this.salvarEdicao(tarefa);

      this.limpar();
      this.gerarTabela();
    }
  }

  adicionar(tarefa) {
    tarefa.id = this.geradorId;
    this.geradorId++;

    this.lista.push(tarefa);
  }

  salvarEdicao(tarefa) {}

  limpar() {
    this.indiceEdicao = null;
    document.getElementById("inputDescricao").value = "";
  }

  gerarTabela() {
    let tabela = document.getElementById("tabelaDeTarefas");
    tabela.innerHTML = "";

    for (let i = 0; i < this.lista.length; i++) {
      let linha = tabela.insertRow();

      let colunaConcluida = linha.insertCell();
      let colunaDescricao = linha.insertCell();
      let colunaEdicao = linha.insertCell();
      let colunaExclusao = linha.insertCell();

      colunaDescricao.innerText = this.lista[i].descricao;

      let imgEdicao = document.createElement("img");
      let imgExclusao = document.createElement("img");
      let imgConcluida = document.createElement("img");

      imgEdicao.src = "img/edit.svg";
      imgExclusao.src = "img/delete.svg";
      if (this.lista[i].concluida) imgConcluida.src = "img/checked.svg";
      else imgConcluida.src = "img/unchecked.svg";

      imgEdicao.setAttribute(
        "onclick",
        `todoListController.editar(${this.lista[i].id})`
      );

      imgExclusao.setAttribute(
        "onclick",
        `todoListController.excluir(${this.lista[i].id})`
      );

      imgConcluida.setAttribute(
        "onclick",
        `todoListController.mudarStatus(${this.lista[i].id})`
      );

      colunaConcluida.appendChild(imgConcluida);
      colunaEdicao.appendChild(imgEdicao);
      colunaExclusao.appendChild(imgExclusao);
    }
  }

  mudarStatus(id) {
    let achou = false;
    let i = 0;

    while (!achou && i < this.lista.length) {
      if (id == this.lista[i].id) {
        achou = true;
        if (confirm("Tem certeza que deseja mudar o status dessa tarefa?"))
          this.lista[i].concluida = !this.lista[i].concluida;
      }
      i++;
    }

    this.gerarTabela();
  }
}

let todoListController = new ToDoListController();
