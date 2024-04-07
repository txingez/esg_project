<script setup>
import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { LockOutlined } from '@ant-design/icons-vue'
import { readURL } from "../utils/readURL.js";
import { passwordCheck } from "../utils/validator.js";
import { updatePassword } from "../services/authentication.js";
import { Notification } from "../components/Notification.js";
import { useI18n } from "vue-i18n";

const {t, locale} = useI18n()

const activeKey = ref('1')
const avatarSrc = ref('')
const screenWidth = ref(0)
const loading = ref(false)
const formUserInfo = reactive({
  fullName: '',
  email: '',
  avatar: []
})

const formUpdatePassword = reactive({
  currentPassword: '',
  newPassword: '',
  newPasswordRepeat: ''
})

const routes = ref([
  {name: 'Home', to: '/'},
  {name: t("user_info_page.route_name"), to: '/user-info'},
])

watch(locale, () => {
  routes.value = [
    {name: 'Home', to: '/'},
    {name: t("user_info_page.route_name"), to: '/user-info'},
  ]
})

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
}
const onScreenResize = () => {
  window.addEventListener("resize", () => {
    updateScreenWidth();
  });
}

onMounted(() => {
  updateScreenWidth()
  onScreenResize()
  formUserInfo.fullName = localStorage.getItem(import.meta.env.ENV_FULL_NAME_KEY)
  formUserInfo.email = localStorage.getItem(import.meta.env.ENV_EMAIL_KEY)
  const avatar = localStorage.getItem(import.meta.env.ENV_AVATAR_KEY)
  if (!!avatar) {
    avatarSrc.value = avatar
  }
})

const handleUpdatePassword = () => {
  loading.value = true
  const body = {
    email: localStorage.getItem(import.meta.env.ENV_EMAIL_KEY),
    password: formUpdatePassword.newPassword
  }
  updatePassword(body)
      .then(() => {
        Notification('success', t("modal.success_title"), t("modal.change_password_success_description"))
        formUpdatePassword.currentPassword = ''
        formUpdatePassword.newPassword = ''
        formUpdatePassword.newPasswordRepeat = ''
      })
      .catch((err) => {
        console.log(err)
        Notification('error', t("modal.failed_title"), t("modal.change_password_failed_description"))
      })
      .finally(() => {
        loading.value = false
      })
}

const compareTwoPassword = (rule, value) => {
  if (value && value !== formUpdatePassword.newPassword) {
    return Promise.reject(t("validate.compare_password"))
  } else {
    return Promise.resolve()
  }
}
</script>

<template>
  <div
      class="md:px-10 lg:px-[100px] px-5 mt-2.5 xl:min-h-[calc(100vh_-_154px_-_437px)] lg:min-h-[calc(100vh_-_115px_-_425px)] md:min-h-[calc(100vh_-_120px_-_389px)]">
    <BreadCrumb :routes="routes"/>

    <a-tabs v-model:activeKey="activeKey"
            :tab-position="screenWidth <= 430 ? 'top' : 'left'"
            class="mt-5">
      <a-tab-pane key="1" class="text-xl" :tab="$t('user_info_page.tab_1.name')">
        <div class="md:text-3xl text-2xl mb-5">{{ $t('user_info_page.tab_1.name') }}</div>
        <a-form :model="formUserInfo"
                layout="vertical">
          <a-form-item name="fullName" required>
            <template #label class="text-lg">
              <div class="md:text-lg text-base">{{ $t('user_info_page.tab_1.full_name') }}</div>
            </template>
            <a-input v-model:value="formUserInfo.fullName" disabled/>
          </a-form-item>
          <a-form-item name="email" required>
            <template #label>
              <div class="md:text-lg text-base">{{ $t('user_info_page.tab_1.email') }}</div>
            </template>
            <a-input v-model:value="formUserInfo.email" disabled/>
          </a-form-item>
        </a-form>
      </a-tab-pane>

      <a-tab-pane key="2" :tab="$t('user_info_page.tab_2.name')">
        <div class="md:text-3xl text-2xl mb-5">{{ $t("user_info_page.tab_2.name") }}</div>
        <a-form :model="formUpdatePassword"
                layout="vertical"
                @finish="handleUpdatePassword">
          <div class="flex gap-5">
            <div class="md:basis-3/4 basis-full">
              <a-form-item name="currentPassword" required>
                <template #label>
                  <div class="md:text-lg text-base">{{ $t("user_info_page.tab_2.current_password") }}</div>
                </template>
                <a-input-password v-model:value="formUpdatePassword.currentPassword"
                                  :placeholder="$t('user_info_page.tab_2.current_password')"/>
              </a-form-item>
              <a-form-item :rules="[{required: true, message: $t('validate.empty')},
                                    {min: 6, message: $t('validate.password_length')},
                                    {validator: passwordCheck}]"
                           name="newPassword">
                <template #label>
                  <div class="md:text-lg text-base">{{ $t("user_info_page.tab_2.new_password") }}</div>
                </template>
                <a-input-password v-model:value="formUpdatePassword.newPassword"
                                  :placeholder="$t('user_info_page.tab_2.new_password')"/>
              </a-form-item>
              <a-form-item :rules="[{required: true, message: 'Nhập lại mật khẩu mới'},
                                    {validator: compareTwoPassword}]"
                           name="newPasswordRepeat">
                <template #label>
                  <div class="md:text-lg text-base">{{ $t("user_info_page.tab_2.new_password_repeat") }}</div>
                </template>
                <a-input-password v-model:value="formUpdatePassword.newPasswordRepeat"
                                  :placeholder="$t('user_info_page.tab_2.new_password_repeat')"/>
              </a-form-item>
            </div>

            <div class="md:flex hidden justify-center items-center basis-1/4">
              <LockOutlined class="text-[140px] text-gray-200"/>
            </div>
          </div>

          <a-form-item>
            <a-button :loading="loading"
                      class="min-h-[50px] bg-blue-500"
                      html-type="submit"
                      type="primary">
              {{ $t('user_info_page.tab_2.change_password_btn') }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style>
.ant-tabs-tab-btn {
  font-size: 20px;
}

@media screen and (max-width: 430px) {
  .ant-tabs-tab-btn {
    font-size: 14px;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .ant-tabs-tab-btn {
    font-size: 16px;
  }
}
</style>
