import * as Actions from "../actions";
import {getType, setProfileName} from "../constants";
export const getAllCredentials = () => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/hospital/view";
    const response = await fetch(url, {
      method: "GET",
    });
    let url1 = "http://localhost:8086/credentials";
    const response1 = await fetch(url1, {
      method: "GET",
    });
    
    if (response.status === 200 || response1.status === 200) {
      const resp = response.json();
      const resp1 = response1.json();
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      let certificates = [];
      let acceptedCertificate = [];
      let nonAcceptedCertificates = [];
      window.scroll(0, 0);
      Promise.all([resp, resp1]).then(values => {
        console.log("values",values);
      });
      resp1.then((data)=> {
        if(response1.status === 200) {
          let certificate = {};
          acceptedCertificate = data.results.map((r)=>{
            let type = getType(r.schema_id || "");
            let name = setProfileName(type);
            certificate["type"] = type;
            certificate["date"] = new Date();
            certificate["name"] = name;
            certificate["accept"] = true;
            certificate["id"] = r.cred_def_id;
            certificate["certificateDetails"] = r.attrs;
          })
        }
      })
      resp.then((data) => {
        if (response.status === 200) {
          let certificate = {};
          let certificateDetails = {};
          nonAcceptedCertificates = data.results.map((r)=>{
              let type = getType(r.schema_id || "");
              let name = setProfileName(type);
              certificate["type"] = type;
              certificate["date"] = r.updated_at;
              certificate["name"] = name;
              certificate["accept"] = false;
              certificate["id"] = r.credential_proposal_dict.cred_def_id;
              certificate["credential_exchange_id"] = r.credential_exchange_id;
              certificateDetails = r.credential_proposal_dict.credential_proposal.attributes;
              certificate["certificateDetails"] = certificateDetails;
              return certificate;
          })
          dispatch({
            type: Actions.GET_ALL_CREDENTIALS,
            payload: {
                errorMessage:'',
                certificates:[...nonAcceptedCertificates, ...acceptedCertificate]
            }
          });
        } else {
          dispatch({
            type:  Actions.GET_ALL_CREDENTIALS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              certificates:[]
            }
          });
        }
      })
      .catch(() => {
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
    let url = `http://localhost:8086/issue-credential/records/${credential_exchange_id}/store`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status === 200) {
      const resp = response.json();
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      window.scroll(0, 0);
      resp.then((data) => {
        if (response.status === 200) {
          console.log("data");
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
const credentialsData = (certificateType) => {
  let data = {};
  if(certificateType?.toLowerCase() === "business"){
    data = {
      name: " Chesla Kar",
      gender: "F",
      designation: " Software Engineer",
      department:" Apple IDC",
      doj:" 06/16/2014",
      dol:" 09/11/2015",
      remarks:"-",
      issuedOn:" 09/14/2015",
      issuedBy:" Ritu Kumar",
      issuedByTeam: " Deputy Head - Human Resources",
      reason:" Resigned",
      verificationId: "TCS/EMP/834930",
      ownerName: "TATA Consultancy Services",
      certificateName: "SERVICE CERTIFICATE"
    }
  }else if(certificateType?.toLowerCase() === "medical"){
    data = {
      "name": "Arun",
      "sex": "male",
      "age": 27,
      "address": "501, UKN Espernza, Thubrahalli, Whitefield, Bengaluru, Karnataka, 560066 ",
      "place": "Bangalore",
      "date": "18-Jan-2021"
    }
  } else {
    data = {
      name: " Chesla Kar",
      gender: "F",
      designation: " ",
      department:"B.TECH in Computer Science & Engineering",
      doj:" ",
      dol:" month of May, 2014 ",
      remarks:"-",
      issuedOn:" 26th May 2014",
      issuedBy:" Prachet Bhuyian",
      issuedByTeam: " Registar",
      reason:" Resigned",
      location:" Bhubaneswar",
      verificationId: "1005042",
      ownerName: "KIIT UNIVERSITY",
      certificateName: "PROVISIONAL CERTIFICATE"
    }
  }
  return data;
}
export const getCertificateDetails = (param, certificateType) => {
  return function (dispatch) {
    let url = `/api/getParticluarCredentials/${param}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    
    if(actionType){
      let data = credentialsData(certificateType);
      dispatch({
          type: Actions.PARTICLUAR_DETAIL_CREDENTIALS,
          payload: {
              errorMessage:'',
              certificateDetails:data || {}
          }
      });
    }else{
      dispatch({
        type:  Actions.PARTICLUAR_DETAIL_CREDENTIALS,
        payload: {
          errorMessage:'Some error occured. Please try again later',
          certificateDetails:{}
        }
      });
    }
  }
//   return async function (dispatch) {
//     const response = await fetch(url, {
//       method: "GET",
//       certificates: "include",
//     });
//     dispatch({
//       type: Actions.LOADER,
//       payload:false
//     })
//     if (response.status === 200) {
//         dispatch({
//             type: Actions.GET_ALL_CREDENTIALS,
//             payload: {
//                 errorMessage:'',
//                 certificates: data.certificates
//             }
//         });
//     } else {
//         dispatch({
//             type:  Actions.GET_ALL_CREDENTIALS,
//             payload: {
//               errorMessage:'Some error occured. Please try again later',
//               certificates:[]
//             }
//         });
//     }
//   };
}
export const issueCredential = (param) => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/hospital/issue";
    const response = await fetch(url, {
      method: "POST",
      body:JSON.stringify(param)
    });
    if (response.status === 200) {
      const resp = response.json();
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
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
// export const issueCredesntial = (data,certificateType) => {
//   return function (dispatch) {
//     let url = `/api/issueCredential/${data}`;
//     dispatch({
//       type: Actions.LOADER,
//       payload:false
//     })
//     let actionType = true;
//     if(actionType){
//       let credentialIssuedAlready = true;
//       if(!credentialIssuedAlready){
//         dispatch({
//           type:  Actions.CREDENTIALS_ISSUED,
//           payload:{
//             credentialIssued: true,
//             errorMessage:""
//           }
//         })
//       }else{
//         dispatch({
//           type:  Actions.CREDENTIALS_ALREADY_ISSUED,
//           payload:{
//             credentialIssued: false,
//             credentialIssuedAlready:true,
//             certificateDetails:credentialsData(certificateType),
//             errorMessage:""
//           }
//         })
//       }
//     }else{
//       if(actionType){
//         dispatch({
//           type:  Actions.CREDENTIALS_ISSUED,
//           payload:{
//             credentialIssued: false,
//             errorMessage:"Some error occured. Please try again later",
//           }
//         })
//       }
//     }
//   }
// }

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
      issuedOn:" 09/14/2015",
      ownerName: "TATA Consultancy Services",
      certificateName: "SERVICE CERTIFICATE",
      type:certificateType,
      requestedOn: "10/10/2020"
    }
  }else if(certificateType?.toLowerCase() === "medical"){
    data = {
      name: " Chesla",
      designation: "",
      department:" TO WHOMSOEVER IT MAY CONCERN",
      issuedOn:" 12/14/2020",
      reason:"Negative",
      ownerName: "Manipal Hospital",
      certificateName: "COVID CERTIFICATE",
      type:certificateType,
      requestedOn: "10/11/2020"
    }
  } else {
    data = {
      name: " Chesla Kar",
      department:"B.TECH in Computer Science & Engineering",
      dol:" month of May, 2014 ",
      issuedOn:" 26th May 2014",
      ownerName: "KIIT UNIVERSITY",
      certificateName: "PROVISIONAL CERTIFICATE",
      type:certificateType,
      requestedOn: "11/11/2020"
    }
  }
  return data;
}
export const getAlreadyRequestedCertificateDetails = (param) => {
  return function (dispatch) {
    let url = `/api/requestedCredential/${param}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_ALREADY_REQUESTED,
          payload:{
            certificateAlreadyRequested:[partialCredentialsData("business"),partialCredentialsData("medical")],
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

}