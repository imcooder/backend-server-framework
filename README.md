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
    allowCross: false, //disable cross access
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
###自动路由 寻址方式：
#### controller 名称必须为xxxx_controller.js 才会被路由
#### js中函数名称 为xxxAction 才会被export
#### 寻址可以多层
### 暂时不支持自动重新加载， 动态修改后 必须重启服务
### http://127.0.0.1:8090/api/server/health 对应：
 1. server_controller.js 中的healthAction function
 2. server/health_controller.js 中的indexAction function （不建议使用）

detail in: 
https://github.com/imcooder/express-autoload-router


## Example

See [example](example/).

## License

The [MIT License](LICENSE)
