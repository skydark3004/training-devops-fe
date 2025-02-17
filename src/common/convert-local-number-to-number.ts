export const convertLocalNumberToNumber = (value: any): number => (value ? Number(value.replace(/\D/g, '')) : 0);
