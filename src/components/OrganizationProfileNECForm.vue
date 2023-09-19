<script setup>
import {QuestionCircleOutlined} from "@ant-design/icons-vue";
import {businessModels} from "../constants/businessModels.js";
import {useBusinessTypeStore} from '../stores/useBusinessTypeStore.js'
import {useStepStore} from "../stores/useStepStore.js";
import {useEvaluatedResultStore} from "../stores/useEvaluatedResultStore.js";
import {useProfileNECStore} from "../stores/useProfileNECStore.js";
import dayjs from "dayjs";
import {onMounted} from "vue";
import {getNewestProfile} from "../services/evaluatedForm.js";
import {useJwt} from '@vueuse/integrations/useJwt'
import {handleError} from "../utils/handleErrorMessage.js";

const profileNECStore = useProfileNECStore()
const businessTypeStore = useBusinessTypeStore()
const stepStore = useStepStore()
const evaluatedResultStore = useEvaluatedResultStore()

const registrationTypeOpts = [
    {label: 'Doanh nghiệp ngoài nhà nước/công ty tư nhân', value: 'Doanh nghiệp ngoài nhà nước/công ty tư nhân'},
    {
        label: 'Doanh nghiệp nhà nước (Nhà nước sở hữu trên 50% vốn điều lệ)',
        value: 'b. Doanh nghiệp nhà nước (Nhà nước sở hữu trên 50% vốn điều lệ)'
    },
    {
        label: 'Doanh nghiệp có vốn đầu tư trực tiếp nước ngoài',
        value: 'Doanh nghiệp có vốn đầu tư trực tiếp nước ngoài'
    },
    {label: 'Hợp tác xã', value: 'Hợp tác xã'},
    {label: 'Hộ kinh doanh cá thể', value: 'Hộ kinh doanh cá thể'},
    {label: 'Cơ sở sản xuất kinh doanh', value: 'Cơ sở sản xuất kinh doanh'}
]

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
};

const sexOpts = [
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'}
]

const dateFormat = 'DD/MM/YYYY'
const yearFormat = 'YYYY'

const handleFinishProfile = () => {
    businessTypeStore.update(profileNECStore.formData.businessType)
    evaluatedResultStore.updateIndustryCode(profileNECStore.formData.businessModel)
    stepStore.updateCurrentStep(1)
}

onMounted(() => {
    const userId = sessionStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
    getNewestProfile(userId, 'NEC')
        .then((response) => {
            console.log(response)
            if (response.data.organization !== null) {
                const {header, payload} = useJwt(response.data.organization)
                profileNECStore.update(payload.organization)
            }
        })
        .catch((err) => {
            console.log(err)
            handleError(err)
        })
})
</script>

<template>
    <div>
        <a-form layout="vertical"
                :labelWrap="true"
                labelAlign="left"
                :colon="false"
                v-model:model="profileNECStore.formData"
                @finish="handleFinishProfile">
            <a-form-item name="companyName" :rules="[{required: true, message: 'Hãy nhập tên công ty'}]">
                <template #label>
                    <div class="flex justify-center items-center gap-1">
                        <span>Tên doanh nghiệp/tổ chức:</span>
                        <a-tooltip>
                            <template #title>
                                <span>prompt text</span>
                            </template>
                            <QuestionCircleOutlined/>
                        </a-tooltip>
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.companyName" placeholder="Tên doanh nghiệp/tổ chức"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Mã số thuế:" name="taxCode"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Mã số thuế không đúng'},
                                      {required: true, message: 'Hãy nhập Mã số thuế'}]">
                    <a-input v-model:value="profileNECStore.formData.taxCode" placeholder="Mã số thuế"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Năm thành lập:" name="foundedYear"
                             :rules="[{required: true, message: 'Hãy chọn năm thành lập'}]">
                    <a-date-picker class="w-full"
                                   v-model:value="profileNECStore.formData.foundedYear"
                                   picker="year"
                                   :disabled-date="disabledDate"
                                   :valueFormat="yearFormat"
                                   placeholder="Năm thành lập"/>
                </a-form-item>
            </div>

            <a-form-item label="Loại hình đăng ký:" name="registrationType"
                         :rules="[{required: true, message: 'Hãy chọn loại hình đăng ký'}]">
                <div class="space-y-2">
                    <a-select v-model:value="profileNECStore.formData.registrationType" placeholder="Loại hình đăng ký">
                        <a-select-option v-for="opt in registrationTypeOpts" :value="opt.value">
                            {{ opt.label }}
                        </a-select-option>
                    </a-select>
                </div>
            </a-form-item>

            <div class="font-bold text-base py-5">
                Thông tin về tổng số lực lượng lao động (bao gồm cả Hợp đồng (HĐ) thử việc, HĐ thời vụ, HĐ có thời hạn
                và HĐ không xác định thời hạn...)
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số nhân viên (có đóng bảo hiểm xã hội):"
                             name="insuranceEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.insuranceEmployees"
                             placeholder="Tổng số nhân viên (có đóng bảo hiểm xã hội)"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số nhân viên (có đóng bảo hiểm xã hội) là nữ:"
                             name="femaleInsuranceEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.femaleInsuranceEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full"
                             label="Tổng số cán bộ cấp cao (từ cấp phó trưởng phòng/phó trưởng ban trở lên):"
                             name="numberManagers"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.numberManagers"
                             placeholder="Tổng số cán bộ cấp cao (từ cấp phó trưởng phòng/phó trưởng ban trở lên)"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số cán bộ cấp cao là nữ:"
                             name="numberFemaleManagers"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.numberFemaleManagers"
                             placeholder="Tổng số cán bộ cấp cao là nữ"/>
                </a-form-item>
            </div>
            <a-form-item label="Tổng số lao động vị thành niên (nếu có) - từ đủ 15 tuối đến dưới 18 tuổi:"
                         name="equalFifteenAndUnderEighteenEmployees"
                         :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'}]">
                <a-input v-model:value="profileNECStore.formData.equalFifteenAndUnderEighteenEmployees"
                         placeholder="Tổng số lao động vị thành niên (nếu có) - từ đủ 15 tuối đến dưới 18 tuổi"/>
            </a-form-item>

            <a-form-item label="Doanh nghiệp thuộc Lĩnh vực kinh doanh nào:" name="businessModel"
                         :rules="[{required: true, message: 'Hãy chọn Lĩnh vực kinh doanh'}]">
                <div class="space-y-2">
                    <a-select v-model:value="profileNECStore.formData.businessModel" :options="businessModels"
                              placeholder="Doanh nghiệp thuộc Lĩnh vực kinh doanh nào"/>
                </div>
            </a-form-item>

            <a-form-item name="businessModelOtherInput" v-if="profileNECStore.formData.businessModel === 'other'"
                         :rules="[{required: true, message: 'Hãy nhập Lĩnh vực kinh doanh'}]">
                <a-input placeholder="Nhập thông tin khác"
                         v-model:value="profileNECStore.formData.businessModelOtherInput"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Địa chỉ trụ sở đăng ký kinh doanh của doanh nghiệp:"
                             :rules="[{required: true, message: 'Hãy nhập địa chỉ trụ sở đăng ký kinh doanh của doanh nghiệp'}]"
                             name="address">
                    <a-input placeholder="Địa chỉ trụ sở đăng ký kinh doanh của doanh nghiệp"
                             v-model:value="profileNECStore.formData.address"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Địa chỉ cơ sở sản xuất chính của doanh nghiệp:"
                             name="manufactureAddress"
                             :rules="[{required: true, message: 'Hãy nhập địa chỉ cơ sở sản xuất chính của doanh nghiệp'}]">
                    <a-input v-model:value="profileNECStore.formData.manufactureAddress"
                             placeholder="Địa chỉ cơ sở sản xuất chính của doanh nghiệp"/>
                </a-form-item>
            </div>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full"
                             label="Các địa chỉ cơ sở sản xuất khác của doanh nghiệp (nếu có):"
                             name="otherManufactureAddress">
                    <a-input placeholder="Các địa chỉ cơ sở sản xuất khác của doanh nghiệp (nếu có)"
                             v-model:value="profileNECStore.formData.otherManufactureAddress"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Địa chỉ website:"
                             name="websiteCompany"
                             :rules="[{required: true, message: 'Hãy nhập địa chỉ website'}]">
                    <a-input v-model:value="profileNECStore.formData.websiteCompany"
                             placeholder="Địa chỉ website"/>
                </a-form-item>
            </div>

            <div class="font-bold text-base py-5">Thông tin đại diện lãnh đạo doanh nghiệp (để liên hệ)</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Họ và tên:"
                             name="fullNameManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.fullNameManager"
                             placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Giới tính:"
                             name="sexManager"
                             :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]">
                    <a-select v-model:value="profileNECStore.formData.sexManager" :options="sexOpts"
                              placeholder="Giới tính"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Dân tộc:"
                             name="nationManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.nationManager"
                             placeholder="Dân tộc"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Vị trí công tác:"
                             name="workPlaceManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.workPlaceManager"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap xl:gap-5 lg:gap-3 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Email:"
                             name="emailManager"
                             :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.emailManager"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Điện thoại:"
                             name="phoneNumberManager"
                             :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.phoneNumberManager"
                             placeholder="Điện thoại"/>
                </a-form-item>
            </div>

            <div class="font-bold text-base py-5">Người thực hiện đánh giá</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Họ và tên:"
                             name="fullName"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.fullName"
                             placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Ngày thực hiện đánh giá:" name="evaluatedDate"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-date-picker class="w-full" v-model:value="profileNECStore.formData.evaluatedDate"
                                   :format="dateFormat"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Vị trí công tác:"
                             name="workPlace"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.workPlace"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Đơn vị công tác:"
                             name="workUnit"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.workUnit"
                             placeholder="Đơn vị công tác"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Email:"
                             name="email"
                             :rules="[{pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.email"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Điện thoại:"
                             name="phoneNumber"
                             :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileNECStore.formData.phoneNumber"
                             placeholder="Điện thoại"/>
                </a-form-item>
            </div>

            <a-form-item>
                <a-button type="primary" class="bg-[#1677ff] min-h-[50px]" html-type="submit">Xác nhận</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped>
:deep(label.ant-form-item-no-colon) {
    height: fit-content;
}
</style>
