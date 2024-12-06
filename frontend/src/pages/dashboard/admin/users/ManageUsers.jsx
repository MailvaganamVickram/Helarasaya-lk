import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../../redux/features/auth/authApi'
import UpdateUserModal from './UpdateUserModal'

const ManageUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null)
    const { data: users = [], error, isLoading, refetch } = useGetUserQuery();

    console.log(users)

    const [deleteUser] =useDeleteUserMutation();
    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id).unwrap();
            alert("User deleted successfully!")
            refetch();

        } catch (error) {
            console.error("Failed to delete user", error);
        }
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedUser(null)
    }
  return (
    <>
    {
        isLoading && <div>Loading...</div>

    }
    {
        error && <div>Error loading users data.</div>
    }
       <section className="section-users">
            <div className="users-container">
                <div className="users-card">
                    <div className="users-card-header">
                        <div className="users-header-content">
                            <div className="users-title-container">
                                <h3 className="users-title">All Users</h3>
                            </div>
                            <div className="users-actions">
                                <button
                                    className="users-action-button"
                                    type="button"
                                >
                                    See all
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th className="table-header">No.</th>
                                    <th className="table-header">User email</th>
                                    <th className="table-header">User role</th>
                                    <th className="table-header">Edit or manage</th>
                                    <th className="table-header">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users &&
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="table-cell">{index + 1}</td>
                                            <td className="table-cell">{user?.email || 'N/A'}</td>
                                            <td className="table-cell">
                                                <span
                                                    className={`user-role-badge ${
                                                        user?.role === 'admin'
                                                            ? 'admin'
                                                            : 'other'
                                                    }`}
                                                >
                                                    {user?.role}
                                                </span>
                                            </td>
                                            <td className="table-cell">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="edit-button"
                                                >
                                                    <i className="ri-edit-2-line"></i> Edit
                                                </button>
                                            </td>
                                            <td className="table-cell">
                                                <button
                                                    onClick={() => handleDelete(user?._id)}
                                                    className="delete-button"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <footer className="users-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-text-container">
                            <div className="footer-text">
                                Made with{' '}
                                <a
                                    href="https://www.creative-tim.com/product/notus-js"
                                    className="footer-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Notus JS
                                </a>{' '}
                                by{' '}
                                <a
                                    href="https://www.creative-tim.com"
                                    className="footer-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Creative Tim
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>

    {
        isModalOpen && <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />
    }
</>
  )
}

export default ManageUsers
