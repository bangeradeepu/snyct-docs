import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Policy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('refund');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-vh-100">
      {/* Header */}
      <div className="border-bottom border-dark py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>DigiMithra Autofill AI</h1>
              <p className="text-secondary mb-0">Razorpay Policy Document</p>
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="btn btn-outline-dark rounded-0"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-md-3 mb-4">
            <div className="border border-dark p-4 sticky-top" style={{ top: '20px' }}>
              <h5 className="fw-bold mb-3">Quick Navigation</h5>
              <nav className="nav flex-column">
                <button
                  className={`nav-link text-start border-0 bg-transparent py-2 px-0 ${activeSection === 'refund' ? 'fw-bold text-dark' : 'text-secondary'}`}
                  onClick={() => scrollToSection('refund')}
                >
                  <i className="bi bi-arrow-right-short me-2"></i>
                  1. Refund & Cancellation Policy
                </button>
                <button
                  className={`nav-link text-start border-0 bg-transparent py-2 px-0 ${activeSection === 'privacy' ? 'fw-bold text-dark' : 'text-secondary'}`}
                  onClick={() => scrollToSection('privacy')}
                >
                  <i className="bi bi-arrow-right-short me-2"></i>
                  2. Privacy Policy
                </button>
                <button
                  className={`nav-link text-start border-0 bg-transparent py-2 px-0 ${activeSection === 'terms' ? 'fw-bold text-dark' : 'text-secondary'}`}
                  onClick={() => scrollToSection('terms')}
                >
                  <i className="bi bi-arrow-right-short me-2"></i>
                  3. Terms & Conditions
                </button>
                <button
                  className={`nav-link text-start border-0 bg-transparent py-2 px-0 ${activeSection === 'contact' ? 'fw-bold text-dark' : 'text-secondary'}`}
                  onClick={() => scrollToSection('contact')}
                >
                  <i className="bi bi-arrow-right-short me-2"></i>
                  4. Contact Us
                </button>
                <button
                  className={`nav-link text-start border-0 bg-transparent py-2 px-0 ${activeSection === 'disclaimer' ? 'fw-bold text-dark' : 'text-secondary'}`}
                  onClick={() => scrollToSection('disclaimer')}
                >
                  <i className="bi bi-arrow-right-short me-2"></i>
                  5. Legal Disclaimer
                </button>
              </nav>

              <hr className="my-4" />

              <div className="bg-light p-3">
                <p className="small mb-2">
                  <i className="bi bi-file-pdf me-2"></i>
                  <strong>Last Updated:</strong> March 2026
                </p>
                <p className="small mb-0">
                  <i className="bi bi-check-circle me-2 text-success"></i>
                  Compliant with Razorpay requirements
                </p>
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="col-md-9">
            <div className="border border-dark p-5">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="d-inline-block bg-dark text-white px-4 py-2 mb-3" style={{ letterSpacing: '2px', fontSize: '14px' }}>
                  RAZORPAY APPROVED FORMAT
                </div>
                <h1 className="display-6 fw-bold mb-3">Policy Document</h1>
                <p className="text-secondary">DigiMithra Technologies Pvt Ltd</p>
              </div>

              {/* Refund & Cancellation Policy */}
              <section id="refund" className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark text-white p-3 me-3" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-cash-stack fs-4"></i>
                  </div>
                  <h2 className="fw-bold mb-0" style={{ fontSize: '24px' }}>1. Refund & Cancellation Policy</h2>
                </div>

                <div className="ps-4">
                  <h5 className="fw-semibold mb-3">Cancellation</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> Orders/services can be cancelled within <strong>24 hours</strong> of booking/payment.</li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> Cancellation requests must be sent via email to support@digimithra.com.</li>
                    <li className="mb-2"><i className="bi bi-x-circle text-danger me-2"></i> Once the service/order has been processed/activated, cancellation may not be allowed.</li>
                    <li className="mb-2"><i className="bi bi-info-circle text-info me-2"></i> For API credits/services, cancellation is only possible if no API calls have been made.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Refund</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> <strong>Full refund</strong> if payment was deducted but service/product was not delivered.</li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> <strong>Full refund</strong> in case of duplicate payment made by the customer.</li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> <strong>Full refund</strong> if order was cancelled within the allowed 24-hour window.</li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i> <strong>Partial refund</strong> may be considered for technical issues on a case-by-case basis.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Refund Processing Time</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-clock me-2"></i> Refunds will be processed within <strong>5-7 business days</strong> of approval.</li>
                    <li className="mb-2"><i className="bi bi-clock me-2"></i> The amount will be credited to the original payment method used (credit card, debit card, UPI, net banking).</li>
                    <li className="mb-2"><i className="bi bi-clock me-2"></i> Depending on your bank, it may take an additional 2-3 days for the amount to reflect.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Non-refundable Cases</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i> <strong>Completed services</strong> - API calls that have been successfully processed.</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i> <strong>Digital products</strong> after delivery/access has been provided.</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i> <strong>Used credits</strong> - Credits that have been partially or fully consumed.</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i> <strong>Change of mind</strong> after service has been activated.</li>
                  </ul>

                  <div className="bg-light p-4 mt-4 border-start border-dark border-4">
                    <p className="mb-0">
                      <strong className="d-block mb-2">📧 For refund/cancellation requests:</strong>
                      Email: support@digimithra.com<br />
                      Phone: +91-9876543210<br />
                      Subject: "Refund Request - [Order ID]"
                    </p>
                  </div>
                </div>
              </section>

              <hr className="my-5" />

              {/* Privacy Policy */}
              <section id="privacy" className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark text-white p-3 me-3" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-shield-lock fs-4"></i>
                  </div>
                  <h2 className="fw-bold mb-0" style={{ fontSize: '24px' }}>2. Privacy Policy</h2>
                </div>

                <div className="ps-4">
                  <p className="mb-4">At DigiMithra, we value your privacy and are committed to protecting your personal information. This policy describes how we collect, use, and handle your data.</p>

                  <h5 className="fw-semibold mb-3">Information We Collect</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> <strong>Personal Information:</strong> Name, Email Address, Phone Number</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> <strong>Business Information:</strong> Company Name, GST Number (if applicable)</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> <strong>Payment Information:</strong> Processed securely via Razorpay - we DO NOT store card details</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> <strong>Usage Data:</strong> API usage statistics, document processing history</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">How We Use Your Data</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-check2 me-2"></i> To process payments and deliver services</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2"></i> To provide customer support and respond to inquiries</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2"></i> To improve our services and user experience</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2"></i> To send important updates about your account</li>
                    <li className="mb-2"><i className="bi bi-check2 me-2"></i> To comply with legal obligations</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Data Sharing & Third Parties</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-shield-check me-2"></i> We do <strong>NOT sell</strong> your personal data to third parties.</li>
                    <li className="mb-2"><i className="bi bi-shield-check me-2"></i> Payment data is processed by <strong>Razorpay</strong> (PCI-DSS compliant).</li>
                    <li className="mb-2"><i className="bi bi-shield-check me-2"></i> Analytics data may be shared with Google Analytics for service improvement.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Data Security</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-lock-fill me-2"></i> All data is encrypted using SSL/TLS technology.</li>
                    <li className="mb-2"><i className="bi bi-lock-fill me-2"></i> Access to personal data is restricted to authorized personnel only.</li>
                    <li className="mb-2"><i className="bi bi-lock-fill me-2"></i> Regular security audits are performed.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Your Rights</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-person-check me-2"></i> You can request access to your personal data.</li>
                    <li className="mb-2"><i className="bi bi-person-check me-2"></i> You can request correction or deletion of your data.</li>
                    <li className="mb-2"><i className="bi bi-person-check me-2"></i> You can opt-out of marketing communications.</li>
                  </ul>
                </div>
              </section>

              <hr className="my-5" />

              {/* Terms & Conditions */}
              <section id="terms" className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark text-white p-3 me-3" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-file-text fs-4"></i>
                  </div>
                  <h2 className="fw-bold mb-0" style={{ fontSize: '24px' }}>3. Terms & Conditions</h2>
                </div>

                <div className="ps-4">
                  <p className="mb-4">By accessing or using DigiMithra's services, you agree to be bound by these terms.</p>

                  <h5 className="fw-semibold mb-3">Services Description</h5>
                  <p className="mb-4">
                    DigiMithra provides <strong>AI-powered document extraction services</strong> that allow users to extract structured data from documents such as Aadhaar cards, PAN cards, invoices, and other documents through our API and web interface.
                  </p>

                  <h5 className="fw-semibold mb-3">Account Registration</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You must provide accurate and complete information when creating an account.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You are responsible for maintaining the security of your account and API keys.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You must notify us immediately of any unauthorized use of your account.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Payments & Billing</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> All payments are processed securely through <strong>Razorpay</strong>.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Prices are in <strong>Indian Rupees (INR)</strong> and inclusive of applicable taxes.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Credits purchased are non-transferable and have no cash value.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Credits expire 12 months from the date of purchase.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> We reserve the right to modify pricing with 30 days notice.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">API Usage & Fair Use Policy</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> API rate limits apply based on your plan.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You may not use the service for illegal purposes or to process illegal documents.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> We reserve the right to suspend accounts that abuse the service.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Intellectual Property</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> All software, documentation, and technology are owned by DigiMithra.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You retain ownership of your documents and extracted data.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> You grant us a license to process your documents to provide the service.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Limitation of Liability</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-exclamation-triangle me-2"></i> We are not liable for indirect or consequential damages.</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle me-2"></i> Maximum liability is limited to the amount paid in the last 12 months.</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle me-2"></i> We are not responsible for:</li>
                    <li className="mb-2 ms-4">• Network or internet connectivity issues</li>
                    <li className="mb-2 ms-4">• Payment gateway downtime</li>
                    <li className="mb-2 ms-4">• Third-party service interruptions</li>
                    <li className="mb-2 ms-4">• User errors in document submission</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Service Availability</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> We aim for 99.9% uptime but do not guarantee uninterrupted service.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Maintenance windows will be announced in advance when possible.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> No refunds for downtime outside of our control.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Termination</h5>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Either party may terminate the agreement with 30 days notice.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> We may terminate immediately for violation of terms.</li>
                    <li className="mb-2"><i className="bi bi-dot me-2"></i> Upon termination, credits are forfeited.</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Governing Law</h5>
                  <p className="mb-4">
                    These terms are governed by the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of courts in <strong>Bengaluru, Karnataka</strong>.
                  </p>
                </div>
              </section>

              <hr className="my-5" />

              {/* Contact Us */}
              <section id="contact" className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark text-white p-3 me-3" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-envelope fs-4"></i>
                  </div>
                  <h2 className="fw-bold mb-0" style={{ fontSize: '24px' }}>4. Contact Us</h2>
                </div>

                <div className="ps-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="border border-dark p-4">
                        <i className="bi bi-building fs-3 d-block mb-3"></i>
                        <h6 className="fw-bold mb-2">Company Details</h6>
                        <p className="mb-0 small">
                          <strong>DigiMithra Technologies Pvt Ltd</strong><br />
                          #123, 4th Cross, Koramangala<br />
                          Bengaluru, Karnataka - 560034<br />
                          India
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border border-dark p-4">
                        <i className="bi bi-envelope-paper fs-3 d-block mb-3"></i>
                        <h6 className="fw-bold mb-2">Email Support</h6>
                        <p className="mb-0 small">
                          <strong>General Inquiries:</strong> info@digimithra.com<br />
                          <strong>Support:</strong> support@digimithra.com<br />
                          <strong>Billing:</strong> billing@digimithra.com<br />
                          <strong>Response Time:</strong> Within 24 hours
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border border-dark p-4">
                        <i className="bi bi-telephone fs-3 d-block mb-3"></i>
                        <h6 className="fw-bold mb-2">Phone Support</h6>
                        <p className="mb-0 small">
                          <strong>Phone:</strong> +91-98765 43210<br />
                          <strong>Hours:</strong> Monday-Friday, 10 AM - 6 PM IST<br />
                          <strong>WhatsApp:</strong> +91-98765 43210
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="border border-dark p-4">
                        <i className="bi bi-clock-history fs-3 d-block mb-3"></i>
                        <h6 className="fw-bold mb-2">Grievance Officer</h6>
                        <p className="mb-0 small">
                          <strong>Name:</strong> Rahul Sharma<br />
                          <strong>Email:</strong> grievance@digimithra.com<br />
                          <strong>Response:</strong> Within 72 hours as per IT Act
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="my-5" />

              {/* Legal Disclaimer */}
              <section id="disclaimer" className="mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-dark text-white p-3 me-3" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-exclamation-triangle fs-4"></i>
                  </div>
                  <h2 className="fw-bold mb-0" style={{ fontSize: '24px' }}>5. Legal Disclaimer</h2>
                </div>

                <div className="ps-4">
                  <div className="bg-light p-4">
                    <p className="mb-3"><strong>Last Updated:</strong> March 1, 2026</p>
                    <p className="mb-3">
                      This document is compliant with Razorpay's merchant agreement requirements and Indian laws including:
                    </p>
                    <ul className="mb-4">
                      <li>Information Technology Act, 2000</li>
                      <li>IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
                      <li>Consumer Protection Act, 2019</li>
                      <li>RBI Guidelines on Payment Aggregators</li>
                    </ul>
                    <p className="mb-0 small">
                      By using DigiMithra services, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions outlined in this document. We reserve the right to modify these policies at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes your acceptance of the new terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer Note */}
              <div className="text-center mt-5 pt-4 border-top border-dark">
                <p className="small text-secondary mb-0">
                  <i className="bi bi-shield-check me-2"></i>
                  This policy document is designed to meet Razorpay's merchant requirements and is legally compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sticky-top {
          position: sticky;
          top: 20px;
        }
        
        .nav-link {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .nav-link:hover {
          color: #000 !important;
          text-decoration: underline;
        }
        
        section {
          scroll-margin-top: 20px;
        }
        
        .border-4 {
          border-width: 4px !important;
        }
      `}</style>
    </div>
  );
};

export default Policy;