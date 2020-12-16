let cacheData = 'ExpenseTrackerv1'
let cacheValue = [
    '/static/js/main.47e6370b.chunk.js',
    '/static/js/2.01fd9cb3.chunk.js',
    '/static/css/main.7261ef2d.chunk.css',
    'index.html',
    '/logo.jpg',
    '/',
    
]
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll(cacheValue)
        })
    )
})
self.addEventListener('load',(event)=>{
    var condition = navigator.onLine?'online':'offline'
    
})
self.addEventListener('fetch', (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((result) => {
                if (result) {
                    return result
                }
                let requestUrl = event.request.clone()
                return fetch(requestUrl)
            }).catch((error) => {
                console.log('error', error)
            })
        )
    }
})