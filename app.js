let animales=[]
let gastos=[]
let historial=[]

document.getElementById("numeroCompra").value=Date.now()

function agregarAnimal(){

let caravana=document.getElementById("caravana").value
let peso=Number(document.getElementById("peso").value)
let precioKg=Number(document.getElementById("precioKg").value)
let precioAnimal=Number(document.getElementById("precioAnimal").value)

let total=precioAnimal || peso*precioKg

animales.push({caravana,peso,precioKg,precioAnimal,total})

renderAnimales()
guardarLocal()

}

function renderAnimales(){

let tbody=document.querySelector("#tablaAnimales tbody")
tbody.innerHTML=""

let total=0

animales.forEach((a,i)=>{

total+=a.total

tbody.innerHTML+=`
<tr>
<td>${a.caravana}</td>
<td>${a.peso}</td>
<td>${a.precioKg}</td>
<td>${a.precioAnimal}</td>
<td>${a.total}</td>
<td><button onclick="eliminarAnimal(${i})">X</button></td>
</tr>
`

})

document.getElementById("totalAnimales").innerText=total
document.getElementById("dashAnimales").innerText=animales.length
document.getElementById("dashTotalAnimales").innerText=total

}

function eliminarAnimal(i){

animales.splice(i,1)
renderAnimales()
guardarLocal()

}

function agregarGasto(){

let fecha=document.getElementById("fechaGasto").value
let tipo=document.getElementById("tipoGasto").value
let cantidad=Number(document.getElementById("cantidadGasto").value)
let importe=Number(document.getElementById("importeGasto").value)
let obs=document.getElementById("obsGasto").value

let total=cantidad*importe

gastos.push({fecha,tipo,total,obs})

renderGastos()
guardarLocal()

}

function renderGastos(){

let tbody=document.querySelector("#tablaGastos tbody")
tbody.innerHTML=""

let total=0

gastos.forEach((g,i)=>{

total+=g.total

tbody.innerHTML+=`
<tr>
<td>${g.fecha}</td>
<td>${g.tipo}</td>
<td>${g.total}</td>
<td>${g.obs}</td>
<td><button onclick="eliminarGasto(${i})">X</button></td>
</tr>
`

})

document.getElementById("totalGastos").innerText=total
document.getElementById("dashTotalGastos").innerText=total

}

function eliminarGasto(i){

gastos.splice(i,1)
renderGastos()
guardarLocal()

}

function guardarCompra(){

let compra={

numero:document.getElementById("numeroCompra").value,
fecha:document.getElementById("fechaCompra").value,
proveedor:document.getElementById("proveedor").value,
total:document.getElementById("totalAnimales").innerText

}

historial.push(compra)

renderHistorial()
guardarLocal()

}

function renderHistorial(){

let tbody=document.querySelector("#tablaHistorial tbody")
tbody.innerHTML=""

historial.forEach(h=>{

tbody.innerHTML+=`
<tr>
<td>${h.numero}</td>
<td>${h.fecha}</td>
<td>${h.proveedor}</td>
<td>${h.total}</td>
</tr>
`

})

}

function guardarLocal(){

localStorage.setItem("animales",JSON.stringify(animales))
localStorage.setItem("gastos",JSON.stringify(gastos))
localStorage.setItem("historial",JSON.stringify(historial))

}

function cargarLocal(){

animales=JSON.parse(localStorage.getItem("animales"))||[]
gastos=JSON.parse(localStorage.getItem("gastos"))||[]
historial=JSON.parse(localStorage.getItem("historial"))||[]

renderAnimales()
renderGastos()
renderHistorial()

}

function exportarExcel(){

let compras=[]

historial.forEach(c=>{

compras.push({

numero:c.numero,
fecha:c.fecha,
proveedor:c.proveedor,
total:c.total

})

})

let wb=XLSX.utils.book_new()

let ws1=XLSX.utils.json_to_sheet(compras)
let ws2=XLSX.utils.json_to_sheet(animales)
let ws3=XLSX.utils.json_to_sheet(gastos)

XLSX.utils.book_append_sheet(wb,ws1,"Compras")
XLSX.utils.book_append_sheet(wb,ws2,"DetalleAnimales")
XLSX.utils.book_append_sheet(wb,ws3,"Gastos")

XLSX.writeFile(wb,"AgroSoft_Compras.xls")

}
cargarLocal()

window.addEventListener("load", ()=>{

setTimeout(()=>{

let splash=document.getElementById("splash")

if(splash){

splash.style.display="none"

}

},2000)

})

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {

e.preventDefault();

deferredPrompt = e;

let installBtn = document.createElement("button");

installBtn.innerText = "Instalar App";

installBtn.style.position="fixed";
installBtn.style.bottom="20px";
installBtn.style.right="20px";
installBtn.style.padding="12px";

document.body.appendChild(installBtn);

installBtn.addEventListener("click",()=>{

deferredPrompt.prompt();

});

});
