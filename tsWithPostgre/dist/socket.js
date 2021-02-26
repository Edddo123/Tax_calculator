"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let io;
module.exports = {
    init: (httpServer) => {
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if (!io)
            console.log("No socket connectiob");
        return io;
    },
};
