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

const TermsOfService = () => {
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
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-3xl mx-auto">
            The terms and conditions that govern your use of the Tarvya Infra
            Pvt Ltd website and services.
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

            <Section title="1. Acceptance of Terms">
              <p>
                By accessing or using the website of Tarvya Infra Pvt Ltd
                ("Tarvya Infra", "we", "us", or "our"), you agree to be bound by
                these Terms of Service and all applicable laws. If you do not
                agree with any part of these terms, please do not use our
                website.
              </p>
            </Section>

            <Section title="2. Use of the Website">
              <p>
                You agree to use this website only for lawful purposes. You must
                not use it in any way that may damage, disable, or impair the
                website or interfere with any other party's use of it. You may
                not attempt to gain unauthorised access to any part of the
                website or its systems.
              </p>
            </Section>

            <Section title="3. Property Listings & Information">
              <p>
                Property details, prices, images, floor plans, and availability
                shown on this website are provided for general information only
                and are indicative. They do not constitute an offer or a legally
                binding contract. While we make every effort to keep information
                accurate and up to date, details may change without notice. We
                recommend verifying all particulars with our team before making
                any decision.
              </p>
            </Section>

            <Section title="4. Intellectual Property">
              <p>
                All content on this website, including text, graphics, logos,
                images, and design, is the property of Tarvya Infra Pvt Ltd or
                its licensors and is protected by applicable intellectual
                property laws. You may not reproduce, distribute, or use any
                content without our prior written permission.
              </p>
            </Section>

            <Section title="5. Enquiries & Submissions">
              <p>
                When you submit an enquiry or any information through our forms,
                you confirm that the information provided is accurate and that
                you consent to us contacting you regarding your request. You are
                responsible for the content you submit.
              </p>
            </Section>

            <Section title="6. Third-Party Links">
              <p>
                Our website may contain links to third-party websites or
                services that are not owned or controlled by Tarvya Infra. We
                are not responsible for the content, policies, or practices of
                any third-party websites.
              </p>
            </Section>

            <Section title="7. Disclaimer of Warranties">
              <p>
                This website and its content are provided on an "as is" and "as
                available" basis without warranties of any kind, either express
                or implied. We do not warrant that the website will be
                uninterrupted, error-free, or free of harmful components.
              </p>
            </Section>

            <Section title="8. Limitation of Liability">
              <p>
                To the fullest extent permitted by law, Tarvya Infra Pvt Ltd
                shall not be liable for any direct, indirect, incidental, or
                consequential damages arising out of your use of, or inability
                to use, this website or any information contained on it.
              </p>
            </Section>

            <Section title="9. Indemnification">
              <p>
                You agree to indemnify and hold harmless Tarvya Infra Pvt Ltd,
                its directors, employees, and agents from any claims, losses, or
                liabilities arising from your use of the website or your breach
                of these terms.
              </p>
            </Section>

            <Section title="10. Governing Law">
              <p>
                These Terms of Service are governed by and construed in
                accordance with the laws of India. Any disputes arising in
                connection with these terms shall be subject to the exclusive
                jurisdiction of the courts of Noida, Uttar Pradesh.
              </p>
            </Section>

            <Section title="11. Changes to These Terms">
              <p>
                We may revise these Terms of Service at any time. Updated terms
                will be posted on this page with a revised "Last updated" date,
                and your continued use of the website constitutes acceptance of
                the changes.
              </p>
            </Section>

            <Section title="12. Contact Us">
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
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

export default TermsOfService;
