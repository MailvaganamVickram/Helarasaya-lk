import React, { useState } from 'react'
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../redux/features/products/productsApi';

import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utils/formateDate';

const ManageProduct = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12)

    const { data: { products = [], totalPages, totalProducts } = {}, isLoading, error, refetch } = useFetchAllProductsQuery({
        category: '',
        color: '',
        minPrice: '',
        maxPrice: '',
        page: currentPage,
        limit: productsPerPage,
    })
    // pagination
    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

   // const [deleteProduct] = useDeleteProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const handleDeleteProduct = async (id) => {
        try {
            const response = await deleteProduct(id).unwrap();
            alert("Product deleted successfully")
            await refetch()

        } catch (error) {
            console.error("Error deleting product", error)
        }
    }

  return (
    <>
    {
        isLoading && <div>Loading...</div>

    }
    {
        error && <div>Error loading products.</div>
    }
   <section className="manage-product-section">
    <div className="manage-product-container">
        <div className="manage-product-card">
            <div className="manage-product-header">
                <div className="manage-product-title">
                    <h3 className="manage-product-heading">All Products</h3>
                </div>
                <div className="manage-product-actions">
                    <button className="manage-product-button" type="button">See all</button>
                </div>
            </div>
            <h3 className="manage-product-summary">Showing {startProduct} to {endProduct} of {totalProducts} products</h3>

            <div className="manage-product-table-container">
                <table className="manage-product-table">
                    <thead>
                        <tr>
                            <th className="manage-product-th">No.</th>
                            <th className="manage-product-th">Product Name</th>
                            <th className="manage-product-th">Publishing date</th>
                            <th className="manage-product-th">Edit or manage</th>
                            <th className="manage-product-th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map((product, index) => (
                            <tr key={index}>
                                <td className="manage-product-td">{index + 1}</td>
                                <td className="manage-product-td">{product?.name}</td>
                                <td className="manage-product-td">{formatDate(product?.createdAt)}</td>
                                <td className="manage-product-td manage-product-edit">
                                    <Link to={`/dashboard/update-product/${product._id}`}>Edit</Link>
                                </td>
                                <td className="manage-product-td">
                                    <button
                                        onClick={() => handleDeleteProduct(product._id)}
                                        className="manage-product-delete-button">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div className="manage-product-pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="manage-product-pagination-button">Previous</button>
        {[...Array(totalPages)].map((_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`manage-product-pagination-button ${currentPage === index + 1 ? 'manage-product-pagination-active' : ''}`}>
                {index + 1}
            </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="manage-product-pagination-button">Next</button>
    </div>

    <footer className="manage-product-footer">
        <div className="manage-product-footer-container">
            <div className="manage-product-footer-text">
                Made with <a href="https://www.creative-tim.com/product/notus-js" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" target="_blank">Creative Tim</a>.
            </div>
        </div>
    </footer>
</section>
</>
  )
}

export default ManageProduct
