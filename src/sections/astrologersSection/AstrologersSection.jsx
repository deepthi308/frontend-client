import "./astrologersSection.css";
import astrologersData from "../../data/astrologers.json";
import AstrologerCard from "../../components/astrologerCard/AstrologerCard";

export default function AstrologersSection() {
  return (
    <section id="astrologers" className="astrologers">
      <section className="astrologers-top">
        <h1 className="astrologers-title">Our Astrologers</h1>
      </section>
      <section className="astrologers-bottom">
        {astrologersData.map((astrologer) => {
          return <AstrologerCard key={astrologer.id} astrologer={astrologer} />;
        })}
      </section>
    </section>
  );
}
