import React from 'react';
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

    function save(name, interviewer) {
        if (name && interviewer) {
            const interview = {
                student: name,
                interviewer
            }
            transition(SAVING,true);
            props.bookInterview(props.id, interview)
                .then(() => transition(SHOW))
                .catch(e => transition(ERROR_SAVE, true));
        }
    }
    
    function deleting() {
            transition(DELETING, true);
            props.cancelInterview(props.id)
                .then(() => transition(EMPTY))
                .catch(e => transition(ERROR_DELETE, true));
    }
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );


    return (
        <article data-testid="appointment" className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)} 
                    onCancel={() => transition(SHOW)}
                />
            )}

            {mode === CONFIRM && <Confirm 
            onCancel={() => back()}
            onConfirm={() => { deleting() }}    
            />}

            {mode === CREATE && (<Form interviewers={props.interviewers} 
                onCancel={() => back()}
                onSave={(name, interviewer) => { save(name, interviewer) }} />)}

            {mode === SAVING && <Status message={'Saving the appointment'} />}

            {mode === DELETING && <Status message={'Deleting the appointment'} />}

            {mode === EDIT && <Form onCancel={() => back()} interviewers={props.interviewers} 
            onSave={(name, interviewer) => { save(name, interviewer) }  } 
            name={props.interview.student} 
            interviewer={props.interview.interviewer.id}
            />}

            {mode === ERROR_SAVE && <Error message={'Error while saving'} 
             onClose={() => back()}
             />}

            {mode === ERROR_DELETE && <Error message={'Error while deleting'} 
             onClose={() => back()}
             />}

        </article>
    )
}

