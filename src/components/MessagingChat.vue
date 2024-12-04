<template>
  <div>
    <h2>Mensajería en Tiempo Real</h2>
    <input v-model="channelName" placeholder="Nombre del Canal" />
    <button @click="connectRTM">Conectar</button>
    <br />
    <input v-model="message" placeholder="Escribe un mensaje" />
    <button @click="sendRTMMessage">Enviar</button>
    <div v-if="messages.length">
      <h3>Mensajes:</h3>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { initializeRTM, joinRTMChannel, sendMessage } from "@/AgoraMessagingService";

export default {
  name: "MessagingChat",
  data() {
    return {
      channelName: "defaultChannel",
      userId: `user_${Math.floor(Math.random() * 1000)}`, // Genera un ID único
      message: "",
      messages: [],
    };
  },
  methods: {
    async connectRTM() {
      try {
        await initializeRTM(this.userId);
        await joinRTMChannel(this.channelName);

        console.log("Conectado a RTM y canal unido.");
      } catch (error) {
        console.error("Error al conectar a RTM:", error);
      }
    },
    async sendRTMMessage() {
      try {
        if (this.message.trim() !== "") {
          await sendMessage(this.message);
          this.messages.push(`Tú: ${this.message}`);
          this.message = "";
        }
      } catch (error) {
        console.error("Error al enviar mensaje:", error);
      }
    },
  },
};
</script>
