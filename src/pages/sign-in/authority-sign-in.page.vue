<script setup>

</script>

<template>
  <form class="form">
    <p class="message">Signup now and get full access to our app. </p>
    <div class="flex">
      <label>
        <input class="input" type="text" placeholder="" required="">
        <span>Firstname</span>
      </label>

      <label>
        <input class="input" type="text" placeholder="" required="">
        <span>Lastname</span>
      </label>
    </div>

    <label>
      <input class="input" type="email" placeholder="" required="">
      <span>Email</span>
    </label>

    <label>
      <input class="input" type="password" placeholder="" required="">
      <span>Password</span>
    </label>
    <label>
      <input class="input" type="password" placeholder="" required="">
      <span>Confirm password</span>
    </label>
    <router-link to="/profile/authority">
      <button class="submit">Submit</button>
    </router-link>
    <p class="signin">Already have an acount ? <a href="#">Signin</a> </p>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  margin: 0 auto;
;
  padding: 20px;
  border-radius: 20px;
  position: relative;
}

.message, .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
}

.signin {
  text-align: center;
}

.signin a {
  color: royalblue;
}

.signin a:hover {
  text-decoration: underline royalblue;
}

.flex {
  display: flex;
  width: 100%;
  gap: 6px;
}

.form label {
  position: relative;
}

.form label .input {
  width: 100%;
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
  top: 0px;
  font-size: 0.7em;
  font-weight: 600;
}

.form label .input:valid + span {
  color: green;
}

.submit {
  border: none;
  outline: none;
  background-color: royalblue;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  transform: .3s ease;
}

.submit:hover {
  background-color: rgb(56, 90, 194);
  cursor: pointer;
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