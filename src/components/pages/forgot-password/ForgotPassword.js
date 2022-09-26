import React, { useState } from 'react';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoadMask from '../../modal/LoadMask';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { forgotPasswordThunk, setAuthError } from '../../../services/slices/auth';

const ForgotPassword = () => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth );
    const [formData, setFormData] = useState({
        email: ''
    });

    console.log('LOCATION:', location);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate e-mail address
        if (!formData.email) {
            dispatch(setAuthError('E-mail address is empty'));
            return;
        }

        dispatch(forgotPasswordThunk(formData)).then((res) => {
            // if success done, should redirect to reset-password
            if (res && res.payload && res.payload.success) {
                history.replace({
                    pathname: '/reset-password',
                    state: {
                        from: 'forgot-password'
                    }
                });
            }
        });
    };

    return (
        <div className={`container form-wrapper`}>
            <div className={'form-box'}>
                <form onSubmit={handleSubmit}>
                    <div className="text-center text text_type_main-medium mb-6">
                        Восстановления пароля
                    </div>
                    { auth.request && <LoadMask />}
                    { auth.failed &&
                        <div className={'mb-6 text-center text-error'}>{auth.message}</div>
                    }
                    <div className={`form-field mb-6`}>
                        <EmailInput
                            value={formData.email}
                            name={'email'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'text-center mb-20'}>
                        <Button type="primary" size="large">
                            Восстановить
                        </Button>
                    </div>
                    <div className={'text-center text text_type_main-default text_color_inactive'}>
                        Вспомнили пароль? <Link to={'/login'} className={'default-link'}>Войти</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;