import { useState } from 'react'

import '../css/App.css'

/*import de componentes*/
import {Input} from './components/Input.jsx'
import {Display} from './components/Display.jsx'
import {Footer} from './components/Footer.jsx'

function App() {
  
  const todayDate = new Date()
  
  const [birthDate, setBirthDate] = useState({day: '', month: '', year: ''});
  const [errors, setErrors] = useState({day: '', month: '', year: ''});
  const [age, setAge] = useState({day: '- -', month: '- -', year: '- -'});
  
  const [isFieldValid, setIsFieldInvalid] = useState({day: true, month: true, year: true});
  
  const handleInput = (e) => {
    const {id, value} = e.target;
    setBirthDate((prev) => ({...prev, [id]:value}));
    setErrors((prev) => ({...prev, [id]: ''}));
    setAge({day: '- -', month: '- -', year: '- -'});
    setIsFieldInvalid((prev) => ({...prev, [id]:true}));
  }
  
  const validateDate = () => {
    const {day, month, year} = birthDate;
    let isFormValid = true;
    const newValidFlags = {}
    const newErrors = {};
    
    //Valida o dia
    if (!day) {
      newErrors.day = 'This field is required!';
      newValidFlags.day = false;
      isFormValid = false;
    } else if (day > 31 || day < 1) {
      newErrors.day = 'Must be a valid day!';
      newValidFlags.day = false;
      isFormValid = false;
    }
    
    //Valida o mês
    if (!month) {
      newErrors.month = 'This field is required!';
      newValidFlags.month = false;
      isFormValid = false;
    } else if (month > 12 || month < 1) {
      newErrors.month = 'Must be a valid month!';
      newValidFlags.month = false;
      isFormValid = false;
    }
    
    //Valida o ano
    if (!year) {
      newErrors.year = 'This field is required!';
      newValidFlags.year = false;
      isFormValid = false;
    } else if (year > todayDate.getFullYear()) {
      newErrors.year = 'Must be in the past!';
      newValidFlags.year = false;
      isFormValid = false;
    }
    
    if (!isFormValid) {
      setErrors(newErrors)
      setIsFieldInvalid(newValidFlags)
      return;
    }
    
    const testDate = new Date(year, month - 1, day)
    if (testDate.getDate() !== Number(day) || testDate.getMonth() !== Number(month - 1) || testDate.getFullYear() !== Number(year)) {
      newErrors.day = 'Must be a valid date!';
      newValidFlags.day = false;
      newValidFlags.month = false;
      newValidFlags.year = false;
      isFormValid = false;
    }
    
    setErrors(newErrors);
    setIsFieldInvalid(newValidFlags);
    return isFormValid;
  }
  
  let calculateAge = () => {
    if (!validateDate()) return;
    
    const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day)
    
    let years = todayDate.getFullYear() - birth.getFullYear()
    let months = todayDate.getMonth() - birth.getMonth()
    let days = todayDate.getDate() - birth.getDate()
    
    if(days < 0) {
      months--
      days += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate()
    }
    
    if (months < 0) {
      years--
      months += 12
    }
    
    setAge({year: years, month:months, day:days});
  }
  
  
  return (
    <div className="App">
      <div className="card">
        <section className="inputContainer">
          <Input id="day" errorText={errors.day} handleInput={handleInput} isFieldValid={isFieldValid.day} placeHolder='DD'/>
          <Input id="month" errorText={errors.month} handleInput={handleInput} isFieldValid={isFieldValid.month} placeHolder='MM'/>
          <Input id="year" errorText={errors.year} handleInput={handleInput} isFieldValid={isFieldValid.year} placeHolder='YYYY'/>
        </section>
        
        <div className="btnContainer">
          <hr />
          <button className="arrowBtn" onClick={calculateAge}></button>
        </div>
        
        <section className="displayContainer">
          <Display date={age.year} text="years"/>
          <Display date={age.month} text="months"/>
          <Display date={age.day} text="days" />
        </section>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
