import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

import { fetchContentStart } from '../../../redux/Contents/contents.actions';

import './styles.scss';

const mapState = ({ contentsData }) => ({
  content: contentsData.content
})

const BlogCard = () => {
  const dispatch = useDispatch();
  const { blogID } = useParams(); 
  const [isPending, setIsPending] = useState(false);
  const { content } = useSelector(mapState);
  const {
    author,
    contentDesc,
    contentThumbnail,
    createdDate,
    contentTitle
  } = content;
  
  const timeNow = createdDate ? createdDate.toDate().toString() : null;
  const nowTime = moment(timeNow).fromNow();

  useEffect(() => {
    dispatch(
      fetchContentStart(blogID)
    )
    setTimeout(() => {
      setIsPending(true);  
    }, 200)
  }, [dispatch, blogID]);

  return (
    
    <div className="content-main">
      {!isPending && (
        <div className="content-box">
          <div className="content-head">
            <div className="content-name">
              <p></p>
            </div>
            <div className="content-head-time">
              <span></span>
            </div>
          </div>
          <div className="content-body">
            <div className="content-body-thumbnail">
            
            </div>
            <div className="content-body-title">
              <p>
                
              </p>
            </div>
            <div className="content-body-text">
              <span
              className="desc"
               />
            </div>
          </div>
        </div>
      )}
      {isPending && (
        <div className="content-box">
          <div className="content-head">
            <div className="content-name">
              <p>{author}</p>
            </div>
            <div className="content-head-time">
              <span>{nowTime}</span>
            </div>
          </div>
          <div className="content-body">
            <div className="content-body-thumbnail">
            <img src={contentThumbnail} alt="img" /> 
            </div>
            <div className="content-body-title">
              <p>
                {contentTitle}
              </p>
            </div>
            <div className="content-body-text">
              <span
              className="desc"
              dangerouslySetInnerHTML={{ __html: contentDesc }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BlogCard;
