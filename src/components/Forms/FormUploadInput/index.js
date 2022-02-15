import React, { useState } from 'react';
import ProgressBar from './../FormUploadPrograssbar';
import './styles.scss';

const FormUploadInput = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  
  const types = ['image/png', 'image/jpeg'];

  const changeUploadHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('png, jpeg 파일 외에 업로드가 불가능합니다.');
    }
  }

  console.log(error, file);

  return (
   <form>
     <label className="upload-fake-btn">
       이미지 업로드
      <input className="upload-input-btn" type="file" onChange={changeUploadHandler}/>
     </label>
     
     <div className="out-put">
       { file && <div>{ file.name }</div> }
       { file && <ProgressBar file={file} setFile={setFile} /> }
     </div>
   </form>
  );
}

export default FormUploadInput;