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
            console.log(err)
            return new Error(err.message);
        }
    }
}

module.exports = new RoomService();