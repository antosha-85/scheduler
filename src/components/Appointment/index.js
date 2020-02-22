import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

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
    
    function deleting(name, interviewer) {
        if (name && interviewer) {
            const interview = {
                student: name,
                interviewer
            }
            transition(DELETING);
            props.cancelInterview(props.id, interview)
                .then(() => transition(EMPTY));
        }
    }
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                />
            )}
            {mode === CONFIRM && <Confirm 
            onCancel={() => back()}
            onConfirm={(name, interviewer) => { deleting(name, interviewer) }}    
            />}
            {mode === CREATE && (<Form interviewers={props.interviewers}
                onCancel={() => back()}
                onSave={(name, interviewer) => { save(name, interviewer) }} />)}
            {mode === SAVING && <Status message={'Saving the appointment'} />}
            {mode === DELETING && <Status message={'Deleting the appointment'} />}
        </article>
    )
}

