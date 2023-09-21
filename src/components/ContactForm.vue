<script setup>
import DividerWithName from "./DividerWithName.vue";
import {reactive, ref} from "vue";
import {sendMessage} from "../services/contact.js";
import {Notification} from "./Notification.js";

const formState = reactive({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
})

const loading = ref(false)

const handleSubmit = () => {
    loading.value = true
    const body = {
        full_name: formState.fullName,
        email: formState.email,
        phone_number: formState.phoneNumber,
        message: formState.message
    }
    sendMessage(body)
        .then(() => {
            Notification('success', 'Thành công', 'Xin cám ơn. Chúng tôi đã nhận được tin nhắn của bạn!')
        })
        .catch((err) => {
            console.log(err)
            Notification('error', 'Thất bại', 'Xin lỗi. Hệ thống đang có lỗi, vui lòng thử lại sau!')
        })
        .finally(() => {
            loading.value = false
            resetForm()
        })
}

const resetForm = () => {
    formState.fullName = '';
    formState.email = '';
    formState.phoneNumber = '';
    formState.message = '';
}
</script>

<template>
    <div>
        <DividerWithName label="LIÊN HỆ"/>
        <div class="md:px-10 lg:px-[100px] px-5 space-y-5 mb-10">
            <a-form layout="vertical"
                    :model="formState"
                    @finish="handleSubmit">
                <a-form-item label="Họ và tên" name="fullName">
                    <a-input v-model:value="formState.fullName" placeholder="Họ và tên"/>
                </a-form-item>
                <div class="flex flex-wrap md:gap-5 justify-between">
                    <a-form-item class="md:basis-[47%] w-full"
                                 label="Email"
                                 :rules="[{required: true, message: 'Bạn vui lòng nhập thông tin Email'}]"
                                 name="email">
                        <a-input v-model:value="formState.email" placeholder="Email"/>
                    </a-form-item>
                    <a-form-item class="md:basis-[47%] w-full" label="Số điện thoại" name="phoneNumber">
                        <a-input v-model:value="formState.phoneNumber" placeholder="Số điện thoại"/>
                    </a-form-item>
                </div>
                <a-form-item label="Nội dung" name="message">
                    <a-textarea v-model:value="formState.message" placeholder="Nội dung"
                                :auto-size="{ minRows: 5, maxRows: 10 }"/>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" class="bg-[#1677ff] md:h-[50px] h-[40px] px-10" html-type="submit"
                              :loading="loading">
                        Gửi đi
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
