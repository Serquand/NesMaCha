import "../../styles/css/index.css";

const InputField = (props) => {
    const { img, input, className } = props;


    return (
        <div className={`input-field ${className}`}>
            <img src={img.icon} alt={img.alt} />

            <input 
                id={input.id} 
                type={input.type || "text"}
                placeholder={input.placeholder}
                ref={input.ref}
                min={input.type == "number" ? input.min : ""}
            />
        </div>
    )
}

export default InputField;