import "../../styles/css/index.css";

const CreateChatMember = (props) => {
    const { toggleMember, memberName, userSelected } = props;

    return (
        <div 
            onClick={toggleMember}
            className="create-chat-add-member"
        >  
            <div className="create-chat-add-member-state">
                <div 
                    className={`
                        create-chat-add-member-state-info 
                        ${userSelected ? 'create-chat-add-member-state-selected' : ''}
                    `}></div>
            </div>
            <p className="create-chat-add-member-pseudo">{memberName}</p>
        </div>
    );
}

export default CreateChatMember;