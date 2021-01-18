import * as Actions from "../actions";
export const loginUser = (data, actionType) => {
    let url = process.env.REACT_APP_BASE_URL+"/login";
    return async function (dispatch) {
      const response = await fetch(url, {
        method: "POST",
        body:JSON.stringify(data)
      });
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      if (response.status === 200) {
        localStorage.setItem("username",data.username);
        localStorage.setItem("password",data.password);
        let agentType = process.env.REACT_APP_AGENT?.toLowerCase();
        let profileInfo = {};
        if(agentType === "people"){
          profileInfo = {
            DID: "QWETVFF",
            firstLastName:"Chesla",
            roles:["verifier","holder"],
            email:"cheslakar@gmail.com",
            mobile:"+91 9591794442",
            type:"people",
            agentType
          } 
        }else if(agentType === "medical"){
          profileInfo = {
            DID: "QWETVFF",
            firstLastName:"Manipal Hospitals",
            roles:["verifier","issuer"],
            email:"manipalHospital@gmail.com",
            mobile:"+91 9591795442",
            type:"people",
            agentType
          } 
        }else if(agentType === "school"){
          profileInfo = {
            DID: "QWETVFF",
            firstLastName:"KIIT University",
            roles:["verifier","issuer"],
            email:"kiit@gmail.com",
            mobile:"+91 9591780442",
            type:"people",
            agentType
          } 
        }else{
          profileInfo = {
            DID: "QWETVFF",
            firstLastName:"TCS",
            roles:["verifier","issuer"],
            email:"tcs@gmail.com",
            mobile:"+91 9591790478",
            type:"people",
            agentType
          }
        }
        dispatch({
          type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
          payload: {
              loginAction: true,
              loginFailureMessage:"",
              profileInfo
          }
        });
      } else {
        dispatch({
          type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
          payload: {
          loginAction: false,
          loginFailureMessage:"Registration failed, please try again later.",
          profileInfo:{}
        },
        });
      }
    };
   
};

export const loader = (val) => {
  return {
    type: Actions.LOADER,
    payload: val
  };
};
export const initLoginData = () => {
  return {
    type: Actions.INIT_LOGIN_DATA,
  };
}
