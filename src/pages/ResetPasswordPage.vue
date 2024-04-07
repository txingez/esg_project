<script setup>
import { reactive, ref } from "vue";
import { getResetCode, verifyCode } from "../services/authentication.js";
import { useRouter } from "vue-router";
import { ModalError } from "../components/ModalError.js";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { passwordCheck } from "../utils/validator.js";
import { handleGetCodeFailed, handleResetPasswordFailed } from "../utils/handleErrorMessage.js";
import { ModalSuccess } from "../components/ModalSuccess.js";
import { useI18n } from "vue-i18n";

const router = useRouter()
const {t, locale} = useI18n()

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
    ModalError(t("modal.receive_code_failed_title"), handleGetCodeFailed(message, locale.value))
  })
}

const compareTwoPassword = (rule, value) => {
  if (value && value !== formResetPassword.password) {
    return Promise.reject(t("validate.compare_password"))
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
    ModalSuccess(t("modal.reset_password_success_title"), callback)
  }).catch((err) => {
    loading.value = false
    console.log(err)
    const data = err.response.data
    const message = data.message
    ModalError(t("modal.reset_password_failed_title"), handleResetPasswordFailed(message, locale.value))
  })
}
</script>

<template>
  <div class="h-screen flex justify-center items-center bg-no-repeat bg-center p-2
    bg-[url(https://lh3.googleusercontent.com/pw/AIL4fc-u6Jc8vOx8geXIC8FTAq4w8uQjUyQx2ms9KsOOZ95jHQ96wjsNAxRZwtPByLshZtUHMyWXba3BKynlB-ya_led25NoyG2wW6pXKysPhaEjhOs_Dv5kPpuS3yj8yw4MTcA9ytxJhjG5jwvhwReMGaEy=w1800-h1200-s-no?authuser=0)]">
    <div class="flex flex-col border md:p-5 p-2 md:min-w-[450px] rounded-[8px] text-white bg-black bg-opacity-10">
      <div class="space-y-5 mb-5">
        <div class="font-bold text-3xl text-[#2563eb]">{{ $t("reset_password_page.title") }}</div>
        <div>{{ $t("reset_password_page.short_description") }}</div>
      </div>

      <a-form v-if="receivedCode"
              v-model:model="formResetPassword"
              layout="vertical"
              @finish="resetPassword">
        <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                             {min: 6, message: $t('validate.password_length')},
                             {validator: passwordCheck}]"
                     name="password">
          <template #label>
            <div class="flex justify-center items-center gap-1">
              <span>{{ $t("reset_password_page.form.new_password") }}</span>
              <a-tooltip placement="topLeft">
                <template #title>
                  <ul class="list-disc px-5">
                    <li>{{ $t("reset_password_page.password_rules.min_length") }}</li>
                    <li>{{ $t("reset_password_page.password_rules.character") }}</li>
                    <li>{{ $t("reset_password_page.password_rules.special_character") }}</li>
                  </ul>
                </template>
                <QuestionCircleOutlined/>
              </a-tooltip>
            </div>
          </template>
          <a-input-password v-model:value="formResetPassword.password"
                            :placeholder="$t('reset_password_page.form.new_password')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                                      {validator: compareTwoPassword}]"
                     :label="$t('reset_password_page.form.new_password_repeat')"
                     name="repeatPassword">
          <a-input-password v-model:value="formResetPassword.repeatPassword"
                            :placeholder="$t('reset_password_page.form.new_password_repeat')"/>
        </a-form-item>
        <a-form-item :rules="[{required: true, message: $t('validate.code_empty')}]"
                     :label="$t('reset_password_page.form.code')"
                     name="code">
          <a-input v-model:value="formResetPassword.code" :placeholder="$t('reset_password_page.form.code')"/>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading"
                    class="bg-[#2563eb] text-white w-full"
                    html-type="submit"
                    type="primary">
            {{ $t("reset_password_page.reset_password_btn") }}
          </a-button>
        </a-form-item>
      </a-form>

      <a-form v-else
              v-model:model="formGetCode"
              layout="vertical"
              @finish="getCode">
        <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: $t('validate.email_format')},
                                      {required: true, message: $t('validate.empty')}]"
                     :label="$t('reset_password_page.form.email')"
                     name="email">
          <a-input v-model:value="formGetCode.email" :placeholder="$t('reset_password_page.form.email')"/>
        </a-form-item>

        <a-form-item>
          <a-button :loading="loading"
                    class="bg-[#2563eb] text-white w-full"
                    html-type="submit"
                    type="primary">
            {{ $t("reset_password_page.receive_code_btn") }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="space-x-2.5">
        <span>{{ $t("reset_password_page.is_have_account") }}</span>
        <router-link class="text-[#60a5fa] underline" to="/register">{{
            $t("reset_password_page.register_now")
          }}
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
:deep(.ant-form-item-label label) {
  color: #fff
}
</style>
