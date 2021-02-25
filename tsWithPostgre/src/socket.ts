import { Server } from "http";
import { Socket } from "socket.io";

let io: any;

module.exports = {
  init: (httpServer: Server) => {
    io = Socket(httpServer);
    return io;
  },

  getIO: () => {
    if (!io) console.log("No socket connectiob");

    return io;
  },
};
