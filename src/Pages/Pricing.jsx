import React from 'react';

const Pricing = () => {
  const features = [
    {
      title: "Welcome Credit",
      amount: "$2 FREE",
      description: "Get $2 credit on first login",
      documents: "≈ 1,000 documents",
      icon: "bi-gem"
    },
    {
      title: "Pay As You Go",
      amount: "$0.002 per document",
      description: "~500 documents per $1",
      documents: "Only pay for what you use",
      icon: "bi-lightning-charge"
    },
    {
      title: "Minimum Recharge",
      amount: "$5 minimum",
      description: "Auto recharge when balance runs low",
      documents: "≈ 2,500 documents",
      icon: "bi-arrow-repeat"
    }
  ];

  return (
    <div className="bg-white min-vh-100 py-5">
      <div className="container">
        {/* Header Section - Minimal */}
        <div className="text-center mb-5">
          <div className="d-inline-block bg-dark text-white px-3 py-1 mb-4" style={{ letterSpacing: '2px', fontSize: '12px' }}>
            PRICING
          </div>
          <h1 className="display-4 fw-bold text-dark mb-3" style={{ letterSpacing: '-1px' }}>
            Simple, Transparent
          </h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '500px', fontSize: '18px' }}>
            Start with $2 free credit. Pay only for what you use.
          </p>
        </div>

        {/* Welcome Credit Alert - Minimal Black & White */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7">
            <div className="border border-dark p-4 bg-white" role="alert">
              <div className="d-flex">
                <div className="me-3">
                  <div className="bg-dark text-white p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-gift fs-4"></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">First Time Users</h5>
                  <p className="text-secondary mb-0">
                    Get <span className="fw-bold text-dark">$2 credit</span> instantly on login • Approximately 1,000 documents free
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Cards - Minimal & Premium */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="border border-dark p-4 h-100 bg-white hover-shadow" style={{ transition: 'all 0.3s ease' }}>
                {/* Icon */}
                <div className="mb-4">
                  <div className="bg-dark text-white p-3 d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className={`${feature.icon} fs-3`}></i>
                  </div>
                </div>
                
                {/* Content */}
                <h5 className="fw-bold mb-2" style={{ fontSize: '14px', letterSpacing: '1px' }}>
                  {feature.title}
                </h5>
                
                <h3 className="fw-bold mb-3" style={{ fontSize: '28px' }}>
                  {feature.amount}
                </h3>
                
                <p className="text-secondary mb-3" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
                
                {/* Divider */}
                <div className="border-top border-dark opacity-25 my-3"></div>
                
                {/* Document count */}
                <p className="mb-0 d-flex align-items-center text-secondary" style={{ fontSize: '14px' }}>
                  <i className="bi bi-file-text me-2"></i>
                  {feature.documents}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note - Minimal */}
        <div className="text-center mt-5 pt-3">
          <div className="d-inline-block border border-dark px-4 py-2">
            <p className="mb-0 text-secondary" style={{ fontSize: '14px' }}>
              <span className="fw-bold text-dark">$1</span> ≈ 500 documents • 
              <span className="fw-bold text-dark mx-2">Min recharge $5</span> • 
              Credits never expire
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for premium hover effect */}
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
          border-color: #000 !important;
        }
        
        /* Minimal scrollbar - optional */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Pricing;