import AddPassword from '../AddPassword'
import './index.css'

const PasswordContainer = () => (
  <div className="app-container">
    <div className="password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
        className="app-logo"
      />
      <AddPassword />
    </div>
  </div>
)

export default PasswordContainer
