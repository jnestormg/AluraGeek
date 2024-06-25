import { conexion } from "./conexion.js";

const form = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try {
        await conexion.crearProducto(nombre, precio, imagen);
        console.log("Producto creado exitosamente.");
        form.reset();
    } catch (error) {
        console.error("Error al crear el producto:", error);
    }
}

form.addEventListener("submit", evento => crearProducto(evento));

document.querySelector(".boton_limpiar").addEventListener("click",function(evento){
    evento.preventDefault();
    form.reset();

});