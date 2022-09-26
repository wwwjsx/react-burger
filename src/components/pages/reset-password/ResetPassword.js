import React, { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LoadMask from "../../modal/LoadMask";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from "../../../services/slices/auth";
import {useHistory} from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(store => store.auth );
    const [formData, setFormData] = useState({
        password: '',
        token: ''
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

        dispatch(resetPasswordThunk(formData)).then((res) => {
            if (res && res.payload && res.payload.success) {
                history.push({
                    pathname: '/login'
                });
            }
        });
    };

    return (
        <div className={`container form-wrapper`}>
            {auth.request && <LoadMask/>}
            <div className={'form-box'}>
                <form onSubmit={handleSubmit}>
                    <div className="text-center text text_type_main-medium mb-6">
                        Восстановления пароля
                    </div>
                    { auth.failed &&
                        <div className={'mb-6 text-center text-error'}>{auth.message}</div>
                    }
                    <div className={`form-field mb-6`}>
                        <Input
                            type={'password'}
                            value={formData.password}
                            placeholder={'Введите новый пароль'}
                            name={'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`form-field mb-6`}>
                        <Input
                            type={'text'}
                            value={formData.token}
                            placeholder={'Введите код из письма'}
                            name={'token'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'text-center mb-20'}>
                        <Button type="primary" size="large">
                            Сохранить
                        </Button>
                    </div>
                    <div className={'text-center text text_type_main-default text_color_inactive'}>
                        Вспомнили пароль? <a href={''} className={'default-link'}>Войти</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;