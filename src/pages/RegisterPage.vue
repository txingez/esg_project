<script setup>
import { reactive, ref } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { register } from "../services/authentication.js";
import { ModalError } from "../components/ModalError.js";
import { passwordCheck } from "../utils/validator.js";
import { handleRegisterFailed } from "../utils/handleErrorMessage.js";
import { Notification } from "../components/Notification.js";
import router from "../router.js";

const formState = reactive({})
const loading = ref(false)

const ROLE = 'USER'

const handleSubmit = () => {
	loading.value = true
	const body = {
		user_name: formState.fullName,
		email: formState.email,
		password: formState.password,
		role: ROLE
	}

	register(body)
		.then((response) => {
			const user = response.data.data.user
			localStorage.setItem(import.meta.env.ENV_USER_ID_KEY, user.id)
			localStorage.setItem(import.meta.env.ENV_EMAIL_KEY, user.email)
			localStorage.setItem(import.meta.env.ENV_FULL_NAME_KEY, `${user.user_name}`)
			localStorage.setItem(import.meta.env.ENV_TOKEN_KEY, user.token)
			Notification('success', 'Thành công', 'Bạn đã đăng ký tài khoản thành công!')
			router.push('/')
		})
		.catch((err) => {
			console.log(err)
			const data = err.response.data
			const message = data.message
			ModalError('Đăng ký không thành công', handleRegisterFailed(message))
		})
		.finally(() => {
			loading.value = false
		})
}

const compareTwoPassword = (rule, value) => {
	if (value && value !== formState.password) {
		return Promise.reject('Mật khẩu xác nhận không khớp')
	} else {
		return Promise.resolve()
	}
}
</script>

<template>
    <div class="h-screen flex justify-center items-center p-2
    bg-no-repeat bg-center
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc-u6Jc8vOx8geXIC8FTAq4w8uQjUyQx2ms9KsOOZ95jHQ96wjsNAxRZwtPByLshZtUHMyWXba3BKynlB-ya_led25NoyG2wW6pXKysPhaEjhOs_Dv5kPpuS3yj8yw4MTcA9ytxJhjG5jwvhwReMGaEy=w1800-h1200-s-no?authuser=0)]">
        <div class="flex flex-col border md:p-5 p-2 md:min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-10">
            <div class="space-y-5 mb-5">
                <div class="font-bold text-3xl text-[#2563eb]">Đăng ký tài khoản</div>
                <div>Đăng ký là thành viên để trải nghiệm đầy đủ tính năng của sản phẩm</div>
            </div>
            <a-form v-model:model="formState"
                    layout="vertical"
                    @finish="handleSubmit">
                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]" label="Họ và tên"
                             name="fullName">
                    <a-input v-model:value="formState.fullName" placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'},
                                      {pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'}]"
                             label="Email"
                             name="email">
                    <a-input v-model:value="formState.email" placeholder="Email"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Bạn chưa nhập mật khẩu'},
                             {min: 6, message: 'Mật khẩu phải ít nhất 6 kí tự'},
                             {validator: passwordCheck}]"
                             name="password">
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
                <a-form-item :rules="[{required: true, message: 'Nhập lại mật khẩu'},
                                      {validator: compareTwoPassword}]" label="Nhập lại mật khẩu"
                             name="repeatPassword">
                    <a-input-password v-model:value="formState.repeatPassword" placeholder="Nhập lại mật khẩu"/>
                </a-form-item>

                <a-form-item>
                    <a-button :loading="loading"
                              class="bg-[#2563eb] text-white w-full"
                              html-type="submit"
                              type="primary">
                        Đăng ký tài khoản
                    </a-button>
                </a-form-item>
            </a-form>
            <div class="space-x-2.5">
                <span>Bạn đã có tài khoản?</span>
                <router-link class="text-[#60a5fa] underline" to="/login">Đăng nhập</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
:deep(.ant-form-item-label label) {
    color: #fff
}
</style>
