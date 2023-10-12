import { ModalWarning } from "../components/ModalWarning.js";
import router from "../router.js";

export const handleAccessForm = (isAuth, formName) => {
	if (isAuth) {
		switch (formName) {
			case 'ESG': {
				const route = router.resolve({name: 'EvaluateESGForm'})
				window.open(route.href, '_blank')
				return
			}
			case 'NEC': {
				const route = router.resolve({name: 'EvaluateNECForm'})
				window.open(route.href, '_blank')
				return
			}
		}
	} else {
		const callback = () => {
			router.push('/login')
		}
		ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để thực hiện đánh giá', 'Đăng nhập', callback)
	}
}
