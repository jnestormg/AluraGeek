async function mostrarProductos(){

    const conexion= await fetch("http://localhost:3000/productos",{
        method:"GET",
        headers:{
        "Content-type":"application/json"
        }
    });

    console.log(conexion);
    const conexionConvertida=conexion.json();

    console.log("conexion convertida"+conexionConvertida)
    return conexionConvertida;

}

async function crearProducto(nombre, precio, imagen){
    const conexion= await fetch("http://localhost:3000/productos",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(
            {
                nombre:nombre,
                precio: precio,
                imagen: imagen
            }
        )
    });
}

async function eliminarProducto(id) {
    try {
        const conexion = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
        });
        
        if (!conexion.ok) {
        }

        const respuesta = await conexion.json();
        return respuesta;
    } catch (error) {
   
    }
}

export const conexion={
    mostrarProductos, crearProducto, eliminarProducto
}