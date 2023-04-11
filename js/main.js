const carrito = [];
const celulares = [
  { imagen: "./images/A72.webp", id: 1, nombre: "SAMSUNG A03S", precio: 54000 },
  { imagen: "./images/A72.webp", id: 2, nombre: "SAMSUNG A22", precio: 95999 },
  { imagen: "./images/A72.webp", id: 3, nombre: "SAMSUNG A53", precio: 163999 },
  {
    imagen: "./images/A72.webp",
    id: 4,
    nombre: "SAMSUNG S21",
    precio: 249999,
  },
  {
    imagen: "./images/A72.webp",
    id: 5,
    nombre: "SAMSUNG A336",
    precio: 141999,
  },
  { imagen: "./images/A72.webp", id: 6, nombre: "SAMSUNG M53", precio: 113999 },
  { imagen: "./images/A72.webp", id: 7, nombre: "SAMSUNG S20", precio: 209999 },
  { imagen: "./images/A72.webp", id: 8, nombre: "SAMSUNG S22", precio: 284999 },
  { imagen: "./images/A72.webp", id: 9, nombre: "SAMSUNG S23", precio: 339999 },
  { imagen: "./images/A72.webp", id: 10, nombre: "SAMSUNG A72", precio: 98852 },
];
var stocks = [
  { id: 1, cantidad: 1 },
  { id: 2, cantidad: 20 },
  { id: 3, cantidad: 26 },
  { id: 4, cantidad: 60 },
  { id: 5, cantidad: 12 },
  { id: 6, cantidad: 1 },
  { id: 7, cantidad: 6 },
  { id: 8, cantidad: 10 },
  { id: 9, cantidad: 26 },
  { id: 10, cantidad: 40 },
];
let id;

function cargar() {
  for (var i = 0; i < celulares.length; i++) {
    if (stocks[i].cantidad != 0) {
      document.querySelector(".shop").innerHTML += `
  <div class="col-3 text-center">
    <div class="card">  
        <img src="${celulares[i].imagen}" alt="${celulares[i].nombre}">
        <h1> ${celulares[i].nombre}</h1>
        <h3>$${celulares[i].precio}</h3>
        <p>Codigo ${celulares[i].id}</p>
        <p>Disponible ${stocks[i].cantidad}</p>
        
    </div> 
  </div>   
  `;
    }
  }
}
const error = "⛔️ Error en el código ingresado.";
const opcion = "Por favor ingrese el codigo del celular a comprar";
function modStock(id) {
  let foundindex = stocks.findIndex((x) => x.id == id);
  let numero = stocks[foundindex].cantidad;
  stocks[foundindex].cantidad = numero - 1;
}
function buscar(id, tabla) {
  let busqueda = tabla.find((datos) => datos.id === parseInt(id));
  return busqueda;
}

function terminarCompra() {
  if (carrito.length === 0) {
    console.warn("El carrito está vacío.");
    return;
  }
  const buy = new Compra(carrito);
  alert("El precio total es de: $ " + buy.subtotal());
  let respuesta = confirm("¿Deseas confirmar tu pago?");
  if (respuesta === true) {
    alert(
      "Confirmamos tu pago de: $ " +
        buy.subtotal() +
        "\n Muchas gracias por la compra"
    );
    modStock(id);
    carrito.length = 0;
    document.querySelector(".shop").innerHTML = "";
    cargar();
  }
}

function verCarrito() {
  console.table(carrito);
}

function comprar() {
  id = prompt(opcion);
  if (isNaN(id)) {
    alert(error);
    let respuesta = confirm("¿Deseas intentar de nuevo?");
    if (respuesta === true) {
      comprar();
    }
    return;
  }

  let celularElegido = buscar(id, celulares);
  if (celularElegido === undefined) {
    alert(error);
    return;
  }
  alert(
    celularElegido.nombre +
      " " +
      "- $ " +
      celularElegido.precio +
      " - ha sido agregado al carrito."
  );
  carrito.push(celularElegido);
  let respuesta = confirm("¿Quiere comprar otro celular?");
  respuesta === true ? comprar() : terminarCompra();
}

const element = document.getElementById("myBtn");
element.addEventListener("click", comprar);
window.addEventListener("load", cargar);
