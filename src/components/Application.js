import React, { useState, useEffect } from "react";
import DayList from "components/DayList"
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios";





const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Anton Smirnov",
      interviewer: {
        id: 2,
        name: "Hafiz Suara",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Mohamed Chehade",
      interviewer: {
        id: 3,
        name: "Roger Kondrat",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Ahmed Yagoub",
      interviewer: {
        id: 4,
        name: "Joel Tannas",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  }

];


export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}
  })
  const setDay = day => setState(state => ({ ...state, day }));
  const setDays = days => setState(state => ({...state, days}));
  // const [day, setDay] = useState("Monday");
  
    const appointmentList = appointments.map(appointment => <Appointment key={appointment.id} {...appointment} />
    );
    
    // const [days, setDays] = useState([]);
    useEffect(() => { 
      axios.get(`http://localhost:8001/api/days`)
        .then(function (res) {
          setDays (res.data);
        })
        .catch(err => {
          console.error('ERRRROROROROR', err)
        })
    }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
            {appointmentList}
            <Appointment key="last" time="5pm" />
        </section>
      
    </main>
  );
}

