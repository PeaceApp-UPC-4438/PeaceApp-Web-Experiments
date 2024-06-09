<script setup>

</script>

<template>
  <!-- Evolucionar a component -->
  <div class="container">
    <router-link to="/profile/user">
      <button>User</button>
    </router-link>
    <router-link to="/profile/authority">
      <button>Authority</button>
    </router-link>
  </div>
</template>

<style scoped>
button {
  background-color: #EEF221;
  color: #161616;
  font-weight: bolder;
  border: none;
  border-radius: 0.25em;
  padding: 0.5em 1em;
  margin: 0.5em;
  cursor: pointer;
  font-size: 20px;
  height: 45px;
}

.container {
  margin: 0;
  display: flex;
  place-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
