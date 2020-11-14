import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout';

//hoc
// import WithAuth from './hoc/withAuth';
// import WithAdminAuth from './hoc/withAdminAuth';

//pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Inquire from './pages/Inquire';
import Login from './pages/Login';
import Registration from './pages/Registration';

//components

//default css
import './default.scss';

const App = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
        />
        <Route path="/blog" render={() => (
          <MainLayout>
            <Blog />
          </MainLayout>
        )}
        />
        <Route path="/inquire" render={() => (
          <MainLayout>
            <Inquire />
          </MainLayout>
        )}
        />
        <Route path="/login" 
          render={() =>  (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
          <Route path="/registration" 
          render={() =>  (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />
      </Switch>
    </div>
  );
}

export default App;
