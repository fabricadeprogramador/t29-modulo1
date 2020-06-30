class Calculadora {
  somar() {
    let n1 = document.getElementById("numero1").value;
    let n2 = document.getElementById("numero2").value;

    let n1Convertido = parseFloat(n1);
    let n2Convertido = parseFloat(n2);

    let soma = n1Convertido + n2Convertido;

    alert(soma);
  }

  subtrair() {
    let n1 = document.getElementById("numero1").value;
    let n2 = document.getElementById("numero2").value;

    let n1Convertido = parseFloat(n1);
    let n2Convertido = parseFloat(n2);

    let subtracao = n1Convertido - n2Convertido;

    alert(subtracao);
  }

  multiplicar() {
    let n1 = document.getElementById("numero1").value;
    let n2 = document.getElementById("numero2").value;

    let n1Convertido = parseFloat(n1);
    let n2Convertido = parseFloat(n2);

    let muplicacao = n1Convertido * n2Convertido;

    alert(muplicacao);
  }

  dividir() {
    let n1 = document.getElementById("numero1").value;
    let n2 = document.getElementById("numero2").value;

    let n1Convertido = parseFloat(n1);
    let n2Convertido = parseFloat(n2);

    let divisao = n1Convertido / n2Convertido;

    alert(divisao);
  }
}

let calc = new Calculadora();
