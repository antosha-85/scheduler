import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {


    function save(name, interviewer) {
        if (name && interviewer) {
            const interview = {
                student: name,
                interviewer
            }
            transition(SAVING);
            props.bookInterview(props.id, interview)
                .then(() => transition(SHOW));
        }
    }

    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    console.log("TCL: Appointment -> appointment !!!! props", props)
    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                />
            )}
            {mode === CREATE && (<Form interviewers={props.interviewers}
                onCancel={() => back()}
                onSave={(name, interviewer) => { save(name, interviewer) }} />)}
            {mode === SAVING && <Status message={'Saving the appointment'} />}
        </article>
    )
}

