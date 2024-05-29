<template>
  <div>
    <button @click="login">Iniciar sesión</button>
  </div>
</template>

<script>
import { createAuth0Client } from '@auth0/auth0-spa-js';

export default {
  name: 'LoginPKCE',
  methods: {
    async login() {
      const auth0Client = await createAuth0Client({
        domain: 'dev-z2qazcg5gt24oczn.us.auth0.com',
        clientId: 'k6nIMm78ytNZmJ4QiSgHLc4ETKaNnQKH'
      });
      await auth0Client.loginWithRedirect(); // Aquí estás llamando a un método del objeto auth0Client
    }
  }
}
</script>
