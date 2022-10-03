import {SyntheticEvent, useState} from 'react';

export function useForm(inputValues: any) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: SyntheticEvent) => {
        const el = event.target as HTMLInputElement;
        const { value, name } = el;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}