import { useRouter } from 'expo-router';

export const useNavigation = () => {
    const router = useRouter();

    // Navigation functions to auth screens
    const navigateToLogin = () => router.push('/auth/login');
    const navigateToSignup = () => router.push('/auth/signup');
    const navigateToForgotPassword = () => router.push('/auth/forgot-password');

    // Navigation to main app
    const navigateToHome = () => router.replace('/tabs');

    return {
        navigateToLogin,
        navigateToSignup,
        navigateToForgotPassword,
        navigateToHome
    };
}; 