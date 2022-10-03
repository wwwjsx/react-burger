import React, {FC, SyntheticEvent } from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import LoadMask from '../../modal/LoadMask';
import { useDispatch} from '../../../services/store';
import { registerThunk } from '../../../services/slices/auth';
import { useAuth } from '../../../services/auth';
import { useForm } from '../../../services/hooks/useForm';
import { Button } from '../../Button';

const Register:FC = () => {
    const dispatch = useDispatch();
    const auth = useAuth();

    const {values, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerThunk(values));
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
                            value={values.name}
                            name={'name'}
                            placeholder={'Имя'}
                            onChange={handleChange}
                        />
                    </div>
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