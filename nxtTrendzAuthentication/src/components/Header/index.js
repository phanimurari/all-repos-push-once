// Write your JS code here
import './index.css'

const MenuItem = props => {
  const {itemName} = props
  return (
    <li className="item">
      <p>{itemName}</p>
    </li>
  )
}

function Header() {
  return (
    <nav className="navbar">
      <img
        className="nav-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <ul className="list-items">
        <MenuItem itemName="Home" />
        <MenuItem itemName="Products" />
        <MenuItem itemName="Cart" />
        <li>
          <button className="nav-btn" type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Header
