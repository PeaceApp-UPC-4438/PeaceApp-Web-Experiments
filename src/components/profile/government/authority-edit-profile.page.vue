<template>
  <div class="padre">
    <div class="profile-bg">
      <h1>{{ $t('authorityEdit.edit_profile') }}</h1>
      <div class="left">
        <!--<img :src="authority.profileImage" alt="User" class="img" />-->
      </div>
      <div class="form-container">
        <form class="form-flex">
          <div class="column">
            <div class="form-group">
              <label for="names" class="label-black">{{ $t('authorityEdit.municipality_name') }}</label>
              <input :placeholder="$t('authorityEdit.placeholder.municipality_name')" class="input-style" type="text" id="input" required>
            </div>
            <div class="form-group">
              <label for="emails" class="label-black">{{ $t('authorityEdit.email') }}</label>
              <input :placeholder="$t('authorityEdit.placeholder.email')" class="input-style" type="email" id="input" required >
            </div>
            <div class="form-group">
              <label for="description" class="label-black">{{ $t('authorityEdit.contact_number') }}</label>
              <input :placeholder="$t('authorityEdit.placeholder.contact_number')" class="input-style" type="text" id="input" required>
            </div>
          </div>
          <div class="column">
            <div class="form-group">
              <label for="description" class="label-black">{{ $t('authorityEdit.office_address') }}</label>
              <input :placeholder="$t('authorityEdit.placeholder.office_address')" class="input-style" type="text" id="input" required >
            </div>
            <div class="form-group">
              <label for="description" class="label-black">{{ $t('authorityEdit.description') }}</label>
              <textarea :placeholder="$t('authorityEdit.placeholder.description')" class="input-style description" rows="5" cols="30" required/>
            </div>
            <div class="button-container">
              <button type="submit">{{ $t('authorityEdit.confirm_changes') }}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.left img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #ddd;
  object-fit: cover;
}
.left {
  align-items: center;
  padding: 3vh;
  margin: 0 auto;
}
.padre {
  padding: 15vh 0 0 0;
  margin: 0 auto;
}
.form-flex {
  display: flex;
  gap: 50px;
}
.column {
  width: 50%;
}

.label-black {
  color: black;
  text-align: left;
  font-weight: bold;
  font-size: 1.3rem; /* Responsive font size */
}

.profile-bg {
  padding: 10px;
  border-radius: 24px;
  background-color: #6DC9FF;
  width: 70vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: auto;
}
/* Media Query for smaller screens */
.form-group {
  margin-bottom: 20px; /* Add bottom margin to the form groups */
}
.form-container {
  flex: 1;
  padding: 40px;
}

h1 {
  color: white;
  font-size: clamp(24px, 5vw, 40px);
  transition: font-size 0.3s ease;
}
.form-group input, textarea{
  margin: 0;
  width: 100%;
}
.form-group textarea{
  resize: none;
  height: 135px;
}
label {
  display: block;
  font-weight: bold;
}

button {
  padding: 10px 20px;
  background-color: yellow;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bolder;
  font-size: 20px;
}
button:hover {
  background-color: #9EA016;
}
@media (max-width: 1000px) {
  .form-flex {
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
  .profile-bg {
    flex-direction: column; /* Stack elements in the profile-bg container vertically on smaller screens */
    align-items: center;
  }
  .form-container {
    width: 100%;
    padding: 10px;/* Ensure the form container spans the full width */
  }
  .column {
    width: 100%;
    gap: 0;
  }
  input, select{
    width: 100%;
  }
  .button-container{
    display: flex;
    justify-content: center;
  }
}

</style>