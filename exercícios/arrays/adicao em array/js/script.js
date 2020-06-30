class Gerenciador {
  constructor() {
    this.numeros = [];
  }

  adicionar() {
    let numeroDigitado = document.getElementById("numero").value;

    if (numeroDigitado == "") {
      alert("Preencha o número!");
    } else {
      this.numeros.push(numeroDigitado);
      document.getElementById("numero").value = "";
    }
  }

  imprimir() {
    document.getElementById("resultado").innerText = this.numeros;
  }
}

let gerenciador = new Gerenciador();
