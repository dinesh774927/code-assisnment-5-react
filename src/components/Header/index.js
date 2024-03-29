import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {withRouter, Link} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav">
        <img
          className="home-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
        <div className="menus-sm">
          <Link className="menu" to="/">
            <AiFillHome className="icons" />
          </Link>
          <Link className="menu" to="/jobs">
            <BsBriefcaseFill className="icons" />
          </Link>

          <FiLogOut onClick={onLogout} className="icons" />
        </div>
        <div className="menus-lg">
          <Link className="menu" to="/">
            <p>Home</p>
          </Link>
          <Link className="menu" to="/jobs">
            <p>Jobs</p>
          </Link>
        </div>
        <button onClick={onLogout} className="home-Logout" type="button">
          Logout
        </button>
      </nav>
    </>
  )
}
export default withRouter(Header)
