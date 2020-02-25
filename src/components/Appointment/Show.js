import React from "react";

// const interviewers = [
//     { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//     { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//     { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//     { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//     { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
//   ];
export default function Header (props) {
    return (
        <main className="appointment__card appointment__card--show">
            <section className="appointment__card-left">
                <h2 className="text--regular">{props.student}</h2>
                <section className="interviewer">
                <h4 className="text--light">Interviewer</h4>
                <h3 className="text--regular">{props.interviewer.name}</h3>
                </section>
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                <img
                    className="appointment__actions-button"
                    src="images/edit.png"
                    alt="Edit"
                    onClick={props.onEdit}
                />
                <img
                    className="appointment__actions-button"
                    src="images/trash.png"
                    alt="Delete"
                    onClick={props.onDelete}
                />
                </section>
            </section>
        </main>
    )
}