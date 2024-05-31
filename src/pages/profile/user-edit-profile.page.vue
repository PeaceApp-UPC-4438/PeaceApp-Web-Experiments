<template>
  <div class="container-fluid px-0">
    <div class="page-container">
      <div class="profile-bg">
        <div class="profile-info">
          <h1>Edit Profile</h1>
          <img src="../../assets/Citizen.png" alt="Citizen" class="profile-image">
        </div>
        <div class="form-container">
          <form class="form-flex">
            <div class="column">
              <div class="form-group">
                <label for="names" class="label-black">First Names:</label>
                <input type="text" id="names" name="names" required class="border-black" placeholder="First names">
              </div>
              <div class="form-group">
                <label for="last-names" class="label-black">Last Names:</label>
                <input type="text" id="last-names" name="last-names" required class="border-black" placeholder="Last names">
              </div>
              <div class="form-group">
                <label for="district" class="label-black">District:</label>
                <input type="text" id="district" name="district" required class="border-black" placeholder="District">
              </div>
              <div class="form-group">
                <label for="emails" class="label-black">Email:</label>
                <input type="email" id="emails" name="emails" required class="border-black" placeholder="Email">
              </div>
              <div class="form-group">
                <label for="route-type" class="label-black">Route Type:</label>
                <select id="route-type" name="route-type" required class="border-black">
                  <option value="safe">Safe</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
              <div class="form-group">
                <label for="notification" class="label-black">Alert Frequency:</label>
                <select id="notification" name="notification" required class="border-black">
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div class="column">
              <div class="form-group">
                <label for="location" class="label-black">Location (Optional):</label>
                <input type="text" id="location" name="location" class="border-black" placeholder="Location">
              </div>
              <div class="form-group">
                <label for="description" class="label-black">Description:</label>
                <textarea id="description" name="description" required class="border-black" rows="5" placeholder="Description"></textarea>
              </div>
              <div class="button-container">
              <button type="submit">Confirm Changes</button>
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
  background-color: #01A1FF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%; /* Ensure it spans the entire width */
  color: white;
  padding: 4rem; /* Start with a moderate padding */
  left: 0;
  box-sizing: border-box; /* Include padding in the width calculation */
}
.profile-image {
  width: 100%; /* Scales with the width of its container */
  height: auto; /* Maintains aspect ratio */
  max-width: 500px; /* Prevents the image from becoming too large on big screens */
  margin-top: 20px;
  align-items: center;
}
.form-flex {
  display: flex;
}
.column {
  flex: 1;
}
.column:not(:last-child) {
  margin-right: 80px; /* Add margin to the right of each column except the last one */
}
.column:not(:first-child) {
  margin-left: 80px; /* Add margin to the left of each column except the first one */
}
@media screen and (max-width: 1100px) {
  .form-flex {
    flex-direction: column; /* Stack columns vertically on smaller screens */
  }
  .profile-image {
    width: 95%; /* Scales with the width of its container */
    height: auto; /* Maintains aspect ratio */
    max-width: 500px; /* Prevents the image from becoming too large on big screens */
    margin-top: 20px;
    align-items: center;
  }
  .column:not(:last-child) {
    margin-right: 0; /* Remove margin from the right of each column on smaller screens */
  }
  .column:not(:first-child) {
    margin-left: 0; /* Remove margin from the left of each column on smaller screens */
  }
  .profile-bg {
    flex-direction: column; /* Stack elements in the profile-bg container vertically on smaller screens */
    align-items: center; /* Center align items horizontally */
  }
  .form-container {
    width: 100%; /* Ensure the form container spans the full width */
  }
  .column {
    margin: 20px 0; /* Add vertical margin between columns */
  }
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
  height: 400px; /* Auto height to adjust based on content */
  padding: 0.8em; /* Responsive padding */
  border: 1px solid black;
  font-size: clamp(12px, 1.2vw, 16px);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  resize: none; /* Allow vertical resizing */
}
@media screen and (max-width: 1100px) {
  input,
  select{
    width: calc(100% - 100px); /* Reduce width by 20px to create some spacing */
    max-width: 80%; /* Ensure inputs don't overflow container */
  }
  textarea {
    width: calc(80% - 100px); /* Reduce width by 20px to create some spacing */
    max-width: 80%; /* Ensure inputs don't overflow container */
  }
  #description {
    width: calc(80% - 40px); /* Reduce width by 20px to create some spacing */
    max-width: 100%; /* Ensure textarea doesn't overflow container */
  }
}
.profile-bg {
  background-color: #6DC9FF;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 87%;
  margin-left: auto; /* Center aligning the element by setting left margin to auto */
  margin-right: 6%; /* Slightly less than half of the remaining space to push it a bit to the right */
  margin-top: 100px; /* Adjust this value to set how far down you want the element */
}

.profile-info {
  flex: 1; /* Take the remaining space */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
  margin-left: 20px; /* Adjust margin to move content to the left */
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
}
button:hover {
  background-color: #9EA016;
}
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right:auto;
  margin-left:auto;
}
@media screen and (max-width: 480px) {
  .form-group {
    margin-bottom: 15px; /* Reduce bottom margin for form groups */
  }
  .column {
    margin-right: 0; /* Remove right margin from columns */
    margin-left: 0; /* Remove left margin from columns */
  }
  .profile-bg {
    width: 55%; /* Set width to 90% of its container */

    margin-top: 50px; /* Adjust top margin for profile background */
    padding: 5px; /* Reduce padding for profile background */
    margin-left: -15px; /* Center aligning the element by setting left margin to auto */
  }
  .label-black {
    font-size: 1rem; /* Decrease font size for labels */
    margin-left:-15px;
  }
  input, select, textarea {
    margin-left:-15px;
    padding: 0.6em; /* Reduce padding for inputs and textarea */
    font-size: 14px; /* Decrease font size for inputs and textarea */
  }
  .profile-image {
    width: 90%; /* Adjust width to 80% of its container */
    max-width: none; /* Remove the maximum width constraint */
    margin-top: 10px; /* Adjust margin-top for spacing */
  }
  input,
  select{
    width: calc(100% - 70px); /* Reduce width by 20px to create some spacing */
    max-width: 80%; /* Ensure inputs don't overflow container */
  }
  textarea {
    width: calc(60% - 100px); /* Reduce width by 20px to create some spacing */
    max-width: 60%; /* Ensure inputs don't overflow container */
  }
  #description {
    width: calc(100% - 70px); /* Reduce width by 20px to create some spacing */
    max-width: 100%; /* Ensure textarea doesn't overflow container */
  }
  button {
    padding: 10px 10px;
    background-color: yellow;
    color: black;
    border: none;
    margin-left:-10px;
    border-radius: 5px;
    cursor: pointer;
  }
}

</style>
