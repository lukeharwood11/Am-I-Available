import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { initializeAuth } from './redux/thunks/auth.thunk';
import {
    selectAuthLoading,
    selectIsAuthenticated,
} from './redux/selectors/auth.selectors';
import { onAuthStateChange } from './redux/hubs/auth.hub';
import { authActions } from './redux/slices/auth.slice';
import LoadingIcon from './components/icons/LoadingIcon';

const unProtectedRoutes = ['/', '/login', '/auth/callback'];

const AuthWrapper: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const locationRef = useRef(location.pathname);
    const isLoading = useAppSelector(selectAuthLoading);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    // Keep location ref updated
    useEffect(() => {
        locationRef.current = location.pathname;
    }, [location.pathname]);

    useEffect(() => {
        // Initialize auth state from Supabase
        dispatch(initializeAuth());

        // Subscribe to auth changes
        const {
            data: { subscription },
        } = onAuthStateChange((_event, session) => {
            if (session) {
                dispatch(authActions.setSession({ session }));
            } else {
                dispatch(authActions.clearAuth());
                // Only redirect to login if we're on a protected route
                if (!unProtectedRoutes.includes(locationRef.current)) {
                    navigate('/login');
                }
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [dispatch, navigate]);

    useEffect(() => {
        // Redirect to login if not authenticated after loading is complete
        console.log('isLoading', location);
        if (
            !isLoading &&
            !isAuthenticated &&
            !unProtectedRoutes.includes(location.pathname)
        ) {
            console.log('redirecting to login...');
            navigate('/login');
        }
    }, [isLoading, isAuthenticated, navigate, location.pathname]);

    if (isLoading) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                }}
            >
                <LoadingIcon size={200} />
            </div>
        );
    }

    return <Outlet />;
};

export default AuthWrapper;
