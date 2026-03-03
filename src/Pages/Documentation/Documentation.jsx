import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-http";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("quick");
  const [copiedCode, setCopiedCode] = useState(null);

  // Test demo state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState(null);

  // Initialize Prism highlighting
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab, extracted, selectedInvoice]);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navigationItems = [
    { id: "quick", label: "Quick Start", icon: "⚡" },
    { id: "installation", label: "Installation", icon: "📦" },
    { id: "syntax", label: "Syntax & Examples", icon: "✨" },
    { id: "api", label: "API Reference", icon: "🔗" },
    { id: "fields", label: "Field Instructions", icon: "📝" },
    { id: "test", label: "Run Test", icon: "🧪" },
  ];

  const demoInvoices = [
    {
      id: 1,
      name: "Invoice 1",
      img: "https://tallysolutions.com/wp-content/uploads/2019/11/Instant-e-invoice-in-TallyPrime.jpg",
      data: {
        vendor_name: "Surabhi Hardwares",
        gstno: "29AACCT3705E000",
        invoice_number: "SHB/456/20",
        invoice_date: "20-Dec-2020",
        total: "4,130.00",
      },
    },
    {
      id: 2,
      name: "Invoice 2",
      img: "https://gogstbill.com/wp-content/uploads/2020/03/Template1-1.jpg",
      data: {
        vendor_name: "Gujarat Freight Tools",
        gstno: "24HDE7487RE5RT4",
        invoice_number: "GST112020",
        invoice_date: "04-Mar-2020",
        total: "1,258.00",
      },
    },
    {
      id: 3,
      name: "Invoice 3",
      img: "https://www.outputbooks.com/wp-content/themes/outputbooks/images/oub_GST_Invoice_Format.png",
      data: {
        vendor_name: "Raga Pvt Ltd",
        gstno: "33AAGCR6685F1ZH",
        invoice_number: "INV26",
        invoice_date: "31-Mar-2020",
        total: "68,230.50",
      },
    },
  ];

  const handleExtract = () => {
    if (!selectedInvoice) return;

    setLoading(true);

    setTimeout(() => {
      setExtracted(selectedInvoice.data);
      setLoading(false);
    }, 1500);
  };

  const CodeBlock = ({ code, language = "javascript", id }) => (
    <div className="code-block">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="copy-button"
        >
          {copiedCode === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="app">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #ffffff;
        }

        .app {
          display: flex;
          min-height: 100vh;
          background: white;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #000000;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .logo-section {
          margin-bottom: 40px;
          border-bottom: 1px solid #000000;
          padding-bottom: 20px;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 4px;
          letter-spacing: -0.5px;
        }

        .logo-badge {
          font-size: 12px;
          color: #666;
          font-weight: 400;
          letter-spacing: 1px;
        }

        .nav-menu {
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 4px;
          border: none;
          background: transparent;
          color: #4a4a4a;
          font-size: 15px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0;
        }

        .nav-item:hover {
          background: #f5f5f5;
          color: #000000;
        }

        .nav-item.active {
          background: #000000;
          color: #ffffff;
        }

        .nav-icon {
          font-size: 18px;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid #000000;
        }

        .footer-text {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
        }

        .version {
          font-family: monospace;
          background: #f5f5f5;
          padding: 4px 8px;
          display: inline-block;
          margin-top: 8px;
          font-size: 12px;
          color: #000000;
          border: 1px solid #000000;
        }

        /* Content Styles */
        .content {
          flex: 1;
          margin-left: 280px;
          padding: 48px 56px;
          background: white;
          overflow-y: auto;
          min-height: 100vh;
        }

        .page-title {
          font-size: 36px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 24px;
          letter-spacing: -1px;
          border-bottom: 2px solid #000000;
          padding-bottom: 16px;
        }

        .section {
          margin-bottom: 48px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 20px;
          letter-spacing: -0.3px;
        }

        .text {
          font-size: 16px;
          line-height: 1.7;
          color: #333;
          margin-bottom: 24px;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .feature-card {
          background: #ffffff;
          border: 1px solid #000000;
          padding: 24px;
          transition: transform 0.2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
        }

        .feature-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #000000;
          margin-bottom: 12px;
        }

        .feature-card p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .list {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
        }

        .list-item {
          background: #ffffff;
          padding: 8px 16px;
          border: 1px solid #000000;
          font-size: 14px;
          color: #000000;
          font-weight: 500;
        }

        /* Code Block Styles */
        .code-block {
          margin: 24px 0 32px 0;
          border: 1px solid #000000;
          overflow: hidden;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #ffffff;
          border-bottom: 1px solid #000000;
        }

        .code-language {
          font-size: 12px;
          color: #000000;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .copy-button {
          background: transparent;
          border: 1px solid #000000;
          color: #000000;
          padding: 4px 12px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .copy-button:hover {
          background: #000000;
          color: #ffffff;
        }

        /* Prism.js Overrides */
        pre[class*="language-"] {
          margin: 0;
          padding: 20px;
          background: #1e1e1e !important;
          border-radius: 0;
          border: none;
        }

        code[class*="language-"] {
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.6;
          text-shadow: none;
          color: #e6edf3 !important;
          background: #1e1e1e !important;
        }

        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6a9955 !important;
        }

        .token.punctuation {
          color: #d4d4d4 !important;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #b5cea8 !important;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #ce9178 !important;
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #d4d4d4 !important;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #569cd6 !important;
        }

        .token.function,
        .token.class-name {
          color: #dcdcaa !important;
        }

        .token.regex,
        .token.important,
        .token.variable {
          color: #d16969 !important;
        }

        .tip-box {
          background: #ffffff;
          border: 1px solid #000000;
          padding: 24px;
          margin: 32px 0;
          border-left: 4px solid #000000;
        }

        .tip-box p {
          margin: 0;
          font-size: 15px;
          color: #333;
        }

        .tip-box code {
          background: #f5f5f5;
          color: #000000;
          padding: 2px 6px;
          border: 1px solid #000000;
          font-size: 13px;
        }

        .table-container {
          border: 1px solid #000000;
          margin: 24px 0;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #000000;
          color: #ffffff;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }

        td {
          padding: 16px;
          border-bottom: 1px solid #000000;
          font-size: 14px;
          color: #333;
        }

        tr:last-child td {
          border-bottom: none;
        }

        td code {
          background: #f5f5f5;
          padding: 2px 6px;
          border: 1px solid #000000;
          font-size: 12px;
        }

        hr {
          border: none;
          border-top: 2px solid #000000;
          margin: 48px 0;
        }

        .badge {
          display: inline-block;
          background: #000000;
          color: #ffffff;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .response-example {
          background: #ffffff;
          border: 1px solid #000000;
          padding: 24px;
          margin-top: 16px;
        }

        /* Test Demo Styles */
        .invoice-grid {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .invoice-card {
          border: 1px solid #000000;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: white;
          width: 100px;
          text-align: center;
        }

        .invoice-card:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
        }

        .invoice-card.selected {
          background: #000000;
        }

        .invoice-card.selected img {
          filter: brightness(0) invert(1);
        }

        .invoice-card img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          margin-bottom: 8px;
        }

        .invoice-card span {
          font-size: 12px;
          font-weight: 500;
        }

        .invoice-preview {
          border: 1px solid #000000;
          padding: 24px;
          margin: 24px 0;
          background: #ffffff;
        }

        .invoice-preview img {
          max-width: 100%;
          max-height: 300px;
          border: 1px solid #000000;
        }

        .extract-button {
          background: #000000;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          margin: 16px 0;
          transition: all 0.2s ease;
        }

        .extract-button:hover {
          background: #333333;
        }

        .extract-button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }

        .loading-text {
          color: #666;
          font-size: 14px;
          margin: 16px 0;
        }

        .extracted-fields {
          border: 1px solid #000000;
          padding: 24px;
          margin-top: 24px;
          background: #ffffff;
        }

        .field-group {
          margin-bottom: 16px;
        }

        .field-group label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #666;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .field-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #000000;
          font-size: 14px;
          background: #ffffff;
        }

        .field-group input:read-only {
          background: #f5f5f5;
        }

        .demo-footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #000000;
          font-size: 13px;
          color: #666;
        }

        .demo-footer a {
          color: #000000;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid #000000;
        }

        .demo-footer a:hover {
          color: #666;
          border-bottom-color: #666;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: static;
            width: 100%;
            height: auto;
            border-right: none;
            border-bottom: 1px solid #000000;
          }
          
          .content {
            margin-left: 0;
            padding: 32px 20px;
          }
          
          .grid-2, .grid-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <div className="logo">snyct</div>
          <div className="logo-badge">AI DOCUMENT EXTRACTION SDK</div>
        </div>

        <nav className="nav-menu">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id !== "test") {
                  setSelectedInvoice(null);
                  setExtracted(null);
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-text">
            <div>support@snyct.com</div>
            <div className="version">v1.0.0</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="content">
        {/* QUICK START TAB */}
        {activeTab === "quick" && (
          <>
            <h1 className="page-title">Quick Start</h1>
            
            <div className="badge">⚡ GET STARTED IN 5 MINUTES</div>

            <Section title="How It Works">
              <p className="text">
                Snyct SDK uses advanced AI to automatically extract structured data from any document. 
                Simply define the fields you need, upload your documents, and get back clean JSON data.
              </p>
              
              <div className="grid-3">
                <div className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h3>1. Define Fields</h3>
                  <p>Specify the data points you want to extract from your documents</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📎</div>
                  <h3>2. Upload Files</h3>
                  <p>Upload images, PDFs, or any document format (max 10 files, 10MB each)</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3>3. Get JSON</h3>
                  <p>Receive structured data instantly with high accuracy</p>
                </div>
              </div>
            </Section>

            <Section title="Use Cases">
              <ul className="list">
                <li className="list-item">🏦 KYC Verification</li>
                <li className="list-item">📄 Invoice Processing</li>
                <li className="list-item">🆔 Identity Documents</li>
                <li className="list-item">🏥 Healthcare Forms</li>
                <li className="list-item">🎓 Educational Documents</li>
                <li className="list-item">📋 Application Forms</li>
              </ul>
            </Section>

            <Section title="Key Features">
              <div className="grid-2">
                <div className="feature-card">
                  <h3>🎯 High Accuracy</h3>
                  <p>99% extraction accuracy powered by advanced AI models</p>
                </div>
                <div className="feature-card">
                  <h3>⚡ Real-time Processing</h3>
                  <p>Get results in milliseconds, not minutes</p>
                </div>
                <div className="feature-card">
                  <h3>📦 Multiple Formats</h3>
                  <p>Support for PDF, JPG, PNG, TIFF, and more</p>
                </div>
                <div className="feature-card">
                  <h3>🔧 Custom Instructions</h3>
                  <p>Field-level and global instructions for precise control</p>
                </div>
                <div className="feature-card">
                  <h3>📊 Structured Output</h3>
                  <p>Clean JSON responses ready for your application</p>
                </div>
                <div className="feature-card">
                  <h3>🔄 Batch Processing</h3>
                  <p>Process up to 10 files in a single API call</p>
                </div>
              </div>
            </Section>

            <Section title="Quick Example">
              <CodeBlock
                code={`import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    name: "",
    dob: "ISO format",
    aadharNumber: "Return only 12 digits without spaces",
    address: ""
  },
  instructions: "Return all names in Title Case format",
  files: [file1, file2]
});`}
                language="javascript"
                id="quick-example"
              />

              <div className="response-example">
                <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Response:</h3>
                <CodeBlock
                  code={`{
  "name": "Rahul Sharma",
  "dob": "2000-02-01T00:00:00Z",
  "aadharNumber": "123456789012",
  "address": "123 Main Street, Mumbai",
  "credits": {
    "deducted": 0.10,
    "remaining": 1.90
  },
  "usageId": "67c4213b8d4f2a1b3c5e7f9a"
}`}
                  language="json"
                  id="quick-response"
                />
              </div>
            </Section>
          </>
        )}

        {/* INSTALLATION TAB */}
        {activeTab === "installation" && (
          <>
            <h1 className="page-title">Installation</h1>

            <Section title="Install via NPM">
              <CodeBlock
                code="npm install snyct-ai"
                language="bash"
                id="install-npm"
              />
            </Section>

            <Section title="Install via Yarn">
              <CodeBlock
                code="yarn add snyct-ai"
                language="bash"
                id="install-yarn"
              />
            </Section>

            <Section title="Import SDK">
              <CodeBlock
                code={`// ES6 Modules (Browser/React/Vue/Angular)
import Snyct from 'snyct-ai';

// CommonJS (Node.js/Express)
const Snyct = require('snyct-ai').default;
`}
                language="javascript"
                id="import-sdk"
              />
            </Section>

            <Section title="Basic Setup">
              <CodeBlock
                code={`// Initialize and use
const extractData = async () => {
  try {
    const result = await Snyct.extract({
      apiKey: "YOUR_API_KEY",
      fields: {
        name: "",
        documentNumber: ""
      },
      files: [selectedFile]
    });
    
    console.log('Extracted data:', result);
    return result;
  } catch (error) {
    console.error('Extraction failed:', error);
  }
};`}
                language="javascript"
                id="basic-setup"
              />
            </Section>
          </>
        )}

        {/* SYNTAX & EXAMPLES TAB */}
        {activeTab === "syntax" && (
          <>
            <h1 className="page-title">Syntax & Examples</h1>

            <Section title="Basic Syntax">
              <CodeBlock
                code={`import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",           // Required: Your API key
  fields: {                          // Required: Fields to extract
    field1: "",                      // Simple field
    field2: "instructions here",      // Field with instructions
  },
  instructions: "Global instructions", // Optional: Apply to all fields
  files: [file1, file2]              // Required: Array of file objects
});`}
                language="javascript"
                id="basic-syntax"
              />
            </Section>

            <Section title="Field-Level Instructions">
              <p className="text">Each field can have specific instructions for how the data should be formatted:</p>
              <CodeBlock
                code={`import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    // Date fields
    dob: "Return date in ISO UTC format like 2026-02-28T14:30:00Z",
    issueDate: "Return as YYYY-MM-DD only",
    
    // Identity fields
    aadharNumber: "Return only the 12 digit aadhar number without any spaces or dashes",
    panNumber: "Return in uppercase with format ABCDE1234F",
    
    // Contact fields
    phoneNumber: "Return with country code (+91)",
    email: "Return in lowercase",
    
    // Text fields
    name: "Return in Title Case format",
    address: "Return as single line, comma separated",
    
    // Financial fields
    totalAmount: "Return as number with 2 decimal places"
  },
  files: [documentFile]
});`}
                language="javascript"
                id="field-instructions"
              />
            </Section>

            <Section title="Global Instructions">
              <p className="text">Global instructions apply to all fields and override field-level instructions:</p>
              <CodeBlock
                code={`import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    name: "",
    fatherName: "",
    motherName: "",
    address: ""
  },
  instructions: "Return all text fields in Title Case format. Dates should be in ISO format. Remove any special characters from names.",
  files: [documentFile]
});`}
                language="javascript"
                id="global-instructions"
              />
            </Section>

            <Section title="Multiple Files Example">
              <CodeBlock
                code={`import Snyct from "snyct-ai";

// HTML Input
<input type="file" multiple id="fileInput" />

// JavaScript
const fileInput = document.getElementById('fileInput');
const files = Array.from(fileInput.files);

const data = await Snyct.extract({
  apiKey: "YOUR_API_KEY",
  fields: {
    name: "",
    dateOfBirth: "Return in ISO format",
    documentNumber: "Return without spaces"
  },
  instructions: "Extract from all documents and combine the data",
  files: files  // Supports up to 10 files
});`}
                language="javascript"
                id="multiple-files"
              />
            </Section>

            <Section title="Node.js / Express Example">
              <CodeBlock
                code={`const express = require('express');
const multer = require('multer');
const Snyct = require('snyct-ai').default;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/extract', upload.single('document'), async (req, res) => {
  try {
    const result = await Snyct.extract({
      apiKey: process.env.SNYCT_API_KEY,
      fields: {
        name: "",
        documentNumber: "",
        date: ""
      },
      files: req.files, // 🔥 pass full multer objects
      instructions: "Extract all text fields"
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);`}
                language="javascript"
                id="node-example"
              />
            </Section>
          </>
        )}

        {/* API REFERENCE TAB */}
        {activeTab === "api" && (
          <>
            <h1 className="page-title">API Reference</h1>

            <Section title="Endpoint">
              <CodeBlock
                code="POST https://autofill-backend-production.up.railway.app/api/extract"
                language="bash"
                id="endpoint"
              />
            </Section>

            <Section title="Request Parameters">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>apiKey</code></td>
                      <td>String</td>
                      <td>Yes</td>
                      <td>Your API key for authentication</td>
                    </tr>
                    <tr>
                      <td><code>fields</code></td>
                      <td>Object</td>
                      <td>Yes</td>
                      <td>Key-value pairs of fields to extract</td>
                    </tr>
                    <tr>
                      <td><code>file</code> or <code>files</code></td>
                      <td>File/Array[File]</td>
                      <td>Yes</td>
                      <td>Single file or array of files (max 10, 10MB each)</td>
                    </tr>
                    <tr>
                      <td><code>instructions</code></td>
                      <td>String</td>
                      <td>No</td>
                      <td>Global instructions for all fields</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="Response Format">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>field_name</code></td>
                      <td>Various</td>
                      <td>Extracted values for each requested field</td>
                    </tr>
                    <tr>
                      <td><code>credits</code></td>
                      <td>Object</td>
                      <td>Credit information: {`{ deducted, remaining }`}</td>
                    </tr>
                    <tr>
                      <td><code>usageId</code></td>
                      <td>String</td>
                      <td>Unique ID for this extraction</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <CodeBlock
                code={`{
  "name": "Rahul Sharma",
  "dob": "2000-02-01T00:00:00Z",
  "aadharNumber": "123456789012",
  "credits": {
    "deducted": 0.10,
    "remaining": 1.90
  },
  "usageId": "67c4213b8d4f2a1b3c5e7f9a"
}`}
                language="json"
                id="response-example"
              />
            </Section>

            <Section title="Error Codes">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Error Code</th>
                      <th>Status</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>API_KEY_REQUIRED</code></td>
                      <td>401</td>
                      <td>API key is missing</td>
                    </tr>
                    <tr>
                      <td><code>INVALID_API_KEY</code></td>
                      <td>403</td>
                      <td>Invalid API key provided</td>
                    </tr>
                    <tr>
                      <td><code>INSUFFICIENT_CREDITS</code></td>
                      <td>403</td>
                      <td>Not enough credits</td>
                    </tr>
                    <tr>
                      <td><code>INVALID_FIELDS</code></td>
                      <td>400</td>
                      <td>Fields object is malformed</td>
                    </tr>
                    <tr>
                      <td><code>FILE_TOO_LARGE</code></td>
                      <td>400</td>
                      <td>File exceeds 10MB limit</td>
                    </tr>
                    <tr>
                      <td><code>TOO_MANY_FILES</code></td>
                      <td>400</td>
                      <td>More than 10 files uploaded</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        {/* FIELD INSTRUCTIONS TAB */}
        {activeTab === "fields" && (
          <>
            <h1 className="page-title">Field Instructions</h1>

            <Section title="Common Field Instructions">
              <div className="grid-2">
                <div className="feature-card">
                  <h3>📅 Date Fields</h3>
                  <CodeBlock
                    code={`dob: "Return date in ISO UTC format like 2026-02-28T14:30:00Z"
issueDate: "Return as YYYY-MM-DD only"
expiryDate: "Return as DD/MM/YYYY"`}
                    language="javascript"
                    id="date-fields"
                  />
                </div>

                <div className="feature-card">
                  <h3>🆔 Identity Fields</h3>
                  <CodeBlock
                    code={`aadharNumber: "Return only the 12 digit number without spaces or dashes"
panNumber: "Return in uppercase with format ABCDE1234F"
passportNumber: "Return alphanumeric without spaces"`}
                    language="javascript"
                    id="identity-fields"
                  />
                </div>

                <div className="feature-card">
                  <h3>💰 Financial Fields</h3>
                  <CodeBlock
                    code={`totalAmount: "Return as number with 2 decimal places"
gstNumber: "Return in format 22AAAAA0000A1Z5"
invoiceNumber: "Return alphanumeric as is"`}
                    language="javascript"
                    id="financial-fields"
                  />
                </div>

                <div className="feature-card">
                  <h3>📍 Address Fields</h3>
                  <CodeBlock
                    code={`address: "Return as single line, comma separated"
pincode: "Return only 6 digits"
city: "Return in Title Case"`}
                    language="javascript"
                    id="address-fields"
                  />
                </div>
              </div>
            </Section>

            <Section title="Complete Example">
              <CodeBlock
                code={`import Snyct from "snyct-ai";

const data = await Snyct.extract({
  apiKey: "7dae7e60-7934-45d9-8307-54e21a7c7a64",
  fields: {
    // Basic Fields
    name: "",
    phone: "",
    address: "Extract full address from Aadhaar",
    dob: "Return date in ISO UTC format like 2026-02-28T14:30:00Z",

    // Passport Fields
    passportNumber: "",
    givenName: "",
    surname: "",
    fullName: "Extract full name from passport",
    nationality: "",
    gender: "",
    placeOfBirth: "",
    issueDate: "Return date in ISO UTC format",
    expiryDate: "Return date in ISO UTC format",

    // Aadhaar Fields
    aadharNumber: "Extract Aadhaar number. It will be a 12 digit number",
    enrollmentNumber: "",
    aadhaarNameKannada: "Extract name written in Kannada from Aadhaar card",
  },
  instructions: "Extract exact values only. Do not guess.",
  files: files, // Multiple file support
});`}
                language="javascript"
                id="complete-example"
              />
            </Section>

            <Section title="Instruction Examples">
              <div className="tip-box">
                <p><strong>💡 Tip:</strong> Be specific in your instructions for better accuracy</p>
              </div>

              <CodeBlock
                code={`// Example 1: Aadhaar Card
const aadhaarExtraction = {
  fields: {
    name: "Return in Title Case format",
    dob: "Return date in ISO UTC format",
    aadharNumber: "Return only the 12 digit number without any spaces or dashes",
    address: "Return as single line, comma separated"
  }
};

// Example 2: PAN Card
const panExtraction = {
  fields: {
    name: "Return in uppercase",
    fatherName: "Return in uppercase",
    panNumber: "Return in format ABCDE1234F",
    dob: "Return as YYYY-MM-DD"
  }
};

// Example 3: Invoice
const invoiceExtraction = {
  fields: {
    invoiceNumber: "Return alphanumeric as is",
    totalAmount: "Return as number with 2 decimal places",
    gstNumber: "Return in format 22AAAAA0000A1Z5",
    vendorName: "Return in Title Case"
  },
  instructions: "Extract all financial numbers with 2 decimal places"
};`}
                language="javascript"
                id="instruction-examples"
              />
            </Section>

            <Section title="Best Practices">
              <ul className="list" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <li className="list-item" style={{ width: '100%' }}>✅ Be specific about format requirements (ISO, YYYY-MM-DD, etc.)</li>
                <li className="list-item" style={{ width: '100%' }}>✅ Specify if spaces or special characters should be removed</li>
                <li className="list-item" style={{ width: '100%' }}>✅ Define case requirements (uppercase, lowercase, title case)</li>
                <li className="list-item" style={{ width: '100%' }}>✅ Use global instructions for rules that apply to all fields</li>
                <li className="list-item" style={{ width: '100%' }}>✅ Test with different document formats for accuracy</li>
              </ul>
            </Section>
          </>
        )}

        {/* RUN TEST TAB */}
        {activeTab === "test" && (
          <>
            <h1 className="page-title">Run Test</h1>
            
            <div className="badge">🧪 TEST THE SDK WITH SAMPLE DOCUMENTS</div>

            <Section title="Select a Sample Invoice">
              <p className="text">
                Choose one of the sample invoices below to see how the AI extracts structured data in real-time.
              </p>

              <div className="invoice-grid">
                {demoInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className={`invoice-card ${selectedInvoice?.id === inv.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedInvoice(inv);
                      setExtracted(null);
                    }}
                  >
                    <img src={inv.img} alt={inv.name} />
                    <span>{inv.name}</span>
                  </div>
                ))}
              </div>
            </Section>

            {selectedInvoice && (
              <>
                <Section title="Document Preview">
                  <div className="invoice-preview">
                    <img src={selectedInvoice.img} alt="Selected invoice" />
                  </div>
                </Section>

                <Section title="Extraction">
                  <button 
                    className="extract-button" 
                    onClick={handleExtract}
                    disabled={loading}
                  >
                    {loading ? 'Extracting...' : '🚀 Extract with AI'}
                  </button>

                  {loading && (
                    <div className="loading-text">
                      🔍 AI is analyzing the document...
                    </div>
                  )}

                  {extracted && !loading && (
                    <div className="extracted-fields">
                      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Extracted Data:</h3>
                      
                      <div className="field-group">
                        <label>Vendor Name</label>
                        <input type="text" value={extracted.vendor_name} readOnly />
                      </div>

                      <div className="field-group">
                        <label>GST Number</label>
                        <input type="text" value={extracted.gstno} readOnly />
                      </div>

                      <div className="field-group">
                        <label>Invoice Number</label>
                        <input type="text" value={extracted.invoice_number} readOnly />
                      </div>

                      <div className="field-group">
                        <label>Invoice Date</label>
                        <input type="text" value={extracted.invoice_date} readOnly />
                      </div>

                      <div className="field-group">
                        <label>Total Amount</label>
                        <input type="text" value={extracted.total} readOnly />
                      </div>

                      <div className="demo-footer">
                        <p>
                          This is a sample demo of invoice data extraction.{' '}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://wa.me/919663794785?text=Hi,%20I%20saw%20your%20invoice%20data%20extraction%20demo%20and%20would%20like%20a%20full%20demo."
                          >
                            Contact us
                          </a>{' '}
                          for a full demo with customized fields tailored to your needs.
                        </p>
                      </div>
                    </div>
                  )}
                </Section>
              </>
            )}

            {!selectedInvoice && (
              <div className="tip-box">
                <p>👆 Select an invoice from above to start the test</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Documentation;