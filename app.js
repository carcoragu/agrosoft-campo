function activarPlan(){
  const codigo=document.getElementById('codigoPlan').value;
  document.getElementById('planActivo').textContent=codigo?"Plan Activado":"Ninguno";
}

function agregarAnimal(){
  const caravana=document.getElementById('caravana').value;
  const peso=parseFloat(document.getElementById('peso').value)||0;
  const precioKg=parseFloat(document.getElementById('precioKg').value)||0;
  const precioAnimal=parseFloat(document.getElementById('precioAnimal').value)||0;
  const total=precioAnimal||(peso*precioKg);
  if(!caravana)return alert("Ingrese Nº de Caravana");
  const tbody=document.getElementById('tablaAnimales').querySelector('tbody');
  const row=tbody.insertRow();
  row.innerHTML=`<td>${caravana}</td><td>${peso}</td><td>${precioKg}</td><td>${precioAnimal}</td><td>${total}</td><td><button class="danger" onclick="this.closest('tr').remove(); actualizarTotales()">X</button></td>`;
  actualizarTotales();
}

function actualizarTotales(){
  const rows=document.getElementById('tablaAnimales').querySelectorAll('tbody tr');
  let total=0;
  rows.forEach(r=>total+=parseFloat(r.cells[4].textContent)||0);
  document.getElementById('totalAnimales').textContent=total;
  document.getElementById('precioReal').textContent=rows.length?(total/rows.length).toFixed(2):0;
}
