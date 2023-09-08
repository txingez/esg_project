<script setup>
import {reactive, ref} from "vue";
import {login} from "../services/authentication.js";
import {ModalSuccess} from "../components/ModalSuccess.js";
import {useRouter} from "vue-router";
import {ModalError} from "../components/ModalError.js";

const router = useRouter()

const formState = reactive({})
const loading = ref(false)

const signIn = () => {
    loading.value = true
    const body = {
        email: formState.email,
        password: formState.password
    }

    login(body).then((response) => {
        loading.value = false
        const user = response.data.data.user
        const callback = () => {
            sessionStorage.setItem(import.meta.env.ENV_USER_ID_KEY, user.id)
            sessionStorage.setItem(import.meta.env.ENV_EMAIL_KEY, user.email)
            sessionStorage.setItem(import.meta.env.ENV_FULL_NAME_KEY, `${user.first_name} ${user.last_name}`)
            sessionStorage.setItem(import.meta.env.ENV_TOKEN_KEY, user.token)
            const routeBack = router.options.history.state.back
            router.push(`${routeBack === '/register' ? '/' : routeBack}`)
        }
        ModalSuccess('Bạn đã đăng nhập thành công', callback)
    }).catch((err) => {
        console.log(err)
        loading.value = false
        const data = err.response.data
        const message = data.message
        ModalError('Đăng nhập thất bại', handleLoginFailed(message))
    })
}

const handleLoginFailed = message => {
    switch (message) {
        case 'Password does not match.':
            return 'Mật khẩu không đúng'
        case 'The provided email is not registered.':
            return 'Email chưa được đăng ký'
        default:
            return 'Có lỗi xảy ra. Vui lòng kỹ thuật để hỗ trợ'
    }
}
</script>

<template>
    <div class="h-screen flex justify-center items-center bg-no-repeat bg-center
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc8FipnJBP4X34b1Jo99vqn3NHhyO8lkotbcTohZnoTAxdjrZMnmEEiRQr8dJVe0NlI3MN3DeeqharYGDAzl7wjV__lvZagawffSGjhf43M1Ytb66XlA5rZeSIdiMLK7wnftNtGVLOyxKOZvPYiQusc=w2930-h1956-s-no?authuser=0)]">
        <div class="flex flex-col border p-5 min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-30">
            <div class="space-y-5 mb-5">
                <div class="font-bold text-3xl text-[#2563eb]">Đăng nhập tài khoản</div>
                <div>Đăng nhập để trải nghiệm đầy đủ tính năng của sản phẩm</div>
            </div>
            <a-form layout="vertical" v-model:model="formState" @finish="signIn">
                <a-form-item label="Email" required>
                    <a-input v-model:value="formState.email" placeholder="Email"/>
                </a-form-item>
                <a-form-item label="Mật khẩu" required>
                    <a-input type="password" v-model:value="formState.password" placeholder="Mật khẩu"/>
                </a-form-item>

                <a-form-item>
                    <a-button html-type="submit"
                              type="primary"
                              class="bg-[#2563eb] text-white w-full"
                              :loading="loading">
                        Đăng nhập
                    </a-button>
                </a-form-item>
            </a-form>
            <div class="space-y-2">
                <div class="space-x-2.5">
                    <span>Quên mật khẩu?</span>
                    <router-link to="" class="text-[#2563eb] underline">Lấy lại ngay</router-link>
                </div>
                <div class="space-x-2.5">
                    <span>Bạn chưa có tài khoản?</span>
                    <router-link to="/register" class="text-[#2563eb] underline">Đăng ký ngay</router-link>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
:deep(.ant-form-item-label label) {
    color: #fff
}
</style>
