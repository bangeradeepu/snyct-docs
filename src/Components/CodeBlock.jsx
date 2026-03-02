import React, { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language = "javascript" }) => {

  const [copied,setCopied] = useState(false);

  const copyCode = () => {

    navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(()=>setCopied(false),2000);

  };

  return (

    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #363636",
        position:"relative"
      }}
    >

      {/* Copy Button */}

      <button
        onClick={copyCode}
        style={{
          position:"absolute",
          top:"10px",
          right:"10px",
          background:"#2b2b2b",
          border:"1px solid #444",
          color:"white",
          borderRadius:"6px",
          padding:"6px 10px",
          cursor:"pointer",
          fontSize:"14px",
          display:"flex",
          alignItems:"center",
          gap:"6px"
        }}
      >

        <i className={copied ? "bi bi-check" : "bi bi-clipboard"}></i>

        {copied ? "Copied" : "Copy"}

      </button>


      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={false}
        wrapLines={true}
        customStyle={{
          margin: 0,
          padding: "20px",
          fontSize: "14px",
          background: "#1e1e1e",
          fontFamily:"Fira Code, monospace",
          lineHeight:"1.6"
        }}
      >

        {code}

      </SyntaxHighlighter>

    </div>

  );

};

export default CodeBlock;