import { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from '../lib/oktaConfig';

const OktaSignInWidget = ({ onSuccess, onError }) => {
    // Biến widgetRef tham chiếu đến phần tử DOM chứa biểu mẫu
    const widgetRef = useRef();

    useEffect(() => {
        // Check DOM exist
        if (!widgetRef.current) {
            return false;
        }

        // Biến widget chứa các phương thức và thuộc tính 
        // để quản lý việc xác thực thông qua Okta
        const widget = new OktaSignIn(oktaConfig);

        // Hiển thị biểu mẫu đăng nhập và lấy các token cần thiết cho việc xác thực
        widget.showSignInToGetTokens({
            el: widgetRef.current,
        }).then(onSuccess).catch(onError);

        // Khi thành phần chứa biểu mẫu đăng nhập Okta bị gỡ bỏ khỏi DOM,
        // hàm này sẽ được gọi và sẽ gỡ bỏ biểu mẫu đăng nhập Okta.
        return () => widget.remove();
    }, [onSuccess, onError]);

    return (
        <div className='container mt-5 mb-5'>
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget