import React,{useState} from 'react'
import { useUpdateUerRoleMutation } from '../../../../redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [updateUerRole] = useUpdateUerRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUerRole({ userId: user?._id, role }).unwrap();
            alert('Updated role successfully!')
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
        }
    }

  return (
<div className="modal-overlay">
    <div className="modal-container">
        <h2 className="modal-title">Edit User Role</h2>

        <div className="form-group">
            <label className="form-label">Email</label>
            <input
                type="email"
                value={user?.email}
                readOnly
                className="form-input read-only"
            />
        </div>

        <div className="form-group">
            <label className="form-label">Role</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>

        <div className="action-buttons">
            <button onClick={onClose} className="button cancel-button">
                Cancel
            </button>
            <button onClick={handleUpdateRole} className="button save-button">
                Save
            </button>
        </div>
    </div>
</div>

  )
}

export default UpdateUserModal
