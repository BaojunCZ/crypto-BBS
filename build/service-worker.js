"use strict";var precacheConfig=[["/index.html","ebffe719627a21b45da3d9fbb63fae83"],["/static/css/main.c17080f1.css","302476b8b379a677f648aa1e48918ebd"],["/static/media/ic_button_sendmsg.d580f339.png","d580f33995cd5adc36c42da5f4fe1f22"],["/static/media/ic_tab_favorite_click.7934805c.png","7934805c3f62dca0bc23ab049825618c"],["/static/media/ic_tab_favorite_unclick.3bdc1590.png","3bdc15906c8f6c7fd9df4127380a9f81"],["/static/media/ic_tab_home_click.2690e8ff.png","2690e8ff625398e069470e03a8253bf3"],["/static/media/ic_tab_home_unclick.0a799f56.png","0a799f562c9dfe4743635e7a8b42548e"],["/static/media/icon_bbs_msgs.86fb5afa.png","86fb5afa84226a083696f7c7a008e06f"],["/static/media/icon_bbs_player.5fd8be09.png","5fd8be09c64e8bec016c523ea764fe6b"],["/static/media/icon_default.b3cd3783.jpg","b3cd37830cde4b65d88aabab17817ffb"],["/static/media/icon_discuss.1010a8ae.png","1010a8ae1053d9c43cc17f184b81ab80"],["/static/media/icon_like.5154ec5e.png","5154ec5e0dfa19d23fee01340882ea6a"],["/static/media/icon_liked.749cf909.png","749cf909125b44ecc252da9927008008"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});