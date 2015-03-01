!function t(e,i,s){function n(o,a){if(!i[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=i[o]={exports:{}};e[o][0].call(c.exports,function(t){var i=e[o][1][t];return n(i?i:t)},c,c.exports,t,e,i,s)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<s.length;o++)n(s[o]);return n}({1:[function(t){"use strict";{var e=function(t){return t&&t.__esModule?t["default"]:t},i=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=e(t("./settings.json")),r=e(t("./classes/loop")),o=e(t("./classes/layout")),a=e(t("./classes/levels")),l=e(t("./modules/dom")),u=e(t("./modules/loader")),c=e(t("./modules/render")),h=e(t("./modules/io")),d=function(){function t(){s(this,t);var e=1e3/15,i=l.loadStorage("mobs");i||(i=n.mobs,l.saveStorage("mobs",i)),this.state="loading",this.winner=!1,this.layout=new o(n.width,n.height),this.loop=new r(this,e,this.update,this.draw),this.levels=new a,c.setDimentions(n.width,n.height);for(var h=0,d=4;d>h;h++){var f="level"+(h+1);this.levels.load(f)}this.levels.setMap("level4"),this.isLoading=!0,u.onLoaded(this,this.start),this.keyActive=!1,this.countdown={current:3,interval:1e3,timePassed:0},this.instructions={current:5,interval:1e3,timePassed:0},this.loop.start()}return i(t,null,{start:{value:function(){l.setStyles(),this.isLoading=!1,this.currentLevel=this.levels.maps[this.levels.currentMap],c.clearLoader(this.layout.ctx)},writable:!0,configurable:!0},update:{value:function(t){if(h.isKeyPressed()&&this.keyActive===!1?(this.keyActive=!0,this.levels.triggerGates(this.currentLevel)):h.isKeyPressed()||(this.keyActive=!1),!this.isLoading)switch(this.state){case"loading":this.isLoading||(this.state="instructions");break;case"instructions":this.instructions.current>0?(this.instructions.timePassed+=t,this.instructions.timePassed>this.instructions.interval&&(this.instructions.current--,this.instructions.timePassed-=this.instructions.interval)):this.state="countdown";break;case"countdown":this.countdown.current>0?(this.countdown.timePassed+=t,this.countdown.timePassed>this.countdown.interval&&(this.countdown.current--,this.countdown.timePassed-=this.countdown.interval)):this.state="game";break;case"game":var e=this.levels.updateMobs();e&&(this.winner=e,this.state="end");break;case"end":this.loop.stop(),l.setTimeout(function(){l.reload()},5e3)}},writable:!0,configurable:!0},draw:{value:function(){switch(this.layout.ctx.clearRect(0,0,n.width,n.height),this.state){case"loading":c.drawLoader(this.layout.ctx,u.progress());break;case"instructions":c.drawInstructions(this.layout.ctx);break;case"countdown":case"game":var t={x:0,y:0};this.currentLevel.width*c.tileSize<c.width?t.x=.5*(c.width-this.currentLevel.width*c.tileSize):t.y=.5*(c.height-this.currentLevel.height*c.tileSize),this.layout.ctx.save(),this.layout.ctx.translate(t.x,t.y),c.drawMap(this.layout.ctx,this.currentLevel),c.drawMobs(this.layout.ctx,this.currentLevel.mobs,this.currentLevel),this.layout.ctx.restore(),this.countdown.current>0&&c.drawCountdown(this.layout.ctx,this.countdown.current);break;case"end":c.drawEnd(this.layout.ctx,this.winner)}},writable:!0,configurable:!0}}),t}();new d}},{"./classes/layout":4,"./classes/levels":5,"./classes/loop":6,"./modules/dom":9,"./modules/io":10,"./modules/loader":11,"./modules/render":12,"./settings.json":13}],2:[function(t,e){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(t){return"function"==typeof t}function n(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function o(t){return void 0===t}e.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(t){if(!n(t)||0>t||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},i.prototype.emit=function(t){var e,i,n,a,l,u;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if(e=arguments[1],e instanceof Error)throw e;throw TypeError('Uncaught, unspecified "error" event.')}if(i=this._events[t],o(i))return!1;if(s(i))switch(arguments.length){case 1:i.call(this);break;case 2:i.call(this,arguments[1]);break;case 3:i.call(this,arguments[1],arguments[2]);break;default:for(n=arguments.length,a=new Array(n-1),l=1;n>l;l++)a[l-1]=arguments[l];i.apply(this,a)}else if(r(i)){for(n=arguments.length,a=new Array(n-1),l=1;n>l;l++)a[l-1]=arguments[l];for(u=i.slice(),n=u.length,l=0;n>l;l++)u[l].apply(this,a)}return!0},i.prototype.addListener=function(t,e){var n;if(!s(e))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,s(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned){var n;n=o(this._maxListeners)?i.defaultMaxListeners:this._maxListeners,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace())}return this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(t,e){function i(){this.removeListener(t,i),n||(n=!0,e.apply(this,arguments))}if(!s(e))throw TypeError("listener must be a function");var n=!1;return i.listener=e,this.on(t,i),this},i.prototype.removeListener=function(t,e){var i,n,o,a;if(!s(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(i=this._events[t],o=i.length,n=-1,i===e||s(i.listener)&&i.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(i)){for(a=o;a-->0;)if(i[a]===e||i[a].listener&&i[a].listener===e){n=a;break}if(0>n)return this;1===i.length?(i.length=0,delete this._events[t]):i.splice(n,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},i.prototype.removeAllListeners=function(t){var e,i;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(i=this._events[t],s(i))this.removeListener(t,i);else for(;i.length;)this.removeListener(t,i[i.length-1]);return delete this._events[t],this},i.prototype.listeners=function(t){var e;return e=this._events&&this._events[t]?s(this._events[t])?[this._events[t]]:this._events[t].slice():[]},i.listenerCount=function(t,e){var i;return i=t._events&&t._events[e]?s(t._events[e])?1:t._events[e].length:0}},{}],3:[function(t,e){function i(t){try{return JSON.parse(t)}catch(e){return e}}function s(t){var e=t.split("?"),i={};if(e.length>1)for(var s=e.pop().split("&"),n=0;n<s.length;n++){var r=s[n].split("="),o=window.unescape(r[0]),a=window.unescape(r[1]);i[o]=a}return i}function n(t){var e="";for(var i in t)t.hasOwnProperty(i)&&void 0!==t[i]&&(e+=(e.length?"&":"?")+i+"="+t[i]);return e}function r(t){var e,r=this;if("string"==typeof t&&(t={url:t}),"object"!=typeof t&&(t={}),r.settings=t,r.request=new window.XMLHttpRequest,r.settings.method=r.settings.method||"get",r.settings.cors&&("withCredentials"in r.request?r.request.withCredentials=!0:"undefined"!=typeof XDomainRequest?r.request=new window.XDomainRequest:r.emit("error",new Error("Cors is not supported by this browser"))),r.settings.cache===!1&&(r.settings.data=r.settings.data||{},r.settings.data._=(new Date).getTime()),"get"===r.settings.method.toLowerCase()&&"object"==typeof r.settings.data){e=s(r.settings.url);for(var o in r.settings.data)r.settings.data.hasOwnProperty(o)&&(e[o]=r.settings.data[o]);r.settings.url=r.settings.url.split("?").shift()+n(e),r.settings.data=null}r.request.addEventListener("progress",function(t){r.emit("progress",t)},!1),r.request.addEventListener("load",function(t){var e=t.target.responseText;if(r.settings.dataType&&"json"===r.settings.dataType.toLowerCase())if(""===e)e=void 0;else if(e=i(e),e instanceof Error)return void r.emit("error",t,e);t.target.status>=400?r.emit("error",t,e):r.emit("success",t,e)},!1),r.request.addEventListener("error",function(t){r.emit("error",t)},!1),r.request.addEventListener("abort",function(t){r.emit("abort",t)},!1),r.request.addEventListener("loadend",function(t){r.emit("complete",t)},!1),r.request.open(r.settings.method||"get",r.settings.url,!0),r.settings.contentType!==!1&&r.request.setRequestHeader("Content-Type",r.settings.contentType||"application/json; charset=utf-8"),r.request.setRequestHeader("X-Requested-With",r.settings.requestedWith||"XMLHttpRequest"),r.settings.auth&&r.request.setRequestHeader("Authorization",r.settings.auth);for(var a in r.settings.headers)r.request.setRequestHeader(a,r.settings.headers[a]);r.settings.processData!==!1&&"json"===r.settings.dataType&&(r.settings.data=JSON.stringify(r.settings.data))}var o=t("events").EventEmitter;r.prototype=Object.create(o.prototype),r.prototype.send=function(){this.request.send(this.settings.data&&this.settings.data)},e.exports=r},{events:2}],4:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=i(t("../modules/dom")),r=function o(){var t=void 0===arguments[0]?600:arguments[0],e=void 0===arguments[1]?400:arguments[1];s(this,o);var i=n.createElement("canvas"),r=i.getContext("2d");return i.width=t,i.height=e,r.translate(-.5,-.5),n.load(function(){n.add(i,"body")}),{canvas:i,ctx:r}};e.exports=r},{"../modules/dom":9}],5:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=i(t("./map")),o=i(t("../modules/loader")),a=i(t("./mob")),l=i(t("../modules/dom")),u=function(){function t(){n(this,t),this.maps={},this.currentMap=null,this.finished=!1}return s(t,null,{add:{value:function(t){var e=l.loadStorage("mobs");this.maps[t.name]=new r(t),this.maps[t.name].mobs=[];for(var i=0,s=t.mobs.length;s>i;i++){var n=e[i].name,o=t.mobs[i],u={x:parseInt(o.position.x,10),y:parseInt(o.position.y,10)},c={x:parseInt(o.direction.x,10),y:parseInt(o.direction.y,10)},h=parseInt(e[i].color,10);this.maps[t.name].mobs.push(new a(n,u,c,h))}},writable:!0,configurable:!0},setMap:{value:function(t){this.currentMap=t},writable:!0,configurable:!0},load:{value:function(t){var e=this,i="./data/levels/"+t+".json";o.loadAjax(i,function(t,i){if("success"===t){var s=JSON.parse(i);e.add(s)}})},writable:!0,configurable:!0},triggerGates:{value:function(t){for(var e=0,i=t.data.length;i>e;e++)switch(t.data[e]){case"o":t.data[e]="c";break;case"c":t.data[e]="o"}},writable:!0,configurable:!0},updateMobs:{value:function(){for(var t=0,e=this.maps[this.currentMap].mobs.length;e>t;t++)this.updateMob(this.maps[this.currentMap].mobs[t]);return this.checkCollisions(),this.finished},writable:!0,configurable:!0},updateMob:{value:function(t){{var e=this.maps[this.currentMap],i=t.getNextPosition(),s=e.getKeyForCoordinates(i),n=e.data[s];t.position}n.match(/[\.o]/)?t.setPosition(i):(t.rotate(),i=t.getNextPosition(),s=e.getKeyForCoordinates(i),n=e.data[s],n.match(/[\.o]/)?t.setPosition(i):(t.rotate(),t.rotate(),i=t.getNextPosition(),s=e.getKeyForCoordinates(i),n=e.data[s],n.match(/[\.o]/)?t.setPosition(i):console.warn("mob stuck")))},writable:!0,configurable:!0},checkCollisions:{value:function(){for(var t=[],e=this.maps[this.currentMap].mobs,i=[],s=0,n=e.length;n>s;s++)for(var r=e[s],o=0,a=r.bodyParts.length;a>o;o++)t.push({mob:s,part:o,position:r.bodyParts[o]});for(var s=0,n=t.length;n>s;s++)for(var l=t[s],o=0,a=e.length;a>o;o++){var u=e[o];if(u.position.x===l.position.x&&u.position.y===l.position.y){var c=e[l.mob];c.bodyParts.length=o,c.length=o+1,u.addBodyPart(),c.length<c.minLength&&i.push(l.mob)}}i=i.sort(function(t,e){return e-t});for(var s=0,n=i.length;n>s;s++)e.splice(i[s],1),1===e.length&&(this.finished=e[0])},writable:!0,configurable:!0}}),t}();e.exports=u},{"../modules/dom":9,"../modules/loader":11,"./map":7,"./mob":8}],6:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=i(t("../modules/dom")),o={},a=function(){function t(){var e=void 0===arguments[0]?this:arguments[0],i=void 0===arguments[1]?1e3/60:arguments[1],s=void 0===arguments[2]?null:arguments[2],r=void 0===arguments[3]?null:arguments[3];n(this,t),o.frameTime=i,o.pause=!0,o.update=s.bind(e),o.draw=r.bind(e)}return s(t,null,{start:{value:function(){o.pause=!1,o.startTime=(new Date).getTime(),o.timeSinceLastUpdate=0,this.tick(0)},writable:!0,configurable:!0},stop:{value:function(){o.pause=!0},writable:!0,configurable:!0},isRunning:{value:function(){return o.pause},writable:!0,configurable:!0},tick:{value:function(t){if(!o.pause){var e=(new Date).getTime()-o.startTime,i=t-e;o.timeSinceLastUpdate+=i,o.timeSinceLastUpdate>o.frameTime&&(null!==o.update&&o.update(o.timeSinceLastUpdate),o.timeSinceLastUpdate=0),null!==o.draw&&o.draw(),r.requestAnimationFrame(this.tick,this)}},writable:!0,configurable:!0}}),t}();e.exports=a},{"../modules/dom":9}],7:[function(t,e){"use strict";var i=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(e){s(this,t),this.width=e.width,this.height=e.height,this.data=e.data}return i(t,null,{getCoordinatesForKey:{value:function(t){return{x:0===t?0:Math.floor(t/this.width),y:0===t?0:t%this.width}},writable:!0,configurable:!0},getKeyForCoordinates:{value:function(t){return t.y*this.width+t.x},writable:!0,configurable:!0},isKeyValid:{value:function(t){return t>0&&t<=this.data.length},writable:!0,configurable:!0},isCoordinatesValid:{value:function(t){var e=t.x>=0&&t.x<this.width,i=t.y>=0&&t.y<this.height;return e&&i},writable:!0,configurable:!0}}),t}();e.exports=n},{}],8:[function(t,e){"use strict";var i=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(e,i,n){var r=void 0===arguments[3]?Math.floor(Math.random(360)):arguments[3];s(this,t),this.name=e,this.length=5,this.minLength=3,this.color=r,this.position={x:i.x||0,y:i.y||0},this.direction={x:n.x||0,y:n.y||0},this.rotation=0,this.bodyParts=[];for(var o=0,a=this.length-1;a>o;o++)this.addBodyPart()}return i(t,null,{addBodyPart:{value:function(){var t;if(0===this.bodyParts.length)t={x:this.position.x,y:this.position.y};else{var e=this.bodyParts[this.bodyParts.length-1];t={x:e.x,y:e.y}}this.bodyParts.push(t)},writable:!0,configurable:!0},setPosition:{value:function(t){var e={x:this.position.x,y:this.position.y};this.position.x=t.x,this.position.y=t.y,this.updateBodyParts(e)},writable:!0,configurable:!0},setDirection:{value:function(t){if("object"==typeof t)this.direction.x=t.x,this.direction.y=t.y;else if("string"==typeof t){var e=0,i=0,s=Math.PI/180;switch(t){case"right":e=1,i=0,this.rotation=180*s;break;case"left":e=-1,i=0,this.rotation=0;break;case"up":e=0,i=-1,this.rotation=90*s;break;case"down":e=0,i=1,this.rotation=270*s}this.direction.x=e,this.direction.y=i}},writable:!0,configurable:!0},getDirection:{value:function(){var t=void 0===arguments[0]?!1:arguments[0];return t?this.getDirectionAsString():this.direction},writable:!0,configurable:!0},getDirectionAsString:{value:function(){var t;return 1===this.direction.x?t="right":-1===this.direction.x?t="left":1===this.direction.y?t="down":-1===this.direction.y&&(t="up"),t},writable:!0,configurable:!0},rotate:{value:function(){var t=void 0===arguments[0]?!0:arguments[0];if(t)switch(this.getDirection(!0)){case"left":this.setDirection("up");break;case"right":this.setDirection("down");break;case"up":this.setDirection("right");break;case"down":this.setDirection("left")}else this.rotate(),this.rotate(),this.rotate()},writable:!0,configurable:!0},getNextPosition:{value:function(){return{x:this.position.x+this.direction.x,y:this.position.y+this.direction.y}},writable:!0,configurable:!0},updateBodyParts:{value:function(t){for(var e={x:t.x,y:t.y},i=0,s=this.bodyParts.length;s>i;i++){var n=this.bodyParts[i];if(n.x!==e.x||n.y!==e.y){var r={x:this.bodyParts[i].x,y:this.bodyParts[i].y};this.bodyParts[i].x=e.x,this.bodyParts[i].y=e.y,e.x=r.x,e.y=r.y}}},writable:!0,configurable:!0}}),t}();e.exports=n},{}],9:[function(t,e){"use strict";var i=window,s=i.document,n={};n.createElement=function(t){return s.createElement(t)},n.load=function(t){i.onload=t},n.add=function(t,e){s.querySelector(e).appendChild(t)},n.requestAnimationFrame=function(t,e){i.requestAnimationFrame(t.bind(e))},n.eventListener=function(t,e,s,n){e===!0?i.addEventListener(s,n.bind(t),!1):i.removeEventListener(s)},n.setTimeout=function(t,e){i.setTimeout(function(){t()},e)},n.saveStorage=function(t,e){i.localStorage.setItem(t,JSON.stringify(e))},n.loadStorage=function(t){var e=i.localStorage.getItem(t);return JSON.parse(e)},n.setStyles=function(){var t=s.querySelector("body");t.style.backgroundColor="hsl(90, 30%, 30%)",t.style.textAlign="center"},n.reload=function(){i.location.reload()},e.exports=n},{}],10:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=i(t("./dom")),o=function(){function t(){n(this,t),this.bindKeyboard(),this.activeKeys=[]}return s(t,null,{bindKeyboard:{value:function(){r.eventListener(this,!0,"keydown",this.keyPressed),r.eventListener(this,!0,"keyup",this.keyReleased)},writable:!0,configurable:!0},keyPressed:{value:function(t){-1===this.activeKeys.indexOf(t.keyCode)&&this.activeKeys.push(t.keyCode)},writable:!0,configurable:!0},keyReleased:{value:function(t){var e=this.activeKeys.indexOf(t.keyCode);-1!==e&&this.activeKeys.splice(e,1)},writable:!0,configurable:!0},getDirection:{value:function(){var t=-1!==this.activeKeys.indexOf(37)?-1:0,e=-1!==this.activeKeys.indexOf(39)?1:0,i=-1!==this.activeKeys.indexOf(38)?-1:0,s=-1!==this.activeKeys.indexOf(40)?1:0;return{x:t+e,y:i+s}},writable:!0,configurable:!0},isKeyPressed:{value:function(){return this.activeKeys.length>0},writable:!0,configurable:!0}}),t}();e.exports=new o},{"./dom":9}],11:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=i(t("simple-ajax")),o=(i(t("./dom")),function(){function t(){n(this,t),this.loaded=!1,this.filesLoaded=0,this.filesToLoad=0,this.onLoadedCallback=null}return s(t,null,{progress:{value:function(){return 0===this.filesToLoad?(this.loaded=!0,1):0===this.filesLoaded?0:this.filesLoaded/this.filesToLoad},writable:!0,configurable:!0},loadAjax:{value:function(t,e){var i=this;this.loaded=!1,this.filesToLoad++,new r(t).on("success",function(t,i){e("success",i)}).on("error",function(t,i){e("error",i)}).on("complete",function(){i.filesLoaded++,1===i.progress()&&i.onLoadedCallback&&i.onLoadedCallback()}).send()},writable:!0,configurable:!0},loadImg:{value:function(t,e){var i=this;this.loaded=!1,this.filesToLoad++;var s=new Image;return s.onload=function(){i.filesLoaded++,1===i.progress()&&i.onLoadedCallback&&i.onLoadedCallback(),"function"==typeof e&&e()},s.src=t,s},writable:!0,configurable:!0},onLoaded:{value:function(t,e){this.onLoadedCallback=e.bind(t)},writable:!0,configurable:!0}}),t}());e.exports=new o},{"./dom":9,"simple-ajax":3}],12:[function(t,e){"use strict";var i=function(t){return t&&t.__esModule?t["default"]:t},s=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=i(t("../settings.json")),o=i(t("./loader")),a=function(){function t(){n(this,t),this.scale=[1,1],this.tileset=o.loadImg("img/tileset.png")}return s(t,null,{setDimentions:{value:function(t,e){this.width=t,this.height=e,this.tileSize=32},writable:!0,configurable:!0},setScale:{value:function(t,e){var i=this.width/t,s=this.height/e;this.tileSize=i>s?s:i},writable:!0,configurable:!0},drawTile:{value:function(t,e,i){var s=void 0===arguments[3]?0:arguments[3],n=16,r=n*s,o=0,a=n,l=n,u=e,c=i,h=this.tileSize,d=this.tileSize;t.drawImage(this.tileset,r,o,a,l,u,c,h,d)},writable:!0,configurable:!0},drawLoader:{value:function(t,e){this.clearLoader(t),t.fillStyle="hsl(270, 50%, 60%)",t.strokeStyle="hsl(270, 50%, 60%)",t.save(),t.translate(.5*this.width,.5*this.height),t.strokeRect(-50,-5,100,10),t.fillRect(-50,-5,Math.floor(100*e),10),t.restore()},writable:!0,configurable:!0},clearLoader:{value:function(t){t.save(),t.translate(.5*this.width,.5*this.height),t.clearRect(-51,-6,102,12),t.restore()},writable:!0,configurable:!0},drawMap:{value:function(t,e){this.setScale(e.width,e.height);for(var i=0,s=0,n=0,r=e.data.length;r>n;n++){switch(e.data[n]){case"X":break;case"c":this.drawTile(t,i,s,0);break;case"o":this.drawTile(t,i,s,1);break;default:this.drawTile(t,i,s,1)}n%e.width===e.width-1?(i=0,s+=this.tileSize):i+=this.tileSize}},writable:!0,configurable:!0},drawMobs:{value:function(t,e,i){this.setScale(i.width,i.height);for(var s=.7*this.tileSize,n=.5*(this.tileSize-s),r=0,o=e.length;o>r;r++){var a=e[r],l=a.position.x,u=a.position.y;t.save(),t.translate(a.position.x*this.tileSize+.5*this.tileSize,a.position.y*this.tileSize+.5*this.tileSize),t.rotate(a.rotation),t.translate(-(.5*this.tileSize),-(.5*this.tileSize)),t.fillStyle="hsl("+a.color+", 50%, 60%)",t.fillRect(n,n,s,s),this.drawTile(t,0,0,2),t.restore();for(var c=0,h=a.bodyParts.length;h>c;c++){var d=a.bodyParts[c],f=c+1===h?!0:!1;if(l===d.x&&u===d.y)break;t.save(),t.translate(d.x*this.tileSize,d.y*this.tileSize),t.fillStyle=f?"hsl("+this.addColorValue(a.color,40)+", 50%, 60%)":"hsl("+this.addColorValue(a.color,20)+", 50%, 60%)",t.fillRect(n,n,s,s),this.drawTile(t,0,0,3),t.restore(),l=d.x,u=d.y}}},writable:!0,configurable:!0},addColorValue:{value:function(t,e){var i=t+e;return i>360&&(i-=360),i},writable:!0,configurable:!0},drawCountdown:{value:function(t,e){t.fillStyle="hsl(0, 30%, 90%)",t.font="100px Georgia",t.textAlign="center",t.fillText(e,.5*r.width,.5*r.height)},writable:!0,configurable:!0},drawInstructions:{value:function(t){t.fillStyle="hsl(0, 30%, 90%)",t.font="30px Georgia",t.textAlign="center",t.save(),t.translate(.5*r.width,.5*r.height),t.fillText("Pick a snake to win",0,-70),t.font="40px Georgia",t.fillText("Press any key to open and close the gates",0,0),t.font="30px Georgia",t.fillText("The last snake alive wins",0,70),t.restore(),t.font="15px Georgia",t.fillText("The game will start within 5 seconds",.5*r.width,r.height-30)},writable:!0,configurable:!0},drawEnd:{value:function(t,e){t.fillStyle="hsl(0, 30%, 90%)",t.font="30px Georgia",t.textAlign="center",t.save(),t.translate(.5*r.width,.5*r.height),t.fillText("The winner is:",0,-30),t.font="40px Georgia",t.fillText(e.name,0,10),t.restore(),t.font="15px Georgia",t.fillText("The game will restart automatically",.5*r.width,r.height-30)},writable:!0,configurable:!0}}),t}();e.exports=new a},{"../settings.json":13,"./loader":11}],13:[function(t,e){e.exports={width:"800",height:"600",mobs:[{name:"Rose",color:"0"},{name:"Emerald",color:"90"},{name:"Azura",color:"180"},{name:"Viola",color:"270"}]}},{}]},{},[1]);
//# sourceMappingURL=bundle.js.map