const getAdminMessages = require("../admin-controllers/admin-chat/getAdminMessages");
const addAdminMessage = require("../admin-controllers/admin-chat/addAdminMessage");
const addUserMessage = require("../controllers/user-chat/addUserMessage");
const getUserMessages = require("../controllers/user-chat/getUserMessages");
const { verifyUserToken, verifyAdminToken } = require("../utils/chatVerifyToken");

module.exports = (io) => {

    io.on('connection', (socket) => {

        socket.on('user-connect', async (token) => {
            const user = await verifyUserToken(token, socket.id);
            const messages = getUserMessages(user._id)
            io.to(socket.id).emit("recieve-messages", messages)
        });

        socket.on('admin-connect', async (token) => {
            const admin = await verifyAdminToken(token, socket.id)
            const messages = await getAdminMessages(admin._id)
            io.to(socket.id).emit("recieve-messages", messages)
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("send-message-to-admin", async (userId, adminId, message) => {
            const newMessages = await addUserMessage(userId, adminId, message);
            io.to(newMessages.adminId.socketId).emit("recieve-new-messages", newMessages);

        })
        socket.on("send-message-to-user", async (userId, adminId, message) => {
            const newMessages = await addAdminMessage(userId, adminId, message);
            io.to(newMessages.userId.socketId).emit("recieve-new-messages", newMessages);
        })


    })
}