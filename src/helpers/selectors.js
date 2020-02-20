export function getAppointmentsForDay(state, day) {
    let finalResult = [];

    let filteredDays = state.days.filter(day1 => day1.name === day);
    if(filteredDays.length === 0) {
        return finalResult;
    }
    filteredDays = filteredDays[0].appointments;
    for (const item1 of filteredDays) {
        for (const item2 in state.appointments) {
            if (item1 === state.appointments[item2].id) {
                finalResult.push(state.appointments[item2]);
            } 
        }
    }
    return finalResult;
}

const state = {
    days: [
      {
        id: 1,
        name: "Monday",
        appointments: [1, 2, 3]
      },
      {
        id: 2,
        name: "Tuesday",
        appointments: [4, 5]
      }
    ],
    appointments: {
      "1": { id: 1, time: "12pm", interview: null },
      "2": { id: 2, time: "1pm", interview: null },
      "3": {
        id: 3,
        time: "2pm",
        interview: { student: "Archie Cohen", interviewer: 2 }
      },
      "4": { id: 4, time: "3pm", interview: null },
      "5": {
        id: 5,
        time: "4pm",
        interview: { student: "Chad Takahashi", interviewer: 2 }
      }
    },
    interviewers: {
      "1": {  
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      },
      "2": {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  };

export function getInterview (state, interview) {
    let finalObj = {};
    if(!interview) {
        return null;
    } else {
        for (const int in state.interviewers) {
            if (interview.interviewer === state.interviewers[int].id) {
                finalObj = {
                    "student": interview.student,
                    "interviewer": {
                        "id": state.interviewers[int].id,
                        "name": state.interviewers[int].name,
                        "avatar": state.interviewers[int].avatar
                    }
                }
            }
        }
        return finalObj;
    }
}





getInterview({
    days: [
      {
        id: 1,
        name: "Monday",
        appointments: [1, 2, 3]
      },
      {
        id: 2,
        name: "Tuesday",
        appointments: [4, 5]
      }
    ],
    appointments: {
      "1": { id: 1, time: "12pm", interview: null },
      "2": { id: 2, time: "1pm", interview: null },
      "3": {
        id: 3,
        time: "2pm",
        interview: { student: "Archie Cohen", interviewer: 2 }
      },
      "4": { id: 4, time: "3pm", interview: null },
      "5": {
        id: 5,
        time: "4pm",
        interview: { student: "Chad Takahashi", interviewer: 2 }
      }
    },
    interviewers: {
      "1": {  
        "id": 1,
        "name": "Sylvia Palmer",
        "avatar": "https://i.imgur.com/LpaY82x.png"
      },
      "2": {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }, { student: "Archie Cohen", interviewer: 1 })