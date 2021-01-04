import React from 'react';
import './styles.scss';

const FormChatInput = ({ label, value, formClass, handleChange, ...otherProps }) => {

  const textareaHeight = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault(); 
      return false;
    }
    let textarea = document.getElementById("commentContent");
    textarea.style.height = '12px';
    textarea.style.height = (textarea.scrollHeight) + "px";
    if(value !== '') {
      document.getElementById("submitBtn").disabled = false;
      document.getElementById("submitBtn").classList.add('btn');
    } else {
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("submitBtn").classList.remove('btn');
    }
  }

  const onFocus = () => {
    document.getElementById("commentContent").classList.add('show-btn');  
  }

  const handleCancle = () => {
    document.getElementById("commentContent").classList.remove('show-btn');
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").classList.remove('btn');
    document.getElementById("commentContent").innerHTML = '';
    value = ''; 
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
        value={value}
        onChange={handleChange}
      >
      </textarea>
      <div className="comment-btn-wrap">
        <button className="btn" onClick={() => handleCancle()} type="reset">취소</button>
        <button id="submitBtn" className="comment-submit-btn" type="submit" disabled {...otherProps}>작성하기</button>
      </div>
    </section>
  );
}

export default FormChatInput;