/**
 * @file 文件介绍
 * @author imcooder@gmail.com
 */
/* eslint-disable fecs-camelcase */
/*jshint esversion: 6 */
var _ = require('underscore');
var fs = require('fs');
const validate = require('jsonschema').validate;
//
var Service = module.exports = {
    init: function() {
        console.log('[server]init');
    },
    healthAction: {
        method: ['POST', 'GET'],
        handler: function(req, res) {
            console.log('[server]health');
            let self = Service;
            res.json({
                status: 0,
                msg: "ok",
                data: {

                }
            });
            return;
        }
    }
};