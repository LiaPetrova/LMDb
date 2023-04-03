import { useState } from 'react';

export const useChange = (change) => {
    const [value, setValue] = useState(change);

    const onChange = (e) => {
        setValue(e.target.value);
    }



    return {
        value,
        setValue,
        onChange,
    }
};
