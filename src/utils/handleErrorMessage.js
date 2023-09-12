const DEFAULT_MESSAGE = 'Có lỗi xảy ra. Vui lòng kỹ thuật để hỗ trợ'

export const handleLoginFailed = message => {
    switch (message) {
        case 'Password does not match.':
            return 'Mật khẩu không đúng'
        case 'The provided email is not registered.':
            return 'Email chưa được đăng ký'
        default:
            return DEFAULT_MESSAGE
    }
}

export const handleRegisterFailed = message => {
    switch (message) {
        case 'Email address has invalid format':
            return 'Địa chỉ email không đúng định dạng'
        case 'User already exists':
            return 'Email đã được sử dụng'
        default:
            return DEFAULT_MESSAGE
    }
}

export const handleResetPasswordFailed = message => {
    switch (message) {
        case 'The entered code is not correct. Please make sure to enter the code in the requested time interval.':
            return 'Code không chính xác hoặc đã hết hạn'
        case 'User already exists':
            return 'Email đã được sử dụng'
        default:
            return DEFAULT_MESSAGE
    }
}

export const handleGetCodeFailed = message => {
    switch (message) {
        case 'The provided email address is not registered!':
            return 'Email chưa được đăng ký'
        default:
            return DEFAULT_MESSAGE
    }
}
