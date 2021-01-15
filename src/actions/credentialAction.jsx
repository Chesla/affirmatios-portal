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
      name: " Chesla",
      gender: "F",
      designation: "",
      department:" TO WHOMSOEVER IT MAY CONCERN",
      doj:" 06/16/2014",
      dol:" 09/11/2015",
      remarks:"501, UKN Espernza, Thubrahalli, Whitefield, Bengaluru, Karnataka, 560066 ",
      issuedOn:" 12/14/2020",
      issuedBy:" Ritu Kumar",
      issuedByTeam: " Medical Officer",
      location:" Bengaluru",
      reason:" Resigned",
      age:"27",
      verificationId: "TCS/EMP/834930",
      ownerName: "Manipal Hospital",
      certificateName: "COVID CERTIFICATE"
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