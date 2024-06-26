<script setup>
import { reactive, ref } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { register } from "../services/authentication.js";
import { ModalError } from "../components/ModalError.js";
import { passwordCheck } from "../utils/validator.js";
import { handleRegisterFailed } from "../utils/handleErrorMessage.js";
import { Notification } from "../components/Notification.js";
import router from "../router.js";
import { useI18n } from "vue-i18n";

const {t, locale} = useI18n()

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
        Notification('success', t("modal.success_title"), t("modal.register_success_description"))
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
        const data = err.response.data
        const message = data.message
        ModalError(t("modal.register_failed_title"), handleRegisterFailed(message, locale.value))
      })
      .finally(() => {
        loading.value = false
      })
}

const compareTwoPassword = (rule, value) => {
  if (value && value !== formState.password) {
    return Promise.reject(t("validate.compare_password"))
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
        <div class="font-bold text-3xl text-[#2563eb]">{{ $t("register_page.title") }}</div>
        <div>{{ $t("register_page.short_description") }}</div>
      </div>
      <a-form v-model:model="formState"
              layout="vertical"
              @finish="handleSubmit">
        <a-form-item :rules="[{required: true, message: $t('validate.empty')}]"
                     :label="$t('register_page.form.full_name')"
                     name="fullName">
          <a-input v-model:value="formState.fullName" :placeholder="$t('register_page.form.full_name')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                                      {pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: $t('validate.email_format')}]"
                     :label="$t('register_page.form.email')"
                     name="email">
          <a-input v-model:value="formState.email" :placeholder="$t('register_page.form.email')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                             {min: 6, message: $t('validate.password_length')},
                             {validator: passwordCheck}]"
                     name="password">
          <template #label>
            <div class="flex justify-center items-center gap-1">
              <span>{{ $t("register_page.form.password") }}</span>
              <a-tooltip placement="topLeft">
                <template #title>
                  <ul class="list-disc px-5">
                    <li>{{ $t("register_page.password_rules.min_length") }}</li>
                    <li>{{ $t("register_page.password_rules.character") }}</li>
                    <li>{{ $t("register_page.password_rules.special_character") }}</li>
                  </ul>
                </template>
                <QuestionCircleOutlined/>
              </a-tooltip>
            </div>
          </template>
          <a-input-password v-model:value="formState.password" :placeholder="$t('register_page.form.password')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                              {validator: compareTwoPassword}]" :label="$t('register_page.form.password_repeat')"
                     name="repeatPassword">
          <a-input-password v-model:value="formState.repeatPassword" :placeholder="$t('register_page.form.password_repeat')"/>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading"
                    class="bg-[#2563eb] text-white w-full"
                    html-type="submit"
                    type="primary">
            {{ $t('register_page.register_btn') }}
          </a-button>
        </a-form-item>
      </a-form>
      <div class="space-x-2.5">
        <span>{{ $t('register_page.is_have_account') }}</span>
        <router-link class="text-[#60a5fa] underline" to="/login">{{ $t('register_page.login_btn') }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.ant-form-item-label label) {
  color: #fff
}
</style>
