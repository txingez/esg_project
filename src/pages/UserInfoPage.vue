<script setup>
import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, reactive, ref } from "vue";
import { LockOutlined } from '@ant-design/icons-vue'
import { readURL } from "../utils/readURL.js";
import { passwordCheck } from "../utils/validator.js";
import { updatePassword } from "../services/authentication.js";
import { Notification } from "../components/Notification.js";

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

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Thông tin tài khoản', to: '/user-info'},
]

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

const beforeUpload = async file => {
	formUserInfo.avatar = [...(formUserInfo.avatar || []), file]
	avatarSrc.value = await readURL(file)
	return false
}

const handleUpdatePassword = () => {
	loading.value = true
	const body = {
		email: localStorage.getItem(import.meta.env.ENV_EMAIL_KEY),
		password: formUpdatePassword.newPassword
	}
	updatePassword(body)
		.then(() => {
			Notification('success', 'Thành công', 'Đổi mật khẩu thành công!')
			formUpdatePassword.currentPassword = ''
			formUpdatePassword.newPassword = ''
			formUpdatePassword.newPasswordRepeat = ''
		})
		.catch((err) => {
			console.log(err)
			Notification('error', 'Thất bại', 'Đổi mật khẩu thất bại')
		})
		.finally(() => {
			loading.value = false
		})
}

const compareTwoPassword = (rule, value) => {
	if (value && value !== formUpdatePassword.newPassword) {
		return Promise.reject('Mật khẩu xác nhận không khớp')
	} else {
		return Promise.resolve()
	}
}
</script>

<template>
    <div class="md:px-10 lg:px-[100px] px-5 mt-2.5 xl:min-h-[calc(100vh_-_154px_-_437px)] lg:min-h-[calc(100vh_-_115px_-_425px)] md:min-h-[calc(100vh_-_120px_-_389px)]">
        <BreadCrumb :routes="routes"/>

        <a-tabs v-model:activeKey="activeKey"
                :tab-position="screenWidth <= 430 ? 'top' : 'left'"
                class="mt-5">
            <a-tab-pane key="1" class="text-xl" tab="Thông tin tài khoản">
                <div class="md:text-3xl text-2xl mb-5">Thông tin tài khoản</div>
                <a-form :model="formUserInfo"
                        layout="vertical">
                    <a-form-item name="fullName" required>
                        <template #label class="text-lg">
                            <div class="md:text-lg text-base">Họ và tên</div>
                        </template>
                        <a-input v-model:value="formUserInfo.fullName" disabled/>
                    </a-form-item>
                    <a-form-item name="email" required>
                        <template #label>
                            <div class="md:text-lg text-base">Địa chỉ Email</div>
                        </template>
                        <a-input v-model:value="formUserInfo.email" disabled/>
                    </a-form-item>

                    <!--                        <div class="flex items-center flex-col justify-center basis-1/4 gap-2">-->
                    <!--                            <a-upload v-model:file-list="formUserInfo.avatar"-->
                    <!--                                      name="avatar"-->
                    <!--                                      list-type="picture"-->
                    <!--                                      :show-upload-list="false"-->
                    <!--                                      :before-upload="beforeUpload">-->
                    <!--                                <div v-if="avatarSrc !== ''" class="relative">-->
                    <!--                                    <div class="hover:bg-black hover:bg-opacity-40 absolute z-50 md:w-[100px] lg:w-[120px] md:h-[100px] lg:h-[120px] rounded-[50%]"/>-->
                    <!--                                    <a-avatar :src="avatarSrc"-->
                    <!--                                              class="z-10"-->
                    <!--                                              :size="{xs: 72, sm: 72, md: 100, lg: 120, xl: 120, xxl: 120}"/>-->
                    <!--                                </div>-->
                    <!--                                <a-avatar v-else-->
                    <!--                                          :size="{xs: 72, sm: 72, md: 100, lg: 120, xl: 120, xxl: 120}"-->
                    <!--                                          class="flex items-center justify-center-->
                    <!--                                      hover:bg-black hover:bg-opacity-50 hover:before:content-['Thay đổi']">-->
                    <!--                                    <template #icon>-->
                    <!--                                        <UserOutlined/>-->
                    <!--                                    </template>-->
                    <!--                                </a-avatar>-->
                    <!--                            </a-upload>-->
                    <!--                            <div>Ảnh đại diện</div>-->
                    <!--                        </div>-->

                    <!--                    <a-form-item>-->
                    <!--                        <a-button html-type="submit" type="primary" class="min-h-[50px] bg-blue-500" disabled>-->
                    <!--                            Cập nhật thông tin-->
                    <!--                        </a-button>-->
                    <!--                    </a-form-item>-->
                </a-form>
            </a-tab-pane>

            <a-tab-pane key="2" tab="Đổi mật khẩu">
                <div class="md:text-3xl text-2xl mb-5">Đổi mật khẩu</div>
                <a-form :model="formUpdatePassword"
                        layout="vertical"
                        @finish="handleUpdatePassword">
                    <div class="flex gap-5">
                        <div class="md:basis-3/4 basis-full">
                            <a-form-item name="currentPassword" required>
                                <template #label>
                                    <div class="md:text-lg text-base">Nhập mật khẩu hiện tại</div>
                                </template>
                                <a-input-password v-model:value="formUpdatePassword.currentPassword"
                                                  placeholder="Nhập mật khẩu hiện tại"/>
                            </a-form-item>
                            <a-form-item :rules="[{required: true, message: 'Nhập mật khẩu mới'},
                                                  {min: 6, message: 'Mật khẩu phải ít nhất 6 kí tự'},
                                                  {validator: passwordCheck}]"
                                         name="newPassword">
                                <template #label>
                                    <div class="md:text-lg text-base">Mật khẩu mới</div>
                                </template>
                                <a-input-password v-model:value="formUpdatePassword.newPassword"
                                                  placeholder="Nhập mật khẩu mới"/>
                            </a-form-item>
                            <a-form-item :rules="[{required: true, message: 'Nhập lại mật khẩu mới'},
                                                  {validator: compareTwoPassword}]"
                                         name="newPasswordRepeat">
                                <template #label>
                                    <div class="md:text-lg text-base">Nhập lại mật khẩu mới</div>
                                </template>
                                <a-input-password v-model:value="formUpdatePassword.newPasswordRepeat"
                                                  placeholder="Nhập lại mật khẩu mới"/>
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
                            Thay đổi mật khẩu
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
