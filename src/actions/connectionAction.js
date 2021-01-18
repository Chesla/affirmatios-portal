import * as Actions from "../actions";
import {setCookie, getCookie} from "../constants";
export const getAllConnections = () => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/connections";
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status === 200) {
      const resp = response.json();
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      resp.then((data) => {
        if (response.status === 200) {
          dispatch({
            type: Actions.GET_ALL_CONNECTIONS,
            payload: {
                errorMessage:'',
                connections: data.results || []
            }
          });
        } else {
          dispatch({
            type:  Actions.GET_ALL_CONNECTIONS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              connections:[]
            }
          });
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.GET_ALL_CONNECTIONS,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            connections:[]
          }
        });
      });
    }
  };
}

export const verifyParticularConnection = (data) => {
    return function (dispatch) {
      let url = `/api/verifyConnection/${data}`;
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      let actionType = true;
      if(actionType){
        dispatch({
            type: Actions.VERIFY_CONNECTION,
            payload: {
                errorMessage:'',
                connectionVerified:true
            }
        });
      }else{
        dispatch({
          type:  Actions.VERIFY_CONNECTION,
          payload: {
            errorMessage:'Some error occured. Please try again later.',
            connectionVerified:false
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
  //             type: Actions.VERIFY_CONNECTION,
  //             payload: {
  //                 errorMessage:'',
  //                 connections: data.connections
  //             }
  //         });
  //     } else {
  //         dispatch({
  //             type:  Actions.VERIFY_CONNECTION,
  //             payload: {
  //               errorMessage:'Some error occured. Please try again later',
  //               connections:[]
  //             }
  //         });
  //     }
  //   };
  }

export const setConnectionMessage = (connectionVerified,errorMessage) => {
    return {
      type: Actions.SET_CONNECTION_MESSAGE,
      payload:{
        connectionVerified,
        errorMessage
      }
    };
}

export const sendConnectionRequest = () => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/connections/request";
    const response = await fetch(url, {
      method: "POST",
    });
    if (response.status === 200) {
      const resp = response.json();
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      resp.then((data) => {
        if (response.status === 200) {
          dispatch(getAllConnections());
          let invitation = data.invitation;
          for(let i in invitation){
            if(typeof invitation[i] === "string"){
              setCookie(i, invitation[i]);
            }else{
              setCookie(i, JSON.stringify(invitation[i]));
            }
          }
          setCookie("alias", data.alias);
          dispatch({
            type: Actions.SEND_CONNECTION_REQUEST,
            payload: {
                errorMessage:'',
                connectionSentSuccessfully:true,
                connectionSent:data.invitation_url
            }
          });
        } else {
          dispatch({
            type:  Actions.SEND_CONNECTION_REQUEST,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              connectionSentSuccessfully:false,
              connectionSent:""
            }
          });
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.SEND_CONNECTION_REQUEST,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            connectionSentSuccessfully:false,
            connectionSent:""
          }
        });
      });
    }
  };
}

export const setConnectionSentSuccessfully = (connectionSentSuccessfully) => {
  return {
    type: Actions.SET_CONNECTION_SUCCESSFULLY,
    payload:{
      connectionSentSuccessfully
    }
  };
}