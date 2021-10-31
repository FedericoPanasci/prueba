//intente iniciar el evento con jquery y no logre que funcione, no da error pero no funciona
//$('btn').on("click", (function () {

$("#boton").slideDown(2000, () => {
    $("#boton").css("color", "white");
    $("#boton").css("background", "linear-gradient(90deg, rgba(2, 0, 36, 0.8043592437) 0%, rgba(97, 221, 238, 0.8407738095) 83%, #00d4ff 100%)");
});
$("#crear").slideDown(2000, () => {
    $("#crear").css("color", "white");
    $("#crear").css("background", "linear-gradient(90deg, rgba(2, 0, 36, 0.8043592437) 0%, rgba(97, 221, 238, 0.8407738095) 83%, #00d4ff 100%)");
});

function inicio(){
    //inicio localstorage con cuenta de interbanking
    let objeto = [{cuenta: "interbanking", contraseña: "1234"}] || localStorage.getItem("cuenta");
    let defaultCuenta = JSON.stringify(objeto);

    localStorage.setItem("cuenta", defaultCuenta);
}

inicio();

function documento(){
    console.log("valido");
        let acumulador = `<div class="contenedor">
        <div class="row">
        <div class="col">
        Moneda que tenes:
        <select id="tipoMoneda">
        <option value="peso">ARS</option>
        <option value="dolar">USD</option>
        <option value="euro">EUR</option>
        </select>
        </div>
        <div class="col">
        <input type="text" placeholder="Cantidad de monedas" id="cantidad">
        </div>
        <div class="col">
        moneda que queres:
        <select id="monedaObjetivo">
        <option value="peso">ARS</option>
        <option value="dolar">USD</option>
        <option value="euro">EUR</option>
        </select>
        </div>
        </div>
        </div>
        </div>
        
        <div class="contenedor" id="resultado"></div>
        
        <div class="contenedor">
        <div class="row">
        <div class="col"></div>
        <div class="col" style="margin: 2rem auto;">
        <button onclick="empezarCotizacion()">
        toque para convertir
        </button>
        <a href="./index.html" class="link-danger" onclick="borrarStorage()">finalizar</a>
        </div>
        <div class="col"></div>
        </div>
        
        </div>`;
        let documento = document.getElementById("documento");
        documento = acumulador;
        document.getElementById("documento").innerHTML = acumulador;
    }

function generarLogin() {
let cuenta = document.getElementById("cuenta").value;
let contrasenia = document.getElementById("contrasenia").value;
console.log(cuenta);
console.log(contrasenia);

let cuentas = JSON.parse(localStorage.getItem("cuenta"));
console.log(cuentas);
let posicion = cuentas.findIndex(element => element.cuenta == cuenta);
console.log(posicion);
console.log(cuentas[posicion]);


if (cuentas[posicion].cuenta === cuenta && cuentas[posicion].contraseña === contrasenia) {
    documento();
    // console.log("valido");
    // let acumulador = `<div class="contenedor">
    // <div class="row">
    // <div class="col">
    // Moneda que tenes:
    // <select id="tipoMoneda">
    // <option value="peso">ARS</option>
    // <option value="dolar">USD</option>
    // <option value="euro">EUR</option>
    // </select>
    // </div>
    // <div class="col">
    // <input type="text" placeholder="Cantidad de monedas" id="cantidad">
    // </div>
    // <div class="col">
    // moneda que queres:
    // <select id="monedaObjetivo">
    // <option value="peso">ARS</option>
    // <option value="dolar">USD</option>
    // <option value="euro">EUR</option>
    // </select>
    // </div>
    // </div>
    // </div>
    // </div>
    
    // <div class="contenedor" id="resultado"></div>
    
    // <div class="contenedor">
    // <div class="row">
    // <div class="col"></div>
    // <div class="col" style="margin: 2rem auto;">
    // <button onclick="empezarCotizacion()">
    // toque para convertir
    // </button>
    // <a href="./index.html" class="link-danger" onclick="borrarStorage()">finalizar</a>
    // </div>
    // <div class="col"></div>
    // </div>
    
    // </div>`;
    // let documento = document.getElementById("documento");
    // documento = acumulador;
    // document.getElementById("documento").innerHTML = acumulador;
} else {
    return false;
}
}

function crearCuenta(){
    //nueva cuenta para agregar
    let cuenta = document.getElementById("cuenta").value;
    let contrasenia = document.getElementById("contrasenia").value;
    let persona = [{cuenta: cuenta, contraseña: contrasenia}];

    //leer el storage y guardarlo en una variable
    let cuentas = JSON.parse(localStorage.getItem("cuenta"));
    cuentas.push(persona);
    console.log(cuentas);
    //subir esa variable al storage
    let objeto = JSON.stringify(cuentas);
    localStorage.setItem("cuenta", objeto);
    console.log(objeto);
    documento();
}

function empezarCotizacion() {
    const coin = new Moneda();
    
    let cantidadRealizada = 0 || localStorage.getItem('cantidad');
    cantidadRealizada++;
    localStorage.setItem("cantidad", cantidadRealizada);
    const nombreFrom= document.getElementById("tipoMoneda").value;
    const cantidad= document.getElementById("cantidad").value;
    const objetivo= document.getElementById("monedaObjetivo").value;
    
    //coin.solicitarDatos(nombreFrom, cantidad, objetivo);
    console.log(nombreFrom);
    console.log(cantidad);
    console.log(objetivo);
    buscarMoneda(nombreFrom, cantidad, objetivo, cantidadRealizada);
}

function borrarStorage() {
    localStorage.removeItem("cantidad");
}

async function buscarMoneda(from, cant, target, cantidadRealizada){
    const respuesta = await fetch(`./moneda.json`);
    const objeto = await respuesta.json();
    console.log(objeto);
    const objetoFrom = objeto.find(element => element.nombre === from);
    const objetoTarget = objeto.find(element => element.nombre === target);
    
    const resultado = cant * objetoFrom.valor / objetoTarget.valor;
    console.log(resultado);
    
    imprimirDocumento(resultado, cantidadRealizada, from, target);

    return resultado;
}

function imprimirDocumento(resultado, cant, monedaFrom, monedaTarget){
    //------------------------------- con javaScript nativo
    resultado = resultado.toFixed(2);
    let acumulador = document.getElementById("resultado").innerHTML;
    acumulador += `<p>resultado = ${resultado} - convertido de ${monedaFrom} a ${monedaTarget} - cantidad de conversiones realizadas: ${cant}</p>`;
    //--------------------------------------- con jquery
    let texto = `<p>resultado = ${resultado} - convertido de ${monedaFrom} a ${monedaTarget} - cantidad de conversiones realizadas: ${cant}</p>`;
    //document.getElementById("resultado").innerHTML = acumulador;

    //------------ utilizacion de jquery html
    //$("#resultado").html(acumulador);
    //-------------apend
    $("#resultado").append(texto);
}
