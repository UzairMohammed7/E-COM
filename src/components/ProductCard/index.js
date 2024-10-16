import {Link} from 'react-router-dom'
import { MdOutlineStar } from "react-icons/md";

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container bg-gradient-to-r from-blue-600 to-emerald-600">
            <p className="rating">{rating}</p>
            <MdOutlineStar color='white' size={20} />
          </div>
        </div>
      </Link>
    </li>
  )
}
export default ProductCard
