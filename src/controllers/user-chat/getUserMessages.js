const ChatCollection = require("../../collections/Chat");

const getUserMessages = async (userId) => {
    try {
        const messages = await ChatCollection.find({ userId: userId })
        return messages;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = getUserMessages;