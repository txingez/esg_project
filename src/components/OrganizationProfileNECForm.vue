<script setup>
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { businessModels } from "../constants/businessModels.js";
import { useBusinessTypeStore } from '../stores/useBusinessTypeStore.js'
import { useStepStore } from "../stores/useStepStore.js";
import { useEvaluatedResultStore } from "../stores/useEvaluatedResultStore.js";
import { useProfileNECStore } from "../stores/useProfileNECStore.js";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { getNewestProfile } from "../services/evaluatedForm.js";
import { useJwt } from '@vueuse/integrations/useJwt'
import { handleError } from "../utils/handleErrorMessage.js";
import { OPTIONS } from "../constants/options.js";

const profileNECStore = useProfileNECStore()
const businessTypeStore = useBusinessTypeStore()
const stepStore = useStepStore()
const evaluatedResultStore = useEvaluatedResultStore()

const isPeopleMakeEvaluate = ref(false)

const disabledDate = (current) => {
	// Can not select days before today and today
	return current && current > dayjs().endOf('day');
};

const yearFormat = 'YYYY'

const handleFinishProfile = () => {
	// businessTypeStore.update(profileNECStore.formData.businessType)
	evaluatedResultStore.updateIndustryCode(profileNECStore.formData.businessModel)
	stepStore.updateCurrentStep(1)
}

onMounted(() => {
	const userId = localStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
	getNewestProfile(userId, 'NEC')
		.then((response) => {
			console.log(response)
			if (response.data.organization !== null) {
				const {header, payload} = useJwt(response.data.organization)
				profileNECStore.update(payload.value.organization)
			}
		})
		.catch((err) => {
			console.log(err)
			handleError(err)
		})
})

const handlePeopleMakeEvaluate = () => {
	if (isPeopleMakeEvaluate.value) {
		profileNECStore.updateByField('fullName', profileNECStore.formData.fullNameManager)
		profileNECStore.updateByField('workPlace', profileNECStore.formData.workPlaceManager)
		profileNECStore.updateByField('email', profileNECStore.formData.emailManager)
		profileNECStore.updateByField('phoneNumber', profileNECStore.formData.phoneNumberManager)
	} else {
		profileNECStore.updateByField('fullName', '')
		profileNECStore.updateByField('workPlace', '')
		profileNECStore.updateByField('email', '')
		profileNECStore.updateByField('phoneNumber', '')
	}
}
</script>

<template>
    <div>
        <a-form v-model:model="profileNECStore.formData"
                :colon="false"
                :labelWrap="true"
                labelAlign="left"
                layout="vertical"
                size="large"
                @finish="handleFinishProfile">
            <a-form-item :rules="[{required: true, message: 'Hãy nhập tên doanh nghiệp'}]" name="companyName">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Tên doanh nghiệp (theo Giấy chứng nhận đăng ký doanh nghiệp):
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.companyName"
                         placeholder="Tên doanh nghiệp"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Mã số doanh nghiệp không đúng'},
                                      {required: true, message: 'Hãy nhập Mã số doanh nghiệp'}]"
                             class="md:basis-[48%] w-full"
                             name="taxCode">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Mã số doanh nghiệp:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.taxCode" placeholder="Mã số doanh nghiệp"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Hãy chọn năm thành lập'}]"
                             class="md:basis-[48%] w-full"
                             name="foundedYear">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Năm thành lập:
                        </div>
                    </template>
                    <a-date-picker v-model:value="profileNECStore.formData.foundedYear"
                                   :disabled-date="disabledDate"
                                   :valueFormat="yearFormat"
                                   class="w-full"
                                   picker="year"
                                   placeholder="Năm thành lập"/>
                </a-form-item>
            </div>

            <a-form-item :rules="[{required: true, message: 'Hãy nhập Địa chỉ đăng ký kinh doanh'}]"
                         name="addressCompany">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        <span>Địa chỉ đăng ký kinh doanh:</span>
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.addressCompany"
                         placeholder="Địa chỉ đăng ký kinh doanh"/>
            </a-form-item>

            <a-form-item name="firstManufactureFactory">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Tên các tỉnh/thành phố có cơ sở sản xuất, kinh doanh của doanh nghiệp mà khác với địa chỉ đăng
                        ký kinh doanh (nếu có):
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.firstManufactureFactory"
                         placeholder="Tên các tỉnh/thành phố có cơ sở sản xuất, kinh doanh của doanh nghiệp mà khác với địa chỉ đăng ký kinh doanh (nếu có):"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <div class="md:basis-[48%] w-full">
                    <a-form-item :rules="[{required: true, message: 'Hãy chọn loại hình đăng ký kinh doanh'}]"
                                 name="registrationType">
                        <template #label>
                            <div class="flex justify-center items-center gap-1 text-lg">
                                Loại hình đăng ký kinh doanh:
                            </div>
                        </template>
                        <a-select v-model:value="profileNECStore.formData.registrationType"
                                  :options="OPTIONS.REGISTRATION_TYPE_OPTS"
                                  placeholder="Loại hình đăng ký kinh doanh">
                        </a-select>
                    </a-form-item>
                    <a-form-item v-if="profileNECStore.formData.registrationType === 'other'"
                                 :rules="[{required: true, message: 'Hãy nhập loại hình đăng ký kinh doanh khác'}]"
                                 name="registrationTypeOtherInput">
                        <a-input v-model:value="profileNECStore.formData.registrationTypeOtherInput"/>
                    </a-form-item>
                </div>
                <!--                <a-form-item :rules="[{required: true, message: 'Hãy chọn loại hình Doanh nghiệp'}]" class="md:basis-[48%] w-full"-->
                <!--                             name="businessType">-->
                <!--                    <template #label>-->
                <!--                        <div class="flex justify-center items-center gap-1 text-lg">-->
                <!--                            Loại hình Doanh nghiệp:-->
                <!--                        </div>-->
                <!--                    </template>-->
                <!--                    <a-select v-model:value="profileNECStore.formData.businessType"-->
                <!--                              :options="OPTIONS.BUSINESS_TYPE_OPTS"-->
                <!--                              placeholder="Loại hình Doanh nghiệp">-->
                <!--                    </a-select>-->
                <!--                </a-form-item>-->
            </div>

            <div class="font-bold text-xl py-5">Thông tin người lao động của doanh nghiệp</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="fullTimeEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Tổng số nhân viên toàn thời gian (bao gồm tất cả hợp đồng lao động không thời hạn, hợp đồng
                            lao động có thời hạn, hợp đồng lao động thử việc):
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.fullTimeEmployees"
                             placeholder="Tổng số nhân viên toàn thời gian"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="femaleFullTimeEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            trong đó, tổng số nhân viên nữ:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.femaleFullTimeEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="partTimeEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Tổng số nhân viên bán thời gian:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.partTimeEmployees"
                             placeholder="Tổng số nhân viên bán thời gian"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="femalePartTimeEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            trong đó, tổng số nhân viên nữ:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.femalePartTimeEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="seasonalEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Tổng số nhân viên thời vụ:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.seasonalEmployees"
                             placeholder="Tổng số nhân viên thời vụ"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="femaleSeasonalEmployees">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            trong đó, tổng số nhân viên nữ:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.femaleSeasonalEmployees"
                             placeholder="Tổng số nhân viên nữ"/>
                </a-form-item>
            </div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="numberManagers">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Tổng số cán bộ cấp quản lý (từ cấp trưởng phòng/ trưởng bộ phận trở lên):
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.numberManagers"
                             placeholder="Tổng số cán bộ cấp quản lý (từ trưởng phòng trở lên)"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="numberFemaleManagers">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            trong đó, tổng số cán bộ cấp quản lý là nữ:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.numberFemaleManagers"
                             placeholder="Tổng số cán bộ cấp quản lý là nữ"/>
                </a-form-item>
            </div>
            <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: 'Số liệu có định dạng không đúng'}]"
                         name="equalFifteenAndUnderEighteenEmployees">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Tổng số lao động vị thành niên (nếu có):
                        <a-tooltip>
                            <template #title>
                                <span>Lao động vị thành niên là lao động từ đủ 15 tuối đến dưới 18 tuổi</span>
                            </template>
                            <QuestionCircleOutlined/>
                        </a-tooltip>
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.equalFifteenAndUnderEighteenEmployees"
                         placeholder="Tổng số lao động vị thành niên"/>
            </a-form-item>

            <a-form-item :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]"
                         name="b6Value">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Doanh nghiệp có phải là doanh nghiệp do phụ nữ làm chủ không?
                        <a-tooltip>
                            <template #title>
                            <span>
                                Doanh nghiệp do phụ nữ làm chủ là doanh nghiệp có tổng số vốn điều lệ do (các) phụ nữ sở hữu chiếm 51% trở lên và trong đó có ít nhất một người thuộc cấp quản lý điều hành doanh nghiệp
                            </span>
                            </template>
                            <QuestionCircleOutlined/>
                        </a-tooltip>
                    </div>
                </template>
                <a-select v-model:value="profileNECStore.formData.b6Value" :options="OPTIONS.YES_NO_OPTS"
                          placeholder="Có/Không"/>
            </a-form-item>

            <a-form-item :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]"
                         name="b7Value">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Doanh nghiệp có phải là doanh nghiệp do phụ nữ trực tiếp điều hành không?
                        <a-tooltip>
                            <template #title>
                            <span>
                                Doanh nghiệp do phụ nữ điều hành là doanh nghiệp có một trong các vị trí sau do phụ nữ đảm nhận: Tổng Giám đốc /Giám đốc doanh nghiệp, Chủ tịch Hội đồng quản trị
                            </span>
                            </template>
                            <QuestionCircleOutlined/>
                        </a-tooltip>
                    </div>
                </template>
                <a-select v-model:value="profileNECStore.formData.b7Value" :options="OPTIONS.YES_NO_OPTS"
                          placeholder="Có/Không"/>
            </a-form-item>

            <a-form-item
                    :rules="[{required: true, message: 'Hãy chọn Lĩnh vực hoạt động sản xuất, kinh doanh chính của doanh nghiệp'}]"
                    name="businessModel">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Lĩnh vực hoạt động sản xuất, kinh doanh chính của doanh nghiệp thuộc nhóm ngành nào dưới đây:
                    </div>
                </template>
                <a-select v-model:value="profileNECStore.formData.businessModel"
                          :options="businessModels"
                          placeholder="Lĩnh vực hoạt động sản xuất, kinh doanh chính của doanh nghiệp thuộc nhóm"/>
            </a-form-item>

            <a-form-item v-if="profileNECStore.formData.businessModel === 'other'"
                         :rules="[{required: true, message: 'Hãy nhập Lĩnh vực kinh doanh'}]"
                         name="businessModelOtherInput">
                <a-input v-model:value="profileNECStore.formData.businessModelOtherInput"
                         placeholder="Nhập thông tin khác"/>
            </a-form-item>

            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item class="md:basis-[48%] w-full"
                             name="startedNECYear">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Năm bắt đầu triển khai KTTH (nếu đã triển khai)
                        </div>
                    </template>
                    <a-date-picker v-model:value="profileNECStore.formData.startedNECYear" class="w-full" picker="year"
                                   placeholder="Năm bắt đầu triển khai KTTH"/>
                </a-form-item>
                <a-form-item class="md:basis-[48%] w-full"
                             name="websiteCompany">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Địa chỉ website (nếu có):
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.websiteCompany"
                             placeholder="Địa chỉ website"/>
                </a-form-item>
            </div>

            <div class="font-bold text-xl py-5">Thông tin 01 lãnh đạo doanh nghiệp (để liên hệ)</div>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="fullNameManager">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Họ và tên:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.fullNameManager"
                             placeholder="Họ và tên"/>
                </a-form-item>
                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="workPlaceManager">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Vị trí công tác:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.workPlaceManager"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
                <!--                <a-form-item :rules="[{required: true, message: 'Hãy chọn câu trả lời'}]"-->
                <!--                             class="md:basis-[48%] w-full"-->
                <!--                             name="sexManager">-->
                <!--                    <template #label>-->
                <!--                        <div class="flex justify-center items-center gap-1 text-lg">-->
                <!--                            Giới tính:-->
                <!--                        </div>-->
                <!--                    </template>-->
                <!--                    <a-select v-model:value="profileNECStore.formData.sexManager" :options="OPTIONS.SEX_OPTS"-->
                <!--                              placeholder="Giới tính"/>-->
                <!--                </a-form-item>-->
            </div>
            <!--            <div class="flex flex-wrap md:gap-5 justify-between">-->
            <!--                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"-->
            <!--                             class="md:basis-[48%] w-full"-->
            <!--                             name="nationManager">-->
            <!--                    <template #label>-->
            <!--                        <div class="flex justify-center items-center gap-1 text-lg">-->
            <!--                            Dân tộc:-->
            <!--                        </div>-->
            <!--                    </template>-->
            <!--                    <a-input v-model:value="profileNECStore.formData.nationManager"-->
            <!--                             placeholder="Dân tộc"/>-->
            <!--                </a-form-item>-->
            <!--            </div>-->
            <div class="flex flex-wrap xl:gap-5 lg:gap-3 justify-between">
                <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="emailManager">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Email:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.emailManager"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[48%] w-full"
                             name="phoneNumberManager">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Điện thoại:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.phoneNumberManager"
                             placeholder="Điện thoại"/>
                </a-form-item>
            </div>

            <div class="flex gap-2 items-center">
                <div class="font-bold text-xl py-5">Người thực hiện đánh giá</div>
                <div class="py-5">
                    <a-checkbox v-model:checked="isPeopleMakeEvaluate"
                                @change="handlePeopleMakeEvaluate">
                        <span class="text-lg">đồng bộ với thông tin trên</span>
                    </a-checkbox>
                </div>
            </div>
            <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"
                         class="w-full"
                         name="fullName">
                <template #label>
                    <div class="flex justify-center items-center gap-1 text-lg">
                        Họ và tên:
                    </div>
                </template>
                <a-input v-model:value="profileNECStore.formData.fullName"
                         placeholder="Họ và tên"/>
            </a-form-item>
            <div class="flex flex-wrap md:gap-5 justify-between">
                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[31%] w-full"
                             name="workPlace">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Vị trí và bộ phận công tác:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.workPlace"
                             placeholder="Vị trí công tác"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: 'Email không dúng định dạng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[31%] w-full"
                             name="email">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Email:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.email"
                             placeholder="Email"/>
                </a-form-item>
                <a-form-item :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: 'Số điện thoại không đúng'},
                                      {required: true, message: 'Hãy nhập thông tin'}]"
                             class="md:basis-[31%] w-full"
                             name="phoneNumber">
                    <template #label>
                        <div class="flex justify-center items-center gap-1 text-lg">
                            Điện thoại:
                        </div>
                    </template>
                    <a-input v-model:value="profileNECStore.formData.phoneNumber"
                             placeholder="Điện thoại"/>
                </a-form-item>
                <!--                <a-form-item :rules="[{required: true, message: 'Hãy nhập thông tin'}]"-->
                <!--                             class="md:basis-[48%] w-full"-->
                <!--                             name="workUnit">-->
                <!--                    <template #label>-->
                <!--                        <div class="flex justify-center items-center gap-1 text-lg">-->
                <!--                            Bộ phận công tác:-->
                <!--                        </div>-->
                <!--                    </template>-->
                <!--                    <a-input v-model:value="profileNECStore.formData.workUnit"-->
                <!--                             placeholder="Bộ phận công tác"/>-->
                <!--                </a-form-item>-->
            </div>

            <a-form-item>
                <a-button class="bg-[#1677ff] min-h-[50px]" html-type="submit" type="primary">Xác nhận</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<style scoped>
:deep(label.ant-form-item-no-colon) {
    height: fit-content;
}
</style>
