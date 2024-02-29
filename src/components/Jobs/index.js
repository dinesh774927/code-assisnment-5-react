import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusProfile = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  initial: 'INITIAL',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

class Jobs extends Component {
  state = {
    profileStatus: apiStatusProfile.initial,
    profileData: '',
    employment: [],
    searchInput: '',
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfile()
  }

  onChangeSalaryRange = event => {
    this.setState({salaryRange: event.target.value})
  }

  onClickEmployment = event => {
    const {employment} = this.state
    const abc = event.target.value
    const check = employment.includes(abc)
    if (check) {
      const newList = employment.filter(each => abc !== each)
      this.setState({employment: newList})
    } else {
      employment.push(event.target.value)
      this.setState({employment})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getProfile = async () => {
    this.setState({profileStatus: apiStatusProfile.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        profileData: data.profile_details,
        profileStatus: apiStatusProfile.success,
      })
    }
  }

  onSuccessProfile = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img
          className="profile-img"
          alt="profile"
          src={profileData.profile_image_url}
        />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-bio">{profileData.short_bio}</p>
      </div>
    )
  }

  onFailureProfile = () => <div>failure</div>

  statusProfile = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case apiStatusProfile.success:
        return this.onSuccessProfile()
      case apiStatusProfile.failure:
        return this.onFailureProfile()
      case apiStatusProfile.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    const searchLogo = <BsSearch className="search-icon" />
    const {searchInput, salaryRange} = this.state
    console.log(salaryRange)

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="box1">
            <div className="search-container">
              <input
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                type="search"
                className="job-search-input"
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                {searchLogo}
              </button>
            </div>
            <div className="profile-container1">{this.statusProfile()}</div>
            <hr />
            <div className="employment-container">
              <p className="heading-employment">Type of Employment</p>
              <ul className="ul-employment">
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      onChange={this.onClickEmployment}
                      className="checkbox"
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                    />
                    <label htmlFor={each.employmentTypeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <div className="employment-container">
              <p className="heading-employment">Salary Range</p>
              <ul className="ul-employment">
                {salaryRangesList.map(each => (
                  <li key={each.salaryRangeId}>
                    <input
                      onChange={this.onChangeSalaryRange}
                      value={each.salaryRangeId}
                      name="options"
                      className="checkbox"
                      type="radio"
                      id={each.salaryRangeId}
                    />
                    <label htmlFor={each.salaryRangeId}>{each.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
