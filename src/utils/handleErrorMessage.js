import { ModalWarning } from "../components/ModalWarning.js";
import router from '../router.js'

const DEFAULT_MESSAGE = 'Có lỗi xảy ra. Vui lòng kỹ thuật để hỗ trợ'

export const handleLoginFailed = (message, locale) => {
	if (locale === 'vi') {
		switch (message) {
			case 'Password does not match.':
				return 'Mật khẩu không đúng';
			case 'The provided email is not registered.':
				return 'Email chưa được đăng ký';
			default:
				return DEFAULT_MESSAGE;
		}
	} else {
		return message
	}
}

export const handleRegisterFailed = (message, locale) => {
	if (locale === 'vi') {
		switch (message) {
			case 'Email address has invalid format':
				return 'Địa chỉ email không đúng định dạng';
			case 'User already exists':
				return 'Email đã được sử dụng';
			default:
				return DEFAULT_MESSAGE;
		}
	} else {
		return message;
	}
}

export const handleResetPasswordFailed = (message, locale) => {
	if (locale === 'vi') {
		switch (message) {
			case 'The entered code is not correct. Please make sure to enter the code in the requested time interval.':
				return 'Code không chính xác hoặc đã hết hạn';
			case 'User already exists':
				return 'Email đã được sử dụng';
			default:
				return DEFAULT_MESSAGE;
		}
	} else {
		return message
	}
}

export const handleGetCodeFailed = (message, locale) => {
	if (locale === 'vi') {
		switch (message) {
			case 'The provided email address is not registered!':
				return 'Email chưa được đăng ký';
			default:
				return DEFAULT_MESSAGE;
		}
	} else {
		return message
	}
}

export const handleError = responseError => {
	switch (responseError.response.status) {
		case 401:
			const callbackOk = () => {
				localStorage.clear()
				router.push("/login")
			}
			const callbackCancel = () => router.push('/')
			ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để sử dụng tính năng này', 'Đăng nhập', callbackOk, callbackCancel)
			return;
		default:
			return;
	}
}
