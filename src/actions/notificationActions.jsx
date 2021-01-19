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
      let notifications = [
        {
          requestedData: {
              message: "Requesting for details of Joining date, Release date, Designation from previous company SERVICE CERTIFICATE.",
              param:["joiningDate, releaseDate, designation"]
          },
          requesterId:"123456",
          requesterName:"Walmart",
          requestedTime:"10/15/2015 15:00:00",
          requesterType:"Business",
        },
        {
            requestedData: {
                message: "Requesting for details of Name, Age and Location from COVID CERTIFICATE.",
                param:["joiningDate, releaseDate, designation"]
            },
            requesterId:"1234567",
            requesterName:"Walmart",
            requestedTime:"10/15/2015 15:00:00",
            requesterType:"Business",
        },
        {
          requestedData: {
              message: "Requesting for details of  Name, Department, Date of Completion and location from DEGREE CERTIFICATE.",
              param:["joiningDate, releaseDate, designation"]
          },
          requesterId:"12345678",
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
export const actionOnNotification = (modifiedNotification) => {
    return function (dispatch) {
      // let url = `/api/actionOnNotification/${type}/${data}`;
      dispatch({
        type: Actions.LOADER,
        payload:false
      })
      let actionType = true;
      if(actionType){
        dispatch({
          type: Actions.GET_ALL_NOTIFICATIONS,
          payload: {
              errorMessage:'',
              notifications:modifiedNotification
          }
        });
        // dispatch(getAllNotifications(data.DID));
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