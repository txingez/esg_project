<script setup>
import DividerWithName from "./DividerWithName.vue";
import {reactive} from "vue";

const formState = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: ''
})
</script>

<template>
    <div>
        <DividerWithName label="LIÊN HỆ"/>
        <div class="md:px-10 lg:px-[150px] xl:px-[350px] px-5 space-y-5 mb-10">
            <a-form layout="vertical">
                <div class="flex flex-wrap md:gap-5 justify-between">
                    <a-form-item class="md:basis-[47%] w-full" label="HỌ" name="firstName">
                        <a-input v-model:value="formState.firstName" placeholder="First Name"/>
                    </a-form-item>
                    <a-form-item class="md:basis-[47%] w-full" label="TÊN" name="lastName">
                        <a-input v-model:value="formState.lastName" placeholder="Last Name"/>
                    </a-form-item>
                </div>
                <div class="flex flex-wrap md:gap-5 justify-between">
                    <a-form-item class="md:basis-[47%] w-full" label="EMAIL" name="email">
                        <a-input v-model:value="formState.email" placeholder="Email"/>
                    </a-form-item>
                    <a-form-item class="md:basis-[47%] w-full" label="SĐT" name="phoneNumber">
                        <a-input v-model:value="formState.phoneNumber" placeholder="phoneNumber"/>
                    </a-form-item>
                </div>
                <a-form-item label="Message" name="TIN NHẮN">
                    <a-textarea v-model:value="formState.message" placeholder="Message"
                                :auto-size="{ minRows: 5, maxRows: 10 }"/>
                </a-form-item>

                <a-form-item class="flex md:justify-center">
                    <a-button type="primary" class="bg-[#1677ff] md:h-[50px] h-[40px] px-10" html-type="submit">
                        GỬI
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
