/* eslint-disable react/prop-types */
import { GoStarFill } from "react-icons/go";
import "./faq.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { motion } from "framer-motion";

export default function Faq({ faq, handleToggleQuestion, selectedQuestionId }) {
  const {
    id,
    question,
    answers: { summary, details },
  } = faq;

  const animationProps = useSpring({
    to: {
      opacity: selectedQuestionId === id ? 1 : 0,
      maxHeight: selectedQuestionId === id ? "900px" : "0px",
    },
    from: { opacity: 0, maxHeight: "0px" },
  });

  return (
    <motion.section
      className="faq"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <section className="question">
        <p className="actual-question">{question}</p>
        <button
          className="toggle-button"
          onClick={() => handleToggleQuestion(id)}
        >
          {selectedQuestionId !== id ? (
            <FaPlus size={16} color="#d9d9d9" fontWeight={300} />
          ) : (
            <FaMinus size={16} color="#d9d9d9" fontWeight={300} />
          )}
        </button>
      </section>

      {selectedQuestionId === id ? (
        <animated.section className="answer" style={animationProps}>
          <section className="summary">{summary}</section>
          <section className="details">
            {details.map((detail, index) => {
              return (
                <p key={index} className="detail">
                  <GoStarFill size={8} color="#a72005" /> {detail}
                </p>
              );
            })}
          </section>
        </animated.section>
      ) : null}
    </motion.section>
  );
}
