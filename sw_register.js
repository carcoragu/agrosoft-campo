if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(()=> console.log("PWA lista para offline"));
}
