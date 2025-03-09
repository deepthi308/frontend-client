import "./accordian.css";
import faqs from "../../data/faqs.json";
import Faq from "../faq/Faq";
import { useState } from "react";

export default function Accordian() {
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const handleToggleQuestion = (id) => {
    if (selectedQuestionId === id) {
      setSelectedQuestionId(null);
    } else {
      setSelectedQuestionId(id);
    }
  };

  // Testing

  return (
    <section className="accordian">
      {faqs.map((faq) => {
        return (
          <Faq
            key={faq.id}
            faq={faq}
            handleToggleQuestion={handleToggleQuestion}
            selectedQuestionId={selectedQuestionId}
          />
        );
      })}
    </section>
  );
}
