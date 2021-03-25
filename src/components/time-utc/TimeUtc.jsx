import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { timeActions } from '../../_actions';


function TimeUtc() {
    const times = useSelector(state => state.times);
   
    const [inputs, setInputs] = useState({
        time: '',
        timeZone: '',
        timeZoneInt: 0
    });
    const [submitted, setSubmitted] = useState(false);
    const { time, timeZone } = inputs;
    //const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();


    // reset login status
    useEffect(() => { 
        //dispatch(userActions.logout()); 
        console.log("useEfect")
        console.log(times)
        console.log(times.time)        
        
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (time && timeZone) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(timeActions.getTime(time, timeZone, from));
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Time Api </h2>
            
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Time</label>
                    <input type="text" name="time" value={time} onChange={handleChange} className={'form-control' + (submitted && !time ? ' is-invalid' : '')} />
                    {submitted && !time &&
                        <div className="invalid-feedback">Time is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Time UTC</label>
                    <input type="number" max="11" min="-11" name="timeZone" value={timeZone} onChange={handleChange} className={'form-control' + (submitted && !timeZone ? ' is-invalid' : '')} />
                    {submitted && !timeZone &&
                        <div className="invalid-feedback">timeZone is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {/*loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>*/}
                        Call
                    </button>
                    {/*<Link to="/register" className="btn btn-link">Register</Link>*/}
                </div>
            </form>

            {times.time &&
                        <div className="alert alert-success">Resultado: {times.time.time} {times.time.timeZone}</div>
                        
                    }

        </div>
    );
}

export { TimeUtc };