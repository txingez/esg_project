<script setup>
import {onMounted} from "vue";
import {QuestionCircleOutlined} from "@ant-design/icons-vue";
import {businessModels} from "../constants/businessModels.js";
import {useBusinessTypeStore} from '../stores/useBusinessTypeStore.js'
import {useStepStore} from "../stores/useStepStore.js";
import {useEvaluatedResultStore} from "../stores/useEvaluatedResultStore.js";
import {getNewestProfile} from "../services/evaluatedForm.js";
import {useJwt} from '@vueuse/integrations/useJwt'
import {useProfileESGStore} from "../stores/useProfileESGStore.js";
import dayjs from "dayjs";

const profileESGStore = useProfileESGStore()
const businessTypeStore = useBusinessTypeStore()
const stepStore = useStepStore()
const evaluatedResultStore = useEvaluatedResultStore()

const registrationTypeOpts = [
    {label: 'Doanh nghiệp tư nhân', value: 'Doanh nghiệp tư nhân'},
    {label: 'Công ty trách nhiệm hữu hạn một thành viên', value: 'Công ty trách nhiệm hữu hạn một thành viên'},
    {
        label: 'Công ty trách nhiệm hữu hạn từ hai thành viên trở lên',
        value: 'Công ty trách nhiệm hữu hạn từ hai thành viên trở lên'
    },
    {label: 'Công ty cổ phần', value: 'Công ty cổ phần'},
    {label: 'Công ty hợp danh', value: 'Công ty hợp danh'},
    {label: 'Loại hình khác (ghi cụ thể)', value: 'other'}
]

const businessTypeOpts = [
    {label: 'Doanh nghiệp niêm yết', value: 'Doanh nghiệp niêm yết'},
    {label: 'Doanh nghiệp không niêm yết', value: 'Doanh nghiệp không niêm yết'}
]

const yesOrNoOptions = [
    {label: 'Có', value: 'Có'},
    {label: 'Không', value: 'Không'}
]

const sexOpts = [
    {label: 'Nam', value: 'Nam'},
    {label: 'Nữ', value: 'Nữ'}
]

const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
};
const dateFormat = 'DD/MM/YYYY'
const yearFormat = 'YYYY'

const handleFinishProfile = () => {
    businessTypeStore.update(profileESGStore.formData.businessType)
    stepStore.updateCurrentStep(1)
}

const handleChangeBusinessModel = (value) => {
    evaluatedResultStore.updateIndustryCode(value)
}

onMounted(() => {
    const userId = sessionStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
    getNewestProfile(userId, 'ESG')
        .then((response) => {
            console.log(response)
            if (response.data.organization !== null) {
                const {payload} = useJwt(response.data.organization)
                profileESGStore.update(payload.value.organization)
            }
        })
        .catch((err) => {
            console.log(err)
        })
})
</script>

<template>
    <div>
        <a-form layout="vertical"
                :labelWrap="true"
                labelAlign="left"
                :colon="false"
                v-model:model="profileESGStore.formData"
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
                <a-input v-model:value="profileESGStore.formData.companyName" placeholder="Tên doanh nghiệp/tổ chức"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Mã số thuế:" name="taxCode"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Mã số thuế không đúng'},
                                      {required: true, message: 'Hãy nhập Mã số thuế'}]">
                    <a-input v-model:value="profileESGStore.formData.taxCode" placeholder="Mã số thuế"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Năm thành lập:" name="foundedYear"
                             :rules="[{required: true, message: 'Hãy chọn năm thành lập'}]">
                    <a-date-picker class="w-full"
                                   v-model:value="profileESGStore.formData.foundedYear"
                                   picker="year"
                                   :disabled-date="disabledDate"
                                   :valueFormat="yearFormat"
                                   placeholder="Năm thành lập"/>
                </a-form-item>
            </div>

            <a-form-item class="md:basis-[48%] w-full" label="Địa điểm trụ sở chính:" name="addressCompany"
                         :rules="[{required: true, message: 'Hãy nhập Đia điểm trụ sở chính'}]">
                <a-input v-model:value="profileESGStore.formData.addressCompany" placeholder="Địa điểm trụ sở chính"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Địa điểm cơ sở sản xuất chính thứ nhất:"
                             name="firstManufactureFactory"
                             :rules="[{required: true, message: 'Hãy nhập Địa điểm cơ sở sản xuất chính thứ nhất'}]">
                    <a-input v-model:value="profileESGStore.formData.firstManufactureFactory"
                             placeholder="Địa điểm cơ sở sản xuất chính thứ nhất"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full"
                             label="Địa điểm cơ sở sản xuất chính thứ hai (nếu có):"
                             name="secondManufactureFactory">
                    <a-input v-model:value="profileESGStore.formData.secondManufactureFactory"
                             placeholder="Địa điểm cơ sở sản xuất chính thứ hai (nếu có)"/>
                </a-form-item>
            </div>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <div class="md:basis-[48%] w-full">
                    <a-form-item label="Loại hình đăng ký:" name="registrationType"
                                 :rules="[{required: true, message: 'Hãy chọn loại hình đăng ký'}]">
                        <div class="space-y-2">
                            <a-select v-model:value="profileESGStore.formData.registrationType"
                                      placeholder="Loại hình đăng ký">
                                <a-select-option v-for="opt in registrationTypeOpts" :value="opt.value">
                                    {{ opt.label }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-item>
                    <a-form-item name="registrationTypeOtherInput"
                                 v-if="profileESGStore.formData.registrationType === 'other'"
                                 :rules="[{required: true, message: 'Hãy nhập loại hình đăng ký khác'}]">
                        <a-input v-model:value="profileESGStore.formData.registrationTypeOtherInput"/>
                    </a-form-item>
                </div>
                <a-form-item class="md:basis-[48%] w-full" label="Loại hình Doanh nghiệp:" name="businessType"
                             :rules="[{required: true, message: 'Hãy chọn loại hình Doanh nghiệp'}]">
                    <a-select v-model:value="profileESGStore.formData.businessType"
                              placeholder="Loại hình Doanh nghiệp">
                        <a-select-option v-for="opt in businessTypeOpts" :value="opt.value">
                            {{ opt.label }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </div>

            <div class="font-bold text-base py-5">Thông tin lao động</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số nhân viên toàn thời gian:"
                             name="fullTimeEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.fullTimeEmployees"
                             placeholder="Tổng số nhân viên toàn thời gian"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="trong đó: tổng số nhân viên nữ:"
                             name="femaleFullTimeEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.femaleFullTimeEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số nhân viên bán thời gian:"
                             name="partTimeEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.partTimeEmployees"
                             placeholder="Tổng số nhân viên bán thời gian"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="trong đó: tổng số nhân viên nữ:"
                             name="femalePartTimeEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.femalePartTimeEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số nhân viên thời vụ:"
                             name="seasonalEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.seasonalEmployees"
                             placeholder="Tổng số nhân viên thời vụ"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="trong đó: tổng số nhân viên nữ:"
                             name="femaleSeasonalEmployees"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.femaleSeasonalEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Tổng số cán bộ cấp quản lý (từ trưởng phòng trở lên):"
                             name="numberManagers"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.numberManagers"
                             placeholder="Tổng số cán bộ cấp quản lý (từ trưởng phòng trở lên)"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="trong đó: Tổng số cán bộ cấp quản lý là nữ:"
                             name="numberFemaleManagers"
                             :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.numberFemaleManagers"
                             placeholder="Tổng số cán bộ cấp quản lý là nữ"/>
                </a-form-item>
            </div>
            <a-form-item label="Tổng số lao động vị thành niên (nếu có) - từ đủ 15 tuối đến dưới 18 tuổi:"
                         name="equalFifteenAndUnderEighteenEmployees"
                         :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                  {required: true, message: 'Hãy nhập thông tin'}]">
                <a-input v-model:value="profileESGStore.formData.equalFifteenAndUnderEighteenEmployees"
                         placeholder="Tổng số lao động vị thành niên (nếu có) - từ đủ 15 tuối đến dưới 18 tuổi"/>
            </a-form-item>

            <a-form-item
                    label="Doanh nghiệp có phải là doanh nghiệp do phụ nữ làm chủ không (có một hoặc nhiều phụ nữ sở hữu từ 51% vốn điều lệ trở lên, trong đó có ít nhất một người cấp quản lý điều hành doanh nghiệp)?"
                    name="b6Value"
                    :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]">
                <a-select v-model:value="profileESGStore.formData.b6Value" placeholder="Có/Không">
                    <a-select-option v-for="opt in yesOrNoOptions" :value="opt.value">{{ opt.label }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item
                    label="Doanh nghiệp có phải là doanh nghiệp do phụ nữ điều hành (vị trí giám đốc, tổng giám đốc, chủ tịch Hội Đồng Quản Trị) không?"
                    name="b7Value"
                    :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]">
                <a-select v-model:value="profileESGStore.formData.b7Value" placeholder="Có/Không">
                    <a-select-option v-for="opt in yesOrNoOptions" :value="opt.value">{{ opt.label }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="Mô hình kinh doanh thuộc Lĩnh vực kinh doanh nào:" name="businessModel"
                         :rules="[{required: true, message: 'Hãy chọn Lĩnh vực kinh doanh'}]">
                <div class="space-y-2">
                    <a-select v-model:value="profileESGStore.formData.businessModel" :options="businessModels"
                              @change="handleChangeBusinessModel"
                              placeholder="Mô hình kinh doanh thuộc Lĩnh vực kinh doanh nào"/>
                </div>
            </a-form-item>

            <a-form-item name="businessModelOtherInput" v-if="profileESGStore.formData.businessModel === 'other'"
                         :rules="[{required: true, message: 'Hãy nhập Lĩnh vực kinh doanh'}]">
                <a-input placeholder="Nhập thông tin khác"
                         v-model:value="profileESGStore.formData.businessModelOtherInput"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Năm bắt đầu triển khai ESG (nếu đã triển khai):"
                             name="startedESGYear">
                    <a-date-picker class="w-full" v-model:value="profileESGStore.formData.startedESGYear" picker="year"
                                   placeholder="Năm bắt đầu triển khai ESG"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Địa chỉ website:"
                             name="websiteCompany"
                             :rules="[{required: true, message: 'Hãy nhập địa chỉ website công ty'}]">
                    <a-input v-model:value="profileESGStore.formData.websiteCompany"
                             placeholder="Địa chỉ website"/>
                </a-form-item>
            </div>

            <div class="font-bold text-base py-5">Thông tin 01 lãnh đạo doanh nghiệp (để liên hệ)</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Họ và tên:"
                             name="fullNameManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.fullNameManager"
                             placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Giới tính:"
                             name="sexManager"
                             :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]">
                    <a-select v-model:value="profileESGStore.formData.sexManager" :options="sexOpts"
                              placeholder="Giới tính"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Dân tộc:"
                             name="nationManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.nationManager"
                             placeholder="Dân tộc"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Vị trí công tác:"
                             name="workPlaceManager"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.workPlaceManager"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap xl:gap-5 lg:gap-3 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Email:"
                             name="emailManager"
                             :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.emailManager"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Điện thoại:"
                             name="phoneNumberManager"
                             :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.phoneNumberManager"
                             placeholder="Điện thoại"/>
                </a-form-item>
            </div>

            <div class="font-bold text-base py-5">Người thực hiện đánh giá</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Họ và tên:"
                             name="fullName"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.fullName"
                             placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Ngày thực hiện đánh giá:" name="evaluatedDate"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-date-picker class="w-full" v-model:value="profileESGStore.formData.evaluatedDate"
                                   :format="dateFormat"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Vị trí công tác:"
                             name="workPlace"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.workPlace"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Đơn vị công tác:"
                             name="workUnit"
                             :rules="[{required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.workUnit"
                             placeholder="Đơn vị công tác"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full" label="Email:"
                             name="email"
                             :rules="[{pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.email"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full" label="Điện thoại:"
                             name="phoneNumber"
                             :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]">
                    <a-input v-model:value="profileESGStore.formData.phoneNumber"
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
