import User from './User';

const setup: () => Promise<void> = async () : Promise<void> => {
    await User.sync();
}

export default setup;