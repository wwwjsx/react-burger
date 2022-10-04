import React, { FC, SyntheticEvent } from 'react';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useAuth } from '../../../services/auth';
import LoadMask from '../../modal/LoadMask';
import { useForm } from '../../../services/hooks/useForm';
import { LocationState } from '../../../utils/type';
import { Button }  from '../../Button';

const Login:FC = () => {
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const location = useLocation();
    const auth = useAuth();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        auth.signIn(values);
    };

    // if user already logged in
    if (auth.isLogged) {
        const state = location.state as LocationState || {};
        const from = state.from || '/';

        return <Redirect to={{ pathname: from, state: state }} />;
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
                            value={values.email}
                            name={'email'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`form-field mb-6`}>
                        <PasswordInput
                            value={values.password}
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