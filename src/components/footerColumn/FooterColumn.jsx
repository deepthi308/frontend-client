/* eslint-disable react/prop-types */
import { GoStarFill } from "react-icons/go";
import "./footerColumn.css";

export default function FooterColumn({ column }) {
  const { columnName, links } = column;
  return (
    <section className="footerColumn">
      <section className="footer-column-top">{columnName}</section>
      <section className="footer-column-links">
        {links.map((link, index) => {
          return (
            <p key={index} className="footer-link">
              <GoStarFill size={8} color="#d9d9d9" /> <span>{link}</span>
            </p>
          );
        })}
      </section>
    </section>
  );
}
