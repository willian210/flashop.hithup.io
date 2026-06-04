// ================= PRODUCTOS =================

const productos = [

{
nombre:"Camiseta Colombia",
precio:45,
img:"img/Camiseta de seleccion.jpg",
categoria:"ropa",
rating:5,
tallas:["S","M","L","XL"],
colores:["Amarillo","Azul","Rojo"]
},

{
nombre:"Nike Air Force",
precio:90,
img:"img/zapatilla blancos.jpeg",
categoria:"calzado",
rating:4,
suelas:[38,39,40,41,42]
},

{
nombre:"sansung",
precio:120,
img:"img/sansung calaxy.jpeg",
categoria:"electronica",
rating:5
},

{
nombre:"Mochila",
precio:30,
img:"img/maleta.jpeg",
categoria:"accesorios",
rating:4,
colores:["Negro","Azul","Rojo"]
},

{
nombre:"iphone",
precio:2000,
img:"img/iphone.jpeg",
categoria:"electronica",
rating:5
},

{
nombre:"camisa barcelona",
precio:60,
img:"img/camisa barcelona.jpeg",
categoria:"ropa",
rating:4,
tallas:["S","M","L"],
colores:["Azul","Rojo"]
},

{
nombre:"muda",
precio:220,
img:"img/muda.jpeg",
categoria:"ropa",
rating:5,
tallas:["M","L","XL"],
colores:["Negro","Blanco"]
},

{
nombre:"pantalon",
precio:100,
img:"img/pantalon.jpeg",
categoria:"ropa",
rating:4,
tallas:["30","32","34","36"],
colores:["Azul","Negro"]
},

{
nombre:"saco",
precio:90,
img:"img/saco hombre.jpg",
categoria:"ropa",
rating:5,
tallas:["M","L","XL"],
colores:["Negro","Gris"]
},

{
nombre:"sudadera",
precio:110,
img:"img/sudadera.jpeg",
categoria:"ropa",
rating:4,
tallas:["S","M","L"],
colores:["Negro","Blanco"]
},

{
nombre:"zapatillas",
precio:80,
img:"img/zapatilla.jpg",
categoria:"calzado",
rating:5,
suelas:[37,38,39,40,41]
},

{
nombre:"primavera",
precio:90,
img:"img/primavera.jpeg",
categoria:"ropa",
rating:4,
tallas:["S","M","L"],
colores:["Rosado","Blanco"]
},

{
nombre:"sansung a 25",
precio:2000,
img:"img/sansung a25.jpg",
categoria:"electronica",
rating:5
},

{
nombre:"sansung galaxy 34",
precio:1500,
img:"img/sansung galaxy 34.jpg",
categoria:"electronica",
rating:4
},

{
nombre:"tablet",
precio:800,
img:"img/tablet.jpeg",
categoria:"electronica",
rating:5
},

{
nombre:"guayos",
precio:200,
img:"img/guayos.jpeg",
categoria:"calzado",
rating:4,
suelas:[38,39,40,41,42]
},

{
nombre:"gafas",
precio:100,
img:"img/accesorios.jpg",
categoria:"accesorios",
rating:5,
colores:["Negro","Dorado"]
},

{
nombre:"auriculares",
precio:200,
img:"img/auriculares.jpeg",
categoria:"accesorios",
rating:4,
colores:["Negro","Blanco"]
},

{
nombre:"adidas superstar",
precio:90,
img:"img/adidas superstar.jpg",
categoria:"calzado",
rating:5,
suelas:[38,39,40,41,42]
},

{
nombre:"adidas vectores",
precio:90,
img:"img/adidas vectores.jpg",
categoria:"calzado",
rating:4,
suelas:[39,40,41,42]
},

{
nombre:"adidas women",
precio:90,
img:"img/adidas women.jpg",
categoria:"calzado",
rating:5,
suelas:[36,37,38,39]
}

];

// ================= CARRITO =================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let total = 0;

carrito.forEach(p=>{

    total += p.precio * p.cantidad;

});

// ================= ESTRELLAS =================

function estrellas(n){

    return "★".repeat(n);

}

// ================= MOSTRAR PRODUCTOS =================

function mostrar(lista){

    const cont = document.getElementById("productos");

    cont.innerHTML = "";

    lista.forEach((p,index)=>{

        cont.innerHTML += `

        <div class="card">

            <img src="${p.img}">

            <h3>${p.nombre}</h3>

            <div class="stars">
                ${estrellas(p.rating)}
            </div>

            <p class="precio">$${p.precio}</p>

            ${p.tallas ? `
            <div class="tallas">

                ${p.tallas.map(t => `
                    <span
                    onclick="seleccionarTalla(this)"
                    >
                        ${t}
                    </span>
                `).join("")}

            </div>
            ` : ""}

            ${p.suelas ? `
            <div class="tallas">

                ${p.suelas.map(s => `
                    <span
                    onclick="seleccionarTalla(this)"
                    >
                        ${s}
                    </span>
                `).join("")}

            </div>
            ` : ""}

            ${p.colores ? `
            <div class="colores">

                ${p.colores.map(c => `
                    <span
                    onclick="seleccionarColor(this)"
                    >
                        ${c}
                    </span>
                `).join("")}

            </div>
            ` : ""}

            <button
            class="add"
            onclick="agregarProducto(this,
            '${p.nombre}',
            ${p.precio},
            '${p.img}')">

                Agregar

            </button>

        </div>

        `;
    });
}

// ================= SELECCIONAR TALLA =================

function seleccionarTalla(el){

    const padre = el.parentElement;

    padre.querySelectorAll("span")
    .forEach(s=>s.classList.remove("active"));

    el.classList.add("active");
}

// ================= SELECCIONAR COLOR =================

function seleccionarColor(el){

    const padre = el.parentElement;

    padre.querySelectorAll("span")
    .forEach(s=>s.classList.remove("active"));

    el.classList.add("active");
}

// ================= MOSTRAR TODOS =================

function mostrarTodos(){

    mostrar(productos);

}

// ================= FILTRAR =================

function filtrar(cat){

    const filtrados = productos.filter(
        p => p.categoria === cat
    );

    mostrar(filtrados);

}

// ================= AGREGAR =================

function agregarProducto(btn,nombre,precio,img){

    const card = btn.parentElement;

    let talla = "";
    let color = "";

    const tallaActiva =
    card.querySelector(".tallas .active");

    const colorActivo =
    card.querySelector(".colores .active");

    if(tallaActiva){
        talla = tallaActiva.innerText;
    }

    if(colorActivo){
        color = colorActivo.innerText;
    }

    // VALIDAR TALLA
    if(card.querySelector(".tallas") && talla === ""){

        toast("Selecciona una talla o suela ⚠️");

        return;
    }

    const existe = carrito.find(p =>

        p.nombre === nombre &&
        p.talla === talla &&
        p.color === color

    );

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({
            nombre,
            precio,
            img,
            talla,
            color,
            cantidad:1
        });
    }

    total += precio;

    actualizar();

    actualizarContador();

    card.classList.add("added");

    setTimeout(()=>{

        card.classList.remove("added");

    },400);

    toast("Producto agregado 🛒");
}

function actualizar(){

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    carrito.forEach((p,i)=>{

        lista.innerHTML += `

        <div class="cart-item">

            <img src="${p.img}">

            <div>

                <p>${p.nombre}</p>

                <p>$${p.precio}</p>

                ${p.talla ? `<p>Talla: ${p.talla}</p>` : ""}

                ${p.suela ? `<p>Suela: ${p.suela}</p>` : ""}

                ${p.color ? `<p>Color: ${p.color}</p>` : ""}

                <button onclick="cambiarCantidad(${i}, -1)">
                    ➖
                </button>

                ${p.cantidad}

                <button onclick="cambiarCantidad(${i}, 1)">
                    ➕
                </button>

            </div>

            <button onclick="eliminar(${i})">
                ❌
            </button>

        </div>

        `;
    });

    document.getElementById("total")
    .textContent = total;

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}
// ================= CANTIDAD =================

function cambiarCantidad(i,c){

    carrito[i].cantidad += c;

    if(carrito[i].cantidad <= 0){

        eliminar(i);

        return;
    }

    total += carrito[i].precio * c;

    actualizar();
}

// ================= ELIMINAR =================

function eliminar(i){

    total -= carrito[i].precio * carrito[i].cantidad;

    carrito.splice(i,1);

    actualizar();

    actualizarContador();
}

// ================= VACIAR =================

function vaciarCarrito(){

    carrito = [];

    total = 0;

    actualizar();

    actualizarContador();

    toast("Carrito vaciado 🧹");
}

// ================= CONTADOR =================

function actualizarContador(){

    let c = 0;

    carrito.forEach(p=>{

        c += p.cantidad;

    });

    document.getElementById("contador")
    .textContent = c;
}

// ================= CARRITO =================

function toggleCart(){

    document.getElementById("carrito")
    .classList.toggle("show");

    document.getElementById("overlay")
    .classList.toggle("show");
}

// ================= SCROLL =================

function scrollProductos(){

    document.getElementById("productos-section")
    .scrollIntoView({
        behavior:"smooth"
    });
}

// ================= PAGO =================

function abrirPago(){

    if(carrito.length <= 0){

        toast("Tu carrito está vacío ⚠️");

        return;
    }

    document.getElementById("pago")
    .classList.remove("hidden");
}

// ================= CONFIRMAR PAGO =================

function confirmarPago(){

    const inputs =
    document.querySelectorAll("#pago input");

    let valido = true;

    inputs.forEach(i=>{

        if(i.value.trim() === ""){

            valido = false;
        }
    });

    if(!valido){

        toast("Completa los datos ⚠️");

        return;
    }

    mostrarFactura();

    toast("Compra realizada ✅");

    carrito = [];

    total = 0;

    actualizar();

    actualizarContador();

    document.getElementById("pago")
    .classList.add("hidden");
}

// ================= FACTURA =================

function mostrarFactura(){

    const cont =
    document.getElementById("factura-detalle");

    cont.innerHTML = "";

    carrito.forEach(p=>{

        cont.innerHTML += `

        <p>
            ${p.nombre} x${p.cantidad}
            - $${p.precio * p.cantidad}
        </p>

        `;
    });

    document.getElementById("factura-total")
    .textContent = total;

    document.getElementById("factura")
    .classList.remove("hidden");
}

// ================= CERRAR FACTURA =================

function cerrarFactura(){

    document.getElementById("factura")
    .classList.add("hidden");
}

// ================= TOAST =================

function toast(msg){

    const t =
    document.getElementById("toast");

    t.textContent = msg;

    t.classList.add("show");

    setTimeout(()=>{

        t.classList.remove("show");

    },2000);
}

// ================= BUSCADOR =================

document.querySelector(".search input")
.addEventListener("input", function(){

    const texto = this.value.toLowerCase();

    const filtrados = productos.filter(p=>

        p.nombre.toLowerCase().includes(texto)

    );

    mostrar(
        filtrados.length
        ? filtrados
        : productos
    );
});

// ================= LOGIN =================

function abrirLogin(){

    document.getElementById("login")
    .classList.remove("hidden");

    mostrarLogin();
}

function cerrarLogin(){

    document.getElementById("login")
    .classList.add("hidden");
}

function mostrarLogin(){

    document.getElementById("loginForm")
    .classList.remove("hidden");

    document.getElementById("registerForm")
    .classList.add("hidden");
}

function mostrarRegistro(){

    document.getElementById("registerForm")
    .classList.remove("hidden");

    document.getElementById("loginForm")
    .classList.add("hidden");
}

// ================= CREAR CUENTA =================

function crearCuenta(){

    const user =
    document.getElementById("registerUser").value;

    const pass =
    document.getElementById("registerPass").value;

    if(user === "" || pass === ""){

        toast("Completa los datos ⚠️");

        return;
    }

    let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe =
    usuarios.find(u => u.user === user);

    if(existe){

        toast("Ese usuario ya existe ⚠️");

        return;
    }

    usuarios.push({
        user:user,
        pass:pass
    });

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    toast("Cuenta creada ✅");

    document.getElementById("registerUser").value = "";

    document.getElementById("registerPass").value = "";

    mostrarLogin();
}

// ================= LOGIN REAL =================

function login(){

    const user =
    document.getElementById("loginUser").value;

    const pass =
    document.getElementById("loginPass").value;

    if(user === "" || pass === ""){

        toast("Completa los datos ⚠️");

        return;
    }

    let usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

    const valido =
    usuarios.find(
        u => u.user === user && u.pass === pass
    );

    if(!valido){

        toast("Usuario o contraseña incorrectos ❌");

        return;
    }

    localStorage.setItem("usuario", user);

    toast("Bienvenido " + user + " 👋");

    cerrarLogin();

    actualizarUsuario();
}

// ================= USUARIO =================

function actualizarUsuario(){

    const user = localStorage.getItem("usuario");

    const icon =
    document.getElementById("icon-user");

    if(user){

        icon.className = "";

        icon.innerHTML = "👤 " + user;

        icon.onclick = logout;

    }else{

        icon.className = "fa-solid fa-user";

        icon.innerHTML = "";

        icon.onclick = abrirLogin;
    }
}

// ================= LOGOUT =================

function logout(){

    localStorage.removeItem("usuario");

    location.reload();
}

// ================= INICIO =================

window.onload = function(){

    mostrar(productos);

    actualizar();

    actualizarContador();

    actualizarUsuario();

    // ================= CARRUSEL =================

    const slides =
    document.querySelectorAll(".hero-slide");

    let actual = 0;

    setInterval(()=>{

        slides[actual]
        .classList.remove("active");

        actual++;

        if(actual >= slides.length){

            actual = 0;
        }

        slides[actual]
        .classList.add("active");

    },4000);

}
// ================= DARK MODE =================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("darkMode","true");

    }else{

        localStorage.setItem("darkMode","false");
    }
}

// guardar modo
if(localStorage.getItem("darkMode") === "true"){

    document.body.classList.add("dark");
}
