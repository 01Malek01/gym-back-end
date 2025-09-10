const activeUsersMap = new Map();
const handelSocketConnection = function (io) {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      activeUsersMap.delete(socket.id);
    });
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("user joined", userId);
      activeUsersMap.set(socket.id, userId);
    });
    socket.on("leave", (userId) => {
      socket.leave(userId);
      console.log("user left", userId);
      activeUsersMap.delete(socket.id);
    });
  });
};

export default handelSocketConnection;
