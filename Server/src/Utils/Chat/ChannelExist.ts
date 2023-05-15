import Channel from "../../Models/Channel";

const channelExist: (channelId: number) => Promise<boolean> = async (channelId: number): Promise<boolean> => {
    const res = await Channel.findOne({ where: { idChannel: channelId } });

    return !!res;
}

export default channelExist;