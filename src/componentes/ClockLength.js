import React from 'react';

const ClockLength = props => {
    const idLabel = props.type === 'Break' ? 'break-label' : 'session-label';
    const idDecrement = props.type === 'Break' ? 'break-decrement' : 'session-decrement';
    const idIncrement = props.type === 'Break' ? 'break-increment' : 'session-increment';
    const idLength = props.type === 'Break' ? 'break-length' : 'session-length';

    return (
        <div className="col-md-6 mt-2 mt-md-5">
            <div className="row justify-content-center align-items-center">
                <p className="col-12 text-center" id={idLabel}>{props.type} Length</p>
                <button className="btn shadow-none" id={idDecrement} value="-" onClick={props.onClick}>
                    <i className="fas fa-minus-square fa-2x"></i>
                </button>
                <p className="font-weight-bolder m-0 align-self-center" id={idLength}>{props.length}</p> 
                <audio id="beep" src="https://goo.gl/65cBl1" />
                <button className="btn shadow-none" id={idIncrement} value="+" onClick={props.onClick}>
                    <i className="fas fa-plus-square fa-2x"></i>
                </button>                        
            </div>
        </div>
    );
}

export default ClockLength;