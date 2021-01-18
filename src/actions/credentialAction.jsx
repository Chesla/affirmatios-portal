import * as Actions from "../actions";
export const getAllCredentials = (data) => {
  return function (dispatch) {
    let url = `/api/getAllCredentials/${data}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
      let certificates = [{
        identity: "QWETVFF",
        id:"Manipal-1",
        name:"Manipal Hospital",
        date:"12/10/2020",
        type:"Medical",
      },
      {
        identity: "QWETVFF",
        id:"KIIT-1",
        name:"KIIT University",
        date:"05/10/2014",
        type:"School",
      },
      {
        identity: "QWETVFF",
        id:"TCS-1",
        name:"Tata Consultancy Services",
        date:"10/15/2015",
        type:"Business",
      } ]
      dispatch({
          type: Actions.GET_ALL_CREDENTIALS,
          payload: {
              errorMessage:'',
              certificates
          }
      });
    }else{
      dispatch({
        type:  Actions.GET_ALL_CREDENTIALS,
        payload: {
          errorMessage:'Some error occured. Please try again later',
          certificates:[]
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

export const issueCredential = (data,certificateType) => {
  return function (dispatch) {
    let url = `/api/issueCredential/${data}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
      let credentialIssuedAlready = true;
      if(!credentialIssuedAlready){
        dispatch({
          type:  Actions.CREDENTIALS_ISSUED,
          payload:{
            credentialIssued: true,
            errorMessage:""
          }
        })
      }else{
        dispatch({
          type:  Actions.CREDENTIALS_ALREADY_ISSUED,
          payload:{
            credentialIssued: false,
            credentialIssuedAlready:true,
            certificateDetails:credentialsData(certificateType),
            errorMessage:""
          }
        })
      }
    }else{
      if(actionType){
        dispatch({
          type:  Actions.CREDENTIALS_ISSUED,
          payload:{
            credentialIssued: false,
            errorMessage:"Some error occured. Please try again later",
          }
        })
      }
    }
  }
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