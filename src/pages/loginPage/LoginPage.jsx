import axios from "axios";
import InputOTP from "../../components/inputOTP/InputOTP";
import "./loginPage.css";
import loginImage from "/images/loginImage.png";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isOTPClicked, setIsOTPClicked] = useState(false);
  const [serverOTP, setServerOTP] = useState("");
  const [combinedOTP, setCombinedOTP] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (validatePhoneNumber(mobileNumber)) {
      // Check if the user exist or not
      setIsValid(true);
      axios
        .post("/astro-mandeep/api/v1/get-otp", {
          phoneNumber: `+${mobileNumber}`,
        })
        .then((res) => {
          const { otp } = res.data;
          setServerOTP(otp);
          localStorage.setItem("otp", otp);
          axios
            .post("/astro-mandeep/api/v1/send-otp", {
              phoneNumber: `+${mobileNumber}`,
              otp: otp,
            })
            .then((res) => {
              const { message } = res.data;
              toast.success(message);
              setIsOTPClicked(true);
            });
        });
    } else {
      setIsValid(false);
    }
  };

  const handleOTPSubmit = () => {
    console.log("testing", combinedOTP, serverOTP);
    if (combinedOTP === serverOTP) {
      toast.success("Signed up successfully.");
      navigate("/birthDetailsPage");
    }
  };

  const handleMobileNumberChange = (mobileNumber) => {
    setMobileNumber(mobileNumber);
  };

  const validatePhoneNumber = (mobileNumber) => {
    let NumMobileNumber = Number(mobileNumber);
    console.log(NumMobileNumber);
    const mobileNumberPattern = /^\d{10,15}$/;

    console.log(mobileNumberPattern.test(NumMobileNumber));
    return mobileNumberPattern.test(NumMobileNumber);
  };

  return (
    <section className="login">
      <section className="login-form-container">
        <section className="login-form-container-left">
          <img src={loginImage} alt="" />
        </section>
        <div className="login-form-container-right">
          <h3 className="otp-message">
            You will receive a OTP on your mobile for verification
          </h3>
          {!isOTPClicked ? (
            <section className="form-group phone-input-container">
              <label htmlFor="mobile">Mobile Number:</label>
              <PhoneInput
                className="mobile"
                country={"in"}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                }}
                inputStyle={{
                  backgroundColor: "#D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                dropdownStyle={{
                  backgroundColor: "#D9D9D9",
                  maxHeight: "300px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  overflowY: "auto",
                  padding: "10px",
                  width: "250px",
                  border: "1px solid #a72005",
                  zIndex: "9999",
                  scrollbarColor: "#a72005 rgba(167, 32, 5, 0.12)",
                  color: "#a72005",
                }}
                type="text"
                id="mobile"
                placeholder=""
                // disableCountryCode={true}
                prefix="+"
                value={mobileNumber}
                onChange={(mobileNumber) =>
                  handleMobileNumberChange(mobileNumber)
                }
              />
              {!isValid && (
                <p className="phone-error">Please enter a valid phone number</p>
              )}
            </section>
          ) : (
            <InputOTP count={4} setCombinedOTP={setCombinedOTP} />
          )}
          {!isOTPClicked ? (
            <button onClick={handleLogin}>Login</button>
          ) : (
            <button onClick={({ target }) => handleOTPSubmit(target)}>
              Submit
            </button>
          )}
          <p className="login-privacy-policy">
            By Signing up, you agree to our{" "}
            <span className="green">Terms of Use</span> and{" "}
            <span className="green">Privacy Policy</span>.
          </p>
        </div>
      </section>
    </section>
  );
}
