import * as Actions from "../actions";
import {getType, setProfileName} from "../constants";
export const getAllCredentials = () => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/user/view";
    const response = await fetch(url, {
      method: "GET",
    });
    let url1 = process.env.REACT_APP_BASE_URL+"/credentails"
    const response1 = await fetch(url1, {
      method: "GET",
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200 || response1.status === 200) {
      const resp = response.json();
      const resp1 = response1.json();
      let acceptedCertificates = [];
      let nonAcceptedCertificates = [];
      window.scroll(0, 0);
      Promise.all([resp, resp1]).then(values => {
        if(values[0].results.length ===0  && values[1].results.length ===0){
          dispatch({
            type:  Actions.GET_ALL_CREDENTIALS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              certificates:[]
            }
          });
        }
        acceptedCertificates = values[1].results?.map((r)=>{
            let acceptedCertificate = {};
            let type = getType(r.schema_id || "");
            let name = setProfileName(type);
            acceptedCertificate["type"] = type;
            acceptedCertificate["date"] = new Date();
            acceptedCertificate["name"] = name;
            acceptedCertificate["accept"] = true;
            acceptedCertificate["id"] = r.referent;
            acceptedCertificate["certificateDetails"] = r.attrs;
            return acceptedCertificate;
          })
          nonAcceptedCertificates = values[0].results?.map((r)=>{
              let nonAcceptedCertificate = {};
              let type = getType(r.schema_id || "");
              let name = setProfileName(type);
              nonAcceptedCertificate["type"] = type;
              nonAcceptedCertificate["date"] = r.updated_at;
              nonAcceptedCertificate["name"] = name;
              nonAcceptedCertificate["accept"] = false;
              nonAcceptedCertificate["id"] = r.credential_proposal_dict.cred_def_id;
              nonAcceptedCertificate["credential_exchange_id"] = r.credential_exchange_id;
              nonAcceptedCertificate["certificateDetails"] = r.credential_proposal_dict.credential_proposal.attributes;
              return nonAcceptedCertificate;
          })
          dispatch({
            type: Actions.GET_ALL_CREDENTIALS,
            payload: {
                errorMessage:'',
                certificates:[...nonAcceptedCertificates, ...acceptedCertificates]
            }
          });
      }).catch(() => {
        dispatch({
          type:  Actions.GET_ALL_CREDENTIALS,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            certificates:[]
          }
        });
      });
    }
  };
}
export const acceptCredential = (credential_exchange_id) => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/user/store";
    const response = await fetch(url, {
      method: "POST",
      body:JSON.stringify({exchange_id:credential_exchange_id})
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200) {
      const resp = response.json();
      window.scroll(0, 0);
      resp.then((data) => {
        if (response.status === 200) {
          dispatch(getAllCredentials());
          dispatch({
            type:  Actions.ACCEPT_CREDENTIALS,
            payload: {
              credentialAccepted:true,
              errorMessage:""
            }
          });
        } else {
          dispatch({
            type:  Actions.ACCEPT_CREDENTIALS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              credentialAccepted:false
            }
          });
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.ACCEPT_CREDENTIALS,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            credentialAccepted:false
          }
        });
      });
    }
  };
}
export const getCertificateDetails = (param, certificateType) => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+`credentialsbyid?id=${param.credentialId}`;
    const response = await fetch(url, {
      method: "GET",
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200) {
      const resp = response.json();
      resp.then((data) => {
        if (response.status === 200) {
          dispatch({
            type:  Actions.PARTICLUAR_DETAIL_CREDENTIALS,
            payload: {
              certificateDetails:data.attrs||{},
              errorMessage:""
            }
          });
        } else {
          dispatch({
            type:  Actions.PARTICLUAR_DETAIL_CREDENTIALS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              certificateDetails:{}
            }
          });
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.PARTICLUAR_DETAIL_CREDENTIALS,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            certificateDetails:{}
          }
        });
      });
    }
  };
}
export const issueCredential = (param) => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+`/${process.env.REACT_APP_SCHEMA_AGENT}/issue`;
    const response = await fetch(url, {
      method: "POST",
      body:JSON.stringify(param)
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200) {
      const resp = response.json();
      window.scroll(0, 0);
      resp.then((data) => {
        if (response.status === 200) {
          dispatch({
            type:  Actions.CREDENTIALS_ISSUED,
            payload:{
              credentialIssued: true,
              errorMessage:""
            }
          })
        } else {
          dispatch({
            type:  Actions.CREDENTIALS_ISSUED,
            payload:{
              credentialIssued: false,
              errorMessage:"Some error occured. Please try again later",
            }
          })
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.CREDENTIALS_ISSUED,
          payload:{
            credentialIssued: false,
            errorMessage:"Some error occured. Please try again later",
          }
        })
      });
    }
  };
}

export const initCredentialsDetails = (connectionVerified,errorMessage) => {
  return {
    type: Actions.INIT_CREDENTIALS,
    payload:{
      certificateDetails: {},
    }
  };
}
const partialCredentialsData = (certificateType) => {
  let data = {};
  if(certificateType?.toLowerCase() === "business"){
    data = {
      name: " Chesla Kar",
      designation: " Software Engineer",
      doj:" 06/16/2014",
      dol:" 09/11/2015",
      type:certificateType,
      requestedOn: "10/10/2020"
    }
  }else if(certificateType?.toLowerCase() === "medical"){
    data = {
      name:"Chesla Kar",
      sex:"F",
      age:"27",
      address:"Bangalore, Karnataka",
      place:"Bangalore",
      date:"12th Nov 2020",
      type:"medical",
      requestedOn: "12/12/2020"
    }
  } else {
    data = {
      department:"Computer Science Engineering",
      name:"Chesla Kar",
      roll_number:"1005042",
      completed_date:"month of May 2014",
      address:"Bhubaneswar",
      issued_date:"26th May 2014",
      type:"school",
      requestedOn: "10/12/2020"
    }
  }
  return data;
}
export const getAlreadyRequestedCertificateDetails = (param) => {
  return function (dispatch) {
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_ALREADY_REQUESTED,
          payload:{
            certificateAlreadyRequested:[partialCredentialsData("business"),partialCredentialsData("medical"),partialCredentialsData("school")],
            errorMessage:""
          }
        })
    }else{
      if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_ALREADY_REQUESTED,
          payload:{
            certificateAlreadyRequested: [],
            errorMessage:"Some error occured. Please try again later",
          }
        })
      }
    }
  }
}

export const requestCredentials = (param) => {
  return function (dispatch) {
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_REQUESTED,
          payload:{
            credentialRequested:param,
            successRequestMessage:true,
            errorMessage:""
          }
        })
        window.setTimeout(()=>{
          dispatch({
            type:  Actions.CREDENTIALS_REQUESTED,
            payload:{
              credentialRequested:param,
              successRequestMessage:false,
              errorMessage:""
            }
          })
        },1000)
    }else{
      if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_REQUESTED,
          payload:{
            credentialRequested: [],
            successRequestMessage:false,
            errorMessage:"Some error occured. Please try again later",
          }
        })
      }
    }
  }
}