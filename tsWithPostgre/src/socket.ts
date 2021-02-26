import { Server } from "http";

let io: any;

module.exports =  {
  init: (httpServer: Server) => {
    io = require('socket.io')(httpServer);
    return io;
  },

  getIO: () => {
    if (!io) console.log("No socket connectiob");

    return io;
  },
};
