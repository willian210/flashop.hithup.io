// PRODUCTOS
const productos = [
{nombre:"Camiseta Colombia", precio:45, img:"Camiseta de seleccion.jpg", categoria:"ropa", rating:5},
{nombre:"Nike Air Force", precio:90, img:"img/zapatilla blancos.jpeg", categoria:"calzado", rating:4},
{nombre:"sansung", precio:120, img:"img/sansung calaxy.jpeg", categoria:"electronica", rating:5},
{nombre:"Mochila", precio:30, img:"img/maleta.jpeg", categoria:"accesorios", rating:4},
{nombre:"iphone", precio:2000, img:"img/iphone.jpeg", categoria:"electronica", rating:5},
{nombre:"camisa barcelona", precio:60, img:"img/camisa barcelona.jpeg", categoria:"ropa", rating:4},
{nombre:"muda", precio:220, img:"img/muda.jpeg", categoria:"ropa", rating:5},
{nombre:"pantalon", precio:100, img:"img/pantalon.jpeg", categoria:"ropa", rating:4},
{nombre:"saco", precio:90, img:"img/saco hombre.jpg", categoria:"ropa", rating:5},
{nombre:"sudadera", precio:110, img:"img/sudadera.jpeg", categoria:"ropa", rating:4},
{nombre:"zapatillas", precio:80, img:"img/zapatilla.jpg", categoria:"calzado", rating:5},
{nombre:"primavera", precio:90, img:"img/primavera.jpeg", categoria:"ropa", rating:4},
{nombre:"sansung a 25", precio:2000, img:"img/sansung a25.jpg", categoria:"electronica", rating:5},
{nombre:"sansung galaxy 34", precio:1500, img:"img/sansung galaxy 34.jpg", categoria:"electronica", rating:4},
{nombre:"tablet", precio:800, img:"img/tablet.jpeg", categoria:"electronica", rating:5},
{nombre:"guayos", precio:200, img:"img/guayos.jpeg", categoria:"accesorios", rating:4},
{nombre:"gafas", precio:100, img:"img/accesorios.jpg", categoria:"accesorios", rating:5},
{nombre:"auriculares", precio:200, img:"img/auriculares.jpeg", categoria:"accesorios", rating:4},
{nombre:"adidas superstar", precio:90, img:"img/adidas superstar.jpg", categoria:"calzado", rating:5},
{nombre:"adidas vectores", precio:90, img:"img/adidas vectores.jpg", categoria:"calzado", rating:4},
{nombre:"adidas women", precio:90, img:"img/adidas women.jpg", categoria:"calzado", rating:5},
{nombre:"zapatos negros", precio:70, img:"img/zapatos negros.png", categoria:"calzado", rating:4},
];

// CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;
carrito.forEach(p => total += p.precio * p.cantidad);

// FUNCIONES
function estrellas(n){ return "★".repeat(n); }

function mostrar(lista){
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    lista.forEach(p=>{
        cont.innerHTML += `
        <div class="card">
            <img src="${p.img}">
            <h3>${p.nombre}</h3>
            <div class="stars">${estrellas(p.rating)}</div>
            <p>$${p.precio}</p>
            <button class="add" onclick="agregar('${p.nombre}', ${p.precio}, '${p.img}')">Agregar</button>
        </div>`;
    });
}

function mostrarTodos(){ mostrar(productos); }
function filtrar(cat){ mostrar(productos.filter(p=>p.categoria===cat)); }

// AGREGAR
function agregar(nombre, precio, img){

    const existe = carrito.find(p => p.nombre === nombre);

    if(existe){ existe.cantidad++; }
    else{ carrito.push({nombre, precio, img, cantidad:1}); }

    total += precio;

    actualizar();
    actualizarContador();

    // animación
    document.querySelectorAll(".card").forEach(card=>{
        if(card.innerText.includes(nombre)){
            card.classList.add("added");
            setTimeout(()=>card.classList.remove("added"),400);
        }
    });

    toast("Producto agregado 🛒");
}

// ACTUALIZAR
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
                <button onclick="cambiarCantidad(${i}, -1)">➖</button>
                ${p.cantidad}
                <button onclick="cambiarCantidad(${i}, 1)">➕</button>
            </div>
            <button onclick="eliminar(${i})">❌</button>
        </div>`;
    });

    document.getElementById("total").textContent = total;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cambiarCantidad(i,c){
    carrito[i].cantidad += c;
    if(carrito[i].cantidad<=0){ eliminar(i); return; }
    total += carrito[i].precio * c;
    actualizar();
}

function eliminar(i){
    total -= carrito[i].precio * carrito[i].cantidad;
    carrito.splice(i,1);
    actualizar();
    actualizarContador();
}

function vaciarCarrito(){
    carrito=[]; total=0;
    actualizar(); actualizarContador();
}

// UI
function actualizarContador(){
    let c=0; carrito.forEach(p=>c+=p.cantidad);
    document.getElementById("contador").textContent=c;
}

function toggleCart(){
    document.getElementById("carrito").classList.toggle("show");
    document.getElementById("overlay").classList.toggle("show");
}

function scrollProductos(){
    document.getElementById("productos-section").scrollIntoView({behavior:"smooth"});
}

// PAGO
function abrirPago(){
    document.getElementById("pago").classList.remove("hidden");
}

function confirmarPago(){

    const inputs = document.querySelectorAll("#pago input");
    let valido=true;

    inputs.forEach(i=>{ if(i.value.trim()==="") valido=false; });

    if(!valido){ toast("Completa los datos ⚠️"); return; }

    mostrarFactura();
    toast("Compra realizada ✅");

    carrito=[]; total=0;
    actualizar(); actualizarContador();

    document.getElementById("pago").classList.add("hidden");
}

// FACTURA
function mostrarFactura(){
    const cont=document.getElementById("factura-detalle");
    cont.innerHTML="";

    carrito.forEach(p=>{
        cont.innerHTML+=`<p>${p.nombre} x${p.cantidad} - $${p.precio*p.cantidad}</p>`;
    });

    document.getElementById("factura-total").textContent=total;
    document.getElementById("factura").classList.remove("hidden");
}

function cerrarFactura(){
    document.getElementById("factura").classList.add("hidden");
}

// TOAST
function toast(msg){
    const t=document.getElementById("toast");
    t.textContent=msg;
    t.classList.add("show");
    setTimeout(()=>t.classList.remove("show"),2000);
}

// BUSCADOR
document.querySelector(".search input").addEventListener("input", function(){
    const t=this.value.toLowerCase();
    const f=productos.filter(p=>p.nombre.toLowerCase().includes(t));
    mostrar(f.length?f:productos);
});

// LOGIN
function abrirLogin(){ document.getElementById("login").classList.remove("hidden"); }
function cerrarLogin(){ document.getElementById("login").classList.add("hidden"); }

function login(){
    const user=document.getElementById("user").value;
    const pass=document.getElementById("pass").value;

    if(user===""||pass===""){ toast("Completa los datos ⚠️"); return; }

    localStorage.setItem("usuario", user);

    document.getElementById("user").value="";
    document.getElementById("pass").value="";

    cerrarLogin();
    actualizarUsuario();
    toast("Bienvenido "+user);
}

function actualizarUsuario(){
    const user=localStorage.getItem("usuario");
    const icon=document.getElementById("icon-user");

    if(user){
        icon.innerHTML="👤 "+user;
        icon.onclick=logout;
    }
}

function logout(){
    localStorage.removeItem("usuario");
    location.reload();
}

// INICIO
mostrar(productos);
actualizar();
actualizarContador();
actualizarUsuario();
