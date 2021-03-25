import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';

import { userTutenActions } from '../../_actions';

import axios from 'axios';
import config from 'config';

function LoginTuten() {
    
    const userTuten = useSelector(state => state.userTuten);

    const [change, setChange] = useState(0);
    const [re, setRe] = useState("");
    const [tokenS, setToken] = useState("");

    const [booking, setBooking] = useState([]);


    const [inputs, setInputs] = useState({
        user: '',
        pass: '',
        app: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const { user, pass,app } = inputs;
    
    const dispatch = useDispatch();
    
    // reset login status
    useEffect(() => { 
        
        //console.log(userTuten.sessionTokenBck)  
            console.log("ejecutar")
            //setToken(userTuten.userTuten.sessionTokenBck)
            console.log(tokenS)
            //userTutenActions.getLogin(user, pass, app, from)
            

            
        
    }); // se activa siempre 
    //}, [tokenS]); // cuando cambia esta variable
    //}, []); // solo una vez

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

      function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user && pass && app) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
              dispatch(userTutenActions.getLogin(user, pass, app, from));
            setChange(1);
            setRe("Token Encontrado"+userTuten.userTuten.sessionTokenBck);
            //setToken(userTuten.userTuten.sessionTokenBck)            
        }
    }

    function getBooking() {
        
        var current = true;
        var adminemail = "testapis@tuten.cl";
        var email = "contacto@tuten.cl";
        var app = "APP_BCK"
        var token = userTuten.sessionTokenBck

        console.log("getB "+change)
        console.log("getB2 "+token)

        setSubmitted(true);
        if (user && pass && app) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userTutenActions.getBooking(current, adminemail, email, app, tokenS, from));
            setChange(2);
        }
    }

    function LoadData(){
        //setToken(userTuten.userTuten.sessionTokenBck)
        setChange(3);
        console.log("Load "+tokenS)
        //getBooking();
       
        delete axios.defaults.headers.common["Password"];
        delete axios.defaults.headers.common["App"];
        var email ="contacto@tuten.cl";
        var current =true
        axios.defaults.headers.common['adminemail'] = 'testapis@tuten.cl';
        axios.defaults.headers.common['token'] = userTuten.userTuten.sessionTokenBck;
        axios.defaults.headers.common['App'] = "APP_BCK";
        return  axios.get(`${config.apiUrlTuten}`+email+"/bookings?current="+current)
        //.then(res => res.data); 
           .then(res => {
            console.log(res.data); 
            setBooking(res.data);
           })
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login Tuten {tokenS}</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User</label>
                    <input type="text" name="user" value={user} onChange={handleChange} className={'form-control' + (submitted && !user ? ' is-invalid' : '')} />
                    {submitted && !user &&
                        <div className="invalid-feedback">User is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Pass</label>
                    <input type="pass" name="pass" value={pass} onChange={handleChange} className={'form-control' + (submitted && !pass ? ' is-invalid' : '')} />
                    {submitted && !pass &&
                        <div className="invalid-feedback">Pass is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>App</label>
                    <input type="text" name="app" value={app} onChange={handleChange} className={'form-control' + (submitted && !app ? ' is-invalid' : '')} />
                    {submitted && !app &&
                        <div className="invalid-feedback">App is required</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">
                        {/*{loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}*/}
                        Login
                    </button>
                    {/*<Link to="/register" className="btn btn-link">Register</Link>*/}
                </div>
            </form>
            {userTuten.userTuten &&
                        <div className="alert alert-success">Success {re} </div>
                        
                        
                    }
{userTuten.userTuten &&
            <button className="btn btn-warning" onClick={() => LoadData()}>
                {/* onClick={LoadData(tokenS)} onClick={() => LoadData(tokenS)} */}
                       
                        Load Data
            </button>
            }
{userTuten.userTuten &&
             <div>   
               {/* <ul>
                    {booking.map((user, index) =>
                        <li key={user.professionalPrice}>
                            {user.professionalPrice + ' ' + user.details}
                           
                        </li>
                    )}
                    </ul> */}

                <Table dark>
      <thead>
        <tr>
         
          <th>BookingId</th>
          <th>Client</th>
          <th>Fecha de Creación</th>
          <th>Direccion</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
      {booking.map((user, index) => 
        <tr key={user.professionalPrice}>
         
          <td>{user.bookingId}</td>
          <td>{user.tutenUserClient.firstName}  {user.tutenUserClient.lastName}</td>
          <td>{user.bookingTime}</td>
          <td>{user.locationId.streetAddress}</td>
          <td>{user.bookingPrice}</td>
        </tr>
       )} 
       
      </tbody>
    </Table>

              </div>  
                
}
        </div>
    );
}

export { LoginTuten };