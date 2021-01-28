import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentsStart } from './../../../redux/Contents/contents.actions';
import MainContentsItems from './../mainContentsItems';
import MainContentsDummy from './mainContentsDummy';
import './styles.scss';

const mapState = ({ contentsData }) => ({
  contents: contentsData.contents
});

const MainContents = () => {
  const dispatch = useDispatch();
  const { contents } = useSelector(mapState);
  const { data } = contents;
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        fetchContentsStart()
      )
      setIsPending(true);
    }, 100);
  }, [dispatch]);  

  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="main-items">
        <p>
          데이터가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="main-items">

      { !isPending && (
        <MainContentsDummy />
      )}

      { isPending && (<div className="main-row" key="complete-main-contents">
        {data.map((content, pos) => {
          const {
            contentTitle,
            contentThumbnail,
            contentDesc,
            documentID
          } = content;

          if(!contentThumbnail || !contentTitle || !contentDesc) return null;

          const configContent = {
            contentTitle,
            contentThumbnail,
            contentDesc,
            documentID
          };

          return ( <MainContentsItems {...configContent} key={pos}/> );
        })}
      </div>)}
      
    </div>
  );
};

export default MainContents;