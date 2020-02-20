export default function getAppointmentsForDay(state, day) {
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


