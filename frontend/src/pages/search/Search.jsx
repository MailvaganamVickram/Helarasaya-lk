import React, { useState } from 'react';
import productsData from '../../data/products.json';
import ProductCards from '../shop/ProductCards';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
  };

  // handleSearch on searchQuery change or button click
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header uppercase">Search Products here</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from local sweets to drinks.
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            className="search__bar w-full max-w-4xl p-2 border rounded"
            placeholder="search for products"
          />
          <button
            onClick={handleSearch}
            className="search__button w-full md:w-auto py-2 bg-primary"
          >
            Search
          </button>
        </div>

        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;