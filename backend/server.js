require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const router = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ACTIONS = require("./actions.js");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected");
});

mongoose.connection.on("error", (err) => {
    console.log("Error", err);
});

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    })
);
app.use(express.json({ limit: "10mb" }));
app.use("/storage", express.static("storage"));
app.use(router);
app.get("/", (req, res, next) => {
    res.send("Welcome to voicey");
});

// <---------- Socket.io logic ahead ---------->

const socketUserMapping = {};

io.on("connection", (socket) => {
    //<---------- User Joining ---------->
    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMapping[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });
            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId],
            });
        });
        socket.join(roomId);
    });

    //<---------- RELAY ICE ---------->
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    //<---------- RELAY SDP ---------->
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    //<---------- REMOVE PEER ---------->
    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    //<---------- LEAVING THE ROOM ---------->
    const leaveRoom = ({ roomId }) => {
        const { rooms } = socket;
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );
            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id].id
                        ? socketUserMapping[socket.id].id
                        : socketUserMapping[socket.id]
                });
                // socket.emit(ACTIONS.REMOVE_PEER, {
                //     peerId: clientId,
                //     userId: socketUserMapping[clientId]._id
                // });
            });

            socket.leave(roomId);
        });

        delete socketUserMapping[socket.id];
    };
    socket.on(ACTIONS.LEAVE, leaveRoom);
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
