import {Modal} from "ant-design-vue";

export const ModalWarning = (title, content, okText, callback) => {
    Modal.warning({
        title: title,
        content: content,
        centered: true,
        maskClosable: true,
        closable: true,
        okText: okText,
        onOk: callback,
        okButtonProps: {
            class: 'bg-[#2563eb]'
        }
    })
}
