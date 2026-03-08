// --- Periodo de prueba 30 días ---
(function(){
    const hoy = new Date();
    const fechaInicio = localStorage.getItem("fechaInicio");
    if(!fechaInicio){
        localStorage.setItem("fechaInicio", hoy.toISOString());
    } else {
        const inicio = new Date(fechaInicio);
        const diffDias = Math.floor((hoy - inicio) / (1000*60*60*24));
        if(diffDias > 30){
            alert("El período de prueba de 30 días ha finalizado. Contacte soporte.");
            document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;color:red;'>Prueba finalizada</h2>";
            throw new Error("Fin del periodo de prueba");
        }
    }
})();

// --- Planes Estándar y Premium ---
function activarPlan(plan) {
    localStorage.setItem("planActivo", plan);
    localStorage.setItem("fechaActivacion", new Date().toISOString());
    document.getElementById("planActivo").innerText = plan;
}

function verificarLicencia() {
    const plan = localStorage.getItem("planActivo");
    if(!plan) throw new Error("Debe activar un plan");
    return plan;
}

function activarPlanSeleccionado() {
    const sel = document.getElementById("planSelect").value;
    if(!sel){ alert("Seleccione un plan"); return; }
    activarPlan(sel);
}
