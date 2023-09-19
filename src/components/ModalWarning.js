import {Modal} from "ant-design-vue";

export const ModalWarning = (title, content, okText, callbackOk, callbackCancel) => {
    Modal.warning({
        title: title,
        content: content,
        centered: true,
        maskClosable: true,
        closable: true,
        okText: okText,
        onOk: callbackOk,
        onCancel: callbackCancel,
        okButtonProps: {
            class: 'bg-[#2563eb]'
        }
    })
}
