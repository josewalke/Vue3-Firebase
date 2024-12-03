import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng";

const appId = "2d85de8e31104e8fa2b89ddea99339b3"; // Reemplaza con tu App ID
const token = null; // Usa un token generado si tienes habilitada la autenticación

export const agoraClient = createClient({ mode: "rtc", codec: "vp8" });

export const joinChannel = async (channelName) => {
  const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();

  await agoraClient.join(appId, channelName, token, null);
  await agoraClient.publish([microphoneTrack, cameraTrack]);

  return { microphoneTrack, cameraTrack };
};
