import * as Actions from "../actions";
export const getAllConnections = (data) => {
  return function (dispatch) {
    let url = `/api/getAllConnections/${data}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    let connections = [];
    if(actionType){
      let agentType = (localStorage.getItem("agentType" || "")).toLowerCase();
      if(agentType !== "person"){
        connections = [{
          identity: "QWETVFF",
          name:"Chesla",
          type:"person",
          verify:true
        },
        {
          identity: "QWETSFF",
          name:"Shubh",
          type:"person",
          verify:false
        },
        {
          identity: "QWETVFFSD",
          name:"Arun",
          type:"person",
          verify:true
        },
        {
          identity: "QWETVFFSD",
          name:"Pratap",
          type:"person",
          verify:true
        }  ]
      }else{
        connections = [{
          identity: "QWETVFF",
          name:"Manipal Hospital",
          type:"Medical",
          verify:true
        },
        {
          identity: "QWETSFF",
          name:"KIIT University",
          type:"School",
          verify:false
        },
        {
          identity: "QWETVFFSD",
          name:"Tata Consultancy Services",
          type:"Business",
          verify:true
        } ]
      }
      
      dispatch({
          type: Actions.GET_ALL_CONNECTIONS,
          payload: {
              errorMessage:'',
              connections
          }
      });
    }else{
      dispatch({
        type:  Actions.GET_ALL_CONNECTIONS,
        payload: {
          errorMessage:'Some error occured. Please try again later',
          connections:[]
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
//             type: Actions.GET_ALL_CONNECTIONS,
//             payload: {
//                 errorMessage:'',
//                 connections: data.connections
//             }
//         });
//     } else {
//         dispatch({
//             type:  Actions.GET_ALL_CONNECTIONS,
//             payload: {
//               errorMessage:'Some error occured. Please try again later',
//               connections:[]
//             }
//         });
//     }
//   };
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