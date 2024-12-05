
import React,  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';

import avatarImg from '../../../assets/avatar.png'
import { setUser } from '../../../redux/features/auth/authSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [editProfile, { isLoading, isError, error, isSuccess }] = useEditProfileMutation();
    const [formData, setformData] = useState({
        username: '',
        profileImage: '',
        bio: '',
        profession: '',
        userId: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        if(user) {
           setformData({
            username: user?.username || '',
            profileImage: user?.profileImage || '',
            bio: user?.bio || '',
            profession: user?.profession || '',
            userId: user?._id || ''
           })
        }
    }, [user])

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const updatedUser = {
            username: formData.username,
            profileImage: formData.profileImage,
            bio: formData.bio,
            profession: formData.profession,
            userId: formData.userId
        }
        try {
            const response = await editProfile(updatedUser).unwrap();
            console.log(response)
            //dispatch(setUser(response.user));
            dispatch(setUser(response.user))
            localStorage.setItem('user', JSON.stringify(response.user))
            alert('Profile updated successfully!');
        } catch (error) {
          console.error("Failed to update profile", error)  ;
          alert("Failed to update profile. Please try again")
        }

        setIsModalOpen(false)
    }


  return (
<div className='profile-container'>
    <div className='profile-card'>
        <div className='profile-header'>
            <img src={formData?.profileImage || avatarImg} alt="Profile" className='profile-image' />
            <div className='profile-info'>
                <h3> {formData?.username || 'N/A'}</h3>
                <p>User Bio: {formData.bio || 'N/A'}</p>
                <p>Profession: {formData.profession || 'N/A'}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className='edit-button'>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3H4a1 1 0 00-1 1v14a1 1 0 001 1h7m2 0h7a1 1 0 001-1V4a1 1 0 00-1-1h-7m-2 0v14"></path>
                </svg>
            </button>
        </div>
    </div>

    {/* Modal */}
    {isModalOpen && (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button onClick={() => setIsModalOpen(false)} className='modal-close-button'>
                    <i className="ri-close-line"></i>
                </button>
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className='modal-form'>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name='username' value={formData?.username} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="profileImage">Profile Image Url</label>
                        <input type="text" name='profileImage' value={formData?.profileImage} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="bio">Write Your Bio</label>
                        <textarea name="bio" value={formData?.bio} onChange={handleChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="profession">Profession</label>
                        <input type="text" name='profession' value={formData?.profession} onChange={handleChange} required />
                    </div>
                    <button type='submit' disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</button>
                    {isError && <p className='error-message'>Failed to update profile. Please try again.</p>}
                    {isSuccess && <p className='success-message'>Profile updated successfully!</p>}
                </form>
            </div>
        </div>
    )}
</div>

  )
}

export default UserProfile
