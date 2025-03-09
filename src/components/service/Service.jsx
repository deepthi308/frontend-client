/* eslint-disable react/prop-types */
import "./service.css";
import { motion } from "framer-motion";

export default function Service({
  image,
  description,
  direction,
  reverse,
  initial,
  whileInView,
  transition,
}) {
  return (
    <motion.div
      className="service"
      style={{ alignSelf: direction }}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true }}
      transition={transition}
    >
      <section className="service-left">
        <img src={image} />
      </section>
      <section className="service-right">
        <p className="service-description">{description}</p>
      </section>
    </motion.div>
  );
}
