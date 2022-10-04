import React, { FC, SyntheticEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import LoadMask from '../../modal/LoadMask';
import { resetPasswordThunk } from '../../../services/slices/auth';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../../services/auth';
import { useDispatch } from '../../../services/store';
import { useForm } from '../../../services/hooks/useForm';
import { Button } from '../../Button';
import { LocationState } from '../../../utils/type';

const ResetPassword:FC = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useAuth();
    const { values, handleChange } = useForm({
        password: '',
        token: ''
    });

    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();

        dispatch(resetPasswordThunk(values)).then((res) => {
            if (res && res.payload && res.payload.success) {
                history.push({
                    pathname: '/login'
                });
            }
        });
    };

    // reset password will redirect to main if we didn't came from forgot-password
    const state = location.state as LocationState;
    const from = state.from;

    // if user already logged in
    if (auth.isLogged || from !== 'forgot-password') {
        return <Redirect to={'/'} />;
    }

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
                            value={values.password}
                            placeholder={'Введите новый пароль'}
                            name={'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`form-field mb-6`}>
                        <Input
                            type={'text'}
                            value={values.token}
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