// db.js
let db;
const request = indexedDB.open("AgroSoftDB",1);
request.onupgradeneeded = function(e){
  db = e.target.result;
  db.createObjectStore("compras",{keyPath:"id",autoIncrement:true});
};
request.onsuccess = function(e){ db = e.target.result; }
function guardarCompra(data){
  const tx = db.transaction("compras","readwrite");
  tx.objectStore("compras").add(data);
}
