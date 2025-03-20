console.log("✅ script.js ha sido cargado correctamente");

// ✅ Importar Firebase correctamente
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ✅ Verificar conexión con Firestore
async function verificarFirestore() {
    try {
        const productosSnapshot = await getDocs(collection(db, "productos"));
        productosSnapshot.forEach((doc) => {
            console.log("🔥 Producto encontrado:", doc.id, "=>", doc.data());
        });
        console.log("✅ Firestore conectado correctamente.");
    } catch (error) {
        console.error("❌ Error al obtener datos de Firestore:", error);
    }
}
verificarFirestore();

// ✅ Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    console.log(`🛒 Agregando: ${nombre} - $${precio}`);

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("✅ Carrito guardado en localStorage:", JSON.parse(localStorage.getItem("carrito")));
    actualizarContadorCarrito();
}

// ✅ Actualizar el contador del carrito
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contador = document.getElementById("contador-carrito");

    if (contador) contador.textContent = carrito.length;
}

// ✅ Mostrar el carrito en la página
function mostrarCarrito() {
    console.log("📢 Mostrando carrito...");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaCarrito = document.getElementById("lista-carrito");
    let totalCarrito = document.getElementById("total-carrito");

    if (!listaCarrito || !totalCarrito) {
        console.error("❌ ERROR: No se encontró el contenedor del carrito.");
        return;
    }

    listaCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>🛒 No tienes productos en el carrito.</p>";
        totalCarrito.textContent = "Total: $0.00";
        console.warn("⚠️ Carrito vacío.");
        return;
    }

    carrito.forEach((producto, index) => {
        let item = document.createElement("li");
        item.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        item.appendChild(btnEliminar);
        listaCarrito.appendChild(item);
        total += producto.precio;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    console.log("✅ Carrito mostrado correctamente.");
}

// ✅ Eliminar un solo producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContadorCarrito();
    mostrarCarrito();
}

// ✅ Vaciar todo el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
    mostrarCarrito();
    alert("🛒 Has vaciado tu carrito.");
}

// ✅ Finalizar compra
function finalizarCompra() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("⚠️ No tienes productos en el carrito.");
        return;
    }

    alert("✅ ¡Compra realizada con éxito!");
    localStorage.removeItem("carrito");

    actualizarContadorCarrito();
    mostrarCarrito();
}

// ✅ Exportar funciones para que sean accesibles desde `compra.html`
export { mostrarCarrito, vaciarCarrito, finalizarCompra };

// ✅ Evento para agregar productos al carrito
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn-comprar").forEach(boton => {
        boton.addEventListener("click", function () {
            let producto = boton.parentElement;
            let nombre = producto.querySelector("h3").textContent;
            let precio = parseFloat(producto.querySelector(".precio").textContent.replace("$", ""));

            alert("🛒 Producto agregado al carrito");
            agregarAlCarrito(nombre, precio);
        });
    });

    // ✅ Cargar carrito al iniciar
    actualizarContadorCarrito();
});
