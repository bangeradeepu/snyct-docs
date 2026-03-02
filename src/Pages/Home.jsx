import React, { useState } from "react";
import CodeBlock from "../Components/CodeBlock";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const inputData = `//Payload to send to SDK
const data = await AutofillSDK.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    name: "",
    dob: "ISO format"
    //Add more data as needed
  },
  instructions: "Global instructions",
  files: [file1, file2]
});`;

  const outputData = `{
  name: "Rahul",
  dob: "2000-02-01T00:00:00Z"
}`;

  const instructionBasedField = `dob: "Return date in ISO UTC format like 2026-02-28T14:30:00Z"
aadharNumber: "Return only the 12 digit aadhar number without any spaces or dashes"`;

  const globalInstruction = `//Global Instructions apply to all fields and override field level instructions
instructions: "Return all names in Title Case format."`;

  const npmCommand = "npm i digimithra-autofill-ai-sdk";

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyNpm = () => {
    navigator.clipboard.writeText(npmCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION - Minimal Black & White */}
      <div className="container py-5 heading-margin">
        <div className="row align-items-center g-5">
          <div className="col-md-7 hd-txt">
            {/* Premium Badge */}
            <div className="d-inline-block bg-dark text-white px-3 py-1 mb-4" style={{ letterSpacing: '2px', fontSize: '12px' }}>
              AI-POWERED SDK
            </div>

            {/* Heading */}
            <h1 className="heading fw-bold mb-4">
              Instruction based HTTP SDK
              <br className="d-none d-md-block" />
              for browser and node.js
            </h1>

            {/* Description */}
            <p className="text-secondary mb-4" style={{ fontSize: '18px', maxWidth: '550px', lineHeight: '1.6' }}>
              Autofill AI is a powerful SDK that extracts structured data from
              any document using AI. Developers define fields and instructions,
              and Autofill returns structured JSON.
            </p>

            {/* CTA Section */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              {/* NPM Command - Minimal Design */}
              <div className="border border-dark d-flex align-items-center px-3 py-2 bg-white hover-border" style={{ cursor: 'pointer' }} onClick={copyNpm}>
                <div className="d-flex gap-3 align-items-center">
                  <div className="d-flex gap-2 font-monospace" style={{ fontSize: '14px' }}>
                   <span className="span-pre">$</span>
                    <span className="span-npm">npm</span>
                    <span className="span-i">i</span>
                    <span className="">
                      digimithra-autofill-ai-sdk
                    </span>
                  </div>
                  <div className="text-dark">
                    <i className={`bi ${copied ? "bi-clipboard-check-fill" : "bi-clipboard"}`}></i>
                  </div>
                </div>
              </div>

              {/* Start Free Button */}
              <div className="bg-dark text-white px-4 py-2 d-flex align-items-center justify-content-center c-pointer hover-lift" style={{ border: '1px solid #000' }} onClick={()=>navigate('/login')}>
                <span className="fw-semibold">Start for free</span>
                <span className="ms-2">🚀</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Black Box */}
          <div className="col-md-5 text-center">
            <div className="border border-dark p-4 d-inline-block bg-white">
              <div className="p-4">
                <img src="./snyctWhite.png" width={180} alt="" className="img-fluid img-premium-black" />
                <div className="mt-3 text-secondary small" style={{ letterSpacing: '1px' }}>
                  AI POWERED ENGINE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DARK SDK SECTION - Black Background */}
      <div className="bg-dark text-white py-5">
        <div className="container uioo">
          {/* Header */}
          <div className="text-center mb-5">
            <img src="./snyctWhite.png" className="mb-4 img-fluid img-premium-white" width={140} alt="" />
            <h2 className="display-5 fw-bold mb-3" style={{ letterSpacing: '-0.5px' }}>
              Extract structured data
              <br className="d-none d-md-block" />
              from any document
            </h2>
            <p className="text-white-50" style={{ fontSize: '18px' }}>
              Extract structured data from any document with simple steps using Autofill SDK.
            </p>
          </div>

          {/* Code Flow - Minimal Design */}
          <div className="d-flex flex-column flex-md-row align-items-stretch justify-content-between gap-4">
            <div className="flex-grow-1">
              <CodeBlock code={inputData} />
            </div>
            
            <div className="d-flex align-items-center">
              <div className="border-top border-white border-2 w-100 d-md-none opacity-25"></div>
              <div className="border-end border-white border-2 h-100 d-none d-md-block opacity-25"></div>
            </div>
            
            <div className="d-flex align-items-center justify-content-center">
              <div className="border border-white p-4 bg-white">
                <img src="./snyct.png" width={160} alt="" className="img-fluid img-premium-black" />
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="border-top border-white border-2 w-100 d-md-none opacity-25"></div>
              <div className="border-end border-white border-2 h-100 d-none d-md-block opacity-25"></div>
            </div>
            
            <div className="flex-grow-1">
              <CodeBlock code={outputData} />
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION - Minimal Cards */}
      <div className="py-5">
        <div className="container">
          <div className="row g-4">
            {/* Instruction Based Field */}
            <div className="col-md-6">
              <div className="border border-dark p-4 p-md-5 h-100 bg-white premium-card">
                <div className="mb-4">
                  <div className="bg-dark text-white p-3 d-inline-flex" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-file-text fs-3"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-4">Instruction based field extraction</h3>
                <div className="mb-4">
                  <CodeBlock code={instructionBasedField} />
                </div>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                  Extract any data from any document by defining fields exactly
                  how you want them returned. Autofill AI supports Aadhaar,
                  Passport, Invoices and custom forms.
                </p>
              </div>
            </div>

            {/* Global Instructions */}
            <div className="col-md-6">
              <div className="border border-dark p-4 p-md-5 h-100 bg-white premium-card">
                <div className="mb-4">
                  <div className="bg-dark text-white p-3 d-inline-flex" style={{ width: '60px', height: '60px' }}>
                    <i className="bi bi-globe fs-3"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-4">Global Instructions</h3>
                <div className="mb-4">
                  <CodeBlock code={globalInstruction} />
                </div>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                  Apply instructions across all fields with global settings.
                  Override field-level instructions and maintain consistency
                  across your entire extraction.
                </p>
              </div>
            </div>
          </div>

          {/* Documentation CTA */}
          <div className="text-center mt-5">
            <div className="d-inline-block border border-dark px-5 py-3 bg-white c-pointer hover-lift">
              <span className="fw-semibold">Read our documentation</span>
              <i className="bi bi-arrow-right ms-2"></i>
            </div>
          </div>
        </div>
      </div>

      {/* TRIAL SECTION - Minimal Banner */}
      <div className="container py-4">
        <div className="border border-dark p-5 bg-white">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-3" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>
                Start your free trial
              </h3>
              <p className="text-secondary mb-0" style={{ fontSize: '18px', lineHeight: '1.6' }}>
                Get <span className="fw-bold text-dark">200 document extractions free</span>. 
                Then continue for just <span className="fw-bold text-dark">$2/month</span> with 
                up to <span className="fw-bold text-dark">1000 requests</span>.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-inline-block bg-dark text-white px-5 py-3 c-pointer hover-lift" style={{ border: '1px solid #000' }} onClick={()=>navigate('/login')}>
                <span className="fw-semibold">Generate API key</span>
                <span className="ms-2">🔑</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER - Minimal Black */}
      <footer className="bg-dark text-white-50 py-5 mt-5">
        <div className="container">
          <div className="row g-5">
            {/* Logo Section */}
            <div className="col-lg-4">
              <img src="./snyctWhite.png" width={140} alt="" className="img-fluid mb-3 img-premium-white" />
              <p className="small mb-4" style={{ lineHeight: '1.8', color: '#9a9a9a' }}>
                Autofill AI extracts structured data from documents using
                instruction-based AI extraction. Built for developers who need
                flexible document parsing APIs.
              </p>
              <div className="small text-white-50">
                © 2026 Digimithra Solutions
              </div>
            </div>

            {/* Links */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-semibold mb-4" style={{ letterSpacing: '1px', fontSize: '14px' }}>LINKS</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><a href="#" className="footer-link">Home</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Documentation</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Pricing</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Dashboard</a></li>
              </ul>
            </div>

            {/* Developers */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-semibold mb-4" style={{ letterSpacing: '1px', fontSize: '14px' }}>DEVELOPERS</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><a href="#" className="footer-link">API Reference</a></li>
                <li className="mb-3"><a href="#" className="footer-link">SDK Usage</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Examples</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Postman</a></li>
              </ul>
            </div>

            {/* Community */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-semibold mb-4" style={{ letterSpacing: '1px', fontSize: '14px' }}>COMMUNITY</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><a href="#" className="footer-link">Support</a></li>
                <li className="mb-3"><a href="#" className="footer-link">Contact</a></li>
                <li className="mb-3"><a href="#" className="footer-link">GitHub</a></li>
                <li className="mb-3"><a href="#" className="footer-link">StackOverflow</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style>{`
        .hover-lift:hover {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.05);
        }
        
        .hover-border:hover {
          border-color: #000;
          background-color: #f8f9fa !important;
          transition: all 0.3s ease;
        }

        .premium-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .footer-link {
          color: #9a9a9a;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: white;
        }

        .img-premium-black {
          filter: brightness(0);
        }

        .img-premium-white {
          filter: brightness(0) invert(1);
        }

        .border-2 {
          border-width: 2px;
        }

        .opacity-25 {
          opacity: 0.25;
        }
      `}</style>
    </div>
  );
};

export default Home;