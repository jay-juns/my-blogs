import React from 'react';
import UserFriends from './../../components/UserFriends';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Dashboard = props => {
  const { currentUser } = useSelector(mapState);
  const configUserProfile = {
    currentUser
  }
  return <UserFriends {...configUserProfile}/>;
};

export default Dashboard;