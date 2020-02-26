export default function reducer(state, action) {
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


const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const BOOK_INTERVIEW = "BOOK_INTERVIEW";
const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";
const SET_DAY = "SET_DAY";

export {
    SET_DAY,
    SET_APPLICATION_DATA,
    BOOK_INTERVIEW,
    CANCEL_INTERVIEW
}