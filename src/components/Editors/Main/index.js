import React, { useState } from 'react'
import ImageCropper from '../ImageCropper'
import Button from '../../Forms/Button'
import './styles.scss'

const EditorMain = () => {
  const [blob, setBlob] = useState(null)
  const [inputImg, setInputImg] = useState('')

  const getBlob = (blob) => {
      setBlob(blob)
  }

  const onInputChange = (e) => {
      // convert image file to base64 string
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
          setInputImg(reader.result)
      }, false)

      if (file) {
          reader.readAsDataURL(file)
      }
  }

  const handleSubmitImage = (e) => {
      e.preventDefault()
      console.log(blob);
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div>
        <form onSubmit={handleSubmitImage}>
          <input
            type='file'
            accept='image/*'
            onChange={onInputChange}
          />
          {
            inputImg && (
              <ImageCropper
                  getBlob={getBlob}
                  inputImg={inputImg}
              />
            )
          }
          <Button className="btn save-image-btn" type='submit'>보내기</Button>
        </form>
      </div>
    </div>
    </>
  )
};

export default EditorMain;
