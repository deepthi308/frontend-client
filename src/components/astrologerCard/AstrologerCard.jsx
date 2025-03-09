/* eslint-disable react/prop-types */
import "./astrologerCard.css";
import { GoStarFill } from "react-icons/go";
import { motion } from "framer-motion";

export default function AstrologerCard({ astrologer }) {
  const { name, skill, experience, languages, image, orders } = astrologer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`astrologerCard`}
    >
      <section className="astrologerCard-left">
        <img src={image} alt={name} />
      </section>
      <section className="astrologerCard-right">
        <div className="astrologer-right-content">
          <p className="astrologer-name">{name}</p>
          <p className="skill">{skill}</p>
          <p className="experience">
            {experience} years of exp<span className="extra">erinence</span>
          </p>
        </div>

        <div className="astrologer-right-middle">
          <ul className="languages">
            {languages.map((language, index) => {
              return (
                <li className="language" key={index}>
                  <span className="dot">•</span> {language}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="astrologer-right-footer">
          <p className="orders">{orders} orders</p>
          <p className="rating">
            4.5 / 5 <GoStarFill size={16} color="#a72005" />
          </p>
        </div>
      </section>
    </motion.div>
  );
}
