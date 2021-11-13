export const checkMail = (v) => /^[A-Za-z0-9._\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) || '請輸入email';
