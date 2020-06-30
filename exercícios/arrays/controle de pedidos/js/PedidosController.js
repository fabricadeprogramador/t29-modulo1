class PedidosController {
  constructor() {
    this.pedidos = [];
    this.total = 0;
    this.geradorId = 0;
    this.idEdicao = null;
  }

  lerPedido() {
    let pedido = {};

    pedido.qtdP = document.getElementById("qtdP").value;
    pedido.qtdM = document.getElementById("qtdM").value;
    pedido.qtdG = document.getElementById("qtdG").value;
    pedido.qtdTotal = 0;
    pedido.total = 0;

    return pedido;
  }

  validar(pedido) {
    let erros = "";

    if (pedido.qtdP == "") {
      erros += "Preencha a quantidade de P \n";
    }

    if (pedido.qtdM == "") {
      erros += "Preencha a quantidade de M \n";
    }

    if (pedido.qtdG == "") {
      erros += "Preencha a quantidade de G \n";
    }

    if (erros != "") {
      alert(erros);
      return false;
    }

    return true;
  }

  limpar() {
    document.getElementById("qtdP").value = "";
    document.getElementById("qtdM").value = "";
    document.getElementById("qtdG").value = "";
    this.idEdicao = null;
  }

  converterValoresNumericos(pedido) {
    pedido.qtdP = parseInt(pedido.qtdP);
    pedido.qtdM = parseInt(pedido.qtdM);
    pedido.qtdG = parseInt(pedido.qtdG);

    pedido.qtdTotal = pedido.qtdP + pedido.qtdM + pedido.qtdG;
    pedido.total = pedido.qtdP * 10 + pedido.qtdM * 12 + pedido.qtdG * 15;

    return pedido;
  }

  salvar() {
    let pedido = this.lerPedido();

    if (this.validar(pedido)) {
      pedido = this.converterValoresNumericos(pedido);

      if (this.idEdicao == null) {
        this.adicionar(pedido);
      } else {
        this.salvarEdicao(pedido);
      }

      this.limpar();
      this.gerarTabela();
    }
  }

  adicionar(pedido) {
    pedido.id = this.geradorId;
    this.pedidos.push(pedido);
    this.geradorId++;
  }

  gerarTabela() {
    document.getElementById("tabela").innerText = "";

    for (let i = 0; i < this.pedidos.length; i++) {
      this.inserirLinha(this.pedidos[i]);
    }
  }

  inserirLinha(pedido) {
    let tabela = document.getElementById("tabela");

    let linha = tabela.insertRow();
    let colunaP = linha.insertCell();
    let colunaM = linha.insertCell();
    let colunaG = linha.insertCell();
    let colunaTotal = linha.insertCell();
    let colunaExcluir = linha.insertCell();
    let colunaEditar = linha.insertCell();

    colunaP.innerText = pedido.qtdP;
    colunaM.innerText = pedido.qtdM;
    colunaG.innerText = pedido.qtdG;
    colunaTotal.innerText = "R$ " + pedido.total;

    let botaoExcluir = document.createElement("button");
    botaoExcluir.innerText = "Excluir";
    botaoExcluir.setAttribute("onclick", `controller.excluir(${pedido.id})`);

    let botaoEditar = document.createElement("button");
    botaoEditar.innerText = "Editar";
    botaoEditar.setAttribute("onclick", `controller.editar(${pedido.id})`);

    colunaExcluir.appendChild(botaoExcluir);
    colunaEditar.appendChild(botaoEditar);
  }

  encontrarPosicaoPedido(id) {
    let posicao = -1;

    for (let i = 0; i < this.pedidos.length; i++) {
      if (this.pedidos[i].id == id) {
        posicao = i;
      }
    }

    if (posicao != -1) {
      return posicao;
    } else {
      alert("Não foi encontrado nenhum pedido com esse id!");
      return posicao;
    }
  }

  excluir(id) {
    if (confirm("Tem certeza de que deseja excluir esse pedido?")) {
      let pos = this.encontrarPosicaoPedido(id);
      if (pos != -1) {
        this.pedidos.splice(pos, 1);
        this.gerarTabela();
      }
    }
  }

  editar(id) {
    let pos = this.encontrarPosicaoPedido(id);

    if (pos != -1) {
      this.idEdicao = id;

      document.getElementById("qtdP").value = this.pedidos[pos].qtdP;
      document.getElementById("qtdM").value = this.pedidos[pos].qtdM;
      document.getElementById("qtdG").value = this.pedidos[pos].qtdG;
    }
  }

  salvarEdicao(pedido) {
    let pos = this.encontrarPosicaoPedido(this.idEdicao);

    this.pedidos[pos].qtdP = pedido.qtdP;
    this.pedidos[pos].qtdM = pedido.qtdM;
    this.pedidos[pos].qtdG = pedido.qtdG;
    this.pedidos[pos].qtdTotal = pedido.qtdTotal;
    this.pedidos[pos].total = pedido.total;
  }
}

let controller = new PedidosController();
