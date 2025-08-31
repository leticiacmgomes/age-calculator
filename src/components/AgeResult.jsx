export const AgeResult = ({userAge}) => {
    return (
        <div className="age-result">
            <p><span>{userAge.years}</span> years</p>
            <p><span>{userAge.months}</span> months</p>
            <p><span>{userAge.days}</span> days</p>
        </div>
    )
}