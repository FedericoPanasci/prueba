class Moneda {
    //cualquier objeto se puede crear con una clase
    constructor() {
        this.monedas = [
            { nombre: 'peso', valor: 1 },
            { nombre: 'dolar', valor: 180 },
            { nombre: 'euro', valor: 190 }
        ];
    }

    
    solicitarDatos(){
        //Manejo de DOM
        const moneda = {
            nombre: document.getElementById("tipoMoneda").value,
            cantidad: document.getElementById("cantidad").value,
        };
        const objetivo = document.getElementById("monedaObjetivo").value;
        // ******************************** /

        this.convertirMonedas(moneda, objetivo);  
    }

    convertirMonedas(moneda, objetivo) {
        //se obtiene el objeto de la moneda inicial
        let cantidadRealizada = 0 || localStorage.getItem('cantidad');
        cantidadRealizada++;
        localStorage.setItem("cantidad", cantidadRealizada);
        console.log(cantidadRealizada);

        let monedaFrom = this.monedas.find(element => element.nombre === moneda.nombre);
        console.log(monedaFrom);

        //se obtiene el objeto de la moneda objetivo
        let monedaTarget = this.monedas.find(element => element.nombre === objetivo);
        console.log(monedaTarget);

        //se realiza la operacion y se obtiene el resultado
        let resultado = (moneda.cantidad * monedaFrom.valor) / monedaTarget.valor;
        
        //implemento toFixed();
        resultado = resultado.toFixed(2);
        this.imprimirDocumento(resultado, cantidadRealizada, monedaFrom, monedaTarget);
        console.log(resultado);
    }
    
    imprimirDocumento(resultado, cant, monedaFrom, monedaTarget){
        let acumulador = document.getElementById("resultado").innerHTML;
        acumulador += `<p>resultado = ${resultado} - convertido de ${monedaFrom.nombre} a ${monedaTarget.nombre} - cantidad de conversiones realizadas: ${cant}</p>`;
        document.getElementById("resultado").innerHTML = acumulador;
        
    }
}

