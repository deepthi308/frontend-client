import { useEffect, useRef, useState } from "react";
import "./inputOTP.css";

export default function InputOTP({ count, setCombinedOTP }) {
  const [otp, setOtp] = useState(Array(count).fill(""));
  const inputRefs = useRef([]);
  console.log(inputRefs, otp);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    console.log(isNaN(value));
    console.log(value);
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setCombinedOTP(newOtp.join(""));

    if (value && index < count - 1 && inputRefs.current[index + 1]) {
      if (otp[index + 1] && inputRefs.current[index + 2]) {
        inputRefs.current[index + 2].focus();
      } else {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <section className="inputOTP">
      <label>Enter OTP:</label>
      <section className="OTPInputContainer">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </section>
    </section>
  );
}
