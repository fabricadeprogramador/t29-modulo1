function calcular() {
  let valor = parseFloat(document.getElementById("valor").value);
  let percentual = parseFloat(document.getElementById("percentual").value);

  let res = valor * (percentual / 100);

  alert(percentual + "% de " + valor + " é=  " + res);
}
