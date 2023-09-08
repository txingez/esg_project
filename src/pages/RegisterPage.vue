<script setup>
import {reactive, ref} from "vue";
import {QuestionCircleOutlined} from "@ant-design/icons-vue";
import {register} from "../services/authentication.js";
import {ModalError} from "../components/ModalError.js";
import {ModalSuccess} from "../components/ModalSuccess.js";
import router from "../router.js";

const formState = reactive({})
const loading = ref(false)

const handleSubmit = () => {
    loading.value = true
    const body = {
        first_name: formState.firstName,
        last_name: formState.lastName,
        email: formState.email,
        password: formState.password
    }

    register(body).then((response) => {
        loading.value = false
        const user = response.data.data.user
        const callback = () => {
            sessionStorage.setItem(import.meta.env.ENV_USER_ID_KEY, user.id)
            sessionStorage.setItem(import.meta.env.ENV_EMAIL_KEY, user.email)
            sessionStorage.setItem(import.meta.env.ENV_FULL_NAME_KEY, `${user.first_name} ${user.last_name}`)
            sessionStorage.setItem(import.meta.env.ENV_TOKEN_KEY, user.token)
            router.push('/')
        }
        ModalSuccess('Bạn đã đăng ký thành công', callback)
    }).catch((err) => {
        loading.value = false
        console.log(err)
        const data = err.response.data
        const message = data.message
        ModalError('Đăng ký không thành công', handleRegisterFailed(message))
    })
}

const handleRegisterFailed = message => {
    switch (message) {
        case 'Email address has invalid format':
            return 'Địa chỉ email không đúng định dạng'
        case 'User already exists':
            return 'Email đã được sử dụng'
        default:
            return 'Có lỗi xảy ra. Vui lòng kỹ thuật để hỗ trợ'
    }
}
const compareTwoPassword = (rule, value) => {
    if (value && value !== formState.password) {
        return Promise.reject('Mật khẩu xác nhận không khớp')
    } else {
        return Promise.resolve()
    }
}

const passwordCheck = (rule, value) => {
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
</script>

<template>
    <div class="h-screen flex justify-center items-center p-2
    bg-no-repeat bg-center
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc-RSoSKp0th5coF0QDkiJ5CETvqdl86Edy5wb9dbNWjNxZywzep8YG8x_fgde8ASbaOF_lrccZI6MKWqg13QYPbsK42oTdypA9cMY6255hewGnmB7hzpcg2Awd9G7gcEZfaCwIR5JlRxQLltSoQ_wM=w2934-h1956-s-no?authuser=0)]">
        <div class="flex flex-col border md:p-5 p-2 md:min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-30">
            <div class="space-y-5 mb-5">
                <div class="font-bold text-3xl text-[#2563eb]">Đăng ký tài khoản</div>
                <div>Đăng ký là thành viên để trải nghiệm đầy đủ tính năng của sản phẩm</div>
            </div>
            <a-form layout="vertical"
                    v-model:model="formState"
                    @finish="handleSubmit">
                <a-form-item label="Họ" name="firstName" :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="formState.firstName" placeholder="Họ"/>
                </a-form-item>
                <a-form-item label="Tên" name="lastName" :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="formState.lastName" placeholder="Tên"/>
                </a-form-item>
                <a-form-item label="Email"
                             name="email"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'},
                                      {pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'}]">
                    <a-input v-model:value="formState.email" placeholder="Email"/>
                </a-form-item>
                <a-form-item name="password"
                             :rules="[{required: true, message: 'Bạn chưa nhập mật khẩu'},
                             {min: 6, message: 'Mật khẩu phải ít nhất 6 kí tự'},
                             {validator: passwordCheck}]">
                    <template #label>
                        <div class="flex justify-center items-center gap-1">
                            <span>Mật khẩu</span>
                            <a-tooltip placement="topLeft">
                                <template #title>
                                    <ul class="list-disc px-5">
                                        <li>Có ít nhất 6 ký tự</li>
                                        <li>Mật khẩu phải bao gồm số, chữ thường, chữ hoa</li>
                                        <li>Mật khẩu phải có ít nhất 1 ký tự đặc biệt</li>
                                    </ul>
                                </template>
                                <QuestionCircleOutlined/>
                            </a-tooltip>
                        </div>
                    </template>
                    <a-input-password v-model:value="formState.password" placeholder="Mật khẩu"/>
                </a-form-item>
                <a-form-item label="Nhập lại mật khẩu" name="repeatPassword"
                             :rules="[{required: true, message: 'Nhập lại mật khẩu'},
                                      {validator: compareTwoPassword}]">
                    <a-input-password v-model:value="formState.repeatPassword" placeholder="Nhập lại mật khẩu"/>
                </a-form-item>

                <a-form-item>
                    <a-button html-type="submit"
                              type="primary"
                              class="bg-[#2563eb] text-white w-full"
                              :loading="loading">
                        Đăng ký tài khoản
                    </a-button>
                </a-form-item>
            </a-form>
            <div class="space-x-2.5">
                <span>Bạn đã có tài khoản?</span>
                <router-link to="/login" class="text-[#2563eb] underline">Đăng nhập</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.ant-form-item-label label) {
    color: #fff
}
</style>
