export type GroupChatInformations = {
    name: string;
    id: string; 
    unseenMessage: number;
};

export type MessageChat = {
    contentMessage: string;
    nameSender: string;
    timeStampSubmit: string;
}