import AgoraRTM from "agora-rtm-sdk";

const appId = "39adcd4038db441ca32550138cc25bf2"; // Reemplaza con tu App ID

let rtmClient; // Cliente RTM
let rtmChannel; // Canal RTM

export const initializeRTM = async (userId) => {
  rtmClient = AgoraRTM.createInstance(appId);

  // Conéctate al cliente RTM
  await rtmClient.login({ uid: userId });
  console.log(`Usuario ${userId} conectado a RTM`);
};

export const joinRTMChannel = async (channelName) => {
  if (!rtmClient) throw new Error("RTM Client no inicializado");

  // Únete al canal
  rtmChannel = await rtmClient.createChannel(channelName);
  await rtmChannel.join();
  console.log(`Unido al canal de mensajería: ${channelName}`);

  // Maneja mensajes recibidos
  rtmChannel.on("ChannelMessage", (message, senderId) => {
    console.log(`Mensaje de ${senderId}:`, message.text);
  });
};

export const sendMessage = async (message) => {
  if (!rtmChannel) throw new Error("No estás unido a un canal RTM");

  // Envía un mensaje al canal
  await rtmChannel.sendMessage({ text: message });
  console.log("Mensaje enviado:", message);
};

export const leaveRTMChannel = async () => {
  if (rtmChannel) {
    await rtmChannel.leave();
    console.log("Saliste del canal de mensajería");
    rtmChannel = null;
  }
};

export const logoutRTM = async () => {
  if (rtmClient) {
    await rtmClient.logout();
    console.log("Usuario desconectado de RTM");
  }
};
