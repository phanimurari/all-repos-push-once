import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
  FaCopyright,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="contact-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/aguruprasad/image/upload/v1644920229/footer-logo_evcp2h.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchen</h1>
      </div>
      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="icons-list">
        <li>
          <FaPinterestSquare
            alt="pintrest-social-icon"
            testid="pintrest-social-icon"
            className="icon"
          />
        </li>
        <li>
          <FaInstagram
            alt="instagram-social-icon"
            testid="instagram-social-icon"
            className="icon"
          />
        </li>
        <li>
          <FaTwitterSquare
            alt="twitter-social-icon"
            testid="twitter-social-icon"
            className="icon"
          />
        </li>
        <li>
          <FaFacebookSquare
            alt="facebook-social-icon"
            testid="facebook-social-icon"
            className="icon"
          />
        </li>
      </ul>
      <div className="copy-right-container">
        <FaCopyright /> <p className="copy-right-name">Prasad Aguru</p>
      </div>
    </div>
  )
}
