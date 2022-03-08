import { map } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userApi from '../../api/apiUser';
import { selectAuthUser } from '../../redux/authSlice';
import { selectAllUser, selectMessageErr } from '../../redux/userSlice';
import './home.css';

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const listUsers = useSelector(selectAllUser)
  const userInfo = useSelector(selectAuthUser)
  const messageErr= useSelector(selectMessageErr)

  useEffect(() => {
    if(!userInfo) {
      navigate('/login');
    }else{
      userApi.getAllUser(dispatch, navigate);
    }
  }, [dispatch,navigate, userInfo])

  const handleDeleteUser = (user) => {
    userApi.deleteUser(user?._id, dispatch);
  }

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">Role: {userInfo?.admin ? 'Admin' : 'User'}</div>
      <div className="home-role">{messageErr}</div>
      <div className="home-userlist">
        {map(listUsers,(user, idx) => {
          return (
            <div key={idx} className="user-container">
              <div className="home-user">{user?.username}</div>
              <div className="delete-user" onClick={() => handleDeleteUser(user)} > Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
