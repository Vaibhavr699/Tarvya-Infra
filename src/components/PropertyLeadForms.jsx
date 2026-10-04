import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { CalendarCheck, Download, FileText, Loader2, X } from "lucide-react";
import { formatBrochureRequestData, formatSiteVisitData, sendFormData } from "../utils/formspree";

const TIME_SLOTS = ["Morning (10am – 1pm)", "Afternoon (1pm – 4pm)", "Evening (4pm – 7pm)"];

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const isValidPhone = (phone) => phone.replace(/\D/g, "").length >= 10;

const Honeypot = ({ value, onChange }) => (
  <input
    type="checkbox"
    name="botcheck"
    className="hidden"
    tabIndex={-1}
    autoComplete="off"
    checked={value}
    onChange={(e) => onChange(e.target.checked)}
  />
);

export const SiteVisitForm = forwardRef(({ property, presetMessage }, ref) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", message: "" });
  const [botcheck, setBotcheck] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (presetMessage) setForm((f) => ({ ...f, message: presetMessage }));
  }, [presetMessage]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidPhone(form.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setSending(true);
    const result = await sendFormData(
      formatSiteVisitData({ ...form, botcheck, propertyUrl: window.location.href }, property)
    );
    setSending(false);
    if (result.success) {
      setSent(true);
      toast.success("Visit requested — we'll call you to confirm.");
    } else {
      toast.error(result.message);
    }
  };

  if (sent) {
    return (
      <div ref={ref} id="schedule-visit" className="rounded-2xl bg-green-50 ring-1 ring-green-200 p-6 text-center scroll-mt-28">
        <CalendarCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-1">Visit requested</h3>
        <p className="text-sm text-gray-600">
          Thanks, {form.name.split(" ")[0] || "there"}. Our team will call you shortly to confirm the time.
        </p>
      </div>
    );
  }

  return (
    <form ref={ref} id="schedule-visit" onSubmit={submit} className="space-y-3 scroll-mt-28">
      <h3 className="text-lg font-bold text-gray-900">Schedule a site visit</h3>
      <p className="text-sm text-gray-500 -mt-1 mb-2">Pick a slot and we'll arrange a guided tour.</p>
      <Honeypot value={botcheck} onChange={setBotcheck} />
      <input className="field" placeholder="Full name" value={form.name} onChange={update("name")} required autoComplete="name" />
      <input className="field" type="tel" placeholder="Phone number" value={form.phone} onChange={update("phone")} required autoComplete="tel" />
      <input className="field" type="email" placeholder="Email (optional)" value={form.email} onChange={update("email")} autoComplete="email" />
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="sr-only">Preferred date</span>
          <input className="field" type="date" min={todayISO()} value={form.date} onChange={update("date")} required />
        </label>
        <label className="block">
          <span className="sr-only">Preferred time</span>
          <select className="field" value={form.time} onChange={update("time")} required>
            <option value="">Time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </label>
      </div>
      <textarea className="field resize-none" rows={2} placeholder="Requirements (optional)" value={form.message} onChange={update("message")} />
      <button type="submit" disabled={sending} className="btn-primary w-full">
        {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarCheck className="w-5 h-5" />}
        {sending ? "Sending…" : "Request Visit"}
      </button>
    </form>
  );
});
SiteVisitForm.displayName = "SiteVisitForm";

export const BrochureModal = ({ property, open, onClose }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [botcheck, setBotcheck] = useState(false);
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidPhone(form.phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }
    setSending(true);
    const result = await sendFormData(
      formatBrochureRequestData({ ...form, botcheck, propertyUrl: window.location.href }, property)
    );
    setSending(false);
    if (result.success) setUnlocked(true);
    else toast.error(result.message);
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-brand-950/60 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-title"
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-elevated"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="icon-chip h-12 w-12 mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h2 id="brochure-title" className="font-display text-2xl font-bold text-gray-900 mb-1">
              {unlocked ? "Your brochure is ready" : "Download brochure"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {unlocked
                ? `Thanks, ${form.name.split(" ")[0] || "there"}. Our team may reach out with availability and pricing.`
                : `Get floor plans, specifications, and pricing for ${property.title}.`}
            </p>

            {unlocked ? (
              <a href={property.brochure} target="_blank" rel="noreferrer" className="btn-primary w-full">
                <Download className="w-5 h-5" />
                Open Brochure (PDF)
              </a>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <Honeypot value={botcheck} onChange={setBotcheck} />
                <input className="field" placeholder="Full name" value={form.name} onChange={update("name")} required autoComplete="name" />
                <input className="field" type="tel" placeholder="Phone number" value={form.phone} onChange={update("phone")} required autoComplete="tel" />
                <input className="field" type="email" placeholder="Email (optional)" value={form.email} onChange={update("email")} autoComplete="email" />
                <button type="submit" disabled={sending} className="btn-primary w-full">
                  {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  {sending ? "Please wait…" : "Get Brochure"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
