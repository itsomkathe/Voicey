const RoomModel = require('../models/RoomModel');
class RoomService{
    async getRooms(types){
        try{
            const rooms = await RoomModel.find({ roomType: { $in: types } })
            .populate('speakers')
            .populate('ownerId')
            .exec();
            return rooms;
        }catch(err){
            console.log(err);
            return new Error(err.message);
        }
    }

    async createRoom(payload){
        const { topic, roomType, ownerId } = payload;
        try{
            const room = await RoomModel.create({
                topic,
                roomType,
                ownerId,
                speakers: [ownerId],
            });
            return room;
        }catch(err){
            console.log(err)
            return new Error(err.message);
        }
        
    }
}

module.exports = new RoomService();