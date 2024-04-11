const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml', 'image/gif'];

export const isValidFileType = (file: File) => allowedFileTypes.includes(file.type);
