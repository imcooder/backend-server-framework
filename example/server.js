/**
 * @file 文件介绍
 * @author imcooder@gmail.com
 */
/* eslint-disable fecs-camelcase */
/*jshint esversion: 6 */
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
const path = require('path');
const BackendService = require('../index');
const _ = require('underscore');
const Package = require('../package');

var server = BackendService.createServer({
    port: 8090,
    timeout: 6 * 3600000,
    router: [{
        router: '/api',
        path: path.join(__dirname, './api/')
    }]
});
server.start().then(() => {
    console.log('server ready');
}).catch((error) => {
    console.error('server start failed:', error);
});