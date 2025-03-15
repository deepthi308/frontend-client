import { createSlice } from "@reduxjs/toolkit";

class User {
  constructor(
    name = "",
    gender = "",
    birthDate = "",
    birthTime = "",
    location = "",
    mobileNumber = "",
    bio = "",
    profilePicture = ""
  ) {
    this.name = name;
    this.gender = gender;
    this.birthDate = birthDate;
    this.birthTime = birthTime;
    this.location = location;
    this.mobileNumber = mobileNumber;
    this.bio = bio;
    this.profilePicture = profilePicture;
  }
}

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || new User(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
