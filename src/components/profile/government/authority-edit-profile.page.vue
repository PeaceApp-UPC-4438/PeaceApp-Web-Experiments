<template>
  <div class="container-fluid px-0">
    <div class="page-container">
      <div class="profile-bg">
        <div class="profile-info">
          <h1>{{ $t('authorityEdit.edit_profile') }}</h1>
          <img src="../../../assets/municipalidad.png" alt="Municipalidad" class="profile-image">
        </div>
        <div class="form-container">
          <form class="form-flex">
            <div class="column">
              <div class="form-group">
                <label for="names" class="label-black">{{ $t('authorityEdit.municipality_name') }}</label>
                <input type="text" id="names" name="names" required class="border-black" :placeholder="$t('authorityEdit.placeholder.municipality_name')">
              </div>
              <div class="form-group">
                <label for="emails" class="label-black">{{ $t('authorityEdit.email') }}</label>
                <input type="email" id="emails" name="emails" required class="border-black" :placeholder="$t('authorityEdit.placeholder.email')">
              </div>
              <div class="form-group">
                <label for="description" class="label-black">{{ $t('authorityEdit.contact_number') }}</label>
                <input type="text" id="names" name="names" required class="border-black" :placeholder="$t('authorityEdit.placeholder.contact_number')">
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="description" class="label-black">{{ $t('authorityEdit.office_address') }}</label>
                <input type="text" id="names" name="names" required class="border-black" :placeholder="$t('authorityEdit.placeholder.office_address')">
              </div>
              <div class="form-group">
                <label for="description" class="label-black">{{ $t('authorityEdit.description') }}</label>
                <textarea id="description" name="description" required class="border-black" rows="5" :placeholder="$t('authorityEdit.placeholder.description')"></textarea>
              </div>
              <div class="button-container">
                <button type="submit">{{ $t('authorityEdit.confirm_changes') }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-container {
  padding: 15vh 0 0 0;
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
  font-size: 1.5rem; /* Responsive font size */
}

input, select, textarea {
  width: 100%; /* Full width to be responsive within its container */
  padding: 0.8em; /* Responsive padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: clamp(12px, 1.2vw, 16px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
#description {
  width: 100%; /* Full width by default */
  height: 150px; /* Auto height to adjust based on content */
  padding: 0.8em; /* Responsive padding */
  border: 1px solid black;
  font-size: clamp(12px, 1.2vw, 16px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  resize: none;
}
.profile-image{
  height: auto;
  border: 1px solid black;
  border-radius: 100%;
  max-width: 250px;
  margin-top: 20px;
  align-items: center;
}

.profile-bg {
  border-radius: 24px;
  background-color: #6DC9FF;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center; /* Align items to the left */

}
/* Media Query for smaller screens */
.form-group {
  margin-bottom: 20px; /* Add bottom margin to the form groups */
}
.border-black {
  border: 1px solid black; /* Set the border to black */
  border-radius: 0; /* Remove rounded border */
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
.form-group {
  margin-bottom: 20px;
  flex: 1;
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
  .page-container{
    padding: 10vh 0 0 0;
  }
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
  textarea {
    width: calc(80% - 100px);
  }
  #description {
    width: 100%; /* Ensure textarea doesn't overflow container */
  }
  .button-container{
    display: flex;
    justify-content: center;
  }
}

</style>

<script setup lang="ts">
</script>