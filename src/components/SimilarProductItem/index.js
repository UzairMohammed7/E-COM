import { MdOutlineStar } from 'react-icons/md'
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {title, brand, imageUrl, rating, price} = productDetails

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        className="similar-product-img"
        alt={`similar product ${title}`}
      />
      <p className="similar-product-title">{title}</p>
      <p className="similar-products-brand">by {brand}</p>
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-product-rating-container bg-gradient-to-r from-blue-600 to-emerald-500 ">
          <p className="similar-product-rating">{rating}</p>
          <MdOutlineStar color="white" />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
