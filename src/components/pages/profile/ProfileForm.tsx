import React, {FC, SyntheticEvent, useEffect, useState } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import LoadMask from '../../modal/LoadMask';
import { setAuthError, updateUserThunk } from '../../../services/slices/auth';
import { getCookie } from '../../../utils/Cookie';
import { useAuth } from '../../../services/hooks/auth';
import { useForm } from '../../../services/hooks/useForm';
import { useDispatch } from '../../../services/store';
import { Button } from '../../Button';
import styles from './Profile.module.css';
import ProfileNav from './ProfileNav';

const ProfileForm:FC = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const user = auth?.user ?? {};
    const initialData: { name: string, password: string, email: string } | { password: string } = auth.user ?
        { ...user, password: ''} : {
        name: '',
        email: '',
        password: ''
    };
    const { values, handleChange, setValues } = useForm(initialData);

    useEffect(() => {
        setValues(initialData);
    }, [auth.user]);

    const handleCancel = (e:SyntheticEvent) => {
        e.preventDefault();
        setValues({ ...user, password: ''});
    };

    const handleSubmit = async (e:SyntheticEvent) => {
        e.preventDefault();

        let accessToken = getCookie('accessToken');

        if (!accessToken) {
            const refresh = await auth.refresh();

            // refresh access token if token was expired
            accessToken = refresh.accessToken;
        }

        // if never we can't get access token
        if (!accessToken) {
            dispatch(setAuthError('Incorrect access token'));
            return;
        }

        dispatch(updateUserThunk({
            token: accessToken,
            body: {...values}
        }));
    };

    return (
        <div className={`container ${styles.container}`}>
            <ProfileNav active={'/profile'} />
            <div className={`${styles.content} overflow-auto custom-scroll`}>
                <form onSubmit={handleSubmit}>
                    {auth.request &&
                        <LoadMask/>
                    }
                    { auth.failed &&
                        <div className={'mb-6 text-error'}>{auth.message}</div>
                    }
                    <div className={'form-field mb-6'}>
                        <Input
                            value={values.name}
                            placeholder={'Имя'}
                            onChange={handleChange}
                            name={'name'}
                        />
                    </div>
                    <div className={'form-field mb-6'}>
                        <EmailInput
                            value={values.email}
                            onChange={handleChange}
                            name={'email'}
                        />
                    </div>
                    <div className={`form-field mb-20`}>
                        <PasswordInput
                            value={values.password}
                            name={'password'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={'mb-20'}>
                        <Button type="primary" size="large" onClick={handleSubmit}>
                            Сохранить
                        </Button>
                        <span className={'mr-4'}></span>
                        <Button type="primary" size="large" onClick={handleCancel}>
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;