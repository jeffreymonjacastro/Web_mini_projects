import { useEffect, useState } from 'react'
import '../scss/pages/calendar.scss'

const Day = ({ num, clase }: { num: number; clase: string }) => {
  return (
    <div className={`calendar__item ${clase}`}>{num}</div>
  )
}

export const Calendar = () => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December']

  const currentDate = new Date()

  const [date, setDate] = useState(new Date())
  const [days, setDays] = useState([] as JSX.Element[])

  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()

  // Writes the correct number of days of the month in the calendar
  const writeMonth = (month: number) => {
    let num = 32;
    const daysArray: JSX.Element[] = [];

    for (let i = startDay(); i > 0; i--) {
      daysArray.push(<Day key={num} num={getTotalDays(month-1)-(i-1)} clase="calendar__last-days"/>);
      num++
    }
    
    for (let i = 1; i <= getTotalDays(month); i++) {
      if (i === day && month === currentDate.getMonth() && year === currentDate.getFullYear())
        daysArray.push(<Day key={i} num={i} clase="calendar__today" />);
      else
        daysArray.push(<Day key={i} num={i} clase=""/>);
    }

    for (let i = 1; i <= (6-endDay()); i++) {
      daysArray.push(<Day key={num} num={i} clase="calendar__next-days"/>);
      num++
    }

    setDays(daysArray)
  };

  // Returns the total days of the month
  const getTotalDays = (month: number) => {
    if (month === -1)
      month = 11
      
    if (month % 2 === 0)
      return 31
    else if (month === 1)
      return isLeap(year) ? 29 : 28
    else
      return 30
  }

  // Returns true if the year is leap
  const isLeap = (year: number): boolean => {
    return (year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)
  }  

  // Returns where the week start
  const startDay = () => {
    let start = new Date(year, month, 1)

    return ((start.getDay()-1 === -1) ? 6 : start.getDay() -1 )
  }

  // Returns where the week ends
  const endDay = () => {
    let end = new Date(year, month, getTotalDays(month))   

    return ((end.getDay()-1 === -1) ? 6 : end.getDay() -1 )
  }

  // Is used to avoid errors when clicking the previous month
  const lastMonth = () => {    
    if (month !== 0) {
      month--
    } else {
      month = 11
      year--
    }

    setNewDate()
  }

  // Is used to avoid errors when clicking the next month
  const nextMonth = () => {
    if (month !== 11) {
      month++
    } else {
      month = 0
      year++
    }

    setNewDate()
  }

  const setNewDate = () => {
    let newDate = new Date(year, month, day)
    setDate(newDate)

    writeMonth(month)
  }

  useEffect(() => {
    writeMonth(month)
  }, [])

  return (
    <main className="calendar-main">
      <article className="calendar-container">
        <h2> Calendario Interactivo </h2>

        <section className="calendar-calendario">
          <div className="calendar__info">
            <div 
              className="calendar__prev"
              onClick={lastMonth}  
            >&#9664;</div>
            <div className="calendar__month">{ monthNames[month] }</div>
            <div className="calendar__year">{ year }</div>
            <div 
              className="calendar__next"
              onClick={nextMonth}
            >&#9654;</div>
          </div>

          <div className="calendar__week">
            <div className="calendar__item"><b>M</b></div>
            <div className="calendar__item"><b>T</b></div>
            <div className="calendar__item"><b>W</b></div>
            <div className="calendar__item"><b>T</b></div>
            <div className="calendar__item"><b>F</b></div>
            <div className="calendar__item"><b>S</b></div>
            <div className="calendar__item"><b>S</b></div>
          </div>

          <div className="calendar__dates"> { days } </div>
        </section>
      </article>
    </main>
  )
}
