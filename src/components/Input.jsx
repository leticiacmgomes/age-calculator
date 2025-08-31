
export const Input = ({id, placeholder, labelText, onChange, error, value}) => {
    return (
        <div className={`input ${error && "invalid"}`}>
           <label htmlFor={id}>{labelText}</label>
           <input 
                value={value}
                placeholder={placeholder}
                id={id} type="number" 
                onChange={(e) => onChange(e.target.value)}
            />

           { error && <span className="error-message">{error}</span> }
        </div>
    )
}