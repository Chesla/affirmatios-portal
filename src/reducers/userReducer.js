/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    connection:[],
    notifications:[],
    agentType:"",
    loginSuccess: false,
    loginFailureMessage:"",
    loader:false,
    profileInfo:{}
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.LOGIN_USER: 
        case Actions.REGISTER_USER : 
            const {payload} = action;
            
            return {
                ...state,
                loginSuccess: payload.loginAction,
                loginFailureMessage:payload.loginFailureMessage,
                profileInfo:payload.profileInfo,
                agentType:payload.agentType
            };
        case Actions.LOADER : {
            const {payload} = action;
            return {
                ...state,
                loader:  payload
            }
        }
        case Actions.INIT_LOGIN_DATA : {
            return {
                ...state,
                loginFailureMessage:"",
                loader:false
            }
        }
        default : {
            return state;
        }
    }

};

export default userReducer;
