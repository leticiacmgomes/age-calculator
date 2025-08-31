import { useState } from 'react'
import { intervalToDuration, isValid} from 'date-fns'
import { calculateAge } from './utils/calculateAge.js'
import { validateDate } from './utils/validateDate.js'

import './App.css'

//Images
import iconArrow from './assets/images/icon-arrow.svg'

//Components
import { Input } from './components/Input.jsx'
import { AgeResult } from './components/AgeResult.jsx'

function App() {

  const [userBirthdate, setUserBirthdate] = useState({
    day: '',
    month: '',
    year: ''
  })
  
  const [userAge, setUserAge] = useState({
    days: '--',
    months: '--',
    years: '--'
  })

  const [errors, setErrors] = useState({
    day: '',
    month:'',
    year: ''
  })

  const handleChange = (field, value) => {
    setUserBirthdate({
      ...userBirthdate,
      [field]: value
    })
  }

  const handleCalculateAge = () => {
    const newErrors = validateDate(userBirthdate)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setUserAge({
        days: '--', 
        months: '--',
        years:'--'
      })
      return
    }
    setUserAge(calculateAge(userBirthdate))
  }

  return (
    <div className='age-calculator'>
      <form className='age-form'>
        <Input 
          value={userBirthdate.day}
          placeholder="DD"
          id="day" labelText="day" 
          onChange={(value) => handleChange("day", value)} 
          error={errors.day}
        />
        <Input
          value={userBirthdate.month}
          placeholder="MM"
          id="month" 
          labelText="month" 
          onChange={(value) => handleChange("month", value)} 
          error={errors.month}
        />
        <Input
          value={userBirthdate.year} 
          placeholder="YYYY"
          id="year" 
          labelText="year" 
          onChange={(value) => handleChange("year", value)} 
          error={errors.year}
        />
      </form>

      <div className='divider'>
        <hr />
        <img src={iconArrow} alt="Ícone de seta" onClick={handleCalculateAge}/>
      </div>

      <AgeResult userAge={userAge}/>

    </div>
  )
}

export default App
