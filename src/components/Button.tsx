import { Button as ButtonUI } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { SyntheticEvent } from 'react';

export type TButton = React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
}>

export const Button: TButton = ButtonUI;
