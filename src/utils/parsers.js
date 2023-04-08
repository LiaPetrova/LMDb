import { useCallback } from "react";

// export const useParsers = () => {
//     const durationParser = useCallback((time) => {
//         const minute = 1;
//         const hour = 60 * minute;
    
//         if(time / hour >= 1) {
//             return `${Math.floor(time/hour)}h ${time%hour}m`;
//         } else {
//             return `${time%hour}m`;
//         }
//     }, []);
    
//     const textShortener = useCallback((text) => {
//         if(text.length > 367) {
//             return `${text.slice(0, 366)}...`
//         } else {
//             return text;
//         }
//     }, []);
    
//     const yearParser = useCallback((number) => {
//         if(number.toString().length === 4) {
//             return number;
//         } else {
//             return `(${number.toString().slice(0, 4)} - ${number.toString().slice(4)})`;
//         }
//     }, []);

//     return {
//         durationParser,
//         textShortener,
//         yearParser
//     }
// };

export const useParsers = (() => {
    const durationParser = (time) => {
                const minute = 1;
                const hour = 60 * minute;
            
                if(time / hour >= 1) {
                    return `${Math.floor(time/hour)}h ${time%hour}m`;
                } else {
                    return `${time%hour}m`;
                }
            };
            
            const textShortener = (text) => {
                if(text.length > 367) {
                    return `${text.slice(0, 366)}...`
                } else {
                    return text;
                }
            };
            
            const yearParser = (number) => {
                if(number.toString().length === 4) {
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


