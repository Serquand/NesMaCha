import "../../styles/css/index.css";

const Modal = (props) => {
    const { children, titleModal, nameButton, createAction, closeModal } = props;

    return (
        <section className="modal">
            <div className="modal-layout"></div>

            <div className="modal-content">
                <div className="modal-component modal-header">
                    <h4>{ titleModal }</h4>
                    <div onClick={() => closeModal() } className="cross">
                        <svg id="icon" viewBox="0 0 800 600">
                            <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200"
                                id="top"></path>
                            <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
                                id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318) "></path>
                        </svg>
                    </div>
                </div>

                <div className="modal-information modal-component">
                    { children }
                </div>

                <div className="modal-component modal-button-container">
                    <button 
                        onClick={() => createAction()}
                        className="button button-modal"
                    >{ nameButton }</button>
                </div>
            </div>
        </section>
    )
}

export default Modal;