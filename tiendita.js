// Navegación: mostrar solo la sección seleccionada
document.querySelectorAll("nav a").forEach(enlace => {
  enlace.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
    let id = this.getAttribute("href");
    document.querySelector(id).classList.add("activa");
  });
});

let carrito = [];
let total = 0;


function actualizarCarrito() {
  let lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";
  carrito.forEach(item => {
    lista.innerHTML += `<li>${item.nombre} - $${item.precio}</li>`;
  });
  document.getElementById("total").innerText = total;
}

// Calculadora
function compararOferta() {
  let producto = document.getElementById("producto").value;
  let oferta = parseFloat(document.getElementById("oferta").value);
  let referencia = parseFloat(document.getElementById("referencia").value);
  let resultado = document.getElementById("resultado");

  if (!producto || isNaN(oferta) || isNaN(referencia)) {
    resultado.innerText = "Por favor ingresa datos válidos.";
    return;
  }

  if (oferta > referencia) {
    resultado.innerText = `Tu oferta por "${producto}" es mayor al valor de referencia. Estás pagando de más.`;
  } else if (oferta < referencia) {
    resultado.innerText = `Tu oferta por "${producto}" es menor al valor de referencia. ¡Estás ganando!`;
  } else {
    resultado.innerText = `Tu oferta por "${producto}" es igual al valor de referencia. Es un trato justo.`;
  }
}

// PayPal
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: { value: total.toString() }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('Compra realizada por ' + details.payer.name.given_name);
      carrito = [];
      total = 0;
      actualizarCarrito();
    });
  }
}).render('#paypal-button-container');
