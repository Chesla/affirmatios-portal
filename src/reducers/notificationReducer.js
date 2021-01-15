/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    notifications:null,
    errorMessage:"",
    notificationAction:false
};
const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.GET_ALL_NOTIFICATIONS : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                notifications:payload.notifications||[]
            }
        }
        case Actions.NOTIFICATION_ACTION : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                notificationAction:payload.notificationAction||[]
            }
        }
        default : {
            return state;
        }
    }

};

export default notificationReducer;
