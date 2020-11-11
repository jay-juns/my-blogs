import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

//layouts
import MainLayout from './layouts/MainLayout';

//pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import Inquire from './pages/Inquire';

//components
import Login from './pages/Login';
import Signup from './components/Signup';

//default css
import './default.scss';

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      ...initialState
    };  
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot =>{
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      
      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } =this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <MainLayout currentUser={currentUser}>
              <Home />
            </MainLayout>
          )}
          />
          <Route exact path="/blog" render={() => (
            <MainLayout currentUser={currentUser}>
              <Blog />
            </MainLayout>
          )}
          />
          <Route exact path="/inquire" render={() => (
            <MainLayout currentUser={currentUser}>
              <Inquire />
            </MainLayout>
          )}
          />
          <Route path="/login" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
            <Route path="/Signup" 
            render={() =>  (
              <MainLayout currentUser={currentUser}>
                <Signup />
              </MainLayout>
            )} />
        </Switch>
      </div>
    );
  }
}

export default App;
