export const passwordCheck = (rule, value) => {
    if (value && !/\d/.test(value)) {
        return Promise.reject('Mật khẩu có ít nhất 1 số')
    } else if (value && !/[A-Z]{1}/.test(value)) {
        return Promise.reject('Mật khẩu có ít nhất 1 chữ in hoa')
    } else if (value && !/[^A-Za-z0-9]/.test(value)) {
        return Promise.reject('Mật khẩu có ít nhất 1 kí tự đặc biệt')
    } else if (value && !/[a-z]{1}/.test(value)) {
        return Promise.reject('Mật khẩu phải bao gồm cả chữ thường')
    } else {
        return Promise.resolve()
    }
}
