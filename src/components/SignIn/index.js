import React, { Component } from 'react';
import './styles.scss';
import Button from '../Forms/Button';

import { signInWithGoogle } from './../../firebase/utils';

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SignIn extends Component {

  handleSubmit = async e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="sign-in">
        <div className="sign-in-title">
          <h2>로그인</h2>
        </div>
        <div className="sign-in-content-wrap">
          <form onSubmit={this.handleSubmit}>
            <div className="sign-in-social">
              <Button onClick={signInWithGoogle}>
                <FontAwesomeIcon className="i" icon={faGoogle} />
                <p>Google계정으로 이용하기</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
