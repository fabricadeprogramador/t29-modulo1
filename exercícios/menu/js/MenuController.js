class MenuController {
  constructor() {
    this.nomeCorrente = "";
    this.tentativas = 5;
    this.nomesTentativas = [];
  }

  selecionarMenu() {
    let opcao = document.getElementById("menu-opcao").value;

    if (opcao == "") {
      alert("Selecione a opção!");
      return;
    }

    opcao = parseInt(opcao);

    switch (opcao) {
      case 1:
        this.opcao1();
        break;
      case 2:
        this.opcao2();
        break;
      case 3:
        this.opcao3();
        break;
      case 4:
        this.opcao4();
        break;
      default:
        alert("Opção inválida!");
        break;
    }

    document.getElementById("menu-opcao").value = "";
  }

  opcao1() {
    let resultado = "";

    for (let i = 1; i < 100; i++) {
      if (i % 2 != 0) {
        resultado += i + " ";
      }
    }

    document.getElementById("resultadoOP1").innerText = resultado;
    document.getElementById("opcao1").classList.add("exibir-resultado");
  }
  opcao2() {
    document.getElementById("qtdTentativas").innerText = this.tentativas;
    document.getElementById("tentativas").innerText = this.nomesTentativas;
    document.getElementById("opcao2").classList.add("exibir-resultado");
  }
  opcao3() {
    document.getElementById("opcao3").classList.add("exibir-resultado");
  }

  opcao4() {
    window.location = "finalizado.html";
  }

  executarOP2() {
    if (this.tentativas > 0) {
      if (this.lerEValidarNome()) {
        if (this.nomeCorrente == "Jão") {
          alert("Parabéns você encontrou o nome secreto!!!");
          this.zerarOpcao2();
        } else {
          let jaTentou = false;
          let i = 0;

          do {
            if (this.nomesTentativas[i] == this.nomeCorrente) {
              jaTentou = true;
            }
            i++;
          } while (!jaTentou && i < this.nomesTentativas.length);

          if (jaTentou) {
            alert("Tentativa já inserida!");
          } else {
            this.nomesTentativas.push(this.nomeCorrente);
            this.tentativas--;
            document.getElementById(
              "qtdTentativas"
            ).innerText = this.tentativas;
            document.getElementById(
              "tentativas"
            ).innerText = this.nomesTentativas;
          }
        }
        document.getElementById("inputOP2").value = "";
      }
    } else {
      alert("Suas tentativas acabaram!!");
      this.zerarOpcao2();
    }
  }

  executarOP3() {
    let limite = document.getElementById("inputOP3").value;

    if (limite != "") {
      limite = parseInt(limite);

      let indice = 0;
      let contador = 0;
      let lista = "";

      while (indice <= limite) {
        let flag = false;
        let num = indice.toString().split("");

        for (let i = 0; i < num.length; i++) {
          if (num[i] == "1") {
            if (!flag) {
              lista += indice + " ";
              flag = true;
            }
            contador++;
          }
        }
        indice++;
      }

      document.getElementById("resultadoOP3Qtd").innerText = contador;
      document.getElementById("resultadoOP3").innerText = lista;
    } else {
      alert("Preencha o campo do limite!");
    }
  }

  zerarOpcao2() {
    this.tentativas = 5;
    this.nomesTentativas = [];
    this.nomeCorrente = "";

    this.voltarMenu("opcao2");
  }

  lerEValidarNome() {
    this.nomeCorrente = document.getElementById("inputOP2").value;

    if (this.nomeCorrente == "") {
      alert("Preencha o nome!");
      return false;
    }
    return true;
  }

  voltarMenu(idOpcao) {
    document.getElementById(idOpcao).classList.remove("exibir-resultado");
  }
}

let controller = new MenuController();
