import React from 'react';
import './styles.scss';

import Button from './../Button';

const FormChatInput = ({ label, formClass }) => {



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

  return (
    <section className={formClass}>
      {label && (
        <label>
          {label}
        </label>
      )}

      <textarea id="commentContent" className="chat-enter" onKeyPress={(e) => textareaHeight(e)} onKeyUp={(e) => textareaHeight(e)} onFocus={() => onFocus()}>
      </textarea>
      <div className="comment-btn-wrap">
        <Button>취소</Button>
        <Button>입력하기</Button>
      </div>
    </section>
  );
}

export default FormChatInput;