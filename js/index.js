/////////////////////////////////////////
/// Variables //////////////////////////
////////////////////////////////////////

//Es el div del carrito
let listaCarrito = document.getElementById("lista-carrito");

//Es el section de los articulos
let section = document.getElementById("section-ropa");

let pushbar2 = document.getElementById("pushbar2");

////////////////////////////////////////
/////// Events /////////////////////////
////////////////////////////////////////

//Function triggered events all the time
loadingEvents();

function loadingEvents() {
  //1
  //Adding to the cart
  section.addEventListener("click", addCart);

  //2
  //Si das doble click eliminar algo
  pushbar2.addEventListener("dblclick", deleteItem);

  //3
  //Persistencia de data en el localstorage
  document.addEventListener("DOMContentLoaded", persistenciaLocalStorage);
}

////////////////////////////////////////
/////// Functions //////////////////////
////////////////////////////////////////

//1) Capturar los datos del articulo
function addCart(e) {
  //Paramos el evento
  e.preventDefault();

  if (e.target.classList[2] === "btn-nico") {
    //Capturamos los elementos
    let img = e.target.parentElement.previousElementSibling;
    let text = e.target.previousElementSibling.previousElementSibling;

    //Convierte los datos individuales en objeto
    leerArticulo(img, text);
  }
}

//2- Convierte los datos individuales a objeto
function leerArticulo(img, text) {
  //Transformarmos los datos en un array de object
  const articulo = {
    img: img.src,
    text: text.innerText,
    dataId: img.getAttribute("img-id"),
  };

  //Mandamos el objetos para que se muestre en el front-end
  mostrarEnCarrito(articulo);
}

//3- Agarramos el objeto y lo descomponemos para mostrarlo en el front-end
function mostrarEnCarrito(articulo) {
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

  //Se agrega al LocalStorage
  addToLocalStorage(articulo);
}

//4- Agrega el array al LocalStorage
function addToLocalStorage(articulo) {
  let articulos;
  articulos = obtenerLocalStorage();

  articulos.push(articulo);

  localStorage.setItem("carrito", JSON.stringify(articulos));
}

//5 - Obtener un array/JSON de lo que hay en el LocalStorage
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

//6- Detectamos si dio doble click para eliminar del front-ed
function deleteItem(e) {
  if (e.target.className === "img-thumbnail") {
    let dataId = e.target.getAttribute("img-id");
    e.target.parentElement.parentElement.remove();
    //Eliminamos el id unico del localStorage
    eliminarLocalStorage(dataId);
  }
}

//7- eliminar articulo del localstorage
function eliminarLocalStorage(dataId) {
  let articulos = obtenerLocalStorage();

  articulos.forEach(function (articulo, index) {
    if (dataId === articulo.dataId) articulos.splice(index, 1);
  });

  localStorage.setItem("carrito", JSON.stringify(articulos));
}

//8- Mostramos lo que esta en el LS si hay algo en memoria
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
