import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from './../../Utils';
import useMediaQuery from './../../customHooks/useMediaQuery';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const AdminToolBar = props => {
  const { currentUser } = useSelector(mapState);
  const isAdmin = checkUserIsAdmin(currentUser);
  const matches = useMediaQuery("(min-width: 767px)");
  if (!isAdmin) return null;

  return (  
    <div className={ matches ? "admin-tool-bar-wrap" : "admin-tool-bar-wrap mobile" }>
      <Link to="/admin">어드민 페이지 이동</Link>
    </div>
  );
}
 
export default AdminToolBar;