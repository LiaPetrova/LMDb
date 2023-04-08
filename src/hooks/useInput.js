import { useCallback, useState } from 'react';

export const useInput = (validation) => {
    const [value, setValue] = useState('');
    const [hasTouched, setHasTouched] = useState(false);

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const onBlur = useCallback(() => {
        setHasTouched(true);
    }, []);

    const fieldReset = useCallback(() => {
        setValue('');
        setHasTouched(false);
    }, []);

    const fieldIsValid = validation(value);
    const hasError = !fieldIsValid && hasTouched;

    return {
        value,
        setValue,
        fieldIsValid,
        hasError,
        hasTouched,
        onChange,
        onBlur,
        fieldReset
    }
};
