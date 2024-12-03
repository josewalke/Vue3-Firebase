import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-sdk-ng";

const appId = "39adcd4038db441ca32550138cc25bf2"; // Reemplaza con tu App ID
const token = null; // Usa un token generado si es necesario

export const agoraClient = createClient({ mode: "rtc", codec: "vp8" });

export const joinChannel = async (channelName) => {
  try {
    const [microphoneTrack, cameraTrack] = await createMicrophoneAndCameraTracks();

    await agoraClient.join(appId, channelName, token, null);
    console.log(`Unido al canal ${channelName} con éxito`);

    await agoraClient.publish([microphoneTrack, cameraTrack]);
    console.log("Pistas publicadas con éxito");

    return { microphoneTrack, cameraTrack };
  } catch (error) {
    console.error("Error al unirse al canal o publicar pistas:", error);
    throw error;
  }
};

export const leaveChannel = async () => {
  try {
    await agoraClient.leave();
    console.log("Saliste del canal con éxito");
  } catch (error) {
    console.error("Error al salir del canal:", error);
  }
};

// Manejo de eventos
agoraClient.on("error", (err) => {
  console.error("Agora Client Error:", err);
});

agoraClient.on("user-published", async (user, mediaType) => {
  await agoraClient.subscribe(user, mediaType);
  console.log("Suscripción exitosa al usuario remoto:", user.uid);

  if (mediaType === "video") {
    const remoteContainer = document.createElement("div");
    remoteContainer.id = user.uid.toString();
    remoteContainer.style.width = "320px";
    remoteContainer.style.height = "240px";
    document.body.append(remoteContainer);

    user.videoTrack.play(remoteContainer);
  }

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
});

agoraClient.on("user-unpublished", (user) => {
  console.log("Usuario remoto dejó de publicar:", user.uid);
  const remoteContainer = document.getElementById(user.uid.toString());
  if (remoteContainer) remoteContainer.remove();
});
