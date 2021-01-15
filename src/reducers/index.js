import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import CredentialReducer from "./credentialReducer";
import NotificationReducer from "./notificationReducer";
import ConnectionReducer from "./connectionReducer";

export default combineReducers({
    user: UserReducer,
    credential: CredentialReducer,
    notification: NotificationReducer,
    connection: ConnectionReducer
});