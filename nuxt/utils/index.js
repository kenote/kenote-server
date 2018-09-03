export const isNull = value => String(value || '').length === 0 && value !== 0

export const getUrl = (value, dir = 'uploadfile') => value.replace(/^\@/, '/uploadfile/')