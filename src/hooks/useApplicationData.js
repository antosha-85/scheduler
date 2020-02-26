import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {SET_DAY, SET_APPLICATION_DATA, BOOK_INTERVIEW, CANCEL_INTERVIEW} from "reducers/application"

const initialState = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {}
}

export default function useApplicationData(initial) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = day => dispatch({ type: SET_DAY, day })
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then((all) => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      })
      .catch(err => {
        console.error('ERRRROROROROR', err)
      })
  }, [])

  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = [...state.days].map(day=>{
       if(day.name === state.day) {
        return {
          ...day,
          spots: day.spots - 1
        }
      }
      return day
    })

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: BOOK_INTERVIEW , appointments, days});
      })
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = [...state.days].map(day=>{
      if(day.name === state.day) {
       return {
         ...day,
         spots: day.spots +1
       }
     }
     return day
   })

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: CANCEL_INTERVIEW, appointments, days });
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}
