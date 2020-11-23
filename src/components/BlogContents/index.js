import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../Forms/Button';
import Items from './BlogItems';

const mapState = ({ testItemData}) => ({
  testItems: testItemData.testItems
});

const BlogContents = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { testItems } = useSelector(mapState);

  if (!Array.isArarray(data)) return null;

  return (
    <div>

    </div>
  )
}

export default BlogContents;