import React from "react";
import "components/DayListItem.scss";
import classnames from 'classnames';


export default function DayListItem(props) {
    function formatSpots (props) {
        if (props.spots === 0) {
            return `no spots remaining`;
        } else if (props.spots === 1) {
            return (`${props.spots} spot remaining`)
        } else {
            return `${props.spots} spots remaining`;
        }
    }

    const dayClass = classnames("day-list__item", {
        "day-list__item--selected": props.selected,
        "day-list__item--full": props.spots === 0
      });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
  <h3>{formatSpots(props)}</h3>
      </li>
  );
}