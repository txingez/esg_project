<script setup>
import { reactive, ref } from "vue";
import { getResetCode, verifyCode } from "../services/authentication.js";
import { useRouter } from "vue-router";
import { ModalError } from "../components/ModalError.js";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { passwordCheck } from "../utils/validator.js";
import { handleGetCodeFailed, handleResetPasswordFailed } from "../utils/handleErrorMessage.js";
import { ModalSuccess } from "../components/ModalSuccess.js";

const router = useRouter()

const formGetCode = reactive({})
const formResetPassword = reactive({})
const loading = ref(false)
const receivedCode = ref(false)

const getCode = () => {
	loading.value = true
	const body = {email: formGetCode.email}
	getResetCode(body).then(() => {
		loading.value = false
		receivedCode.value = true
	}).catch((err) => {
		console.log(err)
		loading.value = false
		const data = err.response.data
		const message = data.message
		ModalError('Nhận code thất bại', handleGetCodeFailed(message))
	})
}

const compareTwoPassword = (rule, value) => {
	if (value && value !== formResetPassword.password) {
		return Promise.reject('Mật khẩu xác nhận không khớp')
	} else {
		return Promise.resolve()
	}
}

const resetPassword = () => {
	loading.value = true
	const body = {
		email: formGetCode.email,
		password: formResetPassword.password,
		code: formResetPassword.code
	}
	verifyCode(body).then(() => {
		loading.value = false
		const callback = () => {
			router.push('/login')
		}
		ModalSuccess('Bạn đã cài đặt lại mật khẩu thành công', callback)
	}).catch((err) => {
		loading.value = false
		console.log(err)
		const data = err.response.data
		const message = data.message
		ModalError('Cài đặt lại mật khẩu thất bại', handleResetPasswordFailed(message))
	})
}
</script>

<template>
    <div class="h-screen flex justify-center items-center bg-no-repeat bg-center p-2
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc-u6Jc8vOx8geXIC8FTAq4w8uQjUyQx2ms9KsOOZ95jHQ96wjsNAxRZwtPByLshZtUHMyWXba3BKynlB-ya_led25NoyG2wW6pXKysPhaEjhOs_Dv5kPpuS3yj8yw4MTcA9ytxJhjG5jwvhwReMGaEy=w1800-h1200-s-no?authuser=0)]">
        <div class="flex flex-col border md:p-5 p-2 md:min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-10">
            <div class="space-y-5 mb-5">
                <div class="font-bold text-3xl text-[#2563eb]">Tìm lại mật khẩu</div>
                <div>Hãy nhập đầy đủ thông tin tài khoản để tìm lại mật khẩu của bạn</div>
            </div>

            <a-form v-if="receivedCode"
                    v-model:model="formResetPassword"
                    layout="vertical"
                    @finish="resetPassword">
                <a-form-item :rules="[{required: true, message: 'Bạn chưa nhập mật khẩu'},
                             {min: 6, message: 'Mật khẩu phải ít nhất 6 kí tự'},
                             {validator: passwordCheck}]"
                             name="password">
                    <template #label>
                        <div class="flex justify-center items-center gap-1">
                            <span>Mật khẩu mới</span>
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
                    <a-input-password v-model:value="formResetPassword.password" placeholder="Mật khẩu mới"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Nhập lại mật khẩu mới'},
                                      {validator: compareTwoPassword}]" label="Nhập lại mật khẩu mới"
                             name="repeatPassword">
                    <a-input-password v-model:value="formResetPassword.repeatPassword"
                                      placeholder="Nhập lại mật khẩu mới"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Nhập code nhận được trong email'}]" label="Code xác nhận"
                             name="code">
                    <a-input v-model:value="formResetPassword.code" placeholder="Code xác nhận"/>
                </a-form-item>

                <a-form-item>
                    <a-button :loading="loading"
                              class="bg-[#2563eb] text-white w-full"
                              html-type="submit"
                              type="primary">
                        Tạo mật khẩu mới
                    </a-button>
                </a-form-item>
            </a-form>

            <a-form v-else
                    v-model:model="formGetCode"
                    layout="vertical"
                    @finish="getCode">
                <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             label="Email"
                             name="email">
                    <a-input v-model:value="formGetCode.email" placeholder="Địa chỉ Email"/>
                </a-form-item>

                <a-form-item>
                    <a-button :loading="loading"
                              class="bg-[#2563eb] text-white w-full"
                              html-type="submit"
                              type="primary">
                        Nhận code
                    </a-button>
                </a-form-item>
            </a-form>

            <div class="space-x-2.5">
                <span>Bạn chưa có tài khoản?</span>
                <router-link class="text-[#60a5fa] underline" to="/register">Đăng ký ngay</router-link>
            </div>
        </div>
    </div>
</template>


<style scoped>
:deep(.ant-form-item-label label) {
    color: #fff
}
</style>
