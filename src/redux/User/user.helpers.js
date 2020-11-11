import { auth } from './../../firebase/utils';

export const handleResetPasswordAPI = (email) => {
  return new Promise((resolve,reject) => {
    const config = {
      url: 'http://localhost:3000/login'
    };

    auth.sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ['없는 이메일입니다. 다시 입력해주세요.'];
        reject(err);
      });

  });
};