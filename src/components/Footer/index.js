import React from 'react';
import useMediaQuery from './../../customHooks/useMediaQuery';

import Button from './../Forms/Button';

import { faGithub, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './styles.scss';

const Footer = props => {
  const matches = useMediaQuery("(min-width: 767px)");

  return (
    <footer className="footer-wrap">
      <div className="footer-contents-wrap">
        <div className={matches ? "footer-icon-wrap" : "footer-icon-wrap footer-icon-wrap--mobile"}>
            <Button className="tooltip btn" data-tooltip="Git-hub" onClick={() => window.open('https://github.com/jay-juns','_blank')}>
              <FontAwesomeIcon className="i" icon={faGithub} />
            </Button>
            <Button className="tooltip btn" data-tooltip="Instagram" onClick={() => window.open('https://www.instagram.com/juns.kims/','_blank')}>
              <FontAwesomeIcon className="i" icon={faInstagram} />
            </Button>
            <Button className="tooltip btn" data-tooltip="Youtube" onClick={() => window.open('https://www.youtube.com/channel/UCVWxGFuhwLiWqF2ZIav_B3g','_blank')}>
              <FontAwesomeIcon className="i" icon={faYoutube} />
            </Button>
        </div>
        <div className="footer-contents">
          © 2021 My Blogs
        </div>
      </div>
    </footer>
  );
};

export default Footer;
