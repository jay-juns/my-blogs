import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout';
import BlogLayout from './layouts/BlogLayout';
import InquireLayout from './layouts/InquireLayout';
import LoginLayout from './layouts/LoginLayout';
import SigninLayout from './layouts/SigninLayout';
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
import './globelStyles/default.scss';

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
          <BlogLayout>
            <Blog />
          </BlogLayout>
        )}
        />
        <Route path="/blog/:filterType" render={() => (
          <BlogLayout>
            <Blog />
          </BlogLayout>
        )}
        />
        <Route path="/blogDetail/:blogID" render={() => (
          <InquireLayout>
            <BlogDetails />
          </InquireLayout>
        )}
        />
        <Route exact path="/inquirePage=/:inquirePageNumber" render={() => (
          <InquireLayout>
            <Inquire />
          </InquireLayout>
        )}
        />
        <Route path="/inquirePage=/:inquirePageNumber/:inquireType" render={() => (
          <InquireLayout>
            <Inquire />
          </InquireLayout>
        )}
        />
        <Route path="/inquireDetail/:inquireID" render={() => (
          <InquireLayout>
            <InquireDetails />
          </InquireLayout>
        )}
        />
        <Route path="/login" render={() =>  (
          <LoginLayout>
            <Login />
          </LoginLayout>
        )} 
        />
        <Route path="/registration" render={() =>  (
          <SigninLayout>
            <Registration />
          </SigninLayout>
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
