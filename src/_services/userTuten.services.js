import config from 'config';
import axios from 'axios';


export const userTutenService = {
    getLogin,
    getBooking,   
    getLoginfetch, 
};

 function getLogin(user, pass, app) {
  

    var obj = {};
    obj.user = user; 
    obj.pass = pass;
    obj.app = app;

    axios.defaults.headers.common['Password'] = pass;
    axios.defaults.headers.common['App'] = app;    

    const data =   axios.put(`${config.apiUrlTuten}`+user, obj)    
    .then(res => res.data); 
    
      localStorage.setItem('userTuten', JSON.stringify(data));
      
      return  data

    //return userTuten  
}

function getBooking(current, adminemail, email, app, token) {
    console.log("getBooking "+token)

    delete axios.defaults.headers.common["Password"];
    delete axios.defaults.headers.common["App"];

    axios.defaults.headers.common['adminemail'] = adminemail;
    axios.defaults.headers.common['token'] = token;
    axios.defaults.headers.common['App'] = app;
    return  axios.get(`${config.apiUrlTuten}`+email+"/bookings?current="+current)
    //.then(res => res.data); 
       .then(res => {
        console.log(res.data);   
       })
 }











































function getLoginfetch(user, pass, app) {
    var obj = {};
    obj.user = user; 
    obj.pass = pass;
    obj.app = app;

    //var formData = new FormData();
    //formData.append('user', user);    

    var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Password', pass);         
    const requestOptions02 = {
        method: 'PUT',
        headers: myHeaders,
        /*headers: { 
            'Content-Type': 'application/json',
            //"Access-Control-Allow-Origin": "http://localhost:9000",
            //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
         },*/
         
        body: JSON.stringify({ user, pass, app })
        //body: formData
    };
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'App': app,
            //'Password': pass,
            
         },
        //body: JSON.stringify({ user, pass, app })
        //body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
    };

   
    return fetch(`${config.apiUrlTuten}`+user, requestOptions)
        //.then(handleResponse)
        .then(response => response.json()) 
        .then(data => {           
            console.log(data)
            return data;
        });
}