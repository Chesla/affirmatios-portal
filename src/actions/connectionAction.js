import * as Actions from "../actions";
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
          // let invitation = data.invitation;
          // for(let i in invitation){
          //   if(typeof invitation[i] === "string"){
          //     setCookie(i, invitation[i]);
          //   }else{
          //     setCookie(i, JSON.stringify(invitation[i]));
          //   }
          // }
          // setCookie("alias", data.alias);
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

export const acceptConnectionRequest = (data, cb) => {
  return async function (dispatch) {
    let url = process.env.REACT_APP_BASE_URL+"/connections/accept";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200) {
      const resp = response.json();
      resp.then((data) => {
        console.log(183, data);
        cb();
        dispatch(getAllConnections());
        dispatch({
          type:  Actions.ACCEPT_CONNECTION_REQUEST,
          payload: {
            errorMessage:'',
          }
        })
      })
      .catch(() => {
        dispatch({
          type:  Actions.ACCEPT_CONNECTION_REQUEST,
          payload: {
            errorMessage:'Some error occured. Please try again later',
          }
        });
      });
    } else {
      dispatch({
          type:  Actions.ACCEPT_CONNECTION_REQUEST,
          payload: {
            errorMessage:'Some error occured. Please try again later',
          }
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