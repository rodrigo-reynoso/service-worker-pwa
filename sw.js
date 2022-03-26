const nombreCache = 'apv-v5';
const archivos = [
    '/',
    '/index.html',
    '/manifest.json',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];

// La funcion que tiene el evento es un callback
self.addEventListener('install',e =>{
    // Los console log los pongo por separado para ver que solo se instala una vez
    console.log('Instalado el service Worker..');
    console.log(e);

    // Descarga los archivos y los guarda en el cache Storage
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache=>{
            cache.addAll(archivos); // addAll se utiliza para traer un arreglo
            console.log('cachando...',cache);
        })
    )
});

// Activando Service Worker
self.addEventListener('activate',e =>{
    console.log('Activado server worker');
    console.log(e);

    e.waitUntil(
        caches.keys()
        .then(keys =>{
            console.log(keys); // trae un arreglo con las distintas versiones de caches
            return Promise.all(
                keys.filter(key => key !== nombreCache)
                   .map(key => caches.delete(key)) // este codigo borra los que no pasan la validación de filter
            )
        })
    )
});

// Para que sea instalable en los moviles o en las pc escritorio
// Este fetch tiene otro tipo de caracteristicas y es un evento
self.addEventListener('fetch',e =>{
    console.log('Fetch...');
    console.log(e);

    // Muestra los archivos guardados en el evento install en caso que este offline. Revisa el tipo de request(solicitud),entonces vamos a ejecutar el cache
    e.respondWith(
 /*       caches.match(e.request)
        .then( respuestaCache=>{
            return respuestaCache
        })
        .catch( () => caches.match('/error.html') )*/
        
        /* fetch(e.request)
        .catch(()=> caches.match('/error.html')) */

// Fue el único código que me acepto para poner la hoja de error de html
        fetch(e.request)
        .catch(()=>caches.match(e.request))
        .then(response=> response || caches.match('/error.html'))
    )
})
