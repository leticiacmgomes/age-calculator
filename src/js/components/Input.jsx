import '../../css/Input.css'

export const Input = ({id, handleInput, errorText, isFieldValid, placeHolder}) => {
  
  return(
    <div class="input">
      <label for={id} className={isFieldValid == false ? 'invalid' : ''}>{id}</label>
      <input id={id} className={isFieldValid == false ? 'invalid' : ''} type="number" onChange={handleInput} placeHolder={placeHolder}/>
      <span for={id} className="errorText">{errorText}</span>
    </div>
  )
}