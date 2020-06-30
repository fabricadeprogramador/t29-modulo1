function calcular() {
  let peso = parseFloat(document.getElementById("input1").value);
  let altura = parseFloat(document.getElementById("input2").value);
  let imc = peso / (altura * altura);

  alert("O seu imc é: " + imc);
}
