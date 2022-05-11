import {createMemoryHistory} from 'history'
import {Router, BrowserRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {setupServer} from 'msw/node'
import {rest} from 'msw'

import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

// #region Test cases preparation

const loginRoutePath = '/login'

const homeRoutePath = '/'

const restaurantDetailsPath = '/restaurant/2200043'

const restaurantDetailsAPIURL = 'https://apis.ccbp.in/restaurants-list/:id'

const offersAPIURL = 'https://apis.ccbp.in/restaurants-list/offers'

const restaurantsAPIURL = 'https://apis.ccbp.in/restaurants-list'

const offersListResponse = {
  offers: [
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-jammu-special.jpg',
      id: 1,
    },
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-rajasthani-special.jpg',
      id: 2,
    },
    {
      image_url:
        'https://assets.ccbp.in/frontend/react-js/restaurants-app-project/carousel-images-uttar-pradesh-special.jpg',
      id: 3,
    },
  ],
}

const pageOneRestaurantsListInitialResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 345,
        rating: 3.4,
      },
      id: '2200043',
      name: 'Village Traditional Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
      menu_type: 'VEG',
      location:
        '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 461,
        rating: 3.5,
      },
      name: 'BHotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/b-hotel-akbar-2200044.jpg',
      id: '2200044',
      menu_type: 'VEG',
      location:
        'Metro Pillar Number KUK39, 1-10-74, 1st Floor, Above Balaji Family Dhaba Hotel',
      opens_at: '09:00 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageOneRestaurantsListSortByHighestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Very Good',
        rating_color: '5BA829',
        total_reviews: 140,
        rating: 4.1,
      },
      name: 'Cafe Madarassi',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/cafe-madarassi-2200153.jpg',
      id: '2200153',
      menu_type: 'VEG',
      location:
        'Dubai colony rode no:1 pradhan mantri kusal kendra 4th floor, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 206,
        rating: 3.9,
      },
      name: 'Hotel Sri Ganesh Bhavan',
      cost_for_two: 200,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hotel-sriganesh-bhavan-2200045.jpg',
      id: '2200045',
      menu_type: 'VEG',
      location: 'Fortune Enclave, Sri Ram Nagar Colony, Banjara Hills, ',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 276,
        rating: 3.8,
      },
      name: 'Arunodaya Restuarent',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/arunodaya-restaurant-2200132.jpg',
      id: '2200132',
      menu_type: 'VEG',
      location:
        'NV Plaza, 4th Floor, Punjagutta Rd, Dwarakapuri, Punjagutta, Hyderabad',
      opens_at: '09:30 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageOneRestaurantsListSortByLowestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 345,
        rating: 3.4,
      },
      id: '2200043',
      name: 'Village Traditional Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
      menu_type: 'VEG',
      location:
        '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 461,
        rating: 3.5,
      },
      name: 'BHotel Akbar',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'North Indian, Chinese',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/b-hotel-akbar-2200044.jpg',
      id: '2200044',
      menu_type: 'VEG',
      location:
        'Metro Pillar Number KUK39, 1-10-74, 1st Floor, Above Balaji Family Dhaba Hotel',
      opens_at: '09:00 AM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 111,
        rating: 3.5,
      },
      name: 'Hydarabad Spices',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 400,
      cuisine: 'Fast Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/hydarabad-spices-2200033.jpg',
      id: '2200033',
      menu_type: 'VEG',
      location:
        'Parkview garden Appartments,Masabtank, Humayun Nagar, Hyderabad,',
      opens_at: '10:00 AM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const pageTwoRestaurantsListSortByHighestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 97,
        rating: 3.9,
      },
      name: 'Mr Brown',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 500,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/mr-brown-2300183.webp',
      id: '2300183',
      menu_type: 'VEG',
      location: 'Addagutta Society - HMT Hills Rd, Kukatpally, Hyderabad,',
      opens_at: '04:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 56,
        rating: 3.6,
      },
      name: 'Royal Spicy Foods',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 150,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/royal-spicy-foods-2200201.jpg',
      id: '2200201',
      menu_type: 'VEG',
      location: 'Mehdipatnam, Hyderabad',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Good',
        rating_color: '9ACD32',
        total_reviews: 51,
        rating: 3.6,
      },
      name: 'Mr.Ice Cream',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 700,
      cuisine: 'Bakery',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/mr-ice-cream-2200283.webp',
      id: '2200283',
      menu_type: 'VEG',
      location: 'Street Number 6, Domalguda, Himayatnagar, Hyderabad,',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const restaurantDetailsResponse = {
  rating: 3.4,
  id: '2200043',
  name: 'Village Traditional Foods',
  cost_for_two: 700,
  cuisine: 'North Indian, Chinese',
  image_url:
    'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/village-traditional-foods-2200043.jpg',
  reviews_count: 345,
  opens_at: '10:00 AM, Tomorrow',
  location:
    '1-8-303, Sindhi Colony Rd, Sindhi Colony, Begumpet, Hyderabad, Telangana 500003',
  items_count: 15,
  food_items: [
    {
      name: 'Chicken Salad',
      cost: 345,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg',
      id: 'c172e4b2-9288-4a6f-b77b-510eef8e945d',
      rating: 4,
    },
    {
      name: 'Onion Salad',
      cost: 315,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/onion-salad-17.jpg',
      id: '02d8f007-af50-4da5-b22d-9072cd026b69',
      rating: 4.2,
    },
    {
      name: 'Okra Salad',
      cost: 375,
      food_type: 'VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/okra-salad-18.jpg',
      id: '6668718b-6f1c-49d1-854e-f92c6802484e',
      rating: 3.8,
    },
    {
      name: 'Mutton Salad',
      cost: 335,
      food_type: 'NON-VEG',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/mutton-salad-19.cms',
      id: 'e6005897-c520-457a-be5a-11a77f8d0cba',
      rating: 4.2,
    },
  ],
}

const pageTwoRestaurantsListSortByLowestResponse = {
  restaurants: [
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 122,
        rating: 3.4,
      },
      name: 'Oyalo Pizza',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 800,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/oyalo-pizza-2200030.jpg',
      id: '2200030',
      menu_type: 'VEG',
      location: 'Bachupally, Hyderabad',
      opens_at: '02:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 44,
        rating: 3.4,
      },
      name: 'JayaSree Restaurant',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 600,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/jaya-sree-restaurant-2200149.jpg',
      id: '2200149',
      menu_type: 'VEG',
      location: 'Somajiguda Beside Lane of Ford Car show Room, ',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
    {
      has_online_delivery: true,
      user_rating: {
        rating_text: 'Average',
        rating_color: 'CDD614',
        total_reviews: 98,
        rating: 3.4,
      },
      name: 'Street Food Avenue',
      has_table_booking: 0,
      is_delivering_now: 0,
      cost_for_two: 1200,
      cuisine: 'Street Food',
      image_url:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/street-food-avenue-2200001.webp',
      id: '2200001',
      menu_type: 'VEG',
      location:
        ' Sun Complex. Beside Airtel Office, opp. Indo English School, Santosh Nagar, Hyderabad,',
      opens_at: '12:00 PM, Tomorrow',
      group_by_time: true,
    },
  ],
  total: 30,
}

const server = setupServer(
  rest.get(offersAPIURL, (req, res, ctx) => res(ctx.json(offersListResponse))),
  rest.get(restaurantsAPIURL, (req, res, ctx) => {
    const query = req.url.searchParams
    const offset = query.get('offset')
    const sortByRating = query.get('sort_by_rating')
    if (offset === '0' && (sortByRating === undefined || sortByRating === '')) {
      return res(ctx.json(pageOneRestaurantsListInitialResponse))
    } else if (offset === '0' && sortByRating === 'Highest') {
      return res(ctx.json(pageOneRestaurantsListSortByHighestResponse))
    } else if (offset === '0' && sortByRating === 'Lowest') {
      return res(ctx.json(pageOneRestaurantsListSortByLowestResponse))
    } else if (offset === '9' && sortByRating === 'Lowest') {
      return res(ctx.json(pageTwoRestaurantsListSortByLowestResponse))
    } else return res(ctx.json(pageTwoRestaurantsListSortByHighestResponse))
  }),
  rest.get(restaurantDetailsAPIURL, (req, res, ctx) =>
    res(ctx.json(restaurantDetailsResponse)),
  ),
)

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const mockGetCookie = (returnToken = true) => {
  let mockedGetCookie
  if (returnToken) {
    mockedGetCookie = jest.fn(() => ({
      jwt_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwiaWF0IjoxNjE5MDk0MjQxfQ.1i6BbQkQvtvpv72lHPNbl2JOZIB03uRcPbchYYCkL9o',
    }))
  } else {
    mockedGetCookie = jest.fn(() => undefined)
  }
  jest.spyOn(Cookies, 'get')
  Cookies.get = mockedGetCookie
}

const restoreGetCookieFns = () => {
  Cookies.get.mockRestore()
}

const mockRemoveCookie = () => {
  jest.spyOn(Cookies, 'remove')
  Cookies.remove = jest.fn()
}

const restoreRemoveCookieFns = () => {
  Cookies.remove.mockRestore()
}

const renderWithBrowserRouter = (
  ui = <App />,
  {route = homeRoutePath} = {},
) => {
  window.history.pushState({}, 'Test page', route)
  return render(ui, {wrapper: BrowserRouter})
}

const rtlRender = (ui = <App />, path = homeRoutePath) => {
  const history = createMemoryHistory()
  history.push(path)
  render(<Router history={history}>{ui}</Router>)
  return {
    history,
  }
}

const mockHistoryReplace = instance => {
  jest.spyOn(instance, 'replace')
}

const restoreHistoryReplace = instance => {
  instance.replace.mockRestore()
}

const originalConsoleError = console.error
const originalFetch = window.fetch

// #endregion

describe(':::RJSCPP63AV_TEST_SUITE_5:::Home Route Tests', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    window.fetch = originalFetch
  })

  afterAll(() => {
    server.close()
  })

  it(':::RJSCPP63AV_TEST_67:::When HTTP GET request of offers API is successful, the page should consist of at least two HTML list items, and the list items should be rendered using a unique key as a prop for each similar list item :::10:::', async () => {
    mockGetCookie()
    console.error = message => {
      if (
        /Each child in a list should have a unique "key" prop/.test(message) ||
        /Encountered two children with the same key/.test(message)
      ) {
        throw new Error(message)
      }
    }
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(2)
    console.error = originalConsoleError
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_68:::When an unauthenticated user accesses the "/" URL in Home Route, then the page should be navigated to Login Route and the Page should consist of Login Route elements :::15:::', async () => {
    renderWithBrowserRouter(<App />)
    const usernameField = await screen.getByLabelText(/USERNAME/i, {
      exact: false,
    })
    expect(window.location.pathname).toBe('/login')
  })

  it(':::RJSCPP63AV_TEST_69:::When an authenticated user accesses the "/" URL in Home Route, then the page should not be navigated to Login Route :::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(homeRoutePath)

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_70:::HomeRoute should consist of an HTML image element wrapped with Link from "react-router-dom" and alt text as "website logo":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const imageEls = screen.getAllByRole('link', {
      name: /website logo/i,
      exact: false,
    })
    expect(imageEls[0]).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_71:::Home Route should consist of an HTML unordered list element to display the list of items in the Header:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('list').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('list')[0].tagName).toBe('UL')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_72:::Home Route should initially consist of at least 6 HTML list items:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(6)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_73:::Home Route should consist of an HTML element with text content as "Home" wrapped with Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', {
        name: /Home/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_74:::Home Route should consist of an HTML element with text content as "Cart" wrapped with Link from "react-router-dom":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', {
        name: /Cart/i,
        exact: false,
      })[0],
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_75:::Home Route should consist of an HTML button element with "Logout" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      await screen.getByRole('button', {
        name: /Logout/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_76:::When the Home Route is opened, an HTML container element with test id attribute value as "restaurants-offers-loader" should be displayed while the API call is in progress :::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('restaurants-offers-loader'),
    )
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_77:::When the Home Route is opened, an HTML container element with test id attribute value as "restaurants-list-loader" should be displayed while the API call is in progress:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await waitForElementToBeRemoved(() =>
      screen.queryAllByTestId('restaurants-list-loader'),
    )
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_78:::Home Route should contain "react-slick" third party library to display restaurant offers images:::15:::', async () => {
    mockGetCookie()
    const {container} = renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const reactSlickContainer = container.querySelector('.slick-slider')
    expect(reactSlickContainer).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_79:::When the Restaurants offers API Home Route is successful, then the page should contain at least 2 HTML images with alt text as "offer":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_80:::When the HTTP GET request in the Home Route is successful, Home Route should consist of an HTML main heading element with "Popular Restaurants" as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /Popular Restaurants/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_81:::Home Route should consist of an HTML paragraph element with "Select Your favourite restaurant special dish and make your day happy..." as text content:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(
      /Select Your favourite restaurant special dish and make your day happy.../i,
      {
        exact: false,
      },
    )
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_82:::When the Home Route is accessed, an HTTP GET request should be made to restaurants offers API with the given restaurants offers API URL:::10:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === offersAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(offersListResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(pageOneRestaurantsListInitialResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      mockFetchFunction.mock.calls.some(
        eachCall => eachCall[0] === offersAPIURL,
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_83:::When the Home Route is accessed, an HTTP GET request should be made to restaurants lists API with the given restaurants list API URL:::10:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === offersAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(offersListResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(pageOneRestaurantsListInitialResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      mockFetchFunction.mock.calls.some(eachCall =>
        eachCall[0].includes(restaurantsAPIURL),
      ),
    ).toBeTruthy()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_84:::When the Home Route is opened, an HTTP GET request should be made to restaurantsListAPI with all the query parameters and their initial values:::15:::', async () => {
    mockGetCookie()
    const mockFetchFunction = jest.fn().mockImplementation(url => {
      if (url === offersAPIURL) {
        return {
          ok: true,
          json: () => Promise.resolve(offersListResponse),
        }
      }
      return {
        ok: true,
        json: () => Promise.resolve(pageOneRestaurantsListInitialResponse),
      }
    })
    window.fetch = mockFetchFunction
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('offset=0')
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('sort_by_rating=Lowest')
    expect(mockFetchFunction.mock.calls[1][0]).toMatch('limit=9')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_85:::When the Home Route is opened then the page should contain all the restaurants list items that we get in response with the test id attribute value as "restaurant-item":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    expect(restaurantsListItems.length).toBe(
      pageOneRestaurantsListSortByLowestResponse.restaurants.length,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_86:::Home Route should consist of HTML paragraph element with text content as "Sort By":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const paragraphEl = screen.getByText(/Sort By/i, {exact: false})
    expect(paragraphEl).toBeInTheDocument()
    expect(paragraphEl.tagName).toBe('P')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_87:::Home Route should contain an HTML Select ELement with only two options:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const optionsInSelectElement = screen.getAllByRole('option')
    expect(optionsInSelectElement.length).toBe(2)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_88:::Home Route should consist of HTML option elements with text content equal to "displayText" of each item in sortByOptions provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: sortByOptions[0].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: sortByOptions[1].displayText,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_89:::Home Route should consist of HTML option elements with value attribute equal to "value" of each item in sortByOptions provided:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', {
        name: sortByOptions[0].displayText,
        exact: false,
      }).value,
    ).toBe(sortByOptions[0].value)
    expect(
      screen.getByRole('option', {
        name: sortByOptions[1].displayText,
        exact: false,
      }).value,
    ).toBe(sortByOptions[1].value)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_90:::In the Home Route, the select filter should contain "Lowest" as the default selected value:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(true)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_91:::In the Home Route, the filter value should change when we select different filter option:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Cafe Madarassi/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(true)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_92:::Each Restaurant List Item in the Home Route should be wrapped with the "Link" from "react-router-dom":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const {restaurants} = pageOneRestaurantsListSortByLowestResponse
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(
      restaurants.length + 3,
    )
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_93:::When the restaurant list API in the Home Route is successful, then the page should contain an HTML element with the test id attribute value as "active-page-number" which initially contains the restaurant page number as 1:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('active-page-number').textContent).toBe('1')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_94:::Home Route should contain the HTML button element with test id value as "pagination-right-button":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('pagination-right-button')).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_95:::Home Route should contain the HTML button element with test id value as "pagination-left-button":::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    const offerImages = await screen.findAllByAltText(/offer/i, {exact: false})
    expect(offerImages.length).toBeGreaterThan(2)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('pagination-left-button')).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_96:::When the logout button is clicked in the Home Route, then the Cookies.remove() method should be called with the "jwt_token" string as an argument:::15:::', async () => {
    mockRemoveCookie()
    mockGetCookie()
    rtlRender(<App />, homeRoutePath)

    await screen.findAllByAltText(/offer/i, {exact: false})
    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    userEvent.click(logoutBtn)
    expect(Cookies.remove).toHaveBeenCalledWith('jwt_token')
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_97:::When the logout button is clicked in the Home Route, then the history.replace() method should be called with the argument "/login":::15:::', async () => {
    mockGetCookie()
    const {history} = rtlRender(<App />, homeRoutePath)
    mockHistoryReplace(history)
    await screen.findAllByAltText(/offer/i, {exact: false})
    const logoutBtn = await screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })

    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.click(logoutBtn)
    expect(history.replace).toHaveBeenCalledWith(loginRoutePath)
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_98:::When the logout button is clicked in the Home Route, then the page should be navigated to LoginRoute and the Login Route should consist of an HTML input element with label text as "USERNAME":::15:::', async () => {
    mockGetCookie()
    mockRemoveCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    const logoutBtn = screen.getByRole('button', {
      name: /Logout/i,
      exact: false,
    })
    restoreGetCookieFns()
    mockGetCookie(false)
    userEvent.click(logoutBtn)
    expect(window.location.pathname).toBe(loginRoutePath)
    expect(
      screen.getByLabelText(/USERNAME/i, {
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreRemoveCookieFns()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_99:::When the restaurant list API in the Home Route is successful, then the restaurant List item with the test id attribute value as "restaurant-item" should contain the HTML image element with src value as restaurant image URL:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    const firstRestaurantItem = restaurantsListItems[0]
    const {restaurants} = pageOneRestaurantsListInitialResponse
    const {image_url} = restaurants[0]
    expect(within(firstRestaurantItem).getByAltText(/restaurant/i).src).toBe(
      image_url,
    )

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_100:::When the restaurant list API in the Home Route is successful, then the restaurant List item with the test id attribute value as "restaurant-item" should contain the HTML heading element with text content as restaurant name:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    const firstRestaurantItem = restaurantsListItems[0]
    const {restaurants} = pageOneRestaurantsListInitialResponse
    const {name} = restaurants[0]
    expect(
      within(firstRestaurantItem).getByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_101:::When the restaurant list API in the Home Route is successful, then the restaurant List item with the test id attribute value as "restaurant-item" should contain the HTML paragraph element with text content as restaurant cuisine name:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    const firstRestaurantItem = restaurantsListItems[0]
    const {restaurants} = pageOneRestaurantsListInitialResponse
    const {cuisine} = restaurants[0]
    expect(
      within(firstRestaurantItem).getByText(cuisine, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_102:::When the restaurant list API in the Home Route is successful, then the restaurant List item with the test id attribute value as "restaurant-item" should contain the HTML paragraph element with text content as restaurant rating:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    const firstRestaurantItem = restaurantsListItems[0]
    const {restaurants} = pageOneRestaurantsListInitialResponse
    const {
      user_rating: {rating},
    } = restaurants[0]
    expect(
      within(firstRestaurantItem).getByText(rating, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_103:::When the restaurant list API in the Home Route is successful, then the restaurant List item with the test id attribute value as "restaurant-item" should contain the HTML heading element with text content as restaurant total reviews count:::5:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    const firstRestaurantItem = restaurantsListItems[0]
    const {restaurants} = pageOneRestaurantsListInitialResponse
    const {
      user_rating: {total_reviews},
    } = restaurants[0]

    expect(
      within(firstRestaurantItem).getByText(total_reviews, {
        exact: false,
      }),
    ).toBeInTheDocument()

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_104:::When the restaurant list item with test id attribute value as "restaurant-item" is clicked then the page should be navigated to restaurant details page:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const restaurantsListItems = screen.getAllByAltText('restaurant')
    userEvent.click(restaurantsListItems[0])
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe(restaurantDetailsPath)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_105:::When the restaurant list API in the Home Route is successful, then the Restaurants List should be sorted by Highest when we select sort by filter value as "Highest":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Cafe Madarassi/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(false)

    const {restaurants} = pageOneRestaurantsListSortByHighestResponse
    const {name} = restaurants[0]
    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    expect(
      await within(restaurantsListItems[0]).findByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_106:::When the restaurant list API in the Home Route is successful, then the Restaurants List should be sorted by Lowest when the user select sort by filter value as "Lowest":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Lowest'])
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(false)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(true)

    const {restaurants} = pageOneRestaurantsListSortByLowestResponse
    const {name, image_url, cuisine} = restaurants[2]
    const restaurantsListItems = screen.getAllByTestId('restaurant-item')
    expect(
      await within(restaurantsListItems[2]).findByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(
      within(restaurantsListItems[2]).getByRole('img', {name: 'restaurant'})
        .src,
    ).toBe(image_url)

    expect(
      within(restaurantsListItems[2]).getByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const cuisineTypeElement = within(
      restaurantsListItems[2],
    ).getByText(cuisine, {exact: false})
    expect(cuisineTypeElement.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_107:::When the HTML button element with test id attribute value as "pagination-right-button" is clicked then restaurants List of the second page with selected filter should be visible:::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    const paginationRightBtn = await screen.findByTestId(
      'pagination-right-button',
    )
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(false)

    expect(paginationRightBtn).toBeInTheDocument()

    userEvent.click(paginationRightBtn)
    expect(
      await screen.findByRole('heading', {
        name: /Mr Brown/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const {restaurants} = pageTwoRestaurantsListSortByHighestResponse
    const {name, image_url, cuisine} = restaurants[2]
    const restaurantsListItems = screen.getAllByTestId('restaurant-item')

    expect(
      within(restaurantsListItems[2]).getByRole('img', {name: 'restaurant'})
        .src,
    ).toBe(image_url)

    expect(
      within(restaurantsListItems[2]).getByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const cuisineTypeElement = within(
      restaurantsListItems[2],
    ).getByText(cuisine, {exact: false})
    expect(cuisineTypeElement.tagName).toBe('P')

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_108:::When the restaurant list API in the Home Route is successful, then the restaurants list page number with test id attribute value as "active-page-number" should be increment by 1 when the HTML button element with test id="pagination-right-button":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('active-page-number').textContent).toBe('1')

    const paginationRightBtn = await screen.findByTestId(
      'pagination-right-button',
    )
    expect(paginationRightBtn).toBeInTheDocument()
    userEvent.click(paginationRightBtn)
    expect(
      await screen.findByRole('heading', {
        name: /Oyalo Pizza/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('active-page-number').textContent).toBe('2')

    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_109:::When the restaurant list API in the Home Route is successful, then the restaurants list page number with test id attribute value as "active-page-number" should be decrement by 1 when the HTML button element with test id attribute value as "pagination-left-button":::10:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('active-page-number').textContent).toBe('1')

    const paginationRightBtn = await screen.findByTestId(
      'pagination-right-button',
    )
    expect(paginationRightBtn).toBeInTheDocument()
    userEvent.click(paginationRightBtn)
    expect(
      await screen.findByRole('heading', {
        name: /Oyalo Pizza/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    expect(screen.getByTestId('active-page-number').textContent).toBe('2')

    const paginationLeftBtn = await screen.findByTestId(
      'pagination-left-button',
    )
    expect(paginationLeftBtn).toBeInTheDocument()
    userEvent.click(paginationLeftBtn)
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('active-page-number').textContent).toBe('1')
    restoreGetCookieFns()
  })

  it(':::RJSCPP63AV_TEST_110:::When the restaurant list API in the Home Route is successful, then the Restaurants List items should be displayed based on the pagination number and sort by filter:::15:::', async () => {
    mockGetCookie()
    renderWithBrowserRouter(<App />)
    await screen.findAllByAltText(/offer/i, {exact: false})
    expect(
      await screen.findByRole('heading', {
        name: /Village Traditional Foods/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    userEvent.selectOptions(screen.getByRole('combobox'), ['Highest'])
    const paginationRightBtn = await screen.findByTestId(
      'pagination-right-button',
    )
    expect(screen.getByRole('option', {name: 'Highest'}).selected).toBe(true)
    expect(screen.getByRole('option', {name: 'Lowest'}).selected).toBe(false)

    expect(paginationRightBtn).toBeInTheDocument()

    userEvent.click(paginationRightBtn)
    expect(
      await screen.findByRole('heading', {
        name: /Mr Brown/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const paginationLeftBtn = screen.getByTestId('pagination-left-button')

    userEvent.click(paginationLeftBtn)

    expect(
      await screen.findByRole('heading', {
        name: /Cafe Madarassi/i,
        exact: false,
      }),
    ).toBeInTheDocument()

    const {restaurants} = pageOneRestaurantsListSortByHighestResponse
    const {name, image_url, cuisine} = restaurants[2]
    const restaurantsListItems = screen.getAllByTestId('restaurant-item')

    expect(
      within(restaurantsListItems[2]).getByRole('img', {name: 'restaurant'})
        .src,
    ).toBe(image_url)

    expect(
      within(restaurantsListItems[2]).getByRole('heading', {
        name,
        exact: false,
      }),
    ).toBeInTheDocument()

    const cuisineTypeElement = within(
      restaurantsListItems[2],
    ).getByText(cuisine, {exact: false})
    expect(cuisineTypeElement.tagName).toBe('P')

    restoreGetCookieFns()
  })
})
