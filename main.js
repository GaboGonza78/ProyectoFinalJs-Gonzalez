/*const Productos = ["Guitarra", "Bajo", "Bateria", "Microfono", "Teclado", "Amplificador"]

const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const ContenedorDeProductos = document.getElementById("productos")
const ContenedorDeCarrito = document.getElementById("carrito")

Productos.forEach((producto)=>{
    ContenedorDeProductos.innerHTML += `
    <div>
        <h3> ${producto} </h3>
        <button class="Boton-agregar"> Agregar </button>
    </div>`
})


const ActualizadoraDeCarrito = () => {
    ContenedorDeCarrito.innerHTML = ""

    Carrito.forEach((producto)=>{
        ContenedorDeCarrito.innerHTML += `
        <div>
            <h3> ${producto.producto} </h3>
            <p> ${producto.cantidad} </p>
            <button class="Boton-borrador"> Borrar </button>
        </div>`
    })
    const BotonesBorrar = document.getElementsByClassName("Boton-borrador")
    
    const BotonesBorrarArray = Array.from(BotonesBorrar)
    
    BotonesBorrarArray.forEach((boton)=>{
        boton.addEventListener("click", agregadoraDeBorrador)
    })

    localStorage.setItem("carrito", JSON.stringify(Carrito))

    console.table(Carrito)

}

const agregadoraDeBorrador = (e)=>{
    const elProductoElegido = e.target.parentElement.children[0].innerText
    const Padre = e.target.parentElement
    Padre.remove()
    
    const ArrayDeProductos = Carrito.map(producto => producto.producto)
    const indice = ArrayDeProductos.indexOf(elProductoElegido)
    
    
    if(Carrito[indice].cantidad == 1){
        Carrito.splice(indice, 1)
    }else{
        Carrito[indice].cantidad -= 1
    }
    
    ActualizadoraDeCarrito()
}

const agregador = (producto) => {
    const buscador = Carrito.find((productoCarrito)=>{
        return productoCarrito.producto == producto.producto
    })

    if(buscador != undefined){
        const ArrayDeProductos = Carrito.map(producto => producto.producto)
        const indice = ArrayDeProductos.indexOf(producto.producto)
        Carrito[indice].cantidad += 1
    }else{
        Carrito.push(producto)
    }

    ActualizadoraDeCarrito()
}

const BotonesAgregar = document.getElementsByClassName("Boton-agregar")

const BotonesAgregarArray = Array.from(BotonesAgregar)

BotonesAgregarArray.forEach((boton)=>{
    boton.addEventListener("click", (e)=>{
        const elProductoElegido = e.target.parentElement.children[0].innerText
        
        agregador({
            producto: elProductoElegido,
            cantidad: 1
        })
    })
})

document.addEventListener("DOMContentLoaded", ()=>{
    ActualizadoraDeCarrito()
})*/






/*document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const instrumentosContainer = document.getElementById("instrumentos");

    // Datos de los tipos de instrumentos
    const tiposInstrumentos = ["Guitarra", "Bajo", "Batería", "Micrófono", "Teclado", "Amplificador"];

    // Función para generar el menú de tipos de instrumentos
    function generarMenu() {
        tiposInstrumentos.forEach(tipo => {
            const listItem = document.createElement("li");
            listItem.textContent = tipo;
            listItem.addEventListener("click", () => mostrarInstrumentos(tipo));
            menu.appendChild(listItem);
        });
    }

    // Función para mostrar los instrumentos de un tipo seleccionado
    function mostrarInstrumentos(tipo) {
        // Limpiar el contenido anterior
        instrumentosContainer.innerHTML = "";

        // Obtener los instrumentos del tipo seleccionado desde el archivo JSON
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                const instrumentos = data.filter(instrumento => instrumento.tipo === tipo);
                instrumentos.forEach(instrumento => {
                    const instrumentoDiv = document.createElement("div");
                    instrumentoDiv.classList.add("instrumento");
                    instrumentoDiv.innerHTML = `
                        <img src="./assets/images/${instrumento.imagen}" alt="${instrumento.nombre}">
                        <h2>${instrumento.nombre}</h2>
                        <p>${instrumento.descripcion}</p>
                        <button onclick="agregarAlCarrito('${instrumento.nombre}')">Agregar al carrito</button>
                    `;
                    instrumentosContainer.appendChild(instrumentoDiv);
                });
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    }

    // Función para agregar un instrumento al carrito
    window.agregarAlCarrito = function (nombre) {
        // Aquí puedes implementar la lógica para agregar el instrumento al carrito
        console.log("Agregado al carrito:", nombre);
    };

    // Generar el menú al cargar la página
    generarMenu();
});*/









document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const instrumentosContainer = document.getElementById("instrumentos");
    const carritoContainer = document.getElementById("carrito");
    const totalContainer = document.getElementById("total");
    const finalizarCompraBtn = document.getElementById("finalizarCompra");

    const tiposInstrumentos = ["Guitarra", "Bajo", "Batería", "Micrófono", "Teclado", "Amplificador"];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    function generarMenu() {
        tiposInstrumentos.forEach(tipo => {
            const listItem = document.createElement("li");
            listItem.textContent = tipo;
            listItem.addEventListener("click", () => mostrarInstrumentos(tipo));
            menu.appendChild(listItem);
        });
    }

    function mostrarInstrumentos(tipo) {
        instrumentosContainer.innerHTML = "";

        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                const instrumentos = data.filter(instrumento => instrumento.tipo === tipo);
                instrumentos.forEach(instrumento => {
                    const instrumentoDiv = document.createElement("div");
                    instrumentoDiv.classList.add("instrumento");
                    instrumentoDiv.innerHTML = `
                        <img src="./assets/images/${instrumento.imagen}" alt="${instrumento.nombre}">
                        <h2>${instrumento.nombre}</h2>
                        <p>${instrumento.descripcion}</p>
                        <button onclick="agregarAlCarrito('${instrumento.nombre}', ${instrumento.precio})">Agregar al carrito</button>
                    `;
                    instrumentosContainer.appendChild(instrumentoDiv);
                });
            })
            .catch(error => console.error("Error al obtener los datos:", error));
    }

    window.agregarAlCarrito = function (nombre, precio) {
        const productoExistente = carrito.find(producto => producto.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        guardarCarrito();
        mostrarCarrito();
    };

    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function mostrarCarrito() {
        carritoContainer.innerHTML = "";
        carrito.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto-carrito");
            productoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio: $${producto.precio}</p>
                <button onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
            `;
            carritoContainer.appendChild(productoDiv);
        });
        actualizarTotal();
    }

    window.eliminarDelCarrito = function (nombre) {
        carrito = carrito.filter(producto => producto.nombre !== nombre);
        guardarCarrito();
        mostrarCarrito();
    };

    function actualizarTotal() {
        const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        totalContainer.textContent = `Total: $${total}`;
    }

    finalizarCompraBtn.addEventListener("click", () => {
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
        totalContainer.textContent = "Total: $0";
        alert("Gracias por su compra");
    });

    generarMenu();
    mostrarCarrito();
});


