<script setup>
import { onMounted, ref } from "vue";
import { businessModels, businessModelsEn } from "../constants/businessModels.js";
import { useBusinessTypeStore } from '../stores/useBusinessTypeStore.js'
import { useStepStore } from "../stores/useStepStore.js";
import { useEvaluatedResultStore } from "../stores/useEvaluatedResultStore.js";
import { getNewestProfile } from "../services/evaluatedForm.js";
import { useJwt } from '@vueuse/integrations/useJwt'
import { useProfileESGStore } from "../stores/useProfileESGStore.js";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { handleError } from "../utils/handleErrorMessage.js";
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { OPTIONS } from "../constants/options.js";
import { useI18n } from "vue-i18n";

const router = useRouter()
const {t, locale} = useI18n()
const profileESGStore = useProfileESGStore()
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
  // businessTypeStore.update(profileESGStore.formData.businessType)
  evaluatedResultStore.updateIndustryCode(profileESGStore.formData.businessModel)
  stepStore.updateCurrentStep(1)
}

onMounted(() => {
  const userId = localStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
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
        handleError(err)
      })
})

const handlePeopleMakeEvaluate = () => {
  if (isPeopleMakeEvaluate.value) {
    profileESGStore.updateByField('fullName', profileESGStore.formData.fullNameManager)
    profileESGStore.updateByField('workPlace', profileESGStore.formData.workPlaceManager)
    profileESGStore.updateByField('email', profileESGStore.formData.emailManager)
    profileESGStore.updateByField('phoneNumber', profileESGStore.formData.phoneNumberManager)
  } else {
    profileESGStore.updateByField('fullName', '')
    profileESGStore.updateByField('workPlace', '')
    profileESGStore.updateByField('email', '')
    profileESGStore.updateByField('phoneNumber', '')
  }
}
</script>

<template>
  <a-form v-model:model="profileESGStore.formData"
          :colon="false"
          :labelWrap="true"
          labelAlign="left"
          layout="vertical"
          size="default"
          @finish="handleFinishProfile">
    <a-form-item :rules="[{required: true, message: 'Hãy nhập tên doanh nghiệp'}]" name="companyName">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t("organization_profile.company_name") }}
        </div>
      </template>
      <a-input v-model:value="profileESGStore.formData.companyName"
               :placeholder="$t('organization_profile.company_name')"/>
    </a-form-item>

    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.tax_format')},
                            {required: true, message: $t('validate.tax_empty')}]" class="md:basis-[48%] w-full"
                   name="taxCode">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.tax') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.taxCode" :placeholder="$t('organization_profile.tax')"/>
      </a-form-item>
      <a-form-item :rules="[{required: true, message: $t('validate.founded_year_empty')}]" class="md:basis-[48%] w-full"
                   name="foundedYear">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.founded_year') }}
          </div>
        </template>
        <a-date-picker v-model:value="profileESGStore.formData.foundedYear"
                       :disabled-date="disabledDate"
                       :valueFormat="yearFormat"
                       class="w-full"
                       picker="year"
                       :placeholder="$t('organization_profile.founded_year')"/>
      </a-form-item>
    </div>

    <a-form-item :rules="[{required: true, message: $t('validate.address_company_empty')}]"
                 name="addressCompany">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          <span>{{ $t('organization_profile.address_company') }}</span>
        </div>
      </template>
      <a-input v-model:value="profileESGStore.formData.addressCompany"
               :placeholder="$t('organization_profile.address_company')"/>
    </a-form-item>

    <a-form-item name="firstManufactureFactory">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.first_manufacture_factory') }}
        </div>
      </template>
      <a-input v-model:value="profileESGStore.formData.firstManufactureFactory"
               :placeholder="$t('organization_profile.first_manufacture_factory')"/>
    </a-form-item>

    <div class="flex flex-wrap md:gap-5 justify-between">
      <div class="md:basis-[48%] w-full">
        <a-form-item :rules="[{required: true, message: $t('validate.registration_type_empty')}]"
                     name="registrationType">
          <template #label>
            <div class="flex justify-center items-center gap-1 text-sm">
              {{ $t('organization_profile.registration_type') }}
            </div>
          </template>
          <a-select v-model:value="profileESGStore.formData.registrationType"
                    :options="locale === 'vi' ? OPTIONS.REGISTRATION_TYPE_OPTS : OPTIONS.REGISTRATION_TYPE_OPTS_EN"
                    :placeholder="$t('organization_profile.registration_type')">
          </a-select>
        </a-form-item>
        <a-form-item v-if="profileESGStore.formData.registrationType === 'other'"
                     :rules="[{required: true, message: $t('validate.other_registration_type_empty')}]"
                     name="registrationTypeOtherInput">
          <a-input v-model:value="profileESGStore.formData.registrationTypeOtherInput"/>
        </a-form-item>
      </div>
    </div>

    <div class="font-bold text-xl py-5">{{ $t('organization_profile.employee_info_title') }}</div>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                                      {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="fullTimeEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm h-fit">
            {{ $t('organization_profile.full_time_employee') }}
            <a-tooltip>
              <template #title>
                <span>
                  {{ $t('organization_profile.full_time_employee_tooltip') }}
                </span>
              </template>
              <QuestionCircleOutlined/>
            </a-tooltip>
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.fullTimeEmployees"
                 :placeholder="$t('organization_profile.full_time_employee')"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="femaleFullTimeEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.full_time_female') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.femaleFullTimeEmployees"
                 :placeholder="$t('organization_profile.full_time_female')"/>
      </a-form-item>
    </div>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="partTimeEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.part_time_employee') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.partTimeEmployees"
                 :placeholder="$t('organization_profile.part_time_employee')"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="femalePartTimeEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.part_time_female') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.femalePartTimeEmployees"
                 :placeholder="$t('organization_profile.part_time_female')"/>
      </a-form-item>
    </div>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="seasonalEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.season_employee') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.seasonalEmployees"
                 :placeholder="$t('organization_profile.season_employee')"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="femaleSeasonalEmployees">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.season_female') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.femaleSeasonalEmployees"
                 :placeholder="$t('organization_profile.season_female')"/>
      </a-form-item>
    </div>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="numberManagers">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.manager_count') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.numberManagers"
                 :placeholder="$t('organization_profile.manager_count')"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="numberFemaleManagers">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.manager_female') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.numberFemaleManagers"
                 :placeholder="$t('organization_profile.manager_female')"/>
      </a-form-item>
    </div>
    <a-form-item :rules="[{pattern: new RegExp(/^\d+$/), message: $t('validate.number_format')},
                          {required: true, message: $t('validate.empty')}]"
                 name="equalFifteenAndUnderEighteenEmployees">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.minor_workers') }}
          <a-tooltip>
            <template #title>
              <span>{{ $t('organization_profile.minor_workers_tooltip') }}</span>
            </template>
            <QuestionCircleOutlined/>
          </a-tooltip>
        </div>
      </template>
      <a-input v-model:value="profileESGStore.formData.equalFifteenAndUnderEighteenEmployees"
               :placeholder="$t('organization_profile.minor_workers')"/>
    </a-form-item>

    <a-form-item :rules="[{required: true, message: $t('validate.answer_empty')}]"
                 name="b6Value">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.b6') }}
          <a-tooltip>
            <template #title>
              <span>
                {{ $t('organization_profile.b6_tooltip') }}
              </span>
            </template>
            <QuestionCircleOutlined/>
          </a-tooltip>
        </div>
      </template>
      <a-select v-model:value="profileESGStore.formData.b6Value"
                :options="locale ==='vi' ? OPTIONS.YES_NO_OPTS : OPTIONS.YES_NO_OPTS_EN"
                :placeholder="$t('organization_profile.yes_no')"/>
    </a-form-item>

    <a-form-item :rules="[{required: true, message: $t('validate.answer_empty')}]"
                 name="b7Value">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.b7') }}
          <a-tooltip>
            <template #title>
              <span>
                {{ $t('organization_profile.b7_tooltip') }}
              </span>
            </template>
            <QuestionCircleOutlined/>
          </a-tooltip>
        </div>
      </template>
      <a-select v-model:value="profileESGStore.formData.b7Value"
                :options="locale ==='vi' ? OPTIONS.YES_NO_OPTS : OPTIONS.YES_NO_OPTS_EN"
                :placeholder="$t('organization_profile.yes_no')"/>
    </a-form-item>

    <a-form-item
        :rules="[{required: true, message: $t('validate.business_model_empty')}]"
        name="businessModel">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.business_model') }}
        </div>
      </template>
      <a-select v-model:value="profileESGStore.formData.businessModel"
                :options="locale === 'vi' ? businessModels : businessModelsEn"
                :placeholder="$t('organization_profile.business_model')"/>
    </a-form-item>

    <a-form-item v-if="profileESGStore.formData.businessModel === 'other'"
                 :rules="[{required: true, message: $t('validate.other_business_model_empty')}]"
                 name="businessModelOtherInput">
      <a-input v-model:value="profileESGStore.formData.businessModelOtherInput"
               :placeholder="$t('organization_profile.other_field')"/>
    </a-form-item>

    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item class="md:basis-[48%] w-full"
                   name="startedESGYear">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.started_esg') }}
          </div>
        </template>
        <a-date-picker v-model:value="profileESGStore.formData.startedESGYear"
                       class="w-full"
                       :valueFormat="yearFormat"
                       picker="year"
                       :placeholder="$t('organization_profile.started_esg')"/>
      </a-form-item>
      <a-form-item class="md:basis-[48%] w-full"
                   name="websiteCompany">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.website_company') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.websiteCompany"
                 :placeholder="$t('organization_profile.website_company')"/>
      </a-form-item>
    </div>

    <div class="font-bold text-xl py-5">{{ $t('organization_profile.manager_info_title') }}</div>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="fullNameManager">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.name') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.fullNameManager"
                 :placeholder="$t('organization_profile.name')"/>
      </a-form-item>
      <a-form-item :rules="[{required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="workPlaceManager">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.workplace') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.workPlaceManager"
                 :placeholder="$t('organization_profile.workplace')"/>
      </a-form-item>
    </div>
    <div class="flex flex-wrap xl:gap-5 lg:gap-3 justify-between">
      <a-form-item :rules="[{pattern: new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: $t('validate.email_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="emailManager">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            Email:
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.emailManager"
                 placeholder="Email"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: $t('validate.phone_number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[48%] w-full"
                   name="phoneNumberManager">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.phone_number') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.phoneNumberManager"
                 :placeholder="$t('organization_profile.phone_number')"/>
      </a-form-item>
    </div>

    <div class="flex gap-2 items-center">
      <div class="font-bold text-xl py-5">{{ $t('organization_profile.evaluate_person_info') }}</div>
      <div class="py-5">
        <a-checkbox v-model:checked="isPeopleMakeEvaluate"
                    @change="handlePeopleMakeEvaluate">
          <span class="text-sm">{{ $t('organization_profile.synchronize_info') }}</span>
        </a-checkbox>
      </div>
    </div>
    <a-form-item :rules="[{required: true, message: $t('validate.empty')}]"
                 class="w-full"
                 name="fullName">
      <template #label>
        <div class="flex justify-center items-center gap-1 text-sm">
          {{ $t('organization_profile.name') }}
        </div>
      </template>
      <a-input v-model:value="profileESGStore.formData.fullName"
               :placeholder="$t('organization_profile.name')"/>
    </a-form-item>
    <div class="flex flex-wrap md:gap-5 justify-between">
      <a-form-item :rules="[{required: true, message: $t('validate.empty')}]"
                   class="md:basis-[31%] w-full"
                   name="workPlace">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.workplace') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.workPlace"
                 :placeholder="$t('organization_profile.workplace')"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), message: $t('validate.email_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[31%] w-full"
                   name="email">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            Email:
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.email"
                 placeholder="Email"/>
      </a-form-item>
      <a-form-item :rules="[{pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/), message: $t('validate.phone_number_format')},
                            {required: true, message: $t('validate.empty')}]"
                   class="md:basis-[31%] w-full"
                   name="phoneNumber">
        <template #label>
          <div class="flex justify-center items-center gap-1 text-sm">
            {{ $t('organization_profile.phone_number') }}
          </div>
        </template>
        <a-input v-model:value="profileESGStore.formData.phoneNumber"
                 :placeholder="$t('organization_profile.phone_number')"/>
      </a-form-item>
    </div>

    <a-form-item>
      <a-button class="bg-[#1677ff] min-h-[50px]" html-type="submit" type="primary">{{ $t('organization_profile.confirm_btn') }}</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
:deep(label.ant-form-item-no-colon) {
  height: fit-content;
}
</style>
