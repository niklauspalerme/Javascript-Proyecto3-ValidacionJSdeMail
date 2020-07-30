/////////////////////////////////////////
/// Variables //////////////////////////
////////////////////////////////////////

//Es el div del carrito del pushbar
let listaCarrito = document.getElementById("lista-carrito");

let email = document.getElementById("email");
let name = document.getElementById("name");
let consulta = document.getElementById("consulta");
let btn = document.getElementById("btnEnviar");
let formulario = document.getElementById("formulario");

////////////////////////////////////////
/////// Events /////////////////////////
////////////////////////////////////////

//Function triggered events all the time
loadingEvents();

function loadingEvents() {
  //1
  //Persistencia de data en el localstorage
  document.addEventListener("DOMContentLoaded", persistenciaLocalStorage);

  //2
  //Si das doble click eliminar algo del pushbar
  pushbar2.addEventListener("dblclick", deleteItem);

  //3
  //Activar al salir del componente
  email.addEventListener("blur", validarCampo);
  name.addEventListener("blur", validarCampo);
  consulta.addEventListener("blur", validarCampo);

  //4
  //Desactivamos el boton de enviar
  document.addEventListener("DOMContentLoaded", inicioApp);

  //5
  //Si le damos enviar al boton click
  btn.addEventListener("click", efectoEnviado);
}

////////////////////////////////////////
/////// Functions //////////////////////
////////////////////////////////////////

//1- Mostramos lo que esta en el LS si hay algo en memoria
function persistenciaLocalStorage() {
  let articulos;

  articulos = obtenerLocalStorage();

  articulos.forEach((articulo) => {
    let row = document.createElement("tr");

    row.innerHTML = `
                  <td>
                    <img
                      src="${articulo.img}"
                      alt="..."
                      class="img-thumbnail"
                      img-id="${articulo.dataId}"
                    />
                  </td>
                  <td>${articulo.text}</td>`;

    //Se coloca en el Front-end
    listaCarrito.appendChild(row);
  });
}

//2 - Obtener un array/JSON de lo que hay en el LocalStorage
function obtenerLocalStorage() {
  let articulos;

  if (localStorage.getItem("carrito") === null) {
    //Si no hay nada crea un arreglo vacio
    articulos = [];
  } else {
    //JSON.parse() -> Convierte un String en un Array/JSON
    articulos = JSON.parse(localStorage.getItem("carrito"));
  }

  return articulos;
}

//3- Detectamos si dio doble click para eliminar del front-ed
function deleteItem(e) {
  if (e.target.className === "img-thumbnail") {
    let dataId = e.target.getAttribute("img-id");
    e.target.parentElement.parentElement.remove();
    //Eliminamos el id unico del localStorage
    eliminarLocalStorage(dataId);
  }
}

//4- Eliminar articulo del localstorage
function eliminarLocalStorage(dataId) {
  let articulos = obtenerLocalStorage();

  articulos.forEach(function (articulo, index) {
    if (dataId === articulo.dataId) articulos.splice(index, 1);
  });

  localStorage.setItem("carrito", JSON.stringify(articulos));
}

//5- Desactivamos el botn de submit
function inicioApp() {
  btn.disabled = true;
}

//6- Validación de cada uno de los campos
function validarCampo() {
  console.log(this);
  //Mandamos las variables a sus validaciones
  if (this.type === "email") validarEmail(this);
  else validarLongitud(this);

  //Si todo esta OK activamos el boton
  if (
    email.classList[1] === "is-valid" &&
    name.classList[1] === "is-valid" &&
    consulta.classList[1] === "is-valid"
  )
    btn.disabled = false;
}

//7- Validamos la longitud de los campos
function validarLongitud(campo) {
  if (campo.value.length > 0) {
    campo.classList.add("is-valid");
    campo.classList.remove("is-invalid");
  } else {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
  }
}

//8- Validamos el email
function validarEmail(mail) {
  if (mail.value.length > 0 && mail.value.indexOf("@") !== -1) {
    mail.classList.add("is-valid");
    mail.classList.remove("is-invalid");
  } else {
    mail.classList.remove("is-valid");
    mail.classList.add("is-invalid");
  }
}

//9 -Efectos de los gif
function efectoEnviado(e) {
  e.preventDefault();
  // Mostrar gif de cargando
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "initial";

  //Creamos gif que manda mail
  const enviado = document.createElement("img");
  enviado.src = "img/mail.gif";
  enviado.classList.add("gif");

  //Ocultamos spinner y mostramos el gif mail un ratico
  setTimeout(function () {
    spinner.style.display = "none";
    enviado.style.display = "initial";
    document.querySelector("#loaders").appendChild(enviado);

    setTimeout(function () {
      enviado.remove();
      formulario.reset();
      email.classList.remove("is-valid");
      name.classList.remove("is-valid");
      consulta.classList.remove("is-valid");
    }, 5000);
  }, 3000);
}
