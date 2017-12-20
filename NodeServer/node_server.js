#!/usr/bin/env node

const GuacamoleLite = require('guacamole-lite');
var cluster = require('cluster');
const websocketOptions = {
    port: 8291 // we will accept connections to this port 
};
 
const guacdOptions = {
    port: 4822 // port of guacd 
};
 
const clientOptions = {
    crypt: {
        cypher: 'AES-256-CTR',
        key: 'MySuperSecretKeyForParamsToken12'
    },
    connectionDefaultSettings: {
                rdp: {
                    'args': 'connect',
                    'port': '3389',
                    'width': 1024,
                    'height': 768,
                    'dpi': 96,
		    'ignore-cert':true,
	            'security': 'any'
                },
                vnc: {
                    'args': 'connect',
                    'port': '5901',
                    'width': 1024,
                    'height': 768,
                    'dpi': 96,
                }
            }

};
if(cluster.isMaster){
    for(var i = 0; i < 6; i++){
		cluster.fork();
    }
}else{

    const guacServer = new GuacamoleLite(websocketOptions, guacdOptions, clientOptions);
}
