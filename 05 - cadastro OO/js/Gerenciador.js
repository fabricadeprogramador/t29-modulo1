var nome = "";
var email = "";
var isMasculino = "";
var isFeminino = "";
var cursos = "";
var estado = "";
var foto = "";
var dataNasc = "";
var buffer = "";

class Gerenciador {
  validar() {
    this.lerDados();

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

  lerDados() {
    nome = document.getElementById("nome").value;
    email = document.getElementById("email").value;
    isMasculino = document.getElementById("masc").checked;
    isFeminino = document.getElementById("fem").checked;
    cursos = document.querySelectorAll("[type=checkbox]:checked").length;
    estado = document.getElementById("estado").value;
    foto = document.getElementById("foto").value;
    dataNasc = document.getElementById("datanasc").value;
  }
}

let gerenciador = new Gerenciador();
