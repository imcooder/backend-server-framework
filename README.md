# backend-server-framework
simple backend server framework based on httpserver

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/backend-server-framework.svg
[npm-url]: https://npmjs.com/package/backend-server-framework
[download-image]: https://img.shields.io/npm/dm/backend-server-framework.svg
[download-url]: https://npmjs.com/package/backend-server-framework
[david-image]: https://img.shields.io/david/imcooder/backend-server-framework.svg
[david-url]: https://david-dm.org/imcooder/backend-server-framework

## Install

```
npm i backend-server-framework -S
```

## Usage

```js
var fs = require('fs');
const path = require('path');
const BackendService = require('backend-server-framework');

var server = BackendService.createServer({
    port: 8090, // port
    timeout: 6 * 3600000, //request timeout
    router: [{  //router desc
        router: '/api', //path in url
        path: path.join(__dirname, './api/')  //local js controller file: filename must like xxx_controller.js
    }]
});
server.start().then(() => {
    console.log('server ready');
}).catch((error) => {
    console.error('server start failed:', error);
});
```
auto route:
domain\api\server\health -> routedir\api\server_controller.js
like: http://127.0.0.1:8090/api/server/health

api path -> api dir/*/*_controller.js
server -> server_controller.js
health -> healthAction in server-controller.js  (funciton must like xxxAction)

detail in: 
https://github.com/imcooder/express-autoload-router


## Example

See [example](example/).

## License

The [MIT License](LICENSE)