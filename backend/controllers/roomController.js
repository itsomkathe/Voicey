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
}

module.exports = new RoomController();