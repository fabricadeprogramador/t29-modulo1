class GerenciadorImpares {
  imprimirImpares() {
    let limiteSTR = document.getElementById("limite").value;

    if (limiteSTR == "") {
      alert("Preencha o valor do limite!");
    } else {
      let limite = parseInt(limiteSTR);
      let numeros = "";

      for (let i = 0; i < limite; i++) {
        if (i % 2 != 0) {
          numeros += i + " ";
        }
      }

      document.getElementById("resultado").innerText = numeros;
    }
  }
}

let gerente = new GerenciadorImpares();
