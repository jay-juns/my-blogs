import React from 'react';

const InquireCardDummy = () => {
  return (
    <div className="detail-container">
        <div className="detail-header">
        
          <div className="detail-header-left">
            <div className="detail-header-left--up">
              <div className="detail-header-left--up-contents">
                <p className="detail-title"></p> 
                <div className="detail-user-info-wrap">
                  <span className="detail-user-img"></span>
                  <p className="detail-displayName"><strong>님</strong></p>
                </div> 
              </div>

              <div className="detail-header-left--up-btn-area">
              
              </div>
             
            </div>
            
            <div className="detail-header-left--footer-wrapper">
              <span className="detail-header-left--tag">
                
              </span>
            </div>
          </div>
          
        </div>
        <div className="detail-body">
          <span
          className="desc"
           />
        </div>
      </div>
  );
}
 
export default InquireCardDummy;