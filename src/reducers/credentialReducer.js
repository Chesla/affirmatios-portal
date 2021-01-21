/* eslint-disable complexity */
import * as Actions from "../actions";

const INITIAL_STATE = {
    certificates:null,
    certificateDetails:null,
    errorMessage:"",
    credentialIssued:null,
    credentialIssuedAlready:null,
    certificateAlreadyRequested:[],
    credentialRequested:[],
    credentialAccepted:null,
    successRequestMessage:false,
    mapCredDEFToReferent:{}
};
const credentialReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Actions.GET_ALL_CREDENTIALS : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                certificates:payload.certificates|| [],
                mapCredDEFToReferent:payload.mapCredDEFToReferent || {}
            }
        }
        case Actions.PARTICLUAR_DETAIL_CREDENTIALS : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                certificateDetails:payload.certificateDetails|| {}
            }
        }
        case Actions.CREDENTIALS_ISSUED : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                credentialIssued:payload.credentialIssued|| false,
            }
        }
        case Actions.CREDENTIALS_ALREADY_ISSUED : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                credentialIssued:payload.credentialIssued|| false,
                certificateDetails:payload.certificateDetails|| {},
                credentialIssuedAlready:payload.credentialIssuedAlready|| null,
            }
        }
        case Actions.CREDENTIALS_ALREADY_REQUESTED : {
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                certificateAlreadyRequested:payload.certificateAlreadyRequested|| [],
            }
        }
        case Actions.INIT_CREDENTIALS  :{
            return {
                errorMessage:"",
                certificateDetails:{},
            }
        }
        case Actions.ACCEPT_CREDENTIALS  :{
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                credentialAccepted:payload.credentialAccepted|| false,
            }
        }
        case Actions.CREDENTIALS_REQUESTED  :{
            const {payload} = action;
            return {
                ...state,
                errorMessage:payload.errorMessage|| "",
                // credentialRequested:payload.credentialRequested|| [],
                successRequestMessage:payload.successRequestMessage ||false
            }
        }
        default : {
            return state;
        }
    }

};

export default credentialReducer;
