// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


// function randomID(len) {
//   let result = '';
//   if (result) return result;
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }

// export function getUrlParams(
//   url = window.location.href
// ) {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }


// const Call = () => {
//   const roomID = getUrlParams().get('roomID') || randomID(5);
//   let myMeeting = async (element) => {
//  // generate Kit Token
//   const appID = ; // add your appId here
//   const serverSecret = ""; // add your server secret here
//   const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


//  // Create instance object from Kit Token.
//   const zp = ZegoUIKitPrebuilt.create(kitToken);
//   // start the call
//   zp.joinRoom({
//     container: element,
//     sharedLinks: [
//       {
//         name: 'Personal link',
//         url:
//          window.location.protocol + '//' + 
//          window.location.host + window.location.pathname +
//           '?roomID=' +
//           roomID,
//       },
//     ],
//     scenario: {
//       mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
//     },
//   });


// };

//   return (
//     <div
//     className="myCallContainer"
//     ref={myMeeting}
//     style={{ width: '100vw', height: '100vh' }}
//   ></div>
//   );
// };

// export default Call;

import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len = 5) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length;
  
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const Call = () => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const callContainerRef = useRef(null);

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 123456789; // Replace with your actual appID
      const serverSecret = "your_server_secret"; // Replace with your actual serverSecret

      // Generate Kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5), // userID
        randomID(5)  // userName
      );

      // Create instance object from Kit Token
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call
      zp.joinRoom({
        container: callContainerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol +
              '//' + window.location.host + window.location.pathname +
              '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // Modify to OneONoneCall if needed
        },
      });
    };

    // Call the function when the component is mounted
    if (callContainerRef.current) {
      myMeeting();
    }
  }, [roomID]);

  return (
    <div
      className="myCallContainer"
      ref={callContainerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default Call;
