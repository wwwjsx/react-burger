import React, { useState } from 'react';
import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect} from 'react-router-dom';
import LoadMask from '../../modal/LoadMask';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../../services/slices/auth';
import {useAuth} from "../../../services/auth";

const Register = () => {
    const dispatch = useDispatch();
    const auth = useAuth();

    const [formData, setFormData] = useState({
        name: '',
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
        dispatch(registerThunk(formData));
    };

    // if user already logged in
    if (auth.isLogged) {
        return <Redirect to={'/'} />;
    }

    return (
        <div className={`container form-wrapper`}>
            {auth.request && <LoadMask />}
            <form onSubmit={handleSubmit}>
                <div className={'form-box'}>
                    <div className="text-center text text_type_main-medium mb-6">
                        Регистрация
                    </div>
                    { auth.failed &&
                        <div className={'mb-6 text-center text-error'}>{auth.message}</div>
                    }
                    <div className={`form-field mb-6`}>
                        <Input
                            value={formData.name}
                            name={'name'}
                            placeholder={'Имя'}
                            onChange={handleChange}
                        />
                    </div>
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
                            error={false}
                            disabled={false}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'text-center mb-20'}>
                        <Button type="primary" size="large">
                            Зарегистрироватся
                        </Button>
                    </div>
                    <div className={'text-center text text_type_main-default text_color_inactive'}>
                        Уже зарегистрированы? <Link to={'/login'} className={'default-link'}>Войти</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;