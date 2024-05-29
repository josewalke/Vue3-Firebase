<!-- src/views/LoginView.vue -->
<template>
  <div>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="register">Register</button>
    <button @click="updateUser">Logout</button>
  </div>
  <div>
    <div v-if="users.length">
      <ul>
        <Li>Email - estado</Li>
        <li v-for="user in users" :key="user.id">{{ user.email }} - {{ user.state }}</li>
      </ul>
    </div>
    <p v-else>No users found.</p>
  </div>
</template>

<script>
import { ref,onMounted} from 'vue';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, updateDoc, doc,where,getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  props: {
    type: { type: String, default: 'ERROR' },
    message: String
  },
  data() {
    return {
      visible: true
    };
  }, methods: {
    dismiss() {
      this.visible = false;
    }
  },
  setup() {
    const email = ref('jose@gmail.com');
    const password = ref('123456789');
    const store = useStore();
    const router = useRouter();
    const error = ref(null);
    const users = ref([]);
    

    const login = async (userId) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        //store.dispatch('login', userCredential.user);
        if (store) {
            store.dispatch('login', userCredential.user);
            users.value.forEach(element => {
              if(element.email == email.value){
                console.log(element.id);
                userId = element.id;
              }
            });
            await updateDoc(doc(db, 'Usuarios', userId), {
              state: true
            });
            fetchUsers();
        }
        if (router) {
            router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const register = async () => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log('Usuario creado:', userCredential.user);
        await addDoc(collection(db, 'Usuarios'), {
          email: email.value,
          state: true
        });
        fetchUsers();
        alert("El usuario ha sido creado con exito");
        // Aquí puedes redirigir al usuario o hacer cualquier otra acción después del registro exitoso
      } catch (err) {
        error.value = err.message;
        console.error('Error al registrar usuario:', err.message);
        alert("Esta cuenta ya esta registrada");
      }
    };

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Usuarios'), where('id'));
        users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //console.log(users);
        //console.log(users.value.length);
        
      } catch (err) {
        error.value = err.message;
      }
    };

    const updateUser = async (userId) => {
      users.value.forEach(element => {
          if(element.email == email.value){
            console.log(element.id);
            userId = element.id;
          }
        });
       try {
        // Update user document in Firestore
        await updateDoc(doc(db, 'Usuarios', userId), {
        state: false
      });
      // Fetch updated users
      fetchUsers();
    } catch (err) {
      error.value = err.message;
    }
    };


    onMounted(() => {
      fetchUsers();
    });

    
    
    return { email, password, login,error, register,users, updateUser};
  }
};
</script>
