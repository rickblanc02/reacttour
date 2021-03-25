import { timeConstants } from '../_constants';


export function times(state = {}, action) { 
    //console.log("reducer ")
    //console.log(action)
    switch (action.type) {
        case timeConstants.TIME_REQUEST:
            return {
                loading: true
            };
        case timeConstants.TIME_SUCCESS:

            var time = {};
            time.time = action.time.time;
            time.timeZone = action.time.timeZone;
           
            return {
                //time: action.time.time
                //time: action.time
                time
                
            };
        case timeConstants.TIME_FAILURE:
            return {
                error: action.error
            };
       
        default:
            return state
    }
}