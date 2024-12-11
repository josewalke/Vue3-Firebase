<template>
  <div>
    <h2>Videollamada con Agora</h2>
    <button @click="joinChannel">Unirse al canal</button>
    <div class="video-container">
      <div ref="localVideo" id="local-stream" class="video-box"></div>
      <div ref="remoteVideo" id="remote-stream" class="video-box"></div>
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
  flex-direction: row;
  /* Videos en fila horizontal en pantallas grandes */
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* Permite que los videos se ajusten en una nueva fila si es necesario */
  height: 50vh;
  /* Tamaño dinámico del contenedor */
  gap: 0px;
  /* Espacio entre videos */
}

.video-box {
  flex: 1 1 calc(50% - 20px);
  max-width: 600px;
  height: auto;
  aspect-ratio: 16/9;
  border: 1px solid #ccc;
  background-color: #000;
}

@media (max-width: 768px) {
  .video-container {
    flex-direction: column;
  }

  .video-box {
    flex: 1 1 100%;
    max-width: 100%;
    height: 50vh;
  }
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
