import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RatingStars from '../../components/RatingStars'; 
import { addToCart } from '../../redux/features/cart/cartSlice';

const ProductCards = ({ products }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (products) => {
        dispatch(addToCart(products))
    }

    return (
        <div className='section__container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {products.map((product, index) => (
                <div key={index} className="product__card">
                    <div className="relative">
                        {/* Image and Link */}
                        <Link to={`/shop/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.name || 'Product'}
                                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </Link>

                        {/* Add to Cart Button */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={(e) =>{
                                e.stopPropagation();
                                handleAddToCart(product)
                            }} className="bg-primary p-2 rounded-full text-white hover:bg-primary-dark">
                                <i className="ri-shopping-cart-2-line"></i>
                            </button>
                        </div>
                    </div>
                    {/* Product description */} 
                    <div className="product__card__content">
                        <h4>{product.name}</h4>
                        <p>${product.price} {product.oldPrice ? <s>${product?.oldPrice}</s> : null}</p>
                        {/* Pass the correct prop name 'rating' */}
                        <RatingStars rating={product.rating} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCards;