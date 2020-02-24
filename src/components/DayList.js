import React from 'react';
import DayListItem from 'components/DayListItem';

export default function DayList ({days, day, setDay}) {
    const renderDays = days.map(day1 => <DayListItem key={day1.id} name={day1.name} spots={day1.spots} selected={day1.name === day} setDay={setDay}/>)
    return (
        <ul>
            {renderDays}
        </ul>
    )
}