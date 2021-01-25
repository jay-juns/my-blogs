import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

import { fetchContentStart } from '../../../redux/Contents/contents.actions';

import './styles.scss';

const mapState = state => ({
  content: state.contentsData.content
})

const BlogCard = ({}) => {
  const dispatch = useDispatch();
  const { blogID } = useParams();

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
  }, [dispatch, blogID]);

  return (
    <div className="content-main">
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
  );
}

export default BlogCard;
