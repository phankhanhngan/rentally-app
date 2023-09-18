import { useSelector } from 'react-redux';

import { selectCurrentToken } from './authSlice';

const RequireAuth = () => {
	const token = useSelector(selectCurrentToken);
	return;
};
export default RequireAuth;
