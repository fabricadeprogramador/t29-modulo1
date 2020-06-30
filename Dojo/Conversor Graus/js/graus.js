function converterParaCelsius() {
  let var1 = parseFloat(document.getElementById("graus").value);
  let res = (var1 - 32) * (5 / 9);

  alert(var1 + " Graus Fahrenheit é igual a " + res + " Graus Celsius");
}

function converterParaFahrenheit() {
  let var1 = parseFloat(document.getElementById("graus").value);
  //console.log(var1);
  let res = var1 * (9 / 5) + 32;
  alert(var1 + " Graus Celsius é igual a " + res + " Graus Fahrenheit");
}
