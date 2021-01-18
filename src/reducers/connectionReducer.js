/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    connections:null,
    connectionVerified:null,
    errorMessage:"",
    connectionSentSuccessfully:null,
    connectionSent:""
};
const ConnectionReducer = (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case Actions.GET_ALL_CONNECTIONS : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                connections:payload.connections|| []
            }
        }
        case Actions.VERIFY_CONNECTION : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                connectionVerified:payload.connectionVerified|| false
            }
        }
        case Actions.SET_CONNECTION_MESSAGE : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                connectionVerified:payload.connectionVerified|| null
            }
        }
        case Actions.SEND_CONNECTION_REQUEST : {
            const {payload} = action;
            return{
                ...state,
                errorMessage:payload.errorMessage|| "",
                connectionSentSuccessfully:payload.connectionSentSuccessfully||false,
                connectionSent:payload.connectionSent || ""
            }
        }
        case Actions.SET_CONNECTION_SUCCESSFULLY : {
            const {payload} = action;
            console.log(48, payload);
            return{
                ...state,
                connectionSentSuccessfully:payload.connectionSentSuccessfully,
            }
        }
        default : {
            return state;
        }
    }

};

export default ConnectionReducer;
