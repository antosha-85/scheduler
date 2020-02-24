import React from 'react';
import "components/InterviewerList.scss";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem';

InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  
export default function InterviewerList(props) {

    const InterviewerClassList = classnames("interviewers")

    const renderInterviewers = props.interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.id === props.value} setInterviewer={() => props.onChange(interviewer.id)} />)
    return (
        <section className={InterviewerClassList}>
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">{renderInterviewers}</ul>
        </section>
    )
}