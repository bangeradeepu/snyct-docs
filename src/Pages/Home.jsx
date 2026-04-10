import React, { useState, useRef } from "react";
import CodeBlock from "../Components/CodeBlock";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

  /* ── Live Extraction State ── */
  const demoFileRef = useRef(null);
  const [demoFile, setDemoFile] = useState(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const [demoResult, setDemoResult] = useState(null);
  const [demoDrag, setDemoDrag] = useState(false);

  const STATUS_MSGS = ["READING DOCUMENT...", "IDENTIFYING FIELDS...", "EXTRACTING DATA..."];
  const [statusIdx, setStatusIdx] = useState(0);
  React.useEffect(() => {
    if (!demoLoading) return;
    const t = setInterval(() => setStatusIdx(i => (i + 1) % STATUS_MSGS.length), 1400);
    return () => clearInterval(t);
  }, [demoLoading]);

  const [demoFields, setDemoFields] = useState([
    { id: 1, key: "name", value: "" },
    { id: 2, key: "phone", value: "" },
    { id: 3, key: "dob", value: "Return date in ISO UTC format like 2026-02-28T14:30:00Z" },
  ]);

  const addField = () => {
    if (demoFields.length >= 3) return;
    setDemoFields(prev => [...prev, { id: Date.now(), key: "", value: "" }]);
  };

  const removeField = (id) => {
    setDemoFields(prev => prev.filter(f => f.id !== id));
  };

  const updateField = (id, prop, val) => {
    setDemoFields(prev => prev.map(f => f.id === id ? { ...f, [prop]: val } : f));
  };

  const handleDemoExtract = async () => {
    if (!demoFile || demoLoading) return;
    const fieldsObj = Object.fromEntries(
      demoFields.filter(f => f.key.trim()).map(f => [f.key.trim(), f.value])
    );
    if (Object.keys(fieldsObj).length === 0) return;
    setDemoLoading(true);
    setDemoResult(null);
    try {
      const Snyct = (await import("snyct-ai")).default;
      const data = await Snyct.extract({
        apiKey: import.meta.env.VITE_DEMO_API_KEY,
        file: demoFile,
        fields: fieldsObj,
      });
      setDemoResult(data.data);
    } catch (err) {
      console.error(err);
    }
    setDemoLoading(false);
  };

  const resetDemo = () => {
    setDemoFile(null);
    setDemoResult(null);
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION - Minimal Black & White */}
      <div className="container py-5 heading-margin">
        <div className="row align-items-center g-5">
          <div className="col-md-7 hd-txt">
            {/* Premium Badge */}
            <div
              className="d-inline-block bg-dark text-white px-3 py-1 mb-4"
              style={{ letterSpacing: "2px", fontSize: "12px" }}
            >
              AI-POWERED SDK
            </div>

            {/* Heading */}
            <h1 className="heading fw-bold mb-4">
              Instruction-Based AI SDK
              <br className="d-none d-md-block" />
              for Smart Data Extraction
            </h1>

            {/* Description */}
            <p
              className="text-secondary mb-4"
              style={{ fontSize: "18px", maxWidth: "550px", lineHeight: "1.6" }}
            >
              Autofill AI is a powerful SDK that extracts structured data from
              any document using AI. Developers define fields and instructions,
              and Autofill returns structured JSON.
            </p>

            {/* CTA Section */}
            <div className="d-flex flex-column flex-sm-row gap-3">
              {/* NPM Command - Minimal Design */}
              <div
                className="border border-dark d-flex align-items-center px-3 py-2 bg-white hover-border"
                style={{ cursor: "pointer" }}
                onClick={copyNpm}
              >
                <div className="d-flex gap-4 align-items-center justify-content-between w-100">
                  <div
                    className="d-flex gap-2 font-monospace"
                    style={{ fontSize: "14px" }}
                  >
                    <span className="span-pre">$</span>
                    <span className="span-npm">npm</span>
                    <span className="span-i">i</span>
                    <span className="">snyct-ai</span>
                  </div>
                  <div className="text-dark">
                    <i
                      className={`bi ${copied ? "bi-clipboard-check-fill" : "bi-clipboard"}`}
                    ></i>
                  </div>
                </div>
              </div>

              {/* Start Free Button */}
              <div
                className="bg-dark text-white px-4 py-2 d-flex align-items-center justify-content-center c-pointer hover-lift"
                style={{ border: "1px solid #000" }}
                onClick={() => navigate("/login")}
              >
                <span className="fw-semibold">Start for free</span>
                <span className="ms-2">🚀</span>
              </div>
            </div>
          </div>

          {/* Hero Image - Black Box */}
          <div className="col-md-5 text-center">
            <div className="border border-dark p-4 d-inline-block bg-white">
              <div className="p-4">
                <img
                  src="./snyctWhite.png"
                  width={180}
                  alt=""
                  className="img-fluid img-premium-black"
                />
                <div
                  className="mt-3 text-secondary small"
                  style={{ letterSpacing: "1px" }}
                >
                  AI POWERED ENGINE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DARK SDK SECTION - Interactive Extraction Demo */}
      <div className="bg-dark text-white py-5 position-relative overflow-hidden">
        {/* Background gradient effect */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        ></div>

        <div className="container position-relative">
          {/* Header */}
          <div className="text-center mb-5">
            <img
              src="./snyctWhite.png"
              className="mb-4 img-fluid"
              width={120}
              alt="Snyct"
              style={{ opacity: 0.9 }}
            />
            <h2
              className="display-4 fw-bold mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              Extract structured data
              <br className="d-none d-md-block" />
              <span className="text-gradient">from any document</span>
            </h2>
            <p
              className="text-white-50 mx-auto"
              style={{
                fontSize: "1.25rem",
                maxWidth: "600px",
                lineHeight: 1.6,
              }}
            >
              Upload a document, define your fields, and watch Snyct extract
              structured data in real time.
            </p>
          </div>

          {/* ── Interactive Extraction Widget ── */}
          <div className="ew-wrap d-none d-lg-block">
            {/* SVG Connection Pipes */}
            <svg
              className="ew-svg"
              viewBox="0 0 900 700"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Upload → Engine */}
              <path
                className={`ew-pipe ${demoLoading ? "ew-pipe-active" : ""}`}
                d="M 180 235 C 180 320, 450 290, 450 340"
              />
              {/* Fields → Engine */}
              <path
                className={`ew-pipe ${demoLoading ? "ew-pipe-active" : ""}`}
                d="M 662 235 C 662 320, 450 290, 450 340"
              />
              {/* Engine → Output */}
              <path
                className={`ew-pipe ${demoLoading ? "ew-pipe-active" : ""}`}
                d="M 450 400 C 450 440, 450 470, 450 510"
              />
            </svg>

            {/* Upload Area - Top Left */}
            <div
              className={`ew-upload ${demoFile ? "ew-upload-has" : ""} ${demoDrag ? "ew-upload-drag" : ""}`}
              onClick={() => !demoFile && demoFileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDemoDrag(true);
              }}
              onDragLeave={() => setDemoDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDemoDrag(false);
                if (e.dataTransfer.files[0]) setDemoFile(e.dataTransfer.files[0]);
              }}
            >
              {demoFile ? (
                <>
                  <i className="bi bi-file-earmark-check-fill ew-upload-icon" />
                  <p className="ew-upload-name">{demoFile.name}</p>
                  <button
                    className="ew-upload-rm"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetDemo();
                    }}
                  >
                    <i className="bi bi-x-lg me-1" />
                    Remove
                  </button>
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-arrow-up ew-upload-icon" />
                  <p className="ew-upload-label">Upload file here</p>
                </>
              )}
              <input
                ref={demoFileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                hidden
                onChange={(e) => {
                  if (e.target.files[0]) setDemoFile(e.target.files[0]);
                }}
              />
            </div>

            {/* Input Fields Terminal - Top Right */}
            <div className="ew-fields">
              <div className="ew-bar">
                <div className="ew-dots">
                  <span className="ew-dot-r" />
                  <span className="ew-dot-y" />
                  <span className="ew-dot-g" />
                </div>
                <span className="ew-bar-title">
                  input fields
                  <span className="ew-field-count">{demoFields.length}/3</span>
                </span>
              </div>
              <div className="ew-body ew-body-fields">
                {demoFields.map((field) => (
                  <div key={field.id} className="ew-field-row">
                    <input
                      className="ew-field-key-input"
                      value={field.key}
                      onChange={(e) => updateField(field.id, "key", e.target.value)}
                      placeholder="field_name"
                      spellCheck={false}
                      maxLength={30}
                    />
                    <span className="ew-p">: </span>
                    <input
                      className="ew-field-val-input"
                      value={field.value}
                      onChange={(e) => updateField(field.id, "value", e.target.value)}
                      placeholder="instruction or empty"
                      spellCheck={false}
                    />
                    <span className="ew-p">,</span>
                    <button
                      className="ew-field-rm-btn"
                      onClick={() => removeField(field.id)}
                      title="Remove field"
                    >
                      <i className="bi bi-x" />
                    </button>
                  </div>
                ))}
                {demoFields.length < 3 && (
                  <button className="ew-add-field-btn" onClick={addField}>
                    <i className="bi bi-plus-lg me-1" />
                    Add field
                  </button>
                )}
              </div>
            </div>

            {/* SNYCT Engine - Center */}
            <div
              className={`eng-btn${demoLoading ? " eng-btn-loading" : ""}${!demoFile || demoLoading ? " eng-btn-disabled" : ""}`}
              onClick={handleDemoExtract}
              role="button"
              tabIndex={0}
            >
              {demoLoading ? (
                /* ── LOADING ── */
                <div className="eng-load">
                  <div className="eng-load-row">
                    {/* Document */}
                    <div className="eng-doc">
                      <div className="eng-doc-fold" />
                      {[80,60,72,50,65].map((w,i) => (
                        <div key={i} className="eng-doc-ln" style={{ width:`${w}%`, animationDelay:`${i*0.14}s` }} />
                      ))}
                      <div className="eng-doc-scan" />
                      <div className="eng-hl eng-hl-1" />
                      <div className="eng-hl eng-hl-2" />
                    </div>
                    {/* Stream */}
                    <div className="eng-stream">
                      {[0,1,2,3].map(i => (
                        <div key={i} className="eng-bit" style={{ animationDelay:`${i*0.22}s` }} />
                      ))}
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{flexShrink:0}}>
                        <path d="M0 4h6M3 1l3 3-3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {/* JSON */}
                    <div className="eng-json">
                      <span className="eng-jbrace">{"{"}</span>
                      {demoFields.filter(f=>f.key.trim()).slice(0,3).map((f,i) => (
                        <div key={i} className="eng-jrow" style={{ animationDelay:`${0.25+i*0.4}s` }}>
                          <span className="eng-jk">{f.key}</span>
                          <span className="eng-jp">: </span>
                          <span className="eng-jv">"<span className="eng-cursor"/>"</span>
                        </div>
                      ))}
                      <span className="eng-jbrace" style={{ animationDelay:`${0.25+demoFields.filter(f=>f.key.trim()).length*0.4}s`, opacity:0, animation:`engFadeIn 0.3s ease forwards` }}>{"}"}</span>
                    </div>
                  </div>
                  <div className="eng-foot">
                    <div className="eng-bar"><div className="eng-bar-fill" /></div>
                    <div className="eng-status-row">
                      <span className="eng-dot" />
                      <span className="eng-status-txt">{STATUS_MSGS[statusIdx]}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── IDLE ── */
                <div className="eng-idle">
                  <div className="eng-idle-visual">
                    <div className="eng-idle-doc">
                      <div className="eng-idle-fold" />
                      {[75,55,65,45].map((w,i) => (
                        <div key={i} className="eng-idle-ln" style={{ width:`${w}%` }} />
                      ))}
                    </div>
                    <div className="eng-idle-arrows">
                      {[0,1,2].map(i => (
                        <span key={i} className="eng-chevron" style={{ animationDelay:`${i*0.18}s` }}>›</span>
                      ))}
                    </div>
                    <div className="eng-idle-json">
                      <div className="eng-idle-jln eng-jln-k" />
                      <div className="eng-idle-jln eng-jln-v" />
                      <div className="eng-idle-jln eng-jln-k" style={{width:"55%"}} />
                      <div className="eng-idle-jln eng-jln-v" style={{width:"65%"}} />
                    </div>
                  </div>
                  <div className="eng-idle-footer">
                    {/* <img src="./snyct.png" alt="" className="eng-idle-logo" /> */}
                    <span className={`eng-idle-lbl${!demoFile?" eng-idle-lbl-dim":""}`}>
                      {demoFile ? "Extract data" : "Upload a file first"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Output Terminal - Bottom Center */}
            <div className="ew-output">
              <div className="ew-bar">
                <div className="ew-dots">
                  <span className="ew-dot-r" />
                  <span className="ew-dot-y" />
                  <span className="ew-dot-g" />
                </div>
                <span className="ew-bar-title">Extracted data</span>
              </div>
              <div className="ew-body">
                {demoLoading ? (
                  <div className="ew-extracting">
                    Extracting data
                    <span className="ew-blink-dots">...</span>
                  </div>
                ) : demoResult ? (
                  Object.entries(demoResult).map(([key, val], i) => (
                    <div
                      key={key}
                      className="ew-line ew-result-row"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    >
                      <span className="ew-k">{key}</span>
                      <span className="ew-p">: </span>
                      <span className="ew-v">"{String(val)}"</span>
                      <span className="ew-p">,</span>
                    </div>
                  ))
                ) : (
                  <div className="ew-empty">
                    {demoFields.filter(f => f.key.trim()).map((f, i) => (
                      <div key={i} className="ew-line">
                        <span className="ew-k">{f.key}</span>
                        <span className="ew-p">: </span>
                        <span className="ew-v ew-dim">"..."</span>
                        <span className="ew-p">,</span>
                      </div>
                    ))}
                    {demoFields.filter(f => f.key.trim()).length === 0 && (
                      <div className="ew-empty-hint">Define fields above to see output here</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Mobile Extraction Widget (stacked) ── */}
          <div className="d-lg-none">
            <div className="d-flex flex-column align-items-center gap-3">
              {/* Upload */}
              <div
                className={`ew-m-upload ${demoFile ? "ew-m-upload-has" : ""}`}
                onClick={() => !demoFile && demoFileRef.current?.click()}
              >
                {demoFile ? (
                  <>
                    <i className="bi bi-file-earmark-check-fill" style={{ fontSize: 32, color: "white" }} />
                    <span className="text-white-50 small mt-1" style={{ wordBreak: "break-all", textAlign: "center", padding: "0 12px" }}>
                      {demoFile.name}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-light mt-2"
                      style={{ fontSize: 11 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        resetDemo();
                      }}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <i className="bi bi-cloud-arrow-up" style={{ fontSize: 32, color: "rgba(255,255,255,0.6)" }} />
                    <span className="text-white-50 small mt-1">Upload file here</span>
                  </>
                )}
              </div>

              <i className="bi bi-arrow-down text-white-50" style={{ fontSize: 20 }} />

              {/* Fields */}
              <div className="ew-fields" style={{ position: "static", width: "100%", maxWidth: 480 }}>
                <div className="ew-bar">
                  <div className="ew-dots">
                    <span className="ew-dot-r" />
                    <span className="ew-dot-y" />
                    <span className="ew-dot-g" />
                  </div>
                  <span className="ew-bar-title">
                    input fields
                    <span className="ew-field-count">{demoFields.length}/3</span>
                  </span>
                </div>
                <div className="ew-body ew-body-fields">
                  {demoFields.map((field) => (
                    <div key={field.id} className="ew-field-row">
                      <input
                        className="ew-field-key-input"
                        value={field.key}
                        onChange={(e) => updateField(field.id, "key", e.target.value)}
                        placeholder="field_name"
                        spellCheck={false}
                        maxLength={30}
                      />
                      <span className="ew-p">: </span>
                      <input
                        className="ew-field-val-input"
                        value={field.value}
                        onChange={(e) => updateField(field.id, "value", e.target.value)}
                        placeholder="instruction or empty"
                        spellCheck={false}
                      />
                      <span className="ew-p">,</span>
                      <button
                        className="ew-field-rm-btn"
                        onClick={() => removeField(field.id)}
                        title="Remove field"
                      >
                        <i className="bi bi-x" />
                      </button>
                    </div>
                  ))}
                  {demoFields.length < 3 && (
                    <button className="ew-add-field-btn" onClick={addField}>
                      <i className="bi bi-plus-lg me-1" />
                      Add field
                    </button>
                  )}
                </div>
              </div>

              <i className="bi bi-arrow-down text-white-50" style={{ fontSize: 20 }} />

              {/* Engine */}
              <div
                className={`eng-btn${demoLoading?" eng-btn-loading":""}${!demoFile||demoLoading?" eng-btn-disabled":""}`}
                onClick={handleDemoExtract}
                style={{ position: "static", transform: "none", width: "100%", maxWidth: 480 }}
              >
                {demoLoading ? (
                  <div className="eng-load">
                    <div className="eng-load-row">
                      <div className="eng-doc">
                        <div className="eng-doc-fold" />
                        {[80,60,72,50,65].map((w,i) => (
                          <div key={i} className="eng-doc-ln" style={{ width:`${w}%`, animationDelay:`${i*0.14}s` }} />
                        ))}
                        <div className="eng-doc-scan" />
                        <div className="eng-hl eng-hl-1" />
                        <div className="eng-hl eng-hl-2" />
                      </div>
                      <div className="eng-stream">
                        {[0,1,2,3].map(i => (
                          <div key={i} className="eng-bit" style={{ animationDelay:`${i*0.22}s` }} />
                        ))}
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{flexShrink:0}}>
                          <path d="M0 4h6M3 1l3 3-3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="eng-json">
                        <span className="eng-jbrace">{"{"}</span>
                        {demoFields.filter(f=>f.key.trim()).slice(0,3).map((f,i) => (
                          <div key={i} className="eng-jrow" style={{ animationDelay:`${0.25+i*0.4}s` }}>
                            <span className="eng-jk">{f.key}</span>
                            <span className="eng-jp">: </span>
                            <span className="eng-jv">"<span className="eng-cursor"/>"</span>
                          </div>
                        ))}
                        <span className="eng-jbrace">{"}"}</span>
                      </div>
                    </div>
                    <div className="eng-foot">
                      <div className="eng-bar"><div className="eng-bar-fill" /></div>
                      <div className="eng-status-row">
                        <span className="eng-dot" />
                        <span className="eng-status-txt">{STATUS_MSGS[statusIdx]}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="eng-idle">
                    <div className="eng-idle-visual">
                      <div className="eng-idle-doc">
                        <div className="eng-idle-fold" />
                        {[75,55,65,45].map((w,i) => (
                          <div key={i} className="eng-idle-ln" style={{ width:`${w}%` }} />
                        ))}
                      </div>
                      <div className="eng-idle-arrows">
                        {[0,1,2].map(i => (
                          <span key={i} className="eng-chevron" style={{ animationDelay:`${i*0.18}s` }}>›</span>
                        ))}
                      </div>
                      <div className="eng-idle-json">
                        <div className="eng-idle-jln eng-jln-k" />
                        <div className="eng-idle-jln eng-jln-v" />
                        <div className="eng-idle-jln eng-jln-k" style={{width:"55%"}} />
                        <div className="eng-idle-jln eng-jln-v" style={{width:"65%"}} />
                      </div>
                    </div>
                    <div className="eng-idle-footer">
                      {/* <img src="./snyct.png" alt="" className="eng-idle-logo" /> */}
                      <span className={`eng-idle-lbl${!demoFile?" eng-idle-lbl-dim":""}`}>
                        {demoFile ? "Extract data" : "Upload a file first"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <i className="bi bi-arrow-down text-white-50" style={{ fontSize: 20 }} />

              {/* Output */}
              <div className="ew-output" style={{ position: "static", transform: "none", width: "100%", maxWidth: 480 }}>
                <div className="ew-bar">
                  <div className="ew-dots">
                    <span className="ew-dot-r" />
                    <span className="ew-dot-y" />
                    <span className="ew-dot-g" />
                  </div>
                  <span className="ew-bar-title">Extracted data</span>
                </div>
                <div className="ew-body">
                  {demoLoading ? (
                    <div className="ew-extracting">Extracting data<span className="ew-blink-dots">...</span></div>
                  ) : demoResult ? (
                    Object.entries(demoResult).map(([key, val], i) => (
                      <div key={key} className="ew-line ew-result-row" style={{ animationDelay: `${i * 0.12}s` }}>
                        <span className="ew-k">{key}</span><span className="ew-p">: </span><span className="ew-v">"{String(val)}"</span><span className="ew-p">,</span>
                      </div>
                    ))
                  ) : (
                    <div className="ew-empty">
                      {demoFields.filter(f => f.key.trim()).map((f, i) => (
                        <div key={i} className="ew-line">
                          <span className="ew-k">{f.key}</span>
                          <span className="ew-p">: </span>
                          <span className="ew-v ew-dim">"..."</span>
                          <span className="ew-p">,</span>
                        </div>
                      ))}
                      {demoFields.filter(f => f.key.trim()).length === 0 && (
                        <div className="ew-empty-hint">Define fields above to see output here</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Tags */}
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
              <i className="bi bi-code-slash me-2"></i>5 Lines of Code
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
                  <div
                    className="bg-dark text-white p-3 d-inline-flex"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-file-text fs-3"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-4">
                  Instruction based field extraction
                </h3>
                <div className="mb-4">
                  <CodeBlock code={instructionBasedField} />
                </div>
                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.7" }}
                >
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
                  <div
                    className="bg-dark text-white p-3 d-inline-flex"
                    style={{ width: "60px", height: "60px" }}
                  >
                    <i className="bi bi-globe fs-3"></i>
                  </div>
                </div>
                <h3 className="h4 fw-bold mb-4">Global Instructions</h3>
                <div className="mb-4">
                  <CodeBlock code={globalInstruction} />
                </div>
                <p
                  className="text-secondary mb-0"
                  style={{ lineHeight: "1.7" }}
                >
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
              <h3
                className="fw-bold mb-3"
                style={{ fontSize: "2rem", letterSpacing: "-0.5px" }}
              >
                Start your free trial
              </h3>
              <p
                className="text-secondary mb-0"
                style={{ fontSize: "18px", lineHeight: "1.6" }}
              >
                Login now and get{" "}
                <span className="fw-bold text-dark">₹100 free credits</span>
                (that's{" "}
                <span className="fw-bold text-dark">1,000 extractions</span>) to
                test our service.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div
                className="d-inline-block bg-dark text-white px-5 py-3 c-pointer hover-lift"
                style={{ border: "1px solid #000" }}
                onClick={() => navigate("/login")}
              >
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
              <img
                src="./snyctWhite.png"
                width={140}
                alt=""
                className="img-fluid mb-3 img-premium-white"
              />
              <p
                className="small mb-4"
                style={{ lineHeight: "1.8", color: "#9a9a9a" }}
              >
                Autofill AI extracts structured data from documents using
                instruction-based AI extraction. Built for developers who need
                flexible document parsing APIs.
              </p>
              {/* <div className="small text-white-50">
                © 2026 Digimithra Solutions
              </div> */}
            </div>

            {/* Links */}
            <div className="col-6 col-lg-2">
              <h6
                className="text-white fw-semibold mb-4"
                style={{ letterSpacing: "1px", fontSize: "14px" }}
              >
                LINKS
              </h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a href="#" className="footer-link">
                    Home
                  </a>
                </li>
                <li className="mb-3">
                  <a href="https://docs.snyct.com" className="footer-link">
                    Documentation
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/pricing" className="footer-link">
                    Pricing
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/dashboard" className="footer-link">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div className="col-6 col-lg-2">
              <h6
                className="text-white fw-semibold mb-4"
                style={{ letterSpacing: "1px", fontSize: "14px" }}
              >
                DEVELOPERS
              </h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a href="https://docs.snyct.com" className="footer-link">
                    API Reference
                  </a>
                </li>
                <li className="mb-3">
                  <a href="https://docs.snyct.com" className="footer-link">
                    SDK Usage
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="col-6 col-lg-2">
              <h6
                className="text-white fw-semibold mb-4"
                style={{ letterSpacing: "1px", fontSize: "14px" }}
              >
                COMMUNITY
              </h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <a
                    href="https://github.com/bangeradeepu/snyct-docs"
                    className="footer-link"
                  >
                    Github- website
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="https://github.com/bangeradeepu/snyct-documentation"
                    className="footer-link"
                  >
                    Github-docs
                  </a>
                </li>
                <li className="mb-3">
                  <a
                    href="https://github.com/bangeradeepu/snyct-sdk"
                    className="footer-link"
                  >
                    Github- SDK
                  </a>
                </li>
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

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .badge {
          font-weight: 500;
          letter-spacing: 0.02em;
          backdrop-filter: blur(10px);
        }

        /* ──────────────────────────────────────────────────
           Extraction Widget — Desktop
           ────────────────────────────────────────────────── */

        .ew-wrap {
          position: relative;
          max-width: 900px;
          height: 700px;
          margin: 0 auto;
        }

        /* SVG pipes */
        .ew-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .ew-pipe {
          stroke: rgba(255, 255, 255, 0.75);
          stroke-width: 4;
          stroke-linecap: round;
          transition: stroke 0.3s;
        }
        .ew-pipe-active {
          stroke: white;
          stroke-dasharray: 14 8;
          animation: ewPipeFlow 0.65s linear infinite;
        }
        @keyframes ewPipeFlow {
          to { stroke-dashoffset: -22; }
        }

        /* Upload area */
        .ew-upload {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 235px;
          background: rgba(200, 200, 200, 0.1);
          border: 2px dashed rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1;
          transition: all 0.25s;
        }
        .ew-upload:hover,
        .ew-upload-drag {
          background: rgba(200, 200, 200, 0.2);
          border-color: rgba(255, 255, 255, 0.35);
        }
        .ew-upload-has {
          border-style: solid;
          border-color: rgba(255, 255, 255, 0.18);
          cursor: default;
        }
        .ew-upload-icon {
          font-size: 52px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1;
        }
        .ew-upload-label {
          color: rgba(255, 255, 255, 0.55);
          font-size: 15px;
          margin: 14px 0 0;
        }
        .ew-upload-name {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          margin: 10px 0 0;
          word-break: break-all;
          text-align: center;
          padding: 0 20px;
          max-width: 100%;
        }
        .ew-upload-rm {
          margin-top: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.55);
          padding: 4px 16px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ew-upload-rm:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        /* Terminal / code panels */
        .ew-fields {
          position: absolute;
          top: 0;
          right: 0;
          width: 55%;
          z-index: 1;
        }
        .ew-output {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          z-index: 1;
        }
        .ew-bar {
          background: #222;
          padding: 10px 16px;
          border-radius: 12px 12px 0 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ew-dots {
          display: flex;
          gap: 7px;
        }
        .ew-dot-r, .ew-dot-y, .ew-dot-g {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          display: block;
        }
        .ew-dot-r { background: #ff5f56; }
        .ew-dot-y { background: #ffbd2e; }
        .ew-dot-g { background: #27c93f; }
        .ew-bar-title {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.3px;
        }
        .ew-body {
          background: #1a1a1a;
          padding: 24px 28px;
          border-radius: 0 0 12px 12px;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 14px;
          line-height: 2;
          min-height: 130px;
        }
        .ew-fields .ew-body {
          min-height: 155px;
        }
        .ew-k { color: #e06c75; }
        .ew-v { color: #98c379; }
        .ew-p { color: rgba(255, 255, 255, 0.35); }
        .ew-dim { opacity: 0.3; }

        /* ══════════════════════════════════════════
           SNYCT ENGINE BUTTON
        ══════════════════════════════════════════ */
        /* ══════════════════════════════
           ENGINE BUTTON — clean & responsive
        ══════════════════════════════ */
        .eng-btn {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          background: #fff;
          border-radius: 14px;
          cursor: pointer;
          border: none;
          outline: none;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          transition: transform 0.2s cubic-bezier(.34,1.4,.64,1), box-shadow 0.2s;
          width: 240px;
        }
        .eng-btn-disabled { cursor: default; }
        .eng-btn:not(.eng-btn-disabled):not(.eng-btn-loading):hover {
          transform: translate(-50%, -50%) scale(1.04);
          box-shadow: 0 10px 36px rgba(0,0,0,0.26);
        }
        .eng-btn-loading {
          background: #0d0d0d;
          cursor: wait;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }

        /* ── IDLE ── */
        .eng-idle {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .eng-idle-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 18px 12px;
        }
        .eng-idle-doc {
          width: 36px; height: 46px;
          background: #f5f5f5;
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          padding: 7px 5px 5px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-shrink: 0;
        }
        .eng-idle-fold {
          position: absolute;
          top: 0; right: 0;
          width: 9px; height: 9px;
          background: linear-gradient(225deg, #fff 50%, #d8d8d8 50%);
        }
        .eng-idle-ln {
          height: 3px;
          background: #e0e0e0;
          border-radius: 2px;
        }
        .eng-idle-arrows {
          display: flex;
          gap: 0;
        }
        .eng-chevron {
          font-size: 16px;
          color: #ccc;
          animation: engChevron 1.1s ease-in-out infinite;
          line-height: 1;
        }
        @keyframes engChevron {
          0%,100% { opacity: 0.2; transform: translateX(0); }
          50%      { opacity: 0.9; transform: translateX(2px); }
        }
        .eng-idle-json {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 5px 7px;
          background: #111;
          border-radius: 4px;
          width: 52px;
          flex-shrink: 0;
        }
        .eng-idle-jln {
          height: 3px;
          border-radius: 2px;
          width: 80%;
        }
        .eng-jln-k { background: #e06c75; }
        .eng-jln-v { background: #98c379; width: 65%; }
        .eng-idle-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-top: 1px solid #f0f0f0;
          padding: 10px 16px;
        }
        .eng-idle-logo {
          width: 56px;
          filter: brightness(0);
          opacity: 0.85;
          flex-shrink: 0;
        }
        .eng-idle-lbl {
          font-family: 'Courier New', monospace;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #111;
          white-space: nowrap;
        }
        .eng-idle-lbl-dim { color: #bbb; }

        /* ── LOADING ── */
        .eng-load {
          display: flex;
          flex-direction: column;
        }
        .eng-load-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 14px 12px;
        }
        /* document */
        .eng-doc {
          width: 44px; height: 56px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 3px;
          padding: 8px 6px 6px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
        }
        .eng-doc-fold {
          position: absolute;
          top: 0; right: 0;
          width: 10px; height: 10px;
          background: linear-gradient(225deg, #0d0d0d 50%, rgba(255,255,255,0.08) 50%);
        }
        .eng-doc-ln {
          height: 3px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          animation: engDocPulse 1.6s ease-in-out infinite;
        }
        @keyframes engDocPulse {
          0%,100% { background: rgba(255,255,255,0.08); }
          50%      { background: rgba(255,255,255,0.28); }
        }
        .eng-doc-scan {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent);
          animation: engScan 1.3s ease-in-out infinite;
        }
        @keyframes engScan {
          0%   { top: 0; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .eng-hl {
          position: absolute;
          left: 6px;
          height: 3px;
          border-radius: 2px;
          background: rgba(152,195,121,0.7);
          animation: engHL 2.2s ease-in-out infinite;
        }
        .eng-hl-1 { top: 26px; width: 65%; animation-delay: 0s; }
        .eng-hl-2 { top: 40px; width: 45%; animation-delay: 0.7s; }
        @keyframes engHL {
          0%,15%  { opacity: 0; transform: scaleX(0); transform-origin: left; }
          30%,70% { opacity: 1; transform: scaleX(1); }
          85%,100%{ opacity: 0; }
        }
        /* stream */
        .eng-stream {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          flex-shrink: 0;
          overflow: hidden;
          height: 56px;
          justify-content: center;
        }
        .eng-bit {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.4);
          animation: engBitFall 1s ease-in infinite;
          flex-shrink: 0;
        }
        @keyframes engBitFall {
          0%   { transform: translateY(-12px); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(56px); opacity: 0; }
        }
        /* json output */
        .eng-json {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 5px;
          padding: 7px 9px;
          font-family: 'Courier New', monospace;
          font-size: 9px;
          line-height: 1.75;
          flex-shrink: 0;
          min-width: 80px;
          max-width: 90px;
          overflow: hidden;
        }
        .eng-jbrace { color: rgba(255,255,255,0.25); display: block; }
        .eng-jrow {
          display: block;
          opacity: 0;
          animation: engFadeIn 0.35s ease forwards;
          padding-left: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @keyframes engFadeIn {
          from { opacity: 0; transform: translateX(4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .eng-jk { color: #e06c75; }
        .eng-jp { color: rgba(255,255,255,0.2); }
        .eng-jv { color: #98c379; }
        .eng-cursor {
          display: inline-block;
          width: 1px; height: 8px;
          background: #98c379;
          vertical-align: middle;
          margin-left: 1px;
          animation: engBlink 0.65s step-end infinite;
        }
        @keyframes engBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        /* footer */
        .eng-foot {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 8px 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .eng-bar {
          height: 2px;
          background: rgba(255,255,255,0.07);
          border-radius: 2px;
          overflow: hidden;
        }
        .eng-bar-fill {
          height: 100%;
          background: rgba(255,255,255,0.5);
          border-radius: 2px;
          animation: engBarSlide 1.5s ease-in-out infinite;
        }
        @keyframes engBarSlide {
          0%   { width: 25%; transform: translateX(-100%); }
          100% { width: 45%; transform: translateX(400%); }
        }
        .eng-status-row {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .eng-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4ade80;
          flex-shrink: 0;
          animation: engDotBlink 0.9s ease-in-out infinite;
        }
        @keyframes engDotBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.25; }
        }
        .eng-status-txt {
          font-family: 'Courier New', monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.38);
          white-space: nowrap;
          overflow: hidden;
        }

        /* responsive: on mobile the button is static width 100% */
        @media (max-width: 991px) {
          .eng-btn {
            position: static;
            transform: none !important;
            width: 100%;
            max-width: 360px;
            border-radius: 12px;
          }
          .eng-btn:not(.eng-btn-disabled):not(.eng-btn-loading):hover {
            transform: scale(1.02) !important;
          }
        }

        /* Result animation */
        .ew-result-row {
          opacity: 0;
          animation: ewRowIn 0.35s ease forwards;
        }
        @keyframes ewRowIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ew-extracting {
          color: rgba(255, 255, 255, 0.4);
          font-size: 14px;
        }
        .ew-blink-dots {
          animation: ewBlink 1s steps(3, end) infinite;
        }
        @keyframes ewBlink {
          0%   { content: ''; opacity: 0.2; }
          33%  { opacity: 0.5; }
          66%  { opacity: 0.8; }
          100% { opacity: 0.2; }
        }

        .ew-empty { opacity: 0.35; }

        .ew-empty-hint {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.25);
          font-style: italic;
        }

        /* Editable field rows */
        .ew-body-fields {
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 155px;
        }

        .ew-field-row {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .ew-field-key-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(224, 108, 117, 0.4);
          color: #e06c75;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 13px;
          width: 90px;
          outline: none;
          padding: 2px 0;
          transition: border-color 0.2s;
          flex-shrink: 0;
        }
        .ew-field-key-input::placeholder { color: rgba(224,108,117,0.3); }
        .ew-field-key-input:focus { border-bottom-color: #e06c75; }

        .ew-field-val-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(152, 195, 121, 0.3);
          color: #98c379;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 13px;
          flex: 1;
          min-width: 0;
          outline: none;
          padding: 2px 0;
          transition: border-color 0.2s;
        }
        .ew-field-val-input::placeholder { color: rgba(152,195,121,0.3); }
        .ew-field-val-input:focus { border-bottom-color: #98c379; }

        .ew-field-rm-btn {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.2);
          font-size: 14px;
          cursor: pointer;
          padding: 0 0 0 4px;
          line-height: 1;
          transition: color 0.2s;
          flex-shrink: 0;
        }
        .ew-field-rm-btn:hover { color: rgba(255,100,100,0.8); }

        .ew-add-field-btn {
          background: transparent;
          border: 1px dashed rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.35);
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 12px;
          padding: 5px 12px;
          cursor: pointer;
          border-radius: 6px;
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s;
          width: fit-content;
        }
        .ew-add-field-btn:hover {
          border-color: rgba(255,255,255,0.35);
          color: rgba(255,255,255,0.65);
        }

        .ew-field-count {
          margin-left: 8px;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          font-family: 'Fira Code', monospace;
        }

        /* Mobile upload card */
        .ew-m-upload {
          width: 100%;
          max-width: 480px;
          background: rgba(200, 200, 200, 0.1);
          border: 2px dashed rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 28px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ew-m-upload:hover {
          background: rgba(200, 200, 200, 0.18);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .ew-m-upload-has {
          border-style: solid;
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default Home;
