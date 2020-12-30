import React from 'react';
import './styles.scss';


const FormChatInput = ({ label, formClass, handleChange, ...otherProps }) => {

  const textareaHeight = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault(); 
      return false;
    }
    
    let textarea = document.getElementById("commentContent");
    textarea.style.height = '15px';
    textarea.style.height = (textarea.scrollHeight) + "px";
  }

  const onFocus = () => {
    let focusTarget = document.getElementById("commentContent");
    focusTarget.classList.add('show-btn');  
  }

  const handleCancle = () => {
    let cancelTarget = document.getElementById("commentContent");
    cancelTarget.classList.remove('show-btn');
  }

  return (
    <section className={formClass}>
      {label && (
        <label>
          {label}
        </label>
      )}

      <textarea 
        id="commentContent" 
        className="chat-enter" 
        onKeyPress={(e) => textareaHeight(e)} 
        onKeyUp={(e) => textareaHeight(e)} 
        onFocus={() => onFocus()}
        onChange={handleChange}
      >
      </textarea>
      <div className="comment-btn-wrap">
        <button onClick={() => handleCancle()}>취소</button>
        <button {...otherProps}>보내기</button>
      </div>
    </section>
  );
}

export default FormChatInput;