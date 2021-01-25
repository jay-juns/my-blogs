import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout';
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
import BlogDetails from './pages/BlogDetails';
import InquireDetails from './pages/InquireDetails';

//default css
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(checkUserSession());
    
  }, []);
  
  window.document.oncontextmenu = new Function("return false"); 
  window.document.onselectstart = new Function("return false"); 
  window.document.ondragstart = new Function("return false");

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
          <MainLayout>
            <Blog />
          </MainLayout>
        )}
        />
        <Route path="/blog/:filterType" render={() => (
          <MainLayout>
            <Blog />
          </MainLayout>
        )}
        />
        <Route path="/blogDetail/:blogID" render={() => (
          <MainLayout>
            <BlogDetails />
          </MainLayout>
        )}
        />
        <Route exact path="/inquirePage=/:inquirePageNumber" render={() => (
          <MainLayout>
            <Inquire />
          </MainLayout>
        )}
        />
        <Route path="/inquirePage=/:inquirePageNumber/:inquireType" render={() => (
          <MainLayout>
            <Inquire />
          </MainLayout>
        )}
        />
        <Route path="/inquireDetail/:inquireID" render={() => (
          <MainLayout>
            <InquireDetails />
          </MainLayout>
        )}
        />
        <Route path="/login" render={() =>  (
            <MainLayout>
              <Login />
            </MainLayout>
        )} 
        />
        <Route path="/registration" render={() =>  (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} 
        />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} 
        />
      </Switch>
    </div>
  );
}

export default App;
