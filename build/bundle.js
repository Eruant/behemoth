!function e(t,i,n){function s(o,a){if(!i[o]){if(!t[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[o]={exports:{}};t[o][0].call(c.exports,function(e){var i=t[o][1][e];return s(i?i:e)},c,c.exports,e,t,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(e){"use strict";{var t=function(e){return e&&e.__esModule?e["default"]:e},i=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=t(e("./settings.json")),r=t(e("./classes/loop")),o=t(e("./classes/layout")),a=t(e("./classes/levels")),l=t(e("./modules/dom")),u=t(e("./modules/loader")),c=t(e("./modules/render")),h=t(e("./modules/io")),d=function(){function e(){n(this,e);var t=100,i=l.loadStorage("mobs");i||(i=s.mobs,l.saveStorage("mobs",i)),this.layout=new o(s.width,s.height),this.loop=new r(this,t,this.update,this.draw),this.levels=new a,c.setDimentions(s.width,s.height);for(var h=0,d=4;d>h;h++){var f="level"+(h+1);this.levels.load(f)}this.levels.setMap("level4"),this.isLoading=!0,u.onLoaded(this,this.start),this.keyActive=!1,this.countdown={current:3,interval:3e3,timePassed:0},this.loop.start()}return i(e,null,{start:{value:function(){this.isLoading=!1,this.currentLevel=this.levels.maps[this.levels.currentMap],c.clearLoader(this.layout.ctx)},writable:!0,configurable:!0},update:{value:function(e){h.isKeyPressed()&&this.keyActive===!1?(this.keyActive=!0,this.levels.triggerGates(this.currentLevel)):h.isKeyPressed()||(this.keyActive=!1),this.isLoading||(this.countdown.current>0?(this.countdown.timePassed+=e,this.countdown.timePassed>this.countdown.interval&&(this.countdown.current--,this.countdown.timePassed-=this.countdown.interval)):this.levels.updateMobs())},writable:!0,configurable:!0},draw:{value:function(){if(this.layout.ctx.fillStyle="hsl(30, 30%, 40%)",this.layout.ctx.fillRect(0,0,s.width,s.height),this.isLoading)c.drawLoader(this.layout.ctx,u.progress());else{var e={x:0,y:0};this.currentLevel.width*c.tileSize<c.width?e.x=.5*(c.width-this.currentLevel.width*c.tileSize):e.y=.5*(c.height-this.currentLevel.height*c.tileSize),this.layout.ctx.save(),this.layout.ctx.translate(e.x,e.y),c.drawMap(this.layout.ctx,this.currentLevel),c.drawMobs(this.layout.ctx,this.currentLevel.mobs,this.currentLevel),this.layout.ctx.restore(),this.countdown.current>0&&c.drawCountdown(this.layout.ctx,this.countdown.current)}},writable:!0,configurable:!0}}),e}();new d}},{"./classes/layout":4,"./classes/levels":5,"./classes/loop":6,"./modules/dom":9,"./modules/io":10,"./modules/loader":11,"./modules/render":12,"./settings.json":13}],2:[function(e,t){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function s(e){return"number"==typeof e}function r(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!s(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,i,s,a,l,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(i=this._events[e],o(i))return!1;if(n(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,a=new Array(s-1),l=1;s>l;l++)a[l-1]=arguments[l];i.apply(this,a)}else if(r(i)){for(s=arguments.length,a=new Array(s-1),l=1;s>l;l++)a[l-1]=arguments[l];for(u=i.slice(),s=u.length,l=0;s>l;l++)u[l].apply(this,a)}return!0},i.prototype.addListener=function(e,t){var s;if(!n(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?r(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,r(this._events[e])&&!this._events[e].warned){var s;s=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function i(){this.removeListener(e,i),s||(s=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var s=!1;return i.listener=t,this.on(e,i),this},i.prototype.removeListener=function(e,t){var i,s,o,a;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(i=this._events[e],o=i.length,s=-1,i===t||n(i.listener)&&i.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(r(i)){for(a=o;a-->0;)if(i[a]===t||i[a].listener&&i[a].listener===t){s=a;break}if(0>s)return this;1===i.length?(i.length=0,delete this._events[e]):i.splice(s,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[e],n(i))this.removeListener(e,i);else for(;i.length;)this.removeListener(e,i[i.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.listenerCount=function(e,t){var i;return i=e._events&&e._events[t]?n(e._events[t])?1:e._events[t].length:0}},{}],3:[function(e,t){function i(e){try{return JSON.parse(e)}catch(t){return t}}function n(e){var t=e.split("?"),i={};if(t.length>1)for(var n=t.pop().split("&"),s=0;s<n.length;s++){var r=n[s].split("="),o=window.unescape(r[0]),a=window.unescape(r[1]);i[o]=a}return i}function s(e){var t="";for(var i in e)e.hasOwnProperty(i)&&void 0!==e[i]&&(t+=(t.length?"&":"?")+i+"="+e[i]);return t}function r(e){var t,r=this;if("string"==typeof e&&(e={url:e}),"object"!=typeof e&&(e={}),r.settings=e,r.request=new window.XMLHttpRequest,r.settings.method=r.settings.method||"get",r.settings.cors&&("withCredentials"in r.request?r.request.withCredentials=!0:"undefined"!=typeof XDomainRequest?r.request=new window.XDomainRequest:r.emit("error",new Error("Cors is not supported by this browser"))),r.settings.cache===!1&&(r.settings.data=r.settings.data||{},r.settings.data._=(new Date).getTime()),"get"===r.settings.method.toLowerCase()&&"object"==typeof r.settings.data){t=n(r.settings.url);for(var o in r.settings.data)r.settings.data.hasOwnProperty(o)&&(t[o]=r.settings.data[o]);r.settings.url=r.settings.url.split("?").shift()+s(t),r.settings.data=null}r.request.addEventListener("progress",function(e){r.emit("progress",e)},!1),r.request.addEventListener("load",function(e){var t=e.target.responseText;if(r.settings.dataType&&"json"===r.settings.dataType.toLowerCase())if(""===t)t=void 0;else if(t=i(t),t instanceof Error)return void r.emit("error",e,t);e.target.status>=400?r.emit("error",e,t):r.emit("success",e,t)},!1),r.request.addEventListener("error",function(e){r.emit("error",e)},!1),r.request.addEventListener("abort",function(e){r.emit("abort",e)},!1),r.request.addEventListener("loadend",function(e){r.emit("complete",e)},!1),r.request.open(r.settings.method||"get",r.settings.url,!0),r.settings.contentType!==!1&&r.request.setRequestHeader("Content-Type",r.settings.contentType||"application/json; charset=utf-8"),r.request.setRequestHeader("X-Requested-With",r.settings.requestedWith||"XMLHttpRequest"),r.settings.auth&&r.request.setRequestHeader("Authorization",r.settings.auth);for(var a in r.settings.headers)r.request.setRequestHeader(a,r.settings.headers[a]);r.settings.processData!==!1&&"json"===r.settings.dataType&&(r.settings.data=JSON.stringify(r.settings.data))}var o=e("events").EventEmitter;r.prototype=Object.create(o.prototype),r.prototype.send=function(){this.request.send(this.settings.data&&this.settings.data)},t.exports=r},{events:2}],4:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=i(e("../modules/dom")),r=function o(){var e=void 0===arguments[0]?600:arguments[0],t=void 0===arguments[1]?400:arguments[1];n(this,o);var i=s.createElement("canvas"),r=i.getContext("2d");return i.width=e,i.height=t,r.translate(-.5,-.5),s.load(function(){s.add(i,"body")}),{canvas:i,ctx:r}};t.exports=r},{"../modules/dom":9}],5:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=i(e("./map")),o=i(e("../modules/loader")),a=i(e("./mob")),l=i(e("../modules/dom")),u=function(){function e(){s(this,e),this.maps={},this.currentMap=null}return n(e,null,{add:{value:function(e){var t=l.loadStorage("mobs");this.maps[e.name]=new r(e),this.maps[e.name].mobs=[];for(var i=0,n=e.mobs.length;n>i;i++){var s=e.mobs[i],o={x:parseInt(s.position.x,10),y:parseInt(s.position.y,10)},u={x:parseInt(s.direction.x,10),y:parseInt(s.direction.y,10)},c=parseInt(t[i].color,10);this.maps[e.name].mobs.push(new a(o,u,c))}},writable:!0,configurable:!0},setMap:{value:function(e){this.currentMap=e},writable:!0,configurable:!0},load:{value:function(e){var t=this,i="./data/levels/"+e+".json";o.loadAjax(i,function(e,i){if("success"===e){var n=JSON.parse(i);t.add(n)}})},writable:!0,configurable:!0},triggerGates:{value:function(e){for(var t=0,i=e.data.length;i>t;t++)switch(e.data[t]){case"o":e.data[t]="c";break;case"c":e.data[t]="o"}},writable:!0,configurable:!0},updateMobs:{value:function(){for(var e=0,t=this.maps[this.currentMap].mobs.length;t>e;e++)this.updateMob(this.maps[this.currentMap].mobs[e]);this.checkCollisions()},writable:!0,configurable:!0},updateMob:{value:function(e){{var t=this.maps[this.currentMap],i=e.getNextPosition(),n=t.getKeyForCoordinates(i),s=t.data[n];e.position}s.match(/[\.o]/)?e.setPosition(i):(e.rotate(),i=e.getNextPosition(),n=t.getKeyForCoordinates(i),s=t.data[n],s.match(/[\.o]/)?e.setPosition(i):(e.rotate(),e.rotate(),i=e.getNextPosition(),n=t.getKeyForCoordinates(i),s=t.data[n],s.match(/[\.o]/)?e.setPosition(i):console.warn("mob stuck")))},writable:!0,configurable:!0},checkCollisions:{value:function(){for(var e=[],t=this.maps[this.currentMap].mobs,i=[],n=0,s=t.length;s>n;n++)for(var r=t[n],o=0,a=r.bodyParts.length;a>o;o++)e.push({mob:n,part:o,position:r.bodyParts[o]});for(var n=0,s=e.length;s>n;n++)for(var l=e[n],o=0,a=t.length;a>o;o++){var u=t[o];if(u.position.x===l.position.x&&u.position.y===l.position.y){var c=t[l.mob];c.bodyParts.length=o,c.length=o+1,u.addBodyPart(),c.length<c.minLength&&i.push(l.mob)}}i=i.sort(function(e,t){return t-e});for(var n=0,s=i.length;s>n;n++)t.splice(i[n],1),1===t.length},writable:!0,configurable:!0}}),e}();t.exports=u},{"../modules/dom":9,"../modules/loader":11,"./map":7,"./mob":8}],6:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=i(e("../modules/dom")),o={},a=function(){function e(){var t=void 0===arguments[0]?this:arguments[0],i=void 0===arguments[1]?1e3/60:arguments[1],n=void 0===arguments[2]?null:arguments[2],r=void 0===arguments[3]?null:arguments[3];s(this,e),o.frameTime=i,o.pause=!0,o.update=n.bind(t),o.draw=r.bind(t)}return n(e,null,{start:{value:function(){o.pause=!1,o.startTime=(new Date).getTime(),o.timeSinceLastUpdate=0,this.tick(0)},writable:!0,configurable:!0},stop:{value:function(){o.pause=!0},writable:!0,configurable:!0},isRunning:{value:function(){return o.pause},writable:!0,configurable:!0},tick:{value:function(e){if(!o.pause){var t=(new Date).getTime()-o.startTime,i=e-t;o.timeSinceLastUpdate+=i,o.timeSinceLastUpdate>o.frameTime&&(null!==o.update&&o.update(o.timeSinceLastUpdate),o.timeSinceLastUpdate=0),null!==o.draw&&o.draw(),r.requestAnimationFrame(this.tick,this)}},writable:!0,configurable:!0}}),e}();t.exports=a},{"../modules/dom":9}],7:[function(e,t){"use strict";var i=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=function(){function e(t){n(this,e),this.width=t.width,this.height=t.height,this.data=t.data}return i(e,null,{getCoordinatesForKey:{value:function(e){return{x:0===e?0:Math.floor(e/this.width),y:0===e?0:e%this.width}},writable:!0,configurable:!0},getKeyForCoordinates:{value:function(e){return e.y*this.width+e.x},writable:!0,configurable:!0},isKeyValid:{value:function(e){return e>0&&e<=this.data.length},writable:!0,configurable:!0},isCoordinatesValid:{value:function(e){var t=e.x>=0&&e.x<this.width,i=e.y>=0&&e.y<this.height;return t&&i},writable:!0,configurable:!0}}),e}();t.exports=s},{}],8:[function(e,t){"use strict";var i=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=function(){function e(t,i){var s=void 0===arguments[2]?Math.floor(Math.random(360)):arguments[2];n(this,e),this.length=5,this.minLength=3,this.color=s,this.position={x:t.x||0,y:t.y||0},this.direction={x:i.x||0,y:i.y||0},this.bodyParts=[];for(var r=0,o=this.length-1;o>r;r++)this.addBodyPart()}return i(e,null,{addBodyPart:{value:function(){var e;if(0===this.bodyParts.length)e={x:this.position.x,y:this.position.y};else{var t=this.bodyParts[this.bodyParts.length-1];e={x:t.x,y:t.y}}this.bodyParts.push(e)},writable:!0,configurable:!0},setPosition:{value:function(e){var t={x:this.position.x,y:this.position.y};this.position.x=e.x,this.position.y=e.y,this.updateBodyParts(t)},writable:!0,configurable:!0},setDirection:{value:function(e){if("object"==typeof e)this.direction.x=e.x,this.direction.y=e.y;else if("string"==typeof e){var t=0,i=0;switch(e){case"right":t=1,i=0;break;case"left":t=-1,i=0;break;case"up":t=0,i=-1;break;case"down":t=0,i=1}this.direction.x=t,this.direction.y=i}},writable:!0,configurable:!0},getDirection:{value:function(){var e=void 0===arguments[0]?!1:arguments[0];return e?this.getDirectionAsString():this.direction},writable:!0,configurable:!0},getDirectionAsString:{value:function(){var e;return 1===this.direction.x?e="right":-1===this.direction.x?e="left":1===this.direction.y?e="down":-1===this.direction.y&&(e="up"),e},writable:!0,configurable:!0},rotate:{value:function(){var e=void 0===arguments[0]?!0:arguments[0];if(e)switch(this.getDirection(!0)){case"left":this.setDirection("up");break;case"right":this.setDirection("down");break;case"up":this.setDirection("right");break;case"down":this.setDirection("left")}else this.rotate(),this.rotate(),this.rotate()},writable:!0,configurable:!0},getNextPosition:{value:function(){return{x:this.position.x+this.direction.x,y:this.position.y+this.direction.y}},writable:!0,configurable:!0},updateBodyParts:{value:function(e){for(var t={x:e.x,y:e.y},i=0,n=this.bodyParts.length;n>i;i++){var s=this.bodyParts[i];if(s.x!==t.x||s.y!==t.y){var r={x:this.bodyParts[i].x,y:this.bodyParts[i].y};this.bodyParts[i].x=t.x,this.bodyParts[i].y=t.y,t.x=r.x,t.y=r.y}}},writable:!0,configurable:!0}}),e}();t.exports=s},{}],9:[function(e,t){"use strict";var i=window,n=i.document,s={};s.createElement=function(e){return n.createElement(e)},s.load=function(e){i.onload=e},s.add=function(e,t){n.querySelector(t).appendChild(e)},s.requestAnimationFrame=function(e,t){i.requestAnimationFrame(e.bind(t))},s.eventListener=function(e,t,n,s){t===!0?i.addEventListener(n,s.bind(e),!1):i.removeEventListener(n)},s.setTimeout=function(e,t){i.setTimeout(function(){e()},t)},s.saveStorage=function(e,t){i.localStorage.setItem(e,JSON.stringify(t))},s.loadStorage=function(e){var t=i.localStorage.getItem(e);return JSON.parse(t)},t.exports=s},{}],10:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=i(e("./dom")),o=function(){function e(){s(this,e),this.bindKeyboard(),this.activeKeys=[]}return n(e,null,{bindKeyboard:{value:function(){r.eventListener(this,!0,"keydown",this.keyPressed),r.eventListener(this,!0,"keyup",this.keyReleased)},writable:!0,configurable:!0},keyPressed:{value:function(e){-1===this.activeKeys.indexOf(e.keyCode)&&this.activeKeys.push(e.keyCode)},writable:!0,configurable:!0},keyReleased:{value:function(e){var t=this.activeKeys.indexOf(e.keyCode);-1!==t&&this.activeKeys.splice(t,1)},writable:!0,configurable:!0},getDirection:{value:function(){var e=-1!==this.activeKeys.indexOf(37)?-1:0,t=-1!==this.activeKeys.indexOf(39)?1:0,i=-1!==this.activeKeys.indexOf(38)?-1:0,n=-1!==this.activeKeys.indexOf(40)?1:0;return{x:e+t,y:i+n}},writable:!0,configurable:!0},isKeyPressed:{value:function(){return this.activeKeys.length>0},writable:!0,configurable:!0}}),e}();t.exports=new o},{"./dom":9}],11:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=i(e("simple-ajax")),o=(i(e("./dom")),function(){function e(){s(this,e),this.loaded=!1,this.filesLoaded=0,this.filesToLoad=0,this.onLoadedCallback=null}return n(e,null,{progress:{value:function(){return 0===this.filesToLoad?(this.loaded=!0,1):0===this.filesLoaded?0:this.filesLoaded/this.filesToLoad},writable:!0,configurable:!0},loadAjax:{value:function(e,t){var i=this;this.loaded=!1,this.filesToLoad++,new r(e).on("success",function(e,i){t("success",i)}).on("error",function(e,i){t("error",i)}).on("complete",function(){i.filesLoaded++,1===i.progress()&&i.onLoadedCallback&&i.onLoadedCallback()}).send()},writable:!0,configurable:!0},loadImg:{value:function(e,t){var i=this;this.loaded=!1,this.filesToLoad++;var n=new Image;return n.onload=function(){i.filesLoaded++,1===i.progress()&&i.onLoadedCallback&&i.onLoadedCallback(),"function"==typeof t&&t()},n.src=e,n},writable:!0,configurable:!0},onLoaded:{value:function(e,t){this.onLoadedCallback=t.bind(e)},writable:!0,configurable:!0}}),e}());t.exports=new o},{"./dom":9,"simple-ajax":3}],12:[function(e,t){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},n=function(e,t,i){t&&Object.defineProperties(e,t),i&&Object.defineProperties(e.prototype,i)},s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},r=i(e("../settings.json")),o=i(e("./loader")),a=function(){function e(){s(this,e),this.scale=[1,1],this.tileset=o.loadImg("img/tileset.png")}return n(e,null,{setDimentions:{value:function(e,t){this.width=e,this.height=t,this.tileSize=32},writable:!0,configurable:!0},setScale:{value:function(e,t){var i=this.width/e,n=this.height/t;this.tileSize=i>n?n:i},writable:!0,configurable:!0},drawTile:{value:function(e,t,i){var n=void 0===arguments[3]?0:arguments[3],s=16,r=s*n,o=0,a=s,l=s,u=t,c=i,h=this.tileSize,d=this.tileSize;e.drawImage(this.tileset,r,o,a,l,u,c,h,d)},writable:!0,configurable:!0},drawLoader:{value:function(e,t){this.clearLoader(e),e.fillStyle="hsl(270, 50%, 60%)",e.strokeStyle="hsl(270, 50%, 60%)",e.save(),e.translate(.5*this.width,.5*this.height),e.strokeRect(-50,-5,100,10),e.fillRect(-50,-5,Math.floor(100*t),10),e.restore()},writable:!0,configurable:!0},clearLoader:{value:function(e){e.save(),e.translate(.5*this.width,.5*this.height),e.clearRect(-51,-6,102,12),e.restore()},writable:!0,configurable:!0},drawMap:{value:function(e,t){this.setScale(t.width,t.height);for(var i=0,n=0,s=0,r=t.data.length;r>s;s++){switch(t.data[s]){case"X":this.drawTile(e,i,n,0);break;case"c":this.drawTile(e,i,n,0);break;case"o":this.drawTile(e,i,n,1);break;default:this.drawTile(e,i,n,1)}s%t.width===t.width-1?(i=0,n+=this.tileSize):i+=this.tileSize}},writable:!0,configurable:!0},drawMobs:{value:function(e,t,i){this.setScale(i.width,i.height);for(var n=.7*this.tileSize,s=.5*(this.tileSize-n),r=0,o=t.length;o>r;r++){var a=t[r];e.save(),e.translate(a.position.x*this.tileSize,a.position.y*this.tileSize),e.fillStyle="hsl("+a.color+", 50%, 60%)",e.fillRect(s,s,n,n),e.restore();for(var l=0,u=a.bodyParts.length;u>l;l++){var c=a.bodyParts[l];e.save(),e.translate(c.x*this.tileSize,c.y*this.tileSize),e.fillStyle=l+1===u?"hsl("+this.addColorValue(a.color,40)+", 50%, 60%)":"hsl("+this.addColorValue(a.color,20)+", 50%, 60%)",e.fillRect(s,s,n,n),e.restore()}}},writable:!0,configurable:!0},addColorValue:{value:function(e,t){var i=e+t;return i>360&&(i-=360),i},writable:!0,configurable:!0},drawCountdown:{value:function(e,t){e.fillStyle="hsl(0, 30%, 90%)",e.font="100px Georgia",e.textAlign="center",e.fillText(t,.5*r.width,.5*r.height)},writable:!0,configurable:!0}}),e}();t.exports=new a},{"../settings.json":13,"./loader":11}],13:[function(e,t){t.exports={width:"800",height:"600",mobs:[{name:"mob-1",color:"0"},{name:"mob-2",color:"90"},{name:"mob-3",color:"180"},{name:"mob-4",color:"270"}]}},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map