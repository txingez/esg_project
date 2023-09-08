import {ModalWarning} from "../components/ModalWarning.js";
import router from "../router.js";

export const handleAccessForm = (isAuth, formName) => {
    if (isAuth) {
        switch (formName) {
            case 'ESG':
                return router.push('/evaluate/esg/form')
            case 'NEC':
                return router.push('/evaluate/nec/form')
        }
    } else {
        const callback = () => {
            router.push('/login')
        }
        ModalWarning('Bạn chưa đăng nhập', 'Vui lòng đăng nhập để sử dụng tính năng này', 'Đăng nhập', callback)
    }
}
