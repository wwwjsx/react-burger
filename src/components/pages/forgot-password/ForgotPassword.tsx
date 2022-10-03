import React, { FC, SyntheticEvent, useState } from 'react';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../../Button';
import LoadMask from '../../modal/LoadMask';
import { Link, useHistory } from 'react-router-dom';
import { forgotPasswordThunk, setAuthError } from '../../../services/slices/auth';
import { useDispatch, useSelector } from '../../../services/store';
import {useForm} from "../../../services/hooks/useForm";

const ForgotPassword:FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth );
    const {values, handleChange} = useForm({
        email: ''
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // validate e-mail address
        if (!values.email) {
            dispatch(setAuthError('E-mail address is empty'));
            return;
        }

        dispatch(forgotPasswordThunk(values)).then((res) => {
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
                            value={values.email}
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