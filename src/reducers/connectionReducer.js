/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    connections:null,
    connectionVerified:null,
    errorMessage:""
};
const ConnectionReducer = (state = INITIAL_STATE, action) => {
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
        default : {
            return state;
        }
    }

};

export default ConnectionReducer;
