<script setup>
import { reactive, ref } from "vue";
import { login } from "../services/authentication.js";
import { useRouter } from "vue-router";
import { ModalError } from "../components/ModalError.js";
import { handleLoginFailed } from "../utils/handleErrorMessage.js";
import { Notification } from "../components/Notification.js";

const router = useRouter()

const formState = reactive({})
const loading = ref(false)

const TYPE = 'WEB'

const signIn = () => {
	loading.value = true
	const body = {
		email: formState.email,
		password: formState.password,
		type: TYPE
	}

	login(body).then((response) => {
		const user = response.data.data.user
		console.log(user)
		localStorage.setItem(import.meta.env.ENV_USER_ID_KEY, user.id)
		localStorage.setItem(import.meta.env.ENV_EMAIL_KEY, user.email)
		localStorage.setItem(import.meta.env.ENV_FULL_NAME_KEY, `${user.user_name}`)
		localStorage.setItem(import.meta.env.ENV_TOKEN_KEY, user.token)
		Notification('success', 'Thành công', 'Bạn đã đăng nhập thành công!')
		const routeBack = router.options.history.state.back
		router.push(`${routeBack === '/register' || routeBack === '/reset-password' ? '/' : routeBack}`)
	}).catch((err) => {
		console.log(err)
		const data = err.response.data
		const message = data.message
		ModalError('Đăng nhập thất bại', handleLoginFailed(message))
	}).finally(() => {
		loading.value = false
	})
}
</script>

<template>
    <div class="h-screen flex justify-center items-center bg-no-repeat bg-center p-2
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc-u6Jc8vOx8geXIC8FTAq4w8uQjUyQx2ms9KsOOZ95jHQ96wjsNAxRZwtPByLshZtUHMyWXba3BKynlB-ya_led25NoyG2wW6pXKysPhaEjhOs_Dv5kPpuS3yj8yw4MTcA9ytxJhjG5jwvhwReMGaEy=w1800-h1200-s-no?authuser=0)]">
        <div class="flex flex-col border md:p-5 p-2 md:min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-10">
            <div class="space-y-5 mb-5">
                <div class="font-bold text-3xl text-[#2563eb]">Đăng nhập tài khoản</div>
                <div>Đăng nhập để trải nghiệm đầy đủ tính năng của sản phẩm</div>
            </div>
            <a-form v-model:model="formState"
                    layout="vertical"
                    @finish="signIn">
                <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             label="Email"
                             name="email">
                    <a-input v-model:value="formState.email" placeholder="Email"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Hãy nhập mật khẩu'}]" label="Mật khẩu" name="password">
                    <a-input-password v-model:value="formState.password" placeholder="Mật khẩu"/>
                </a-form-item>
                <div class="flex justify-between mb-2">
                    <div>
                        <a-checkbox class="text-white">
                            Lưu thông tin đăng nhập
                        </a-checkbox>
                    </div>
                    <router-link class="text-[#60a5fa] underline" to="/reset-password">Quên mật khẩu?</router-link>
                </div>
                <a-form-item>
                    <a-button :loading="loading"
                              class="bg-[#2563eb] text-white w-full"
                              html-type="submit"
                              type="primary">
                        Đăng nhập
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
