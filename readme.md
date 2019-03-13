![alt text](https://algomatika.com/res/img/algomatika_logo_latest.png)

# Router-Helper

created to use along with expressjs
usage:

1. in root project create folder with name controllers,
2. inside controllers folder the helper will start reading,
3. to use such as http://localhost/ please define MainController.js in controllers folder, flow:
    [project root path] --> controllers --> MainController.js
4. to create a subdirectory http://localhost/user please define UserController.js in controllers folder or you can create a folder with name user, then create MainController.js, flow:
    [project root path] --> controllers --> user --> MainController.js or  controllers --> userController.js
5. there will be an error if you do not do module.exports = router (from require('express').Router())

~~~~nodejs

//in app.js or index.js or .js that will be run to exec expressjs
const routeHelper = require('@algomatika/router-helper')
var routerPath = routeHelper(__dirname)

//the code below is just an example how to use it
Object.keys(routerPath).forEach(function(key) {
    var name = key.split('Controller')
    var path = name[0].split(global.slash)
    var pathReady = ""
    for(var x = 0;x<path.length;x++){
      if(x>0&&x===(path.length-1)&&path[x]==="Main"){
        continue
      }
      pathReady+="/"+path[x]
    }
    if(pathReady==="/Main")
      app.use('/',routerPath[key])
    else
      app.use(pathReady,routerPath[key])
})
~~~~

## ISC License (ISC)

Copyright 2019 Edwin Wicaksono

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
