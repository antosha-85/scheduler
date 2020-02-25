import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const BOOK_INTERVIEW = "BOOK_INTERVIEW";
const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case BOOK_INTERVIEW: {
      return {...state,
        appointments: action.appointments, days: action.days}}
    case CANCEL_INTERVIEW: {
      return {...state,
        appointments: action.appointments, days: action.days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
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

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: CANCEL_INTERVIEW, appointments, days });
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
//       .then(() => {
//         setState({
//           ...state,
//           appointments
//         }
//         );
//       })
//   }

//   function cancelInterview(id) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: null
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
//       .then(() => {
//         setState({
//           ...state,
//           appointments
//         }
//         );
//       })
//   }
//   const setDay = day => setState({ ...state, day });

//   useEffect(() => {
//     Promise.all([
//       axios.get(`http://localhost:8001/api/days`),
//       axios.get(`http://localhost:8001/api/appointments`),
//       axios.get(`http://localhost:8001/api/interviewers`)
//     ])
//       .then((all) => {
//         setState(state => ({ ...state, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
//       })
//       .catch(err => {
//         console.error('ERRRROROROROR', err)
//       })
//   }, [])

//   }