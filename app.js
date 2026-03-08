// --- Sistema de prueba 30 días ---
(function(){
    const hoy = new Date();
    const fechaInicio = localStorage.getItem("fechaInicio");
    if(!fechaInicio){ localStorage.setItem("fechaInicio", hoy.toISOString()); }
    else{
        const inicio = new Date(fechaInicio);
        const diffDias = Math.floor((hoy - inicio)/(1000*60*60*24));
        if(diffDias>31){ alert("Período de funcionalidad terminado"); document.body.innerHTML="<h2 style='text-align:center;margin-top:50px;color:red;'>Período finalizado</h2>"; throw new Error("Fin"); }
    }
})();

// --- Planes ---
let planActivo = localStorage.getItem("planActivo") || "Ninguno";
document.getElementById("planActivo").innerText = planActivo;

function activarPlan(){
    const codigo = document.getElementById("codigoPlan").value.trim();
    if(codigo==="ESTANDAR2026"){planActivo="Estándar";}
    else if(codigo==="PREMIUM2026"){planActivo="Premium";}
    else{ alert("Código inválido"); return;}
    localStorage.setItem("planActivo",planActivo);
    document.getElementById("planActivo").innerText=planActivo;
    alert("Plan "+planActivo+" activado");
}

// --- Contador de compras ---
let contadorCompra = parseInt(localStorage.getItem("contadorCompra") || 1);
function actualizarNumeroCompra(){document.getElementById("numeroCompra").value="COMP-"+String(contadorCompra).padStart(4,'0');}
actualizarNumeroCompra();
document.getElementById("fecha").valueAsDate = new Date();

// --- Animales ---
let animales=[], totalAnimales=0;
function agregarAnimal(){
    let caravana=document.getElementById("caravana").value.trim();
    let peso=parseFloat(document.getElementById("peso").value)||0;
    let precioKg=parseFloat(document.getElementById("precioKg").value)||0;
    let precioAnimal=parseFloat(document.getElementById("precioAnimal").value)||0;
    if(!caravana){alert("Caravana obligatoria");return;}
    let total = precioAnimal>0?precioAnimal:peso*precioKg;
    if(total<=0){alert("Precio inválido");return;}
    animales.push({caravana,peso,precioKg,precioAnimal,total});
    totalAnimales+=total;
    actualizarTablaAnimales();
    limpiarCamposAnimal();
    actualizarPrecioReal();
}
function actualizarTablaAnimales(){
    let tbody=document.querySelector("#tablaAnimales tbody");tbody.innerHTML="";
    animales.forEach((a,i)=>{tbody.innerHTML+=`<tr><td>${a.caravana}</td><td>${a.peso}</td><td>${a.precioKg}</td><td>${a.precioAnimal}</td><td>${a.total.toLocaleString()}</td><td><button onclick="eliminarAnimal(${i})">X</button></td></tr>`;});
    document.getElementById("totalAnimales").innerText=totalAnimales.toLocaleString();
}
function eliminarAnimal(i){totalAnimales-=animales[i].total; animales.splice(i,1); actualizarTablaAnimales(); actualizarPrecioReal();}
function limpiarCamposAnimal(){document.getElementById("caravana").value="";document.getElementById("peso").value="";document.getElementById("precioKg").value="";document.getElementById("precioAnimal").value="";}

// --- Gastos ---
let gastosCompra=[], totalGastosCompra=0;
function agregarGastoCompra(){
    let fecha=document.getElementById("fechaGasto").value;
    let tipo=document.getElementById("tipoGastoCompra").value;
    let cantidad=parseFloat(document.getElementById("cantidadGastoCompra").value)||0;
    let importeUnitario=parseFloat(document.getElementById("importeUnitarioGastoCompra").value)||0;
    let obs=document.getElementById("obsGastoCompra").value;
    if(!fecha||cantidad<=0||importeUnitario<=0){alert("Complete campos de gasto");return;}
    let total=cantidad*importeUnitario;
    let idMovilGasto=document.getElementById("numeroCompra").value+"-"+Date.now();
    gastosCompra.push({idMovilGasto,fecha,tipo,cantidad,importeUnitario,total,obs});
    totalGastosCompra+=total;
    actualizarTablaGastosCompra();
    limpiarCamposGastoCompra();
    actualizarPrecioReal();
}
function actualizarTablaGastosCompra(){let tbody=document.querySelector("#tablaGastosCompra tbody");tbody.innerHTML=""; gastosCompra.forEach((g,i)=>{tbody.innerHTML+=`<tr><td>${g.fecha}</td><td>${g.tipo}</td><td>${g.total.toLocaleString()}</td><td><button onclick="eliminarGastoCompra(${i})">X</button></td></tr>`;}); document.getElementById("totalGastosCompra").innerText=totalGastosCompra.toLocaleString();}
function eliminarGastoCompra(i){totalGastosCompra-=gastosCompra[i].total; gastosCompra.splice(i,1); actualizarTablaGastosCompra(); actualizarPrecioReal();}
function limpiarCamposGastoCompra(){document.getElementById("fechaGasto").value=new Date().toISOString().split('T')[0];document.getElementById("tipoGastoCompra").selectedIndex=0;document.getElementById("cantidadGastoCompra").value="";document.getElementById("importeUnitarioGastoCompra").value="";document.getElementById("obsGastoCompra").value="";}

// --- Precio real ---
function actualizarPrecioReal(){
    let cantidadAnimales=animales.length;
    let precioReal=cantidadAnimales>0?(totalAnimales+totalGastosCompra)/cantidadAnimales:0;
    document.getElementById("precioReal").innerText=precioReal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}

// --- Exportar CSV ---
function exportarCompraYGastosCSV(){
    let codOperacion=document.getElementById("numeroCompra").value;
    let fechaCompra=document.getElementById("fecha").value;
    let proveedor=document.getElementById("proveedor").value;
    let ci=document.getElementById("ci").value;
    let documento=document.getElementById("documento").value;

    // Cabecera CSV
    let contenidoCabecera="CodOperacion,Fecha,Proveedor,CI_RUC,Documento\n";
    contenidoCabecera+=`${codOperacion},${fechaCompra},${proveedor},${ci},${documento}\n`;
    let blobCabecera=new Blob([contenidoCabecera],{type:"text/csv"});
    let a0=document.createElement("a"); a0.href=URL.createObjectURL(blobCabecera); a0.download="CompraCabecera_"+codOperacion+".csv"; a0.click();

    // Detalle CSV
    let contenidoDetalle="IdMovil,CodOperacion,Animal,Peso,PrecioKg,PrecioCerrado,Total\n";
    animales.forEach(a=>{contenidoDetalle+=`${codOperacion}-${a.caravana},${codOperacion},${a.caravana},${a.peso},${a.precioKg},${a.precioAnimal},${a.total}\n`;});
    let blobDetalle=new Blob([contenidoDetalle],{type:"text/csv"});
    let a1=document.createElement("a"); a1.href=URL.createObjectURL(blobDetalle); a1.download="CompraDetalle_"+codOperacion+".csv"; a1.click();

    // Gastos CSV
    let contenidoGastos="IdMovil,CodOperacion,FechaGasto,Tipo,Cantidad,ImporteUnitario,Total,Obs\n";
    gastosCompra.forEach(g=>{contenidoGastos+=`${g.idMovilGasto},${codOperacion},${g.fecha},${g.tipo},${g.cantidad},${g.importeUnitario},${g.total},"${g.obs}"\n`;});
    let blobGastos=new Blob([contenidoGastos],{type:"text/csv"});
    let a2=document.createElement("a"); a2.href=URL.createObjectURL(blobGastos); a2.download="GastosCompra_"+codOperacion+".csv"; a2.click();

    // Reset
    contadorCompra++; localStorage.setItem("contadorCompra",contadorCompra);
    animales=[]; gastosCompra=[]; totalAnimales=0; totalGastosCompra=0;
    actualizarNumeroCompra(); actualizarTablaAnimales(); actualizarTablaGastosCompra(); actualizarPrecioReal();
}
