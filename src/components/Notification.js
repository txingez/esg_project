import {notification} from 'ant-design-vue';

export const Notification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
        duration: 2.5,
        placement: 'topRight',
        maxCount: 5
    })
};
