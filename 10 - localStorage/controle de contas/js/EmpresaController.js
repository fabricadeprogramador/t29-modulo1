class EmpresaController {
  constructor() {
    this.empresas = [];
    this.geradorId = 0;
    this.idEdicao = null;
  }

  inicializarLocalStorage() {
    if (typeof Storage !== "undefined") {
      let empresasLSStr = localStorage.getItem("empresas");
      let geradorIdLS = localStorage.getItem("geradorIdEmpresas");

      if (empresasLSStr == null) {
        localStorage.setItem("empresas", JSON.stringify(this.empresas));
      } else {
        this.empresas = JSON.parse(localStorage.getItem("empresas"));
      }

      if (geradorIdLS == null) {
        localStorage.setItem("geradorIdEmpresas", this.geradorId.toString());
      } else {
        this.geradorId = parseInt(localStorage.getItem("geradorIdEmpresas"));
      }

      this.carregarTabela();
    } else {
      alert("Navegador não suportado!");
    }
  }

  sincronizar() {
    localStorage.setItem("empresas", JSON.stringify(this.empresas));
    localStorage.setItem("geradorIdEmpresas", this.geradorId.toString());
  }

  lerDados() {
    let empresa = {};

    empresa.nome = document.getElementById("nome").value;
    empresa.endereco = document.getElementById("endereco").value;
    empresa.cnpj = document.getElementById("cnpj").value;
    empresa.razaoSocial = document.getElementById("razaoSocial").value;

    return empresa;
  }

  validar(empresa) {
    let mensagens = "";

    if (empresa.nome == "") {
      mensagens += "Preencha o campo nome! \n";
    }

    if (empresa.endereco == "") {
      mensagens += "Preencha o campo endereço! \n";
    }

    if (empresa.cnpj == "") {
      mensagens += "Preencha o campo CNPJ! \n";
    }

    if (empresa.razaoSocial == "") {
      mensagens += "Preencha o campo razão social! \n";
    }

    if (mensagens != "") {
      alert(mensagens);
      return false;
    }

    return true;
  }

  salvar() {
    let empresa = this.lerDados();

    if (this.validar(empresa)) {
      if (this.idEdicao == null) {
        this.adicionar(empresa);
      } else {
        this.salvarEdicao(empresa);
      }

      this.sincronizar();
      this.limpar();
      this.carregarTabela();
    }
  }

  adicionar(empresa) {
    empresa.id = this.geradorId;
    empresa.ativo = true;
    this.geradorId++;

    this.empresas.push(empresa);
  }

  salvarEdicao(empresa) {
    let i = 0;
    let achou = false;

    while (!achou && i < this.empresas.length) {
      if (this.idEdicao == this.empresas[i].id) {
        achou = true;
        this.empresas[i].nome = empresa.nome;
        this.empresas[i].endereco = empresa.endereco;
        this.empresas[i].cnpj = empresa.cnpj;
        this.empresas[i].razaoSocial = empresa.razaoSocial;
      }
      i++;
    }
  }

  carregarTabela() {
    let tabela = document.getElementById("tabela");

    tabela.innerHTML = "";

    for (let i = 0; i < this.empresas.length; i++) {
      let linha = tabela.insertRow();

      let colunaNome = linha.insertCell();
      let colunaEndereco = linha.insertCell();
      let colunaCNPJ = linha.insertCell();
      let colunaRazaoSocial = linha.insertCell();
      let colunaEditar = linha.insertCell();
      let colunaStatus = linha.insertCell();

      colunaNome.innerText = this.empresas[i].nome;
      colunaEndereco.innerText = this.empresas[i].endereco;
      colunaCNPJ.innerText = this.empresas[i].cnpj;
      colunaRazaoSocial.innerText = this.empresas[i].razaoSocial;

      let imgEditar = document.createElement("img");
      let imgStatus = document.createElement("img");

      imgEditar.src = "img/editar.svg";

      if (this.empresas[i].ativo) imgStatus.src = "img/ativo.svg";
      else imgStatus.src = "img/inativo.svg";

      imgEditar.setAttribute(
        "onclick",
        `empresaController.editar("${this.empresas[i].id}", "${this.empresas[i].nome}", "${this.empresas[i].endereco}", "${this.empresas[i].razaoSocial}", "${this.empresas[i].cnpj}")`
      );
      imgStatus.setAttribute(
        "onclick",
        `empresaController.mudarStatus("${this.empresas[i].id}")`
      );

      colunaEditar.appendChild(imgEditar);
      colunaStatus.appendChild(imgStatus);
    }
  }

  editar(id, nome, endereco, razaoSocial, cnpj) {
    this.idEdicao = id;

    document.getElementById("nome").value = nome;
    document.getElementById("endereco").value = endereco;
    document.getElementById("cnpj").value = cnpj;
    document.getElementById("razaoSocial").value = razaoSocial;
  }

  mudarStatus(id) {
    if (confirm("Tem certeza que deseja mudar o status desta empresa?")) {
      let i = 0;
      let achou = false;

      while (!achou && i < this.empresas.length) {
        if (id == this.empresas[i].id) {
          achou = true;
          this.empresas[i].ativo = !this.empresas[i].ativo;
        }
        i++;
      }

      this.sincronizar();
      this.carregarTabela();
    }
  }

  limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cnpj").value = "";
    document.getElementById("razaoSocial").value = "";

    this.idEdicao = null;
  }
}

let empresaController = new EmpresaController();
