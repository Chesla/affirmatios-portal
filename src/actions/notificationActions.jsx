import * as Actions from ".";
export const getAllNotifications = (data) => {
  return function (dispatch) {
    // let url = `/api/getAllNotifications/${data}`;
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    let actionType = true;
    if(actionType){
      let notifications = [{
            requestedData: {
                message: "Requesting for name.",
                param:["aadharNo"]
            },
            requesterId:"123",
            requesterName:"Manipal Hospital",
            requestedTime:"12/10/2020 10:10:00",
            requesterType:"Medical",
        },
        {
            requestedData: {
                message: "Requesting for aadhar number.",
                param:["aadharNo"]
            },
            requesterId:"1234",
            requesterName:"Manipal Hospital",
            requestedTime:"12/10/2020 10:10:00",
            requesterType:"Medical",
        },
        {
            requestedData: {
                message: "Requesting for registration number.",
                param:["registrationNo"]
            },
            requesterId:"12345",
            requesterName:"KIIT University",
            requestedTime:"05/10/2014 12:00:00",
            requesterType:"School",
        },
        {
            requestedData: {
                message: "Requesting for employee id.",
                param:["employeeId"]
            },
            requesterId:"123456",
            requesterName:"Tata Consultancy Services",
            requestedTime:"10/15/2015 15:00:00",
            requesterType:"Business",
        },
        {
            requestedData: {
                message: "Requesting for details of Joining date, Release date, Designation from previous company experience letter.",
                param:["joiningDate, releaseDate, designation"]
            },
            requesterId:"1234567",
            requesterName:"Walmart",
            requestedTime:"10/15/2015 15:00:00",
            requesterType:"Business",
        },
     ]
      dispatch({
          type: Actions.GET_ALL_NOTIFICATIONS,
          payload: {
              errorMessage:'',
              notifications
          }
      });
    }else{
      dispatch({
        type:  Actions.GET_ALL_NOTIFICATIONS,
        payload: {
          errorMessage:'Some error occured. Please try again later',
          notifications:[]
        }
      });
    }
  }
//   return async function (dispatch) {
//     const response = await fetch(url, {
//       method: "GET",
//       notifications: "include",
//     });
//     dispatch({
//       type: Actions.LOADER,
//       payload:false
//     })
//     if (response.status === 200) {
//         dispatch({
//             type: Actions.GET_ALL_NOTIFICATIONS,
//             payload: {
//                 errorMessage:'',
//                 notifications: data.notifications
//             }
//         });
//     } else {
//         dispatch({
//             type:  Actions.GET_ALL_NOTIFICATIONS,
//             payload: {
//               errorMessage:'Some error occured. Please try again later',
//               notifications:[]
//             }
//         });
//     }
//   };
}
export const actionOnNotification = (type, data) => {
    return function (dispatch) {
      // let url = `/api/actionOnNotification/${type}/${data}`;
      let actionType = true;
      if(actionType){
        dispatch({
            type: Actions.NOTIFICATION_ACTION,
            payload: {
                errorMessage:'',
                notificationAction:true
            }
        });
        dispatch(getAllNotifications(data.DID));
      }else{
        dispatch({
          type:  Actions.NOTIFICATION_ACTION,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            notificationAction:false
          }
        });
        dispatch({
            type: Actions.LOADER,
            payload:false
        })
      }
    }
  //   return async function (dispatch) {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       notifications: "include",
  //     });
  //     dispatch({
  //       type: Actions.LOADER,
  //       payload:false
  //     })
  //     if (response.status === 200) {
            // dispatch({
            //     type: Actions.GET_ALL_NOTIFICATIONS,
            //     payload: {
            //         errorMessage:'',
            //         notificationAction:true
            //     }
            // });
  //     } else {
  //         dispatch({
            //   type:  Actions.GET_ALL_NOTIFICATIONS,
            //   payload: {
            //     errorMessage:'Some error occured. Please try again later',
            //     notificationAction:false
            //   }
    //      });
  //     }
  //   };
  }