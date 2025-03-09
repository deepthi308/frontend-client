/* eslint-disable react/no-unescaped-entities */
import "./footerSection.css";
import footerLinks from "../../data/footerLinks.json";
import FooterColumn from "../../components/footerColumn/FooterColumn";

export default function FooterSection() {
  return (
    <section className="footer">
      <section className="footer-summary">
        <p className="footer-summary-title">About Astro ManDeep</p>
        <p className="footer-summary-about">
          Unlock the mysteries of your life with Astro Mandeep, the leading
          platform for accurate and insightful astrology consultations. Connect
          with expert astrologers for deep, meaningful predictions about your
          future. Whether you're seeking clarity in your career, love life,
          health, or marriage, our seasoned astrologers are here to guide you
          through life's challenges. Receive tailored astrology advice via phone
          calls, chat, or detailed reports, helping you navigate life's
          uncertainties with confidence. Discover your true potential with Astro
          Mandeep’s expert astrological guidance – your path to a brighter, more
          fulfilled future.
        </p>
      </section>

      <section className="footer-links">
        {footerLinks.map((column, index) => {
          return <FooterColumn key={index} column={column} />;
        })}
      </section>
    </section>
  );
}
