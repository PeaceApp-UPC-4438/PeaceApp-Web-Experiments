<script setup>

</script>

<template>
  <form class="form">
    <p class="message">Por favor, llene los datos indicados para crear su cuenta</p>
    <div class="flex">
      <label>
        <input class="input" type="text" placeholder="" required="">
        <span>Firstname</span>
      </label>

      <label>
        <input class="input" type="password" placeholder="" required="">
        <span>Password</span>
      </label>
    </div>
    <div class="flex">
      <label>
        <input class="input" type="text" placeholder="" required="">
        <span>Lastname</span>
      </label>
      <label>
        <input class="input" type="password" placeholder="" required="">
        <span>Confirm Password</span>
      </label>
    </div>
    <div class="flex">
      <label>
        <input class="input" type="email" placeholder="" required="">
        <span>Email</span>
      </label>

      <label>
        <input class="input" type="text" placeholder="" required="">
        <span>Lastname</span>
      </label>
    </div>
    <label class="material-checkbox">
      <input type="checkbox" required>
      <span class="checkmark"></span>
      Aceptar Términos de Servicio y Políticas de Seguridad
    </label>
    <router-link to="/profile/user">
      <button class="submit">Submit</button>
    </router-link>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  align-items: center;
  justify-content: center;
}


.message {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}


.flex {
  display: flex;
  gap: 15px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 210px;
  padding: 10px 10px 20px 10px;
  outline: 0;
  border: 1px solid rgba(105, 105, 105, 0.397);
  border-radius: 10px;
}

.form label .input + span {
  position: absolute;
  left: 10px;
  top: 15px;
  color: grey;
  font-size: 0.9em;
  cursor: text;
  transition: 0.3s ease;
}

.form label .input:placeholder-shown + span {
  top: 15px;
  font-size: 0.9em;
}

.form label .input:focus + span,.form label .input:valid + span {
  top: 0;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

button {
  border: none;
  outline: none;
  background-color: #EEF221;
  padding: 10px;
  border-radius: 10px;
  color: #161616;
  font-size: 16px;
  font-weight: bolder;
}

.material-checkbox {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #777777;
  cursor: pointer;
}

.material-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border: 2px solid #454B00;
  border-radius: 4px;
  transition: all 0.3s;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark {
  background-color: #2F3300;
  border-color: #454B00;
}

.material-checkbox input[type="checkbox"]:checked ~ .checkmark:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 6px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.material-checkbox input[type="checkbox"]:focus ~ .checkmark {
  box-shadow: 0 0 0 2px #dfec5065;
}

.material-checkbox:hover input[type="checkbox"] ~ .checkmark {
  border-color: #C3CF34;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark {
  opacity: 0.5;
  cursor: not-allowed;
}

.material-checkbox input[type="checkbox"]:disabled ~ .checkmark:hover {
  border-color: #4d4d4d;
}


@keyframes pulse {
  from {
    transform: scale(0.9);
    opacity: 1;
  }

  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>