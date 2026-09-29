export const normalizePhone = (input: string): string => input.replace(/\D/g, '');

export const phoneToChatId = (phone: string): string => `${normalizePhone(phone)}@c.us`;

export const chatIdToPhone = (chatId: string): string => chatId.replace('@c.us', '');

export const isValidPhone = (input: string): boolean => /^\d{10,15}$/.test(normalizePhone(input));
