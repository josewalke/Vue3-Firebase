<template>
  <div>
    <h2>Videollamada con Agora</h2>
    <button @click="joinChannel">Unirse al canal</button>
    <div ref="localVideo" id="local-stream"></div>
    <div ref="remoteVideo" id="remote-stream"></div>
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
#local-stream,
#remote-stream {
  width: 320px;
  height: 240px;
  margin: 10px;
  background: #000;
}
</style>
