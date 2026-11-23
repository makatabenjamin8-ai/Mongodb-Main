import { authenticateSocket } from "../scr/middleware/auth.js";

export const registerChatSocket = (io) => {
    const activeUsers = new Map();
    const isValidUserId = (id) =>
        typeof id === "string" && /^[a-f\d]{24}$/i.test(id);

    const broadcasterActiveUsers = () => {
        io.emit("active user", Array.from(activeUsers.values()));
    }

    const acknowledge = (callback, response) =>{
        if (typeof callback === "function") {
            callback(response)
        }
    };

    io.use(authenticateSocket);

    io.on("connection", (socket) => {

        const { id, userName } = socket.data.user;
        const userId = String(id)
        const existingUser = activeUsers.get(userId)

        socket.join(`user:${userId}`);
        
        activeUsers.set(userId, {
            id: userId,
            userName,
            connection: (existingUser?.connection ?? 0) + 1,
        });
        broadcasterActiveUsers();

        socket.on("chat message", (message) => {
            if (typeof message !== "string" || !message.trim()) {
                return;
        }

        io.emit("chat message", {
            userName,
            message: message.trim(),
        });
    });

    socket.on("private message", (payload, callback) => {
        const recipientId = payload?.recipientId;
        const text = 
         typeof payload?.text === "string" ? payload.text.trim() : "";

        if (!isValidUserId(recipientId) || recipientId === userId) {
            return acknowledge(callback, {
                error: "select a valid recipient",  
            });
        }

        if(!activeUsers.has(recipientId)) {
            return acknowledge(callback, {
                error: "recipient is not online",
            });
        }

        if (!text || text.length > 2000) {
            return acknowledge(callback, {
                error: "message must be between 1 and 2000 characters",
            });
        }

        const privateMessage = {
            senderId: userId,
            senderName: userName,
            recipientId,
            message: text,
        };

        io.to(`user:${recipientId}`).emit("private message", privateMessage);
        acknowledge(callback, { message: "private message sent" });
    });

    socket.on("disconnect", () => {
        const currentUser = activeUsers.get(userId);
        if (currentUser?.connection > 1) {
            activeUsers.set(userId, {
                ...currentUser,
                connection: currentUser.connection - 1,
            });
        }else {
            activeUsers.delete(userId);
        }
        broadcasterActiveUsers();
    });
  });        
};
