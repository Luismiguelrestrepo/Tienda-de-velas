document.addEventListener("DOMContentLoaded", function() {
    mostrarCarrito();
});

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto al array
    carrito.push({ nombre, precio });

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Verificar si se guarda correctamente
    console.log("Carrito actualizado:", carrito);

    alert(`${nombre} agregado al carrito!`);
}


function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let lista = document.getElementById("carrito-lista");

    if (!lista) {
        console.error("⚠️ ERROR: No se encontró el contenedor `carrito-lista`.");
        return;
    }

    lista.innerHTML = "";
    if (carrito.length === 0) {
        lista.innerHTML = "<p>Tu carrito está vacío.</p>";
        return;
    }

    carrito.forEach((producto, index) => {
        lista.innerHTML += `
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">❌</button></p>
        `;
    });

    console.log("✅ Carrito mostrado correctamente:", carrito);
}


function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function finalizarCompra() {
    alert("Compra realizada con éxito!");
    localStorage.removeItem("carrito");
    mostrarCarrito();
}




let index = 0;

function moverCarrusel(direccion) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    index = (index + direccion + totalSlides) % totalSlides;
    document.querySelector('.carousel-container').style.transform = `translateX(-${index * 100}%)`;
}

