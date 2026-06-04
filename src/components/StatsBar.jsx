import { motion } from "framer-motion";
import { Building2, Users, Award } from "lucide-react";

const stats = [
  { icon: <Building2 className="w-5 h-5" />, value: "50+", label: "Commercial Projects" },
  { icon: <Users className="w-5 h-5" />, value: "500+", label: "Happy Clients" },
  { icon: <Award className="w-5 h-5" />, value: "5+", label: "Years of Experience" },
];

const StatsBar = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white shadow-card ring-1 ring-gray-900/5 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 overflow-hidden"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center justify-center gap-4 px-6 py-7">
              <div className="grid place-items-center h-12 w-12 rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-800/10 shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="font-display text-3xl font-extrabold text-gray-900 leading-none">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500 mt-1.5">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
