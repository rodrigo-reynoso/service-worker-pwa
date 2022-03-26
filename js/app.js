// es para comprobar si soporta Service Worker
if('serviceWorker' in navigator){
    // esto es un Promise
    navigator.serviceWorker.register('./sw.js')
        .then(registrado => console.log('fue registrado correctamente..',registrado))
        .catch(error => console.log('falló la instalación..',error))
} else {
    console.log('Service Workers no soportado')
}