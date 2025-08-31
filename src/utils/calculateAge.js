import { intervalToDuration } from "date-fns"

export const calculateAge = ({day, month, year}) => {
    const today = new Date()
    const birthdate = new Date(year, month - 1, day)

    return intervalToDuration({
        start: birthdate,
        end: today,
    });
}