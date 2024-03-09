import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../layouts/Utils/SpinnerLoading';
import OktaSignInWidget from './OktaSignInWidget.jsx';

const LoginWidget = ({ config }) => {
    // oktaAuth: Đối tượng cung cấp các phương thức để tương tác với Okta
    // authState: Trạng thái hiện tại của việc xác thực người dùng,
    // bao gồm thông tin như người dùng đã được xác thực hay chưa.
    const { oktaAuth, authState } = useOktaAuth();
    const onSuccess = (tokens) => {
        // Hàm được sử dụng để xử lý việc đăng nhập thành công và chuyển hướng người dùng.
        oktaAuth.handleLoginRedirect(tokens);
    };
 
    const onError = (err) => {
        console.log('Sign in error: ', err);
    }

    if (!authState) {
        return (
            <SpinnerLoading/>
        );
    }

    return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/>
    :
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError}/>;
};

export default LoginWidget;