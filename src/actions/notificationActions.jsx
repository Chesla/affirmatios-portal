import * as Actions from ".";
export const getAllNotifications = (data) => {
  return async function (dispatch) {
    let url = 'http://localhost:8086/present-proof/records';
    const response = await fetch(url, {
      method: "GET",
    });
    dispatch({
      type: Actions.LOADER,
      payload:false
    })
    if (response.status === 200) {
      const resp = response.json();
      resp.then((data) => {
        if (response.status === 200) {
          let requestedData = {};

          data.results?.filter((r)=>{
            return r.state === "request_received"
          })
          .map((r)=>{
            if(!requestedData[r.presentation_request.name]){
              requestedData[r.presentation_request.name] = r;
            }
            return r;
          })
          let notifications = [];
          let values = Object.values(requestedData);
          for(let i=0;i<values.length;i++){
            let notification = {
              requesterName: "Walmart",
              requestedTime: values[i].created_at,
              requesterType: "Business",
              requesterId: values[i].presentation_exchange_id,
              connectionId: values[i].connection_id,
              allData: values[i]
            };
            let requestingFor = [];
            let attrs = values[i]["presentation_request"]["requested_attributes"];
            let requestedAttr = Object.values(attrs);
            for(let j=0;j<requestedAttr.length;j++){
              requestingFor.push(requestedAttr[j].name);
            }
            notification.requestingMessage = `Requesting for ${requestingFor.join(', ')} from ${values[i]["presentation_request"]["name"]}`;
            notifications.push(notification);
          }
          dispatch({
            type: Actions.GET_ALL_NOTIFICATIONS,
            payload: {
                errorMessage:'',
                notifications
            }
          });
        } else {
          dispatch({
            type:  Actions.GET_ALL_NOTIFICATIONS,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              notifications:[]
            }
          });
        }
      })
      .catch(() => {
        dispatch({
          type:  Actions.GET_ALL_NOTIFICATIONS,
          payload: {
            errorMessage:'Some error occured. Please try again later',
            notifications:[]
          }
        });
      });
    }
  };
}
export const actionOnNotification = (type,data,presentation_exchange_id) => {
  return async function (dispatch) {
    if(type === "reject"){
      dispatch({
        type: Actions.LOADER,
        payload:false
      });
      dispatch({
        type: Actions.GET_ALL_NOTIFICATIONS,
        payload: {
            errorMessage:'',
            notifications:data
        }
      });
    }else{
        let url = `http://localhost:8086/present-proof/records/${presentation_exchange_id}/send-presentation`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(data)
        });
        dispatch({
          type: Actions.LOADER,
          payload:false
        });
        if (response.status === 200) {
          const resp = response.json();
          resp.then((data) => {
            if (response.status === 200) {
              dispatch(getAllNotifications());
              dispatch({
                type:  Actions.NOTIFICATION_ACTION,
                payload: {
                  errorMessage:'Some error occured. Please try again later',
                  notificationActionMsg:true,
                }
              });
            } 
          })
          .catch(() => {
            dispatch({
              type: Actions.LOADER,
              payload:false
            })
            dispatch({
              type:  Actions.NOTIFICATION_ACTION,
              payload: {
                errorMessage:'Some error occured. Please try again later',
                notificationActionMsg:false
              }
            });
          });
        }
        else {
          dispatch({
            type: Actions.LOADER,
            payload:false,
          })
          dispatch({
            type:  Actions.NOTIFICATION_ACTION,
            payload: {
              errorMessage:'Some error occured. Please try again later',
              notificationActionMsg:false,
            }
          });
        }
    }
  };
}