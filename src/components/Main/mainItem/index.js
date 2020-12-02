import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContentsStart } from './../../../redux/Contents/contents.actions';
import OtherMain from './../otherMain';
import './styles.scss';

const mapState = ({ contentsData }) => ({
  contents: contentsData.contents
});

const MainItems = ({ }) => {
  const dispatch = useDispatch();
  const { contents } = useSelector(mapState);

  const { data } = contents;

  useEffect(() => {
    dispatch(
      fetchContentsStart()
    )
  }, []);

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
      <div>
        {data.map((content, pos) => {
          const {
            contentTitle,
            contentThumbnail,
            contentDesc
          } = content;

          if(!contentThumbnail || !contentTitle || !contentDesc) return null;

          const configContent = {
            contentTitle,
            contentThumbnail,
            contentDesc
          };

          return (
            <OtherMain {...configContent} key={pos}/>
          );
        })}
      </div>
    </div>
  );
};

export default MainItems;