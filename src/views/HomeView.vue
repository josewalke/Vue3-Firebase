<!-- src/views/Home.vue -->
<template>
    <div>
      <h1>Home</h1>
      <login-view></login-view>
    </div>
  </template>
  
  <script>
  import { auth } from '../firebaseConfig';
  import { signOut } from 'firebase/auth';
  import { useStore } from 'vuex';
  
  import LoginView from './LoginView.vue';
  
  export default {
    components: {
      LoginView
  },
    setup() {
      
      const store = useStore();
      
      const logout = async () => {
        try {
          await signOut(auth);
          store?.dispatch('logout');
        } catch (error) {
          console.error(error);
        }
      };
      
      return { logout };
    }
  };
  </script>
  