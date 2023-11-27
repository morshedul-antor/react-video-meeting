import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";

export default function Video() {
  const { roomid } = useParams();

  function randomID(len) {
    let chars = "qwertyuiopasdfghjklmnbvcxz";
    let maxPos = chars.length;
    let result = "";

    let i;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
      if ((i + 1) % 3 === 0 && i + 1 !== len) {
        result += "-";
      }
    }
    return result;
  }

  const userId = randomID(3);
  const userName = "Antor";

  let myMeeting = async (element) => {
    const appID = parseInt(process.env.REACT_APP_ZEGO_APP_ID);
    const serverSecret = process.env.REACT_APP_ZEGO_SERVER_SECRET;

    // generate Kit Token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      `${userId}`,
      `${userName}`
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url: `http://localhost:3000/room/${roomid}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      video: {
        mirror: true,
      },
      showRoomTimer: true,
      showLayoutButton: false,
      showScreenSharingButton: false,
      // showPreJoinView: false,
    });
  };

  return (
    <div ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
