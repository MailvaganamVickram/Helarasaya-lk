import React from 'react';
import { Link } from 'react-router-dom'; 
import category1 from '../../assets/category1.jpeg';
import category2 from '../../assets/category2.jpg';
import category3 from '../../assets/category3.jpg';
import category4 from '../../assets/category4.jpg';

const Categories = () => {
    const categories = [
        { name: "Sweets", path: 'sweets', Image: category1 },
        { name: "Drinks", path: 'drinks', Image: category2 },
        { name: "Savouries", path: 'savouries', Image: category3 },
        { name: "Food", path: 'food', Image: category4 },
    ];

    return (
        <div>
            <div className='product__grid'>
                {categories.map((category) => (
                    <div key={category.name}className="category-item">
                        <Link to={`/categories/${category.path}`} className="category-link">
                            <img src={category.Image} alt={category.name} />
                            <p>{category.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;