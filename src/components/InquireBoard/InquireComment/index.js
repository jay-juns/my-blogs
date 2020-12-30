import React from 'react';
import './styles.scss';

export const InquireComments = props => {
  const { inquire } = props;
  const { items } = inquire;

  return (
    
    <div className="inquire-text">
      {(Array.isArray(items) && items.length > 0) && items.map((text, index) => {
        const { author, inquireText } = text;  

        return (
          <div className="inquire-comment-area" key={index}>
            <p>{author}</p>
            <span>{inquireText}</span>
          </div>
        )
      })}
    </div>
  )
}

export default InquireComments;
