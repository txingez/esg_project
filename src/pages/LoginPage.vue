<script setup>
import { reactive, ref } from "vue";
import { login } from "../services/authentication.js";
import { useRouter } from "vue-router";
import { ModalError } from "../components/ModalError.js";
import { handleLoginFailed } from "../utils/handleErrorMessage.js";
import { Notification } from "../components/Notification.js";
import { useI18n } from "vue-i18n";

const router = useRouter()
const {t, locale} = useI18n()

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
    Notification('success', t("modal.success_title"), t("modal.login_success_description"))
    const routeBack = router.options.history.state.back
    router.push(`${routeBack === '/register' || routeBack === '/reset-password' ? '/' : routeBack ? routeBack : '/'}`)
  }).catch((err) => {
    console.log(err)
    const data = err.response.data
    const message = data.message
    ModalError(t("modal.login_failed_title"), handleLoginFailed(message, locale.value))
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
        <div class="font-bold text-3xl text-[#2563eb]">{{ $t("login_page.title") }}</div>
        <div>{{ $t("login_page.short_description") }}</div>
      </div>
      <a-form v-model:model="formState"
              layout="vertical"
              @finish="signIn">
        <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: $t('validate.email_format')},
                                      {required: true, message: $t('validate.empty')}]"
                     :label="$t('login_page.form.email')"
                     name="email">
          <a-input v-model:value="formState.email" :placeholder="$t('login_page.form.email')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.empty')}]" :label="$t('login_page.form.password')"
                     name="password">
          <a-input-password v-model:value="formState.password" :placeholder="$t('login_page.form.password')"/>
        </a-form-item>
        <div class="flex justify-between mb-2">
          <div>
            <a-checkbox class="text-white">
              {{ $t("login_page.form.save_info") }}
            </a-checkbox>
          </div>
          <router-link class="text-[#60a5fa] underline" to="/reset-password">{{ $t("login_page.forgot_password") }}</router-link>
        </div>
        <a-form-item>
          <a-button :loading="loading"
                    class="bg-[#2563eb] text-white w-full"
                    html-type="submit"
                    type="primary">
            {{ $t("login_page.login_btn") }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="space-x-2.5">
        <span>{{ $t("login_page.is_have_account") }}</span>
        <router-link class="text-[#60a5fa] underline" to="/register">{{ $t("login_page.register_now") }}</router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
:deep(.ant-form-item-label label) {
  color: #fff
}
</style>
