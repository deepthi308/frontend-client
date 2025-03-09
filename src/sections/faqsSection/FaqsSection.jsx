import Accordian from "../../components/accordian/Accordian";
import "./faqsSection.css";

export default function FaqsSection() {
  return (
    <section id="faqs" className="faqs">
      <section className="heading">
        <h1 className="title">Unlocking the Secrets of Your Birth Chart</h1>
        <h3 className="sub-title">
          Have you ever wondered how the stars and planets at the exact moment
          of your birth could influence your life?
        </h3>
      </section>

      <section className="para faq-summary">
        Imagine the night sky, a canvas painted with the luminous glow of
        countless stars, each carrying ancient wisdom and secrets of the
        universe. At the precise moment you took your first breath, the cosmos
        whispered its unique message to you. Your birth chart—the cosmic map of
        your soul’s journey—holds the key to understanding your deepest desires,
        untapped potential, and your destined path. It’s not just a map; it’s a
        magical blueprint of your life’s story, written in the stars.
      </section>

      <section className="accordian">
        <Accordian />
      </section>
    </section>
  );
}
