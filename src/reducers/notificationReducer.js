/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    notifications:null,
    errorMessage:"",
    notificationActionMsg:false
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
                notificationActionMsg:payload.notificationActionMsg||false
            }
        }
        default : {
            return state;
        }
    }

};

export default notificationReducer;
