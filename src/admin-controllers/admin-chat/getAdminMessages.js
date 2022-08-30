const ChatCollection = require("../../collections/Chat");

const getAdminMessages = async (adminId) => {
    try {
        const messages = await ChatCollection.find({ adminId: adminId })
        return messages;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports =  getAdminMessages;