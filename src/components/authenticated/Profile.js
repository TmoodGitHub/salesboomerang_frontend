import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import ProfileCard from './ProfileCard';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/login';

  useEffect(() => {
    if (!currentUser) {
      navigate(from, { replace: true });
    }
  }, [currentUser]);

  return <>{currentUser && <ProfileCard currentUser={currentUser} />}</>;
};

export default Profile;
