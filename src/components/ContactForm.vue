<script setup>
import { reactive, ref } from "vue";
import { sendMessage } from "../services/contact.js";
import { Notification } from "./Notification.js";
import { useI18n } from "vue-i18n";

const {t, locale} = useI18n()

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
    <div class="font-bold text-3xl text-[#2563eb] mb-5">{{ $t("contact_page.title") }}</div>
    <a-form :model="formState"
            layout="vertical"
            @finish="handleSubmit">
      <a-form-item :label="$t('contact_page.form.full_name')" name="fullName">
        <a-input v-model:value="formState.fullName" :placeholder="$t('contact_page.form.full_name')"/>
      </a-form-item>
      <div class="flex flex-wrap md:gap-5 justify-between">
        <a-form-item :rules="[{required: true, message: 'Bạn vui lòng nhập thông tin Email'}]"
                     class="md:basis-[47%] w-full"
                     :label="$t('contact_page.form.email')"
                     name="email">
          <a-input v-model:value="formState.email" :placeholder="$t('contact_page.form.email')"/>
        </a-form-item>
        <a-form-item class="md:basis-[47%] w-full" :label="$t('contact_page.form.phone_number')" name="phoneNumber">
          <a-input v-model:value="formState.phoneNumber" :placeholder="$t('contact_page.form.phone_number')"/>
        </a-form-item>
      </div>
      <a-form-item :label="$t('contact_page.form.content')" name="message">
        <a-textarea v-model:value="formState.message" :auto-size="{ minRows: 5, maxRows: 10 }"
                    :placeholder="$t('contact_page.form.content')"/>
      </a-form-item>

      <a-form-item>
        <a-button :loading="loading" class="bg-[#1677ff] md:h-[50px] h-[40px] px-10" html-type="submit"
                  type="primary">
          {{ $t("contact_page.send_btn") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
:deep(.ant-form-item-label label) {
  color: #fff
}
</style>
