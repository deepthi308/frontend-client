import "./servicesSection.css";
import services from "../../data/services.json";
import Service from "../../components/service/Service";

export default function ServicesSection() {
  return (
    <section id="services" className="services">
      <section className="top">
        <h1 className="title">Our Services</h1>
      </section>
      <section className="bottom">
        {services.map((service) => {
          return (
            <Service
              key={service.id}
              image={service.image}
              description={service.description}
              direction={service.direction}
              reverse={service.reverse}
              initial={{ opacity: 0, x: service.start }}
              whileInView={{ opacity: 1, x: service.end }}
              transition={{ duration: 0.6 }}
            />
          );
        })}
      </section>
    </section>
  );
}
