function empezarCotizacion() {
    const coin = new Moneda();
    coin.solicitarDatos();
}

function borrarStorage(){
    localStorage.removeItem("cantidad");
}