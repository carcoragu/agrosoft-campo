// licencia.js
let planActual = localStorage.getItem("plan") || "Estándar";

function activarPlan(clave){
    const claves = {
        "ESTANDAR123":"Estándar",
        "PREMIUM456":"Premium",
        "PRO789":"PRO"
    };
    if(claves[clave]){
        planActual = claves[clave];
        localStorage.setItem("plan", planActual);
        alert("Plan activado: " + planActual);
        if(planActual !== "Estándar"){
            document.getElementById("btnHistorial").style.display="block";
        }
    } else {
        alert("Clave inválida");
    }
}
