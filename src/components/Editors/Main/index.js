import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import Button from '../../Forms/Button';
import 'react-image-crop/dist/ReactCrop.css';
import './styles.scss';

const EditorMain = () => {
  const [src, selectFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [result, setResult] = useState(null);
  
  const handleFileChange = e => {
    selectFile(URL.createObjectURL(e.target.files[0]))
  }

  function getCroppedImg() {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY =image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width*scaleX,
      crop.height*scaleY,
    );
    
    const base64Image = canvas.toDataURL('image/jpg');
    setResult(base64Image);
  }

  return (
    <div className="editor--main">
      <div>
        <input type='file' accet='image/*' onChange={handleFileChange} />
      </div>
      <div className="editor--show-area">
        {src && (
          <div className="editor--show-area-contents">
            <ReactCrop
              src={src} 
              onImageLoaded={setImage}
              crop={crop}
              onChange={setCrop}
              className="editor--show-area-img-wrapper"
            />
            <Button 
              className="btn cut-btn"
              onClick={getCroppedImg}
            >
              이미지 자르기
            </Button>
          </div>
        )}
      </div>
      {result && (
        <div className="editor--show-cut-area">
          <img src={result} alt="image" />
        </div>
      )}
    </div>
  );
};

export default EditorMain;
