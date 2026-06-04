import React, { useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import pageBg from "../assets/building bg1.png";

const LAST_UPDATED = "June 3, 2026";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="space-y-3 text-gray-600 leading-relaxed">{children}</div>
  </div>
);

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 bg-brand-950 text-white overflow-hidden">
        {/* Building wireframe background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pageBg})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/75 to-brand-950/90"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
            How Tarvya Infra Pvt Ltd collects, uses, and safeguards your
            information when you use our website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
            <p className="text-sm text-gray-500 mb-10">
              Last updated: {LAST_UPDATED}
            </p>

            <Section title="1. Introduction">
              <p>
                Tarvya Infra Pvt Ltd ("Tarvya Infra", "we", "us", or "our")
                respects your privacy and is committed to protecting the
                personal information you share with us. This Privacy Policy
                explains what information we collect through our website and how
                we use, disclose, and protect it.
              </p>
              <p>
                By using our website or submitting your details through any of
                our forms, you agree to the practices described in this policy.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p>We may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact details</strong> you provide voluntarily, such
                  as your name, email address, and phone number when you submit
                  an enquiry, request a callback, or subscribe to our
                  newsletter.
                </li>
                <li>
                  <strong>Property preferences</strong> you share with us, such
                  as your budget, preferred locations, and space requirements.
                </li>
                <li>
                  <strong>Usage data</strong> collected automatically, such as
                  your IP address, browser type, pages visited, and the time
                  spent on our website.
                </li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your enquiries and provide property recommendations.</li>
                <li>Schedule site visits and coordinate with our team.</li>
                <li>Send you updates about properties and real estate news, where you have opted in.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Comply with legal and regulatory obligations.</li>
              </ul>
            </Section>

            <Section title="4. Cookies & Tracking">
              <p>
                Our website may use cookies and similar technologies to remember
                your preferences and to understand how visitors interact with
                our pages. You can control or disable cookies through your
                browser settings, though some features of the site may not
                function as intended without them.
              </p>
            </Section>

            <Section title="5. Sharing & Disclosure">
              <p>
                We do not sell your personal information. We may share your
                details with trusted service providers who assist us in
                operating our website and serving you (such as email and form
                providers), and only to the extent necessary. We may also
                disclose information where required by law or to protect our
                legal rights.
              </p>
            </Section>

            <Section title="6. Data Security">
              <p>
                We implement reasonable technical and organisational measures to
                protect your personal information against unauthorised access,
                alteration, or disclosure. However, no method of transmission
                over the internet is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p>
                You may request access to, correction of, or deletion of your
                personal information, and you may withdraw your consent to
                marketing communications at any time. To exercise these rights,
                please contact us using the details below.
              </p>
            </Section>

            <Section title="8. Third-Party Links">
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of those
                websites and encourage you to review their privacy policies.
              </p>
            </Section>

            <Section title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with a revised "Last updated" date.
              </p>
            </Section>

            <Section title="10. Contact Us">
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your information, please reach out to us:
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-brand-700 mt-1 flex-shrink-0" />
                  <span>
                    1420, 14th Floor, Supernova Astralis, Sector 94, Noida,
                    Uttar Pradesh, India - 201301
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-brand-700 flex-shrink-0" />
                  <a href="tel:+918929356475" className="hover:text-brand-700">
                    +91 8929356475
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-brand-700 flex-shrink-0" />
                  <a
                    href="mailto:contact@tarvyainfra.com"
                    className="hover:text-brand-700"
                  >
                    contact@tarvyainfra.com
                  </a>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
