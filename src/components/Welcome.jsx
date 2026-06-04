import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Users, Handshake, LayoutGrid, ArrowRight } from "lucide-react";
import welcomeBg from "../assets/building bg white.png";
import featuredImg from "../assets/img7.jpg";
import listingsImg from "../assets/atstower.jpg";

const Welcome = () => {
  return (
    <section className="relative bg-white py-10 md:py-12 overflow-hidden">
      {/* Building wireframe backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${welcomeBg})` }}
        aria-hidden="true"
      />
      {/* Soft top fade so the heading stays crisp */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold leading-[1.1] tracking-[-0.02em] text-gray-900">
            Why <span className="text-brand-700">Tarvya Infra</span> is the right choice for you ?
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Card 1 — Premium Properties */}
          <BentoCard
            icon={<Building2 className="w-6 h-6" />}
            title="Premium Properties"
            description="Exclusive office, retail & industrial spaces in Noida's prime business districts."
          />

          {/* Card 2 — Expert Guidance */}
          <BentoCard
            icon={<Users className="w-6 h-6" />}
            title="Expert Guidance"
            description="Advisors who know the local commercial market inside out, guiding every decision."
          />

          {/* Card 3 — Featured (tall, dark, image background) */}
          <motion.div
            variants={cardVariants}
            className="relative lg:row-span-2 rounded-3xl bg-brand-900 ring-1 ring-white/5 overflow-hidden"
          >
            <img
              src={featuredImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-900/90 to-brand-900/95"
            />

            <div className="relative z-10 flex flex-col h-full p-8 text-white">
              <div className="grid place-items-center h-12 w-12 rounded-full ring-1 ring-white/25 text-white">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="mt-7 text-2xl font-bold leading-snug text-white">
                End-to-End Partnership
              </h3>
              <div className="mt-5 space-y-4 text-white/80 leading-relaxed">
                <p>
                  From the first site visit to the final hand-over, we manage negotiations,
                  paperwork, and documentation — so you can focus on your business while we
                  handle the details.
                </p>
                <p>
                  Whether you're leasing a single floor or an entire tower, we tailor the
                  process to fit your needs.
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-8 w-fit inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-semibold text-white shadow-accent-glow transition-all duration-300 hover:bg-accent-600 hover:-translate-y-0.5"
              >
                Book a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Card 4 — Wide (text + image) */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 rounded-3xl bg-gray-100 p-6 sm:p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 items-center h-full">
              <div>
                <div className="grid place-items-center h-12 w-12 rounded-full ring-1 ring-gray-300 text-gray-700">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <h3 className="mt-7 text-2xl font-bold text-gray-900">100+ Premium Listings</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Browse a curated portfolio of verified Grade-A commercial properties across
                  Noida — from compact offices to full-floor corporate spaces. Every listing is
                  checked for accuracy, so what you see is exactly what you get.
                </p>
              </div>
              <div className="relative h-44 md:h-56 rounded-2xl overflow-hidden ring-1 ring-gray-900/5">
                <img
                  src={listingsImg}
                  alt="Commercial buildings in Noida"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BentoCard = ({ icon, title, description }) => (
  <motion.div variants={cardVariants} className="rounded-3xl bg-gray-100 p-8">
    <div className="grid place-items-center h-12 w-12 rounded-full ring-1 ring-gray-300 text-gray-700">
      {icon}
    </div>
    <h3 className="mt-7 text-2xl font-bold text-gray-900">{title}</h3>
    <p className="mt-4 text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default Welcome;
