// Write your JS code here
import Header from '../Header'
import './index.css'

function Home() {
  return (
    <div className="home-bg">
      <div className="body-home">
        <Header />
        <div className="home-card">
          <div className="box">
            <h1 className="title">Clothes That Get YOU Noticed</h1>
            <p className="info">
              Fashion is part of the daily air, Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
            <button className="home-btn" type="button">
              Shop Now
            </button>
          </div>
          <img
            className="home-pic"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
