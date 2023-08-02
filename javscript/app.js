
/***********************Variables Globales************************************/

class producto {
    constructor(codigo, tipo, detalle, precio, cantidad) {
        this.codigo = codigo,
            this.tipo = tipo
        this.detalle = detalle
        this.precio = precio
        this.cantidad = cantidad
    }
}

const producto1 = new producto()
carrito = []

const listaProductos = [
    { codigo: "T01", tipo: "teclado", detalle: "Logitech POP Blast Yellow", precio: 53650, cantidad: 0 },
    { codigo: "T02", tipo: "teclado", detalle: "HyperX Alloy Origins Core RGB", precio: 58550, cantidad: 0 },
    { codigo: "M01", tipo: "mouse", detalle: "Cougar Revenger S RGB", precio: 13680, cantidad: 0 },
    { codigo: "M02", tipo: "mouse", detalle: "HyperX Pulsefire Haste", precio: 25250, cantidad: 0 },
    { codigo: "A01", tipo: "auricular", detalle: "Redragon H260 Hylas RGB", precio: 14800, cantidad: 0 },
    { codigo: "A02", tipo: "auricular", detalle: "Redragon Pandora H350 RGB", precio: 23300, cantidad: 0 },
    { codigo: "MI01", tipo: "microfono", detalle: "HyperX DuoCast USB RGB", precio: 30000, cantidad: 0 },
    { codigo: "MI02", tipo: "microfono", detalle: "Redragon Blazar GM300", precio: 25000, cantidad: 0 }
];

/***********************************************************************/

function menu() {
  
    let op
    while (op != "s") {
        op = prompt("Ingrese una de las Siguientes Opciones: \n 1) Buscar \n 2) Filtrar \n 3) Ver Carrito \n 4) Salir")
        switch (op) {
            case "1":
                buscaCompra();
                break;
            case "2":
                filtrar();
                break;
            case "3":
                verCarrito();
                break;
            case "4":
                despedida();
                break;
        }
    }
};
/***********************************************************************/

function busqueda(lista, buscado) {
    const resultado = lista.find(producto => producto.codigo === buscado);
    return resultado
}
/***********************************************************************/
function muestra(productoBuscado){
    const index = listaProductos.findIndex((producto) => producto.codigo === productoBuscado);

    console.log("El producto Buscado es: \n Codigo: " + listaProductos[index].codigo + 
                                         "\n Tipo: " + listaProductos[index].tipo + 
                                         "\n Detalle: " + listaProductos[index].detalle + 
                                         "\n Precio: " + listaProductos[index].precio);
}
/***********************************************************************/
function buscaCompra() {
    let respuesta
    let index
    let productoBuscado = prompt("Ingrese el codigo del Producto: ").toLocaleUpperCase();
    
    let resultadoLista = busqueda(listaProductos, productoBuscado)   /*valida si el producto existe en la lista de venta*/

    if (resultadoLista) {                                            
        console.log("Producto Encontrado en el inventario")

        muestra(productoBuscado)

        respuesta = prompt("Agregar al Carrito? Si (s) - No (n)").toLocaleLowerCase();
        
        if (respuesta === "s") {
            let resultadoCarrito = busqueda(carrito, productoBuscado)   /*Valida si el producto existe en el carrito */

            if (resultadoCarrito) {                                    /*Si existe no lo agrega solo suma 1 a la cantidad */
                console.log("Producto Encontrado En el Carrito, suma uno a cantidad")

                index = carrito.findIndex((producto) => producto.codigo === productoBuscado);  /*Busca el indice del producto */
                carrito[index].cantidad += 1                            /*al estar en el carrito no lo agrega le +1 */
            }
            else {                                                      /*Sino existe lo agrega al carrito */
                console.log("Producto NO Encontrado en el Carrito, agregando")
             
                const productoCompra = new producto(
                    resultadoLista.codigo,                      
                    resultadoLista.tipo,
                    resultadoLista.detalle,
                    resultadoLista.precio,
                    resultadoLista.cantidad +1
                )

                carrito.push(productoCompra);                   /*cargo el objeto en el array*/
                console.log("Producto NUEVO agregado con exito")
            }
        }
        else {
                console.log("Producto No Agregado")
        }
    }
    else {
            console.log("Producto NO Encontrado")
    }
}
    /***********************************************************************/
function filtrar(){

    let tipo = prompt("Ingrese el tipo de Producto a Filtrar: ").toLocaleLowerCase()
    const productosFiltrados = listaProductos.filter(producto => producto.tipo === tipo);

    if (productosFiltrados.length > 0) {
        console.log("Productos encontrados:");
        productosFiltrados.forEach(producto => {
            console.log(`Código: ${producto.codigo}, Tipo: ${producto.tipo}, Detalle: ${producto.detalle}, Precio: ${producto.precio}`);
        });
    } else {
        console.log("No se encontraron productos con el tipo especificado.");
    }

}

     /***********************************************************************/

function verCarrito() {
    let bandera
    let subtotal = 0
    let total = 0
    let porcentaje = 0.21

   
    if (carrito.length < 1) {
        console.log("El Carrito esta Vacio")
    }
    else {
        console.log("******Productos en su Carrito*******")
        for (let i in carrito) {

            subtotal += (carrito[i].precio)*(carrito[i].cantidad)

            console.log("Codigo: " + carrito[i].codigo + 
                        "\n Tipo: " +carrito[i].tipo + 
                        "\n Detalle: " + carrito[i].detalle + 
                        "\n Precio: " + carrito[i].precio +
                        "\n Cantidad: " + carrito[i].cantidad
                        )
        }

        let iva = subtotal * porcentaje
        console.log(` El subtotal de su compra es: ${subtotal.toFixed(2)}\n El iva es de: ${iva.toFixed(2)}\n Total a pagar: ${iva + subtotal}`)

        bandera = prompt("Desea Finalizar la Compra? Si (s) - No (n)").toLocaleLowerCase();
        if (bandera === "s") {
            formaPago(subtotal, iva)
        }
    }
}

/***********************************************************************/

function formaPago(subtotal, iva) {

    let op = prompt("Elija Forma de Pago: \n A- Efectivo 5% descuento \n B- Dos Cuotas 15% recargo \n C- Tres cuotas 20% de interes").toLocaleUpperCase();

    switch (op) {
        case "A":
            descuento = ((subtotal + iva) * 0.05);
            total = ((subtotal + iva) - descuento);
            alert(`\n- El SubTotal: ${iva+subtotal} \n- Su descuento es de: ${descuento.toFixed(2)} \n- El total a pagar es de: ${total.toFixed(2)}`);
            despedida()
            break;
        case "B":
            recargo = ((subtotal + iva) * 0.15);
            total = (subtotal + iva) + recargo;
            alert(`\n- El SubTotal: ${iva+subtotal} \n- Su recargo es de: ${recargo.toFixed(2)} \n- El total a pagar es de: ${total.toFixed(2)} \n- Dos cuotas de: ${(total/2).toFixed(2)}`);
            despedida() 
            break;
            
        case "C":
            recargo = ((subtotal + iva) * 0.2);
            total = (subtotal + iva) + recargo;
            alert(`\n- El SubTotal: " ${iva+subtotal} \n- Su recargo es de: ${recargo.toFixed(2)} \n- El total a pagar es de: ${total.toFixed(2)} \n- Tres cuotas de: ${(total/3).toFixed(2)}`);
            despedida()
            break;
    }

}
/***********************************************************************/

function despedida() {
    listaCompra = []
    subtotal = 0
    alert("\b Gracias por su Compra \n DELTA-GAMER");
  
}
/***********************************************************************/
    alert("\b Bienvenido a \n DELTA-GAMER");
    menu()
    despedida()
