import React from 'react';

const Clock = props => {
        
    let addClasses = "";
    let duration = window.moment.duration('00:' + props.time).asMilliseconds();

    if (props.running || props.paused) {
        if (duration > 60000) {
            addClasses = "time-left";
        } else {
            addClasses = "one-minute";
        }
    }
    if (props.paused) {
        addClasses = addClasses.concat(" paused");
    }

    return (
        <div className="clock col-md-8 mt-2 mt-md-5 p-4">
            <div className="row justify-content-center">
                <p className="col-12 text-center" id="timer-label">{props.clockLabel}</p>                         
                <p className={`col-12 text-center shadow ${addClasses}`} id="time-left">{props.time}</p>
            </div>
            <div className="row justify-content-center">
                <button className="btn shadow-none" id="start_stop" onClick={props.onClickStartStop}>
                    <i className="fas fa-play fa-2x"></i>
                    <i className="fas fa-pause fa-2x"></i>
                </button>
                <button className="btn shadow-none" id="reset" onClick={props.onClickReset}>
                    <i className="fas fa-sync-alt fa-2x"></i>
                </button>   
            </div>                
        </div>            
    );
}
 
export default Clock;