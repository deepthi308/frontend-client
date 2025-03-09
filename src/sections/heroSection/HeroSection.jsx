import "./heroSection.css";
import HEROIMAGE from "../../assets/mainImage.png";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function HeroSection() {
  const { removeItem } = useLocalStorage();
  const navigate = useNavigate();

  const handleLogin = () => {
    removeItem("otp");
    removeItem("mobileNumber");
    removeItem("user");
    navigate("/login");
  };

  return (
    <section className="hero">
      <section className="left">
        <section className="heading">
          <h1 className="title">
            Step into the Future, Your Journey Begins Here!
          </h1>
          <h3 className="sub-title">
            Discover the Secrets of Your Life with Our Astrologers
          </h3>
        </section>
        <p className="para">
          Life can feel like a series of crossroads, each one filled with
          uncertainty, wondering which direction to take. The choices can be
          overwhelming—should you follow your passion or play it safe? Is it
          time for a change in your career? What does your heart truly need in
          love? The answers may not always be clear, but they’re out there,
          waiting to be discovered.
        </p>
        <p className="para">
          At Astro ManDeep, we believe the universe is full of signs and
          guidance that can lead you to the right path. Our team of skilled
          astrologers is here to offer you the clarity you’ve been seeking. With
          personalized insights based on your unique birth chart and cosmic
          influences, we help you understand the energies shaping your
          life—whether you're navigating a major decision, facing challenges, or
          just looking for guidance on what comes next. The beauty of astrology
          lies in its power to illuminate the hidden forces at play in your
          life. When you look to the stars, you’ll find more than
          predictions—you’ll uncover deeper truths about who you are, what you
          truly desire, and the opportunities that await. Our astrologers are
          more than just guides; they’re your trusted companions, here to answer
          your most pressing questions and offer practical advice that resonates
          with your soul. Whether you want to unlock your true potential in your
          career, get advice on your relationships, or simply gain a sense of
          peace about the future, we’re here to support you every step of the
          way. Start a live chat with one of our expert astrologers and begin
          your journey to a clearer, more fulfilled life.
        </p>
        <section onClick={handleLogin}>
          <button className="start">Start</button>
        </section>
      </section>
      <section className="right">
        <img src={HEROIMAGE} alt="Hero Image" />
      </section>
    </section>
  );
}
