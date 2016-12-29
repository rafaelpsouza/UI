//Cache static to that "version" of your site.
self.addEventListener('install', function(e) {
  console.debug("Service Worker: install listener");
  e.waitUntil(
    caches.open('offline::v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.css',
        '/app/app.module.js',
        '/images/musicstore.png',
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
      ])
      .then(function (){ self.skipWaiting(); });
    })
  );
});

// Clean-up & migration.
self.addEventListener('activate', function(event) {
  console.debug("Service Worker: activate listener");
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('offline::v1').then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {          
          console.log('Found response in cache:', response);
          return response;
        }

        console.log(' No response for %s found in cache. About to fetch from network...', event.request.url);

        return networkAndCache(cache, event);
      }).catch(function(error) {
        console.error('Error in fetch handler:', error);
        throw error;
      });
    })
  );
});

function networkAndCache(cache, event){
  return fetch(event.request.clone()).then(function(response) {
    console.log('Response for %s from network is: %O', event.request.url, response);

    if (isDataRequest(response)) {
      console.log('Caching the response to', event.request.url);
      cache.put(event.request, response.clone());
    } else {
      console.log('Not caching the response to', event.request.url);
    }

    return response;
  });
}

function isDataRequest(response){
  return response.status < 400 && response.url.indexOf('itunes') > -1;
}