import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className="space-y-5 flex-shrink-0 flex flex-col">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className='flex flex-col space-y-2'>
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category}>
            <input
              className="capitalized cursor-pointer"
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* Color Filter */}
      <div>
        <h4 className="font-medium text-lg">Color</h4>
        <hr />
        {filters.colors.map((color) => (
          <label key={color}>
            <input
              className="capitalized cursor-pointer"
              type="radio"
              name="color"
              value={color}
              checked={filtersState.color === color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.price.map((priceRange) => (
          <label key={priceRange.label}>
            <input
              className="cursor-pointer"
              type="radio"
              name="priceRange"
              value={`${priceRange.label}-${priceRange.max}`}
              checked={filtersState.priceRange?.label === priceRange.label} // Fix comparison
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: priceRange })
              }
            />
            <span className="ml-1">{priceRange.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters Button */}
      <div>
        <button
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ShopFiltering;
