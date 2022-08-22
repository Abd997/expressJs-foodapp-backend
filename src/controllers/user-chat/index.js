const server = require("../../app");
const io = require("socket.io")(server);
io.attach(server, {
    // includes local domain to avoid CORS error locally
    // configure it accordingly for production
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
      transports: ['websocket', 'polling'],
    },
    allowEIO3: true,
  })

console.log("Socket.io server started");
 
io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    socket.on("chat message", (msg) => {
        console.log("Message: " + msg);
        io.emit("chat message", msg);
    });
    socket.on("typing", () => {
        socket.broadcast.emit("typing", socket.id);
    });
    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", socket.id);
    });
    socket.on("join", (room) => {
        socket.join(room);
    });
    socket.on("leave", (room) => {
        socket.leave(room);
    });
    socket.on("send message", (msg, room) => {
        io.to(room).emit("message", msg);
    });
    socket.on("send message to", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
    socket.on("send message to user", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
    socket.on("send message to user", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
    socket.on("send message to user", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
    socket.on("send message to user", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
    socket.on("send message to user", (msg, room) => {
        socket.to(room).emit("message", msg);
    });
});
