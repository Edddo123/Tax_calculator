"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let io;
module.exports = {
    init: (httpServer) => {
        io = socket_io_1.Socket(httpServer);
        return io;
    },
    getIO: () => {
        if (!io)
            console.log("No socket connectiob");
        return io;
    },
};
