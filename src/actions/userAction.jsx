import * as Actions from "../actions";
export const loginUser = (data, actionType) => {
  return function (dispatch) {
    let url = "";
    if(actionType === "login"){
        url = `/api/login/${data}`;
    }else{
        url = `/api/register/${data}`;
    }
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if(actionType === "login"){
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
          mobile:"+91 9591790442",
          type:"people",
          agentType
        } 
      }else if(agentType === "medical"){
        profileInfo = {
          DID: "QWETVFF",
          firstLastName:"Manipal",
          roles:["verifier","issuer"],
          email:"cheslakar@gmail.com",
          mobile:"+91 9591790442",
          type:"people",
          agentType
        } 
      }else if(agentType === "school"){
        profileInfo = {
          DID: "QWETVFF",
          firstLastName:"KIIT",
          roles:["verifier","issuer"],
          email:"cheslakar@gmail.com",
          mobile:"+91 9591790442",
          type:"people",
          agentType
        } 
      }else{
        profileInfo = {
          DID: "QWETVFF",
          firstLastName:"TCS",
          roles:["verifier","issuer"],
          email:"cheslakar@gmail.com",
          mobile:"+91 9591790442",
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
    }else{
      dispatch({
        type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
        payload: {
          loginAction: false,
          loginFailureMessage:"Registration failed, please try again later.",
          profileInfo:{}
        },
      });
    }
  }
    // return async function (dispatch) {
    //   const response = await fetch(url, {
    //     method: "GET",
    //     credentials: "include",
    //   });
    //   dispatch({
    //     type: Actions.LOADER,
    //     payload:false
    //   })
    //   if (response.status === 200) {
    //     localStorage.setItem("username",data.username);
    //     localStorage.setItem("password",data.password);
    //     dispatch({
    //       type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
    //       payload: {
    //           loginAction: true,
    //       }
    //     });
    //   } else {
    //     dispatch({
    //       type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
    //       payload: false,
    //     });
    //   }
    //   dispatch({
    //       type: actionType === "login" ? Actions.LOGIN_USER : Actions.REGISTER_USER,
    //       payload: false,
    //   });
    // };
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
