import { conexion } from "./conexion.js";

const productos = document.querySelector("[data-producto]");
console.log(productos);

export default function crearProducto(id, nombre, precio, imagen) {
    const product = document.createElement("div");
    product.classList.add("card");

    product.innerHTML = `
            <img src="${imagen}" class="imagen-producto" />
            <div class="card-container--info">
                <p>${nombre}</p>
                <div class="card-container--value">
                    <p>$ ${precio}</p>
                    <a href="#" class="eliminar-producto" data-id="${id}">
                    <img src="./img/trash.png" style="width:20px" />
                    </a>
                </div>
            </div>
        `;

    const linkEliminar = product.querySelector(".eliminar-producto");
    linkEliminar.addEventListener("click", function (event) {
        event.preventDefault();
        const idProducto = this.getAttribute("data-id");
        eliminarProducto(idProducto);
    });

    console.log("Producto creado:", product);
    return product;
}

async function listarProductos() {
    try {
        const lista = await conexion.mostrarProductos();
        if (lista.length === 0) {
            productos.innerHTML = `<h2>No hay productos</h2>`;
        } else {
            lista.forEach(item => {
                const { id, nombre, precio, imagen } = item;
                productos.appendChild(crearProducto(id, nombre, precio, imagen));
            });
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        productos.innerHTML = `<h2>Ocurrió un error al cargar los productos</h2>`;
    }
}

async function eliminarProducto(id) {
    try {
        await conexion.eliminarProducto(id);
        // Actualizar la interfaz después de eliminar el producto
        // Por ejemplo, podrías volver a cargar la lista de productos
        productos.innerHTML = ""; // Limpiar la lista actual
        listarProductos(); // Volver a cargar la lista actualizada
    } catch (error) {
        // Aquí podrías mostrar un mensaje de error al usuario si lo deseas
    }
}


listarProductos();
