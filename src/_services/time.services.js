import config from 'config';

export const timeService = {
    getTime,    
};

function getTime(time, timeZone) {
    let timeZoneInt = 0;
    timeZoneInt = timeZone;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            //"Access-Control-Allow-Origin": "http://localhost:9000",
            //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            
         },
         
        body: JSON.stringify({ time, timeZoneInt })
    };

    return fetch(`${config.apiUrlTime}time`, requestOptions)
        //.then(handleResponse)
        .then(response => response.json()) 
        .then(time => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('time', JSON.stringify(time));
            console.log("servicios")
            console.log(time)
            return time;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

