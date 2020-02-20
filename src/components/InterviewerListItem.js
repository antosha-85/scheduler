import React from "react";
import "components/InterviewerListItem.scss";
import classnames from 'classnames';

export default function InterviewerListItem(props) {
    
    const InterviewerClass = classnames("interviewers__item", {
        "interviewers__item-image": true, //not sure about this one
        "interviewers__item--selected": props.selected,
        "interviewers__item--selected-image": props.selected
      });
  return (
        <li className={InterviewerClass} onClick={props.setInterviewer}>
            <img
            className={InterviewerClass} // do we need to change?
            src={props.avatar}
            alt={props.name}
            />
            {props.selected ? props.name : null}
        </li>
  );
}

