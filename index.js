/**
 * @file 文件介绍
 * @author imcooder@gmail.com
 */
/* eslint-disable fecs-camelcase */
/* eslint-disable */
/* jshint esversion:8 */
/* jshint node:true */
'use strict';

var _ = require('underscore');
var express = require('express');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const path = require('path');
var cors = require('cors');
const loadRouter = require('express-autoload-router');

function json(status, msg, data) {
    let ret = {
        status: status || 0,
        msg: msg || '',
    };
    if (data) {
        ret.data = data;
    }
    return ret;
}
class BackendService {
    constructor(opt) {
        console.log("[backend_server]new:%j", opt);
        let self = this;
        self.opt = {
            crossOptions: null,
        };
        if (opt) {
            self.opt = _.extend(self.opt, opt);
        }
        self.express = express();
        self.app = self.express;
        self.e = express;
    }
    start() {
        console.info("[backend_server]start");
        let self = this;
        if (self.opt.middleware && _.isArray(self.opt.middleware)) {
            self.opt.middleware.forEach(mw => {
                self.express.use(mw);
            });
        }
        /*
        self.express.use(bodyParser.json({
            limit: '30mb'
        }));
        self.express.use(bodyParser.urlencoded({
            extended: true
        }));
        self.express.use(cookieParser());
        */
        if (self.opt.crossOptions !== null) {
            self.express.use(cors(self.opt.crossOptions));
        }

        if (_.isArray(self.opt.router)) {
            self.opt.router.forEach(function (item) {
                loadRouter(self.express, item.router, item.path);
            });
        }
        if (self.opt.middleware2 && _.isArray(self.opt.middleware2)) {
            self.opt.middleware2.forEach(mw => {
                self.express.use(mw);
            });
        }
        self.express.get('/', function (req, res) {
            res.send('hello world');
        });
        self.express.on('error', (error) => {
            console.error('express:error:%s', error.stack);
        });
        self.express.on('uncaughtException', (error) => {
            console.error('express::uncaughtException:', error);
            console.error('express:uncaughtException:%s', error.stack);
            return;
        });
        let p = new Promise(function (resolve, reject) {
            let port = self.opt.port || 8000;
            console.log('[backend_server]listen:%d', port);
            let host = '0.0.0.0';
            if (self.opt.host) {
                host = self.opt.host;
            }
            self.server = self.express.listen(port, host, function (error) {
                console.log('http callback:', error);
                if (_.has(self.opt, 'timeout')) {
                    self.server.timeout = self.opt.timeout;
                }
                resolve();
                return;
            }).on('error', function (error) {
                console.error('express listen error:%s', error.stack);
                if (error.code === 'EADDRINUSE') {
                    reject(error);
                    return;
                }
                resolve();
                return;
            });
        });
        return p;
    }
    stop() {
        console.log('[backend_server]stop');
        let self = this;
        if (self.server) {
            self.server.close();
            self.server = null;
        }
    }
}

module.exports.createServer = function (opt) {
    let server = new BackendService(opt);
    return server;
};
