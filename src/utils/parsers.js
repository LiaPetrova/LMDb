
export const useParsers = (() => {
    const durationParser = (time) => {
        const minute = 1;
        const hour = 60 * minute;

        if (time / hour >= 1) {
            return `${Math.floor(time / hour)}h ${time % hour}m`;
        } else {
            return `${time % hour}m`;
        }
    };

    const textShortener = (text) => {
        let x = window.innerWidth || document.documentElement.clientWidth;
        if (x <= 434) {

            if (text.length > 122) {
                return `${text.slice(0, 121)}...`
            } else {
                return text;
            }
            
            
        } else if (x <= 852) {

            if (text.length > 170) {
                return `${text.slice(0, 168)}...`
            } else {
                return text;
            }
        } else if (x <= 1024) {
            if (text.length > 250) {
                return `${text.slice(0, 249)}...`
            } else {
                return text;
            }
        } else {
            if (text.length > 367) {
                return `${text.slice(0, 366)}...`
            } else {
                return text;
            }
        }
    };

    const yearParser = (number) => {
        if (number.toString().length === 4) {
            return number;
        } else {
            return `(${number.toString().slice(0, 4)} - ${number.toString().slice(4)})`;
        }
    };

    return {
        durationParser,
        textShortener,
        yearParser
    }
});


