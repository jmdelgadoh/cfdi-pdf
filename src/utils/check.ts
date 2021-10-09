export const exists = (parameter?: string): string => parameter || '';
export const existsValue = (parameter?: string): string => parameter || '0';

export const prefixImage = (imageStringBase64?: string): string => {
    if(!imageStringBase64)
        return null;
    const prefix = 'data:image/jpeg;base64,';
    if (imageStringBase64.startsWith(prefix)) return imageStringBase64;
    else return `${prefix}${imageStringBase64}`;
};
