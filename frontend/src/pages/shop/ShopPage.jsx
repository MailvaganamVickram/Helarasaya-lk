import React, { useEffect, useState } from 'react';
import productData from '../../data/products.json';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';

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
  const [products, setProducts] = useState(productData);
  const [filtersState, setFiltersState] = useState({
    category: 'all',
    color: 'all',
    priceRange: null,
  });

  // Filter function
  const applyFilters = () => {
    let filteredProducts = productData;

    // Filter by category
    if (filtersState.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // Filter by color
    if (filtersState.color !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filtersState.color
      );
    }

    // Filter by price range
    if (filtersState.priceRange) {
      const { min, max } = filtersState.priceRange;
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setProducts(filteredProducts);
  };

  // Run filters on filterState change
  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  // Clear filters
  const clearFilters = () => {
    setFiltersState({
      category: 'all',
      color: 'all',
      priceRange: null,
    });
    setProducts(productData); // Reset products to initial data when filters are cleared
  };

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
            <h3 className="text-xl font-medium mb-4">Products Available</h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
