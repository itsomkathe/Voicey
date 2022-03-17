const RoomService = require('../services/roomService');
class RoomController{
    async getRooms(req, res){
        try{
            const rooms = await RoomService.getRooms(['open']);            
            res.json(rooms);
        }catch(err){
            console.log(err)
            res.status(400).json({error: err.message ? err.message : "Internal Server Error"});
        }
    }

    async createRoom(req, res){
        const { topic, roomType } = req.body;
        
        if (!topic || !roomType) {
            return res
                .status(400)
                .json({ error: 'All fields are required!' });
        }
        try{
            const room = await RoomService.createRoom({
                topic,
                roomType,
                ownerId: req.user._id,
            });
    
            res.json(room);
        }catch(err){
            console.log(err);
            res.status(400).json({error: err.message ? err.message : "Internal Server Error"});
        }
    }

    async getRoom(req, res){
        try{
            const room = await RoomService.getRoom(req.params.roomId);
            res.json(room);
        }catch(err){
            console.log(err);
            res.status(400).json({error: err.message ? err.message : "Internal Server Error"});
        }
    }
}

module.exports = new RoomController();