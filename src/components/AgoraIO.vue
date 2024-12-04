<template>
  <div>
    <h2>Videollamada con Agora</h2>
    <button @click="joinChannel">Unirse al canal</button>
    <div class="video-container">
      <div ref="localVideo" id="local-stream" class="video-box"></div>
      <div ref="remoteVideo" id="remote-stream" class=""></div>
    </div>
  </div>
</template>

<script>
import { agoraClient, joinChannel } from "@/AgoraService";

export default {
  name: "AgoraIO",
  data() {
    return {
      localTracks: null,
      remoteUsers: {},
    };
  },
  methods: {
    async joinChannel() {
      try {
        const { microphoneTrack, cameraTrack } = await joinChannel("test");

        this.localTracks = { microphoneTrack, cameraTrack };

        cameraTrack.play(this.$refs.localVideo);

        agoraClient.on("user-published", async (user, mediaType) => {
          await agoraClient.subscribe(user, mediaType);

          if (mediaType === "video") {
            user.videoTrack.play(this.$refs.remoteVideo);
          }
        });

        agoraClient.on("user-unpublished", (user) => {
          console.log("Usuario desconectado:", user.uid);
        });
      } catch (error) {
        console.error("Error al unirse al canal:", error);
      }
    },
  },
};
</script>

<style>
.video-container {
  display: flex;
  /* justify-content: space-between; */
  /* Opcional: Espacia los elementos */
   gap: 10px;
  /* Espaciado entre los videos */
}

.video-box {
  width: 45%;
  /* Ajusta el ancho según tu necesidad */
  height: 300px;
  /* Ajusta la altura según tu necesidad */
  border: 1px solid #ccc;
  /* Opcional: para visualización */
  background-color: #000;
  /* Color de fondo para representar el video */
}
#remoteVideoContainer {
  display: flex;
  flex-wrap: wrap;
  /* gap: 10px; */
  /* Espacio entre videos */
  justify-content: center;
  background-color: #f0f0f0;
  padding: 10px;
}

#remoteVideoContainer>div {
  border: 1px solid #ccc;
  background-color: #000;
}
</style>
