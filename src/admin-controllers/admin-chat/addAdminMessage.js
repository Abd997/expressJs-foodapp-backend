const AdminCollection = require("../../collections/Admin");

const addUserMessage = async (userId, adminId, message) => {
    try {
        const messages = await AdminCollection.find({ userId: userId, adminId: adminId })
        if (!messages) {
            const newMessages = await AdminCollection.create({
                userId: userId, adminId: adminId, messages: [
                    {
                        text: message,
                        sentBy: "admin"
                    }
                ]
            })
            return await AdminCollection.find({ userId: userId, adminId: adminId }).populate({path:"userId", select:"socketId"})
        }
        else {
            messages.messages.push({
                text: message,
                sentBy: "admin"
            });
            await messages.save();
            return await AdminCollection.find({ userId: userId, adminId: adminId }).populate({path:"userId", select:"socketId"})
        }
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = addUserMessage;