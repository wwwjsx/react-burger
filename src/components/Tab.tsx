import React from 'react';
import { Tab as TabUI } from '@ya.praktikum/react-developer-burger-ui-components';

export type TTab = React.FC<{
    active: boolean;
    value: string;
    onClick: (value:string) => void;
    children: string;
}>

export const Tab: TTab = TabUI;
