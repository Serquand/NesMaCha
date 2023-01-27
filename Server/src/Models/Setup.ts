import User from './User';
import Channel from './Channel';
import Message from './Message';
import UserChannel from './UserChannel';

const setup: () => Promise<void> = async () : Promise<void> => {
    await User.sync();
    await Channel.sync();
    await Message.sync();
    await UserChannel.sync();
}

export default setup;