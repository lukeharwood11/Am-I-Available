import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/button/Button';
import { ErrorMessage } from '../../components/error-message';
import { GoogleIcon, Icon, Logo } from '../../components/icons';
import styles from './login.page.module.css';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'email profile openid https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar'
                }
            });
            if (error) throw error;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during Google login');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.header}>
                    <Icon size={40} />
                    <h1>Welcome Back!</h1>
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Button 
                    onClick={handleGoogleLogin}
                    variant="secondary-subtle"
                    fullWidth
                    disabled={loading}
                    leftIcon={<GoogleIcon size={18} />}
                >
                    Sign in with Google
                </Button>

                <p className={styles.signupLink}>
                    Don't have an account? <Link to="/signup">Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;