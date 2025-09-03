import { isValid } from 'date-fns'

export const validateDate = ({day, month, year}) => {
    const errors = {}

    if (!day) errors.day = "This field is requiered"
    else if (day < 1 || day > 31) errors.day = "Must be a valid date"

    if (!month) errors.month = "This field is requiered"
    else if (month < 1 || month > 12) errors.month = "Must be a valid month"

    if (!year) errors.year = "This field is requiered"
    else if (year > new Date().getFullYear()) errors.year = "Must be in the past"

    const date = new Date(year, month - 1, day)

    if (!isValid(date) || date.getDate() != day || date.getMonth() != month || date.getFullYear() != year) {
        errors.day = "Must be a valid date"
    }

    return errors
}