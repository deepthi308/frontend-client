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
  user: new User(),
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
