import User from './User';
import Channel from './Channel';
import Message from './Message';
import UserChannel from './UserChannel';
import Adress from './Adress';
import CarPoolingModel from './CarPoolingModel';
import Passenger from './Passenger';

const setup: () => Promise<void> = async () : Promise<void> => {
    await User.sync();
    await Channel.sync();
    await Message.sync();
    await UserChannel.sync();
    await Adress.sync();
    await CarPoolingModel.sync();
    await Passenger.sync();
}

export default setup;