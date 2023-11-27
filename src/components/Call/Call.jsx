import { useEffect, useState, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Incoming from "../../assets/incoming.mp3";
import Outgoing from "../../assets/outgoing.mp3";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function Call() {
  const [userInfo, setUserInfo] = useState({
    userId: "",
  });

  const [calleeId, setCalleeId] = useState("");
  const zeroCloudInstance = useRef(null);

  const userId = randomID(5);
  async function init() {
    setUserInfo({
      userId,
    });

    const appID = 754587321;
    const serverSecret = "ee837f27815b46c45d4b22859cc87879";

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userId,
      "Antor"
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    zeroCloudInstance.current.addPlugins({ ZIM });
  }

  function handleSend(callType) {
    const callee = calleeId;
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }

    zeroCloudInstance.current.setCallInvitationConfig({
      ringtoneConfig: {
        incomingCallUrl: Incoming,
        outgoingCallUrl: Outgoing,
      },
    });

    // send call invitation
    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: callee, userName: "user_" + callee }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert("The user dose not exist or is offline.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div>
        My userId: <span>{userInfo.userId}</span>
      </div>
      <input
        type="text"
        is="userId"
        placeholder="callee's userID"
        onChange={(event) => {
          setCalleeId(event.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
        }}
      >
        Video call
      </button>
      <button
        onClick={() => {
          handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
        }}
      >
        Voice call
      </button>
    </div>
  );
}
