<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink v-if="!isAuthenticated" to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView></RouterView>
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  setup() {
    const isAuthenticated = ref(false);

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = !!user;
      });
    });

    return { isAuthenticated };
  },
};
</script>

<style scoped>
header {
  padding: 10px;
}

.wrapper {
  display: flex;
  justify-content: flex-end;
}

nav a {
  color: #efe5ff;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
