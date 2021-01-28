import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout';
import OtherLayout from './layouts/OtherLayout';
import DashboardLayout from './layouts/DashboardLayout';

//hoc
import WithAuth from './hoc/withAuth';
// import WithAdminAuth from './hoc/withAdminAuth';

//pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Inquire from './pages/Inquire';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import DashboardFriends from './pages/DashboardFriends';
import BlogDetails from './pages/BlogDetails';
import InquireDetails from './pages/InquireDetails';
import NotFound from './pages/NotFound';

//default css
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(checkUserSession());
    
  }, [dispatch]);
  
  // window.document.oncontextmenu = new Function("return false"); 
  // window.document.onselectstart = new Function("return false"); 
  // window.document.ondragstart = new Function("return false");

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
        />
        <Route exact path="/blog" render={() => (
          <OtherLayout>
            <Blog />
          </OtherLayout>
        )}
        />
        <Route path="/blog/:filterType" render={() => (
          <OtherLayout>
            <Blog />
          </OtherLayout>
        )}
        />
        <Route path="/blogDetail/:blogID" render={() => (
          <OtherLayout>
            <BlogDetails />
          </OtherLayout>
        )}
        />
        <Route exact path="/inquirePage=/:inquirePageNumber" render={() => (
          <OtherLayout>
            <Inquire />
          </OtherLayout>
        )}
        />
        <Route path="/inquirePage=/:inquirePageNumber/:inquireType" render={() => (
          <OtherLayout>
            <Inquire />
          </OtherLayout>
        )}
        />
        <Route path="/inquireDetail/:inquireID" render={() => (
          <OtherLayout>
            <InquireDetails />
          </OtherLayout>
        )}
        />
        <Route path="/login" render={() =>  (
            <OtherLayout>
              <Login />
            </OtherLayout>
        )} 
        />
        <Route path="/registration" render={() =>  (
          <OtherLayout>
            <Registration />
          </OtherLayout>
        )} 
        />
        <Route exact path="/dashboard" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} 
        />
        <Route path="/dashboard/friends" render={() => (
          <WithAuth>
            <DashboardLayout>
              <DashboardFriends />
            </DashboardLayout>
          </WithAuth>
        )} 
        />
         <Route path="*" render={() =>  (
          <OtherLayout>
            <NotFound />
          </OtherLayout>
        )} 
        />
      </Switch>
    </div>
  );
}

export default App;
