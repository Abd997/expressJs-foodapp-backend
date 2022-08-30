const ChatCollection = require("../../collections/Chat");

const addUserMessage = async (userId, adminId, message) => {
    try {
        const messages = await ChatCollection.find({ userId: userId, adminId: adminId })
        if (!messages) {
            const newMessages = await ChatCollection.create({
                userId: userId, adminId: adminId, messages: [
                    {
                        text: message,
                        sentBy: "user"
                    }
                ]
            })
            return await ChatCollection.find({ userId: userId, adminId: adminId }).populate({path:"adminId", select:"socketId"})
        }
        else {
            messages.messages.push({
                text: message,
                sentBy: "user"
            });
            await messages.save();
            return await ChatCollection.find({ userId: userId, adminId: adminId }).populate({path:"adminId", select:"socketId"})
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = addUserMessage;