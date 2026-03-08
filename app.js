// app.js
let animales = [], gastosCompra = [], totalAnimales = 0, totalGastosCompra = 0;
let contadorCompra = localStorage.getItem("contadorCompra") || 1;

function actualizarNumeroCompra(){
  document.getElementById("numeroCompra").value = "COMP-" + String(contadorCompra).padStart(4,'0');
}
actualizarNumeroCompra();
document.getElementById("fecha").valueAsDate = new Date();

// Funciones: agregarAnimal, actualizarTablaAnimales, eliminarAnimal
// Funciones: agregarGastoCompra, actualizarTablaGastosCompra, eliminarGastoCompra
// Funciones: actualizarPrecioReal, limpiarCampos

function exportarCompraYGastosCSV(){
    let codOperacion = document.getElementById("numeroCompra").value;
    let fechaCompra = document.getElementById("fecha").value;
    let proveedor = document.getElementById("proveedor").value;
    let ci = document.getElementById("ci").value;
    let documento = document.getElementById("documento").value;

    let contenidoAnimales = `CodOperacion,FechaCompra,Proveedor,CI,Documento,Caravana,Peso,PrecioKg,PrecioAnimal,Total\n`;
    animales.forEach(a=>{
        contenidoAnimales += `${codOperacion},${fechaCompra},${proveedor},${ci},${documento},${a.caravana},${a.peso},${a.precioKg},${a.precioAnimal},${a.total}\n`;
    });
    let blobAnimales = new Blob([contenidoAnimales], {type:"text/csv"});
    let a1 = document.createElement("a");
    a1.href = URL.createObjectURL(blobAnimales);
    a1.download = "Compra_" + codOperacion + ".csv";
    a1.click();

    let contenidoGastos = `CodOperacion,FechaGasto,Tipo,Cantidad,ImporteUnitario,Total,Observaciones\n`;
    gastosCompra.forEach(g=>{
        contenidoGastos += `${codOperacion},${g.fecha},${g.tipo},${g.cantidad},${g.importeUnitario},${g.total},"${g.obs}"\n`;
    });
    let blobGastos = new Blob([contenidoGastos], {type:"text/csv"});
    let a2 = document.createElement("a");
    a2.href = URL.createObjectURL(blobGastos);
    a2.download = "Gastos_Compra_" + codOperacion + ".csv";
    a2.click();

    // Guardar en IndexedDB para sincronización futura
    guardarCompra({codOperacion, fechaCompra, proveedor, ci, documento, animales, gastos: gastosCompra});

    // Reset
    contadorCompra++;
    localStorage.setItem("contadorCompra", contadorCompra);
    animales = []; gastosCompra = []; totalAnimales=0; totalGastosCompra=0;
    actualizarNumeroCompra();
    actualizarTablaAnimales();
    actualizarTablaGastosCompra();
    actualizarPrecioReal();
}

function verHistorial(){
    alert("Historial disponible solo en Premium/PRO");
}
