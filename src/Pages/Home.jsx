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

  const npmCommand = "npm i snyct-ai";

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
                      snyct-ai
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

      {/* DARK SDK SECTION - Enhanced Design */}
<div className="bg-dark text-white py-5 position-relative overflow-hidden">
  {/* Background gradient effect */}
  <div className="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
    style={{
      background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
    }}>
  </div>
  
  <div className="container position-relative">
    {/* Header with refined typography */}
    <div className="text-center mb-5">
      <img 
        src="./snyctWhite.png" 
        className="mb-4 img-fluid" 
        width={120} 
        alt="Snyct" 
        style={{ opacity: 0.9 }}
      />
      <h2 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-0.02em' }}>
        Extract structured data
        <br className="d-none d-md-block" />
        <span className="text-gradient">from any document</span>
      </h2>
      <p className="text-white-50 mx-auto" style={{ 
        fontSize: '1.25rem', 
        maxWidth: '600px',
        lineHeight: 1.6 
      }}>
        Transform unstructured documents into structured data with our powerful Autofill SDK. 
        Simple integration, powerful results.
      </p>
    </div>

    {/* Code Flow - Enhanced Design */}
    <div className="d-flex flex-column flex-lg-row align-items-stretch justify-content-between gap-4">
      {/* Input Code Block */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div className="mb-2 d-flex align-items-center">
          <span className="badge bg-secondary bg-opacity-25 text-white-50 px-3 py-2 rounded-pill">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Input
          </span>
        </div>
        <div className="code-wrapper h-100">
          <CodeBlock code={inputData} />
        </div>
      </div>
      
      {/* Arrow Connector - Improved */}
      <div className="d-flex align-items-center justify-content-center px-3">
        <div className="position-relative">
          {/* Desktop arrow */}
          <div className="d-none d-lg-block">
            <div className="arrow-line"></div>
            <div className="arrow-head"></div>
          </div>
          {/* Mobile arrow */}
          <div className="d-lg-none">
            <div className="arrow-line-vertical"></div>
            <div className="arrow-head-down"></div>
          </div>
        </div>
      </div>
      
      {/* Logo Container - Enhanced */}
      <div className="d-flex align-items-center justify-content-center">
        <div className="logo-container p-4 bg-white rounded-4 shadow-lg">
          <img 
            src="./snyct.png" 
            width={180} 
            alt="Snyct" 
            className="img-fluid"
            style={{ 
              filter: 'brightness(0)',
              transition: 'transform 0.3s ease',
              height: 'auto',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      </div>
      
      {/* Arrow Connector - Improved */}
      <div className="d-flex align-items-center justify-content-center px-3">
        <div className="position-relative">
          {/* Desktop arrow */}
          <div className="d-none d-lg-block">
            <div className="arrow-line"></div>
            <div className="arrow-head"></div>
          </div>
          {/* Mobile arrow */}
          <div className="d-lg-none">
            <div className="arrow-line-vertical"></div>
            <div className="arrow-head-down"></div>
          </div>
        </div>
      </div>
      
      {/* Output Code Block */}
      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <div className="mb-2 d-flex align-items-center justify-content-end">
          <span className="badge bg-primary bg-opacity-25 text-primary px-3 py-2 rounded-pill">
            Output
            <i className="bi bi-box-arrow-up-right ms-2"></i>
          </span>
        </div>
        <div className="code-wrapper h-100">
          <CodeBlock code={outputData} />
        </div>
      </div>
    </div>

    {/* Feature Tags - New Addition */}
    <div className="d-flex flex-wrap justify-content-center gap-3 mt-5 pt-4">
      <span className="badge bg-white bg-opacity-10 text-white-50 px-4 py-2 rounded-pill">
        <i className="bi bi-lightning-charge me-2"></i>
        Real-time Processing
      </span>
      <span className="badge bg-white bg-opacity-10 text-white-50 px-4 py-2 rounded-pill">
        <i className="bi bi-shield-check me-2"></i>
        Enterprise Security
      </span>
      <span className="badge bg-white bg-opacity-10 text-white-50 px-4 py-2 rounded-pill">
        <i className="bi bi-code-slash me-2"></i>
        5 Lines of Code
      </span>
      <span className="badge bg-white bg-opacity-10 text-white-50 px-4 py-2 rounded-pill">
        <i className="bi bi-file-pdf me-2"></i>
        50+ Document Formats
      </span>
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
    Login now and get <span className="fw-bold text-dark">₹100 free credits</span> 
    (that's <span className="fw-bold text-dark">1,000 extractions</span>) to test our service.
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
                <li className="mb-3"><a href="https://docs.snyct.com" className="footer-link">Documentation</a></li>
                <li className="mb-3"><a href="/pricing" className="footer-link">Pricing</a></li>
                <li className="mb-3"><a href="/dashboard" className="footer-link">Dashboard</a></li>
              </ul>
            </div>

            {/* Developers */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-semibold mb-4" style={{ letterSpacing: '1px', fontSize: '14px' }}>DEVELOPERS</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><a href="https://docs.snyct.com" className="footer-link">API Reference</a></li>
                <li className="mb-3"><a href="https://docs.snyct.com" className="footer-link">SDK Usage</a></li>

              </ul>
            </div>

            {/* Community */}
            <div className="col-6 col-lg-2">
              <h6 className="text-white fw-semibold mb-4" style={{ letterSpacing: '1px', fontSize: '14px' }}>COMMUNITY</h6>
              <ul className="list-unstyled">
                <li className="mb-3"><a href="https://github.com/bangeradeepu/snyct-docs" className="footer-link">Github- website</a></li>
                <li className="mb-3"><a href="https://github.com/bangeradeepu/snyct-documentation" className="footer-link">Github-docs</a></li>
                <li className="mb-3"><a href="https://github.com/bangeradeepu/snyct-sdk" className="footer-link">Github- SDK</a></li>
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
          .text-gradient {
    background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .code-wrapper {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .code-wrapper:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  .logo-container {
    transition: all 0.3s ease;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
  }

  .logo-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4) !important;
  }

  /* Arrow styles */
  .arrow-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.2) 100%);
    position: relative;
  }

  .arrow-head {
    position: absolute;
    right: -8px;
    top: -6px;
    width: 0;
    height: 0;
    border-left: 10px solid white;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  .arrow-line-vertical {
    width: 2px;
    height: 40px;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.2) 100%);
    position: relative;
  }

  .arrow-head-down {
    position: absolute;
    bottom: -8px;
    left: -6px;
    width: 0;
    height: 0;
    border-top: 10px solid white;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .display-4 {
      font-size: 2.5rem;
    }
    
    .code-wrapper {
      margin-bottom: 1rem;
    }
  }

  /* Badge styles */
  .badge {
    font-weight: 500;
    letter-spacing: 0.02em;
    backdrop-filter: blur(10px);
  }

  /* Animation for arrows */
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .arrow-line, .arrow-head, .arrow-line-vertical, .arrow-head-down {
    animation: pulse 2s ease-in-out infinite;
  }
      `}</style>
    </div>
  );
};

export default Home;