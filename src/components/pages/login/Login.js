import React, { useState } from 'react';
import { EmailInput, PasswordInput,  Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory} from 'react-router-dom';
import { useAuth } from '../../../services/auth';
import LoadMask from '../../modal/LoadMask';

const Login = () => {
    const history = useHistory();
    const auth = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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

        auth.signIn(formData).then((res) => {
            if (res.payload && res.payload.success) {
                history.push({
                    pathname: '/profile'
                });
            }
        });
    };

    // if user already logged in
    if (auth.isLogged) {
        return <Redirect to={'/'} />;
    }

    return (
        <div className={`container form-wrapper`}>
            <div className={'form-box'}>
                <form onSubmit={handleSubmit}>
                    <div className="text-center text text_type_main-medium mb-6">
                        Вход
                    </div>
                    { auth.request && <LoadMask/> }
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
                    <div className={`form-field mb-6`}>
                        <PasswordInput
                            value={formData.password}
                            name={'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'text-center mb-20'}>
                        <Button type="primary" size="large">
                            Войти
                        </Button>
                    </div>
                    <div className={'text-center text text_type_main-default text_color_inactive mb-4'}>
                        Вы - новый пользователь? <Link to={'/register'} className={'default-link'}>Зарегистрироватся</Link>
                    </div>

                    <div className={'text-center text text_type_main-default text_color_inactive'}>
                        Забыли пароль? <Link to={'/forgot-password'} className={'default-link'}>Восстановить пароль</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;