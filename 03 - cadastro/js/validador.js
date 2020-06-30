function validar() {
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let isMasculino = document.getElementById("masc").checked;
  let isFeminino = document.getElementById("fem").checked;
  //   let isWeb = document.getElementById("web").checked;
  //   let isMobile = document.getElementById("mobile").checked;
  //   let isDesktop = document.getElementById("desktop").checked;
  let cursos = document.querySelectorAll("[type=checkbox]:checked").length;
  let estado = document.getElementById("estado").value;
  let foto = document.getElementById("foto").value;
  let dataNasc = document.getElementById("datanasc").value;

  let buffer = "";

  if (nome == "") {
    buffer += "O campo nome é obrigatório! \n";
  }

  if (email == "") {
    buffer += "O campo e-mail é obrigatório!\n";
  }
  if (!isMasculino && !isFeminino) {
    buffer += "Selecione o sexo!\n";
  }

  // if (document.querySelector("[type=radio]:checked") == null) { }

  //   if (!isWeb && !isMobile && !isDesktop) {
  //     alert("Escolha pelo menos um curso de interesse!");
  //   }

  if (cursos == 0) {
    buffer += "Escolha pelo menos um curso de interesse!\n";
  }

  if (estado == "") {
    buffer += "Selecione um estado!\n";
  }

  if (foto == "") {
    buffer += "Selecione uma foto!\n";
  }

  if (dataNasc == "") {
    buffer += "Selecione a data de nascimento!\n";
  }

  if (buffer != "") {
    document.getElementById("mensagem").innerText = buffer;
  }
}
