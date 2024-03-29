import React from 'react';
import UserProfileSetting from './../../components/UserProfileSetting';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Dashboard = props => {
  const { currentUser } = useSelector(mapState);
  const configUserProfile = {
    currentUser
  }
  return <UserProfileSetting {...configUserProfile}/>;
};

export default Dashboard;