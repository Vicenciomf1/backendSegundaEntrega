import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io();

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e)=>{
  e.preventDefault();
  const producto = {
    nombre: document.getElementById("title").value,  // e.target[0].value
    precio: document.getElementById("precio").value,  // e.target[1].value
    foto: document.getElementById("thumbnail").value,  // e.target[2].value
    codigo: 123,
    stock: 10,
    descripcion: "Probando nuevo producto"
  };
  socket.emit('new-product', producto);
  // Falta limpiar el formulario, no conozco una manera limpia de sacarlo todo al tiro como en los estados de React por ejemplo, se me ocurre un iner HTML, pero investigaré alguna manera (to-do)
});

function renderProducto(producto) {
  const linea = document.createElement('tr');

  //Titulo
  const titulo = document.createElement('td');
  titulo.innerHTML = producto.nombre;
  linea.appendChild(titulo);

  //precio
  const precio = document.createElement('td');
  precio.innerHTML = producto.precio;
  linea.appendChild(precio);

  //Foto
  const foto = document.createElement('td');
  const img = document.createElement('img');
  img.setAttribute("src", producto.foto);
  img.setAttribute("width", "25");

  foto.appendChild(img);
  linea.appendChild(foto);

  document.getElementById('productos').appendChild(linea);
}

socket.on('nueva-conexion', data => {
  data.forEach(producto => {
    renderProducto(producto);
  });
});

socket.on('producto', data => {
  renderProducto(data);
});


function render(data) {
  console.log(data);
  const html = data.map((elem, index) => {
    return(`<div style="color: brown">
          <strong style="color: blue">${elem.email}</strong> [${elem.time}] :
          <em style="color: green">${elem.text}</em> </div>`)
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });


const formularioMensajes = document.getElementById("formularioMensajes");

formularioMensajes.addEventListener("submit", (e) => {
  e.preventDefault();
  const mensaje = {
    email: document.getElementById('email').value,
    text: document.getElementById('texto').value
  };
  if (mensaje.email) {
    socket.emit('new-message', mensaje);
  } else {
    alert('Favor introducir email');
  }
});
// (to-do) Lo de las fechas con date-fns