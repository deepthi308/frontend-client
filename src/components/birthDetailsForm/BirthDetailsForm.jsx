import { useRef, useState } from "react";
import "./birthDetailsForm.css";
import { MdFileUpload } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function BirthDetailsForm() {
  const { getItem, setItem } = useLocalStorage();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    gender: "female",
    birthDate: "2000-01-01",
    birthTime: "12:00",
    location: "",
    mobileNumber: getItem("mobileNumber", "")
      ? getItem("mobileNumber", "")
      : "",
    bio: "Hey There, I am using Astro ManDeepology!",
    profilePicture: "",
  });

  const [base64Image, setBase64Image] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  // console.log("Avatar", avatar);
  // console.log("Image", base64Image);

  const fileUploadRef = useRef();

  const handleInputChange = (target) => {
    const { id, value } = target;
    setUserDetails((currUserDetails) => {
      return {
        ...currUserDetails,
        [id]: value,
      };
    });
  };

  const handleChooseAvatar = () => {
    console.log("testing");
    setAvatar(
      `https://api.dicebear.com/9.x/adventurer-neutral/svg?backgroundColor=ecad80&seed=${new Date()
        .getMilliseconds()
        .toString()}`
    );
    setBase64Image(null);
  };

  console.log(avatar, base64Image, "testing");

  const handleBirthDetailsSubmit = (event) => {
    event.preventDefault();
    // Validation
    const {
      name,
      gender,
      birthDate,
      birthTime,
      location,
      mobileNumber,
      bio,
      profilePicture,
    } = userDetails;

    if (
      !name ||
      !gender ||
      !birthDate ||
      !birthTime ||
      !location ||
      !mobileNumber ||
      !bio
    ) {
      toast.error("Please enter all the required fields.");
    } else {
      if (base64Image) {
        setLoading(true);
        const CLOUD_NAME = "drfzvtxg9";
        const UPLOAD_PRESET = "kyloimtt";

        const formData = new FormData();
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("file", profilePicture);
        console.log("Profile", profilePicture);
        axios
          .post(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            formData
          )
          .then((uploadResponse) => {
            const imageUrl = uploadResponse.data.secure_url;
            axios
              .post("/astro-mandeep/api/v1/create-user", {
                name,
                gender,
                birthDate,
                birthTime,
                location,
                mobileNumber,
                bio,
                profilePicture: imageUrl,
              })
              .then((res) => {
                const { message, user } = res.data;
                // console.log(res.data);
                // toast.success(message);
                setTimeout(() => {
                  setItem("user", JSON.stringify(user));
                  navigate("/mainPage");
                  setLoading(false);
                }, 2000);
              });
          });
      } else if (avatar) {
        setLoading(true);
        axios
          .post("/astro-mandeep/api/v1/create-user", {
            name,
            gender,
            birthDate,
            birthTime,
            location,
            mobileNumber,
            bio,
            profilePicture: avatar,
          })
          .then((res) => {
            const { message, user } = res.data;
            // console.log(res.data);
            // toast.success(message);
            setTimeout(() => {
              setItem("user", JSON.stringify(user));
              navigate("/mainPage");
              setLoading(false);
            }, 2000);
          });
      } else if (!avatar && !base64Image) {
        toast.error("Please upload profile picture or choose an avatar.");
      }
    }
  };

  const handleProfilePictureChange = (event) => {
    console.log(event);
    // console.log(fileUploadRef.current);
    const file = event.target.files[0];
    setUserDetails((currUserDetails) => {
      return {
        ...currUserDetails,
        profilePicture: file,
      };
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
        setAvatar(null);
      };

      reader.readAsDataURL(file);
    }
  };

  // const displayPicture = profilePicture || avatar;

  return (
    <section className="birthDetails-form-container">
      <section className="birthDetails-form-left">
        <form>
          <section className="birthDetails-form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={userDetails.name}
              onChange={({ target }) => handleInputChange(target)}
            />
          </section>
          <section className="gender-group">
            <label className="gender" htmlFor="gender">
              Gender:
            </label>
            <section className="gender-group-radio-buttons">
              <section className="gender-group-female">
                <input
                  type="radio"
                  value={"female"}
                  name="gender"
                  id="gender"
                  checked={userDetails.gender === "female"}
                  onChange={({ target }) => handleInputChange(target)}
                />{" "}
                <span>Female</span>
              </section>
              <section className="gender-group-male">
                <input
                  type="radio"
                  value={"male"}
                  name="gender"
                  id="gender"
                  checked={userDetails.gender === "male"}
                  onChange={({ target }) => handleInputChange(target)}
                />{" "}
                <span>Male</span>
              </section>
            </section>
          </section>
          <section className="birthDetails-form-group">
            <label htmlFor="birthDate">Birth Date:</label>
            <input
              type="date"
              value={userDetails.birthDate}
              id="birthDate"
              style={{ paddingRight: "10px" }}
              onChange={({ target }) => handleInputChange(target)}
            />
          </section>
          <section className="birthDetails-form-group">
            <label htmlFor="birthTime">Birth Time:</label>
            <input
              type="time"
              value={userDetails.birthTime}
              id="birthTime"
              style={{ paddingRight: "10px" }}
              onChange={({ target }) => handleInputChange(target)}
            />
          </section>
          <section className="birthDetails-form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              value={userDetails.location}
              id="location"
              onChange={({ target }) => handleInputChange(target)}
            />
          </section>
          <section className="birthDetails-form-group">
            <label htmlFor="mobileNumber">Mobile No:</label>
            <input
              type="text"
              id="mobileNumber"
              disabled={true}
              value={userDetails.mobileNumber}
              onChange={({ target }) => handleInputChange(target)}
            />
          </section>
          <section className="astro-caption">
            <label className="caption" htmlFor="bio">
              Astro Bio:
            </label>
            <textarea
              className="text-area-caption"
              id="bio"
              value={userDetails.bio}
              onChange={({ target }) => handleInputChange(target)}
            ></textarea>
          </section>
          <button
            className="birthDetailsFormSubmit"
            onClick={handleBirthDetailsSubmit}
          >
            {loading ? (
              <ClipLoader
                loading={loading}
                size={20}
                speedMultiplier={0.5}
                color="#D9D9D9"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
      <section className="birthDetails-form-right">
        {/* <img
          src={"https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=Felix"}
        /> */}

        {base64Image || avatar ? (
          <img src={base64Image ? base64Image : avatar} alt="Avatar" />
        ) : (
          <label className="upload-container" htmlFor="profilePicture">
            <MdFileUpload
              size={"100%"}
              color="#a72005"
              style={{
                backgroundColor: "rgba(167, 32, 5, 0.12)",
                borderRadius: "10px",
              }}
            />{" "}
          </label>
        )}

        <section className="profile-picture-buttons">
          <label
            htmlFor="profilePicture"
            className="custom-image-upload"
            // onClick={handleProfilePictureChange}
          >
            Upload Picture
          </label>
          <label className="avatar-image-upload" onClick={handleChooseAvatar}>
            Choose Avatar
          </label>
        </section>
        <input
          id="profilePicture"
          ref={fileUploadRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
        />

        {/* <section className="avatar-upload-buttons">
         
         
        </section> */}
      </section>
    </section>
  );
}
