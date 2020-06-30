function imprimirCemPrimeiros() {
  //PRIMEIRA FORMA (COM ARRAY)

  //   let numeros = [];

  //   for (let i = 1; i < 101; i++) {
  //     numeros[i - 1] = i;
  //   }

  //   document.getElementById("resultado").innerText = numeros.join(" . ");

  //SEGUNDA FORMA (SEM ARRAY)

  let resultado = "";

  for (let i = 1; i < 101; i++) {
    resultado += i + " . ";
  }

  document.getElementById("resultado").innerText = resultado;
}
