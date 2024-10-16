import {Component} from 'react'
import {Link, useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Circles} from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import { MdOutlineStar } from "react-icons/md";

import CartContext from '../../context/CartContext'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// This is the wrapper to inject params into the class component
function withRouter(Component) {
  return function WrappedComponent(props) {
    const params = useParams()
    return <Component {...props} params={params} />
  }
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductData = async () => {
    const {id} = this.props.params // Access 'id' from params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachSimilarProduct => this.getFormattedData(eachSimilarProduct),
      )
      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Circles type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {value => {
        const {productData, quantity, similarProductsData} = this.state
        const {
          availability,
          brand,
          description,
          imageUrl,
          price,
          rating,
          title,
          totalReviews,
        } = productData
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...productData, quantity})
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container bg-gradient-to-r from-blue-600 to-emerald-500 ">
                    <p className="rating">{rating}</p>
                    <MdOutlineStar color='white' size={20} />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    data-testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn bg-gradient-to-r from-blue-600 to-emerald-500 "
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {similarProductsData.map(eachSimilarProduct => (
                <SimilarProductItem
                  productDetails={eachSimilarProduct}
                  key={eachSimilarProduct.id}
                />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default withRouter(ProductItemDetails)
