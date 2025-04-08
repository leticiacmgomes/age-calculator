import '../../css/Display.css'

export const Display = ({date, text}) => {
  return(
    <p><span>{date}</span> {text}</p>
  )
}