import React from "react";

class VoteDone extends React.Component {
    render() {
        document.body.classList = "";
        document.body.classList.add("background-general");
        return (
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', backgroundColor: "#DEDEDE"}}>
                <h1 >Felicitari! Multumim pentru participare!</h1>
            </div>
        );
    }
}

export default VoteDone;