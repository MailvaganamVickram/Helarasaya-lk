import React, { useEffect, useState } from 'react';
import products from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: ['all', 'sweets', 'drinks', 'savouries', 'food'],
  colors: ['pink', 'brown', 'yellow', 'green'],
  price: [
    { label: 'Under LKR 50.00', min: 0, max: 50 },
    { label: 'LKR 50.00 - LKR 100.00', min: 51, max: 100 },
    { label: 'LKR 100.00 - LKR 200.00', min: 101, max: 200 },
    { label: 'Over LKR 200.00', min: 201, max: Infinity },
  ],
};

const ShopPage = () => {
  
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
    
  });
  
  

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange  &&  priceRange.includes('-') ? priceRange.split('-').map(Number)    : [0, Infinity];
  console.log(priceRange);
  //const [minPrice, maxPrice] = priceRange.split('-').map(Number);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
      category: category !== 'all' ? category : '',
      color: color !== 'all' ? color : '',
      minPrice: isNaN(minPrice) ? '' : minPrice,
      maxPrice: isNaN(maxPrice) ? '' : maxPrice,
      page: currentPage,
      limit: ProductsPerPage,
  })


//Clear Filters
  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: ''
    });
    //setProducts(productData); // Reset products to initial data when filters are cleared
  };

     // handle paginations here
     const handlePageChange = (pageNumber) => {
      if(pageNumber > 0 && pageNumber <= totalPages) {
          setCurrentPage(pageNumber)
      }
  }

  if (isLoading) return <div>Loading....</div>
  if (error) return <div>Error loading products.</div>

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header uppercase">Shop Page</h2>
        <p className="section__subheader">Discover the hottest picks for you.</p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Left side - Filters */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Right side - Products */}
          <div>
            <h3 className="text-xl font-medium mb-4">Showing {startProduct} to {endProduct} of {totalProducts}</h3>
            {/* <ProductCards products={products} /> */}
            <ProductCards products={products} />
            {/* pagination controls */}
            <div className='mt-6 flex justify-center'>
              <button
              disabled ={currentPage === 1} 
              onClick={()=>handlePageChange(currentPage - 1)}
              className="pagination-button">Previous</button>
              {
                                [...Array(totalPages)].map((_, index) => (
                                    <button key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}
                                        rounded-md mx-1
                                        `}
                                    >{index + 1}</button>
                                ))
                            }
              <button 
              disabled={currentPage === totalPages}
               onClick={() => handlePageChange(currentPage + 1)}
              className="pagination-button" >Next</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
