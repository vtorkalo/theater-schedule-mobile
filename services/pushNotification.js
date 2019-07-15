import { Permissions, Notifications } from "expo";
import { AsyncStorage} from "react-native";

import BASE_URL from "../baseURL";

export default async deviceId => {
  
  let previousToken = await AsyncStorage.getItem("pushtoken");
  
  
  if (previousToken) {
   
    let token=previousToken;
   

    
  } else {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }
    
    let token = await Notifications.getExpoPushTokenAsync();
   
    await fetch(`${BASE_URL}pushtoken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, deviceId })
    }).then(response=>{
      
      if(response.status==201)
      {
        AsyncStorage.setItem("pushtoken", token);
      }

    });

    
  }
};
