import {defineStore} from "pinia";
import {reactive} from "vue";
import dayjs from "dayjs";

export const useProfileESGStore = defineStore('ProfileESG', () => {
    const formData = reactive({
        companyName: '',
        taxCode: '',
        foundedYear: '',
        addressCompany: '',
        firstManufactureFactory: '',
        secondManufactureFactory: '',
        registrationType: null,
        registrationTypeOtherInput: '',
        businessType: null,
        fullTimeEmployees: '',
        femaleFullTimeEmployees: '',
        partTimeEmployees: '',
        femalePartTimeEmployees: '',
        seasonalEmployees: '',
        femaleSeasonalEmployees: '',
        numberManagers: '',
        numberFemaleManagers: '',
        equalFifteenAndUnderEighteenEmployees: '',
        b6Value: null,
        b7Value: null,
        businessModel: null,
        businessModelOtherInput: '',
        startedESGYear: '',
        websiteCompany: '',
        fullNameManager: '',
        sexManager: null,
        nationManager: '',
        workPlaceManager: '',
        emailManager: '',
        phoneNumberManager: '',
        evaluatedDate: dayjs(),
        fullName: '',
        workPlace: '',
        workUnit: '',
        email: '',
        phoneNumber: ''
    })

    const update = organizationProfile => {
        formData.companyName = organizationProfile.companyName
        formData.taxCode = organizationProfile.taxCode
        formData.foundedYear = organizationProfile.foundedYear
        formData.addressCompany = organizationProfile.addressCompany
        formData.firstManufactureFactory = organizationProfile.firstManufactureFactory
        formData.secondManufactureFactory = organizationProfile.secondManufactureFactory
        formData.registrationType = organizationProfile.registrationType
        formData.registrationTypeOtherInput = organizationProfile.registrationType === 'other' ? organizationProfile.registrationTypeOtherInput : ''
        formData.businessType = organizationProfile.businessType
        formData.fullTimeEmployees = organizationProfile.fullTimeEmployees
        formData.femaleFullTimeEmployees = organizationProfile.femaleFullTimeEmployees
        formData.partTimeEmployees = organizationProfile.partTimeEmployees
        formData.femalePartTimeEmployees = organizationProfile.femalePartTimeEmployees
        formData.seasonalEmployees = organizationProfile.seasonalEmployees
        formData.femaleSeasonalEmployees = organizationProfile.femaleSeasonalEmployees
        formData.numberManagers = organizationProfile.numberManagers
        formData.numberFemaleManagers = organizationProfile.numberFemaleManagers
        formData.equalFifteenAndUnderEighteenEmployees = organizationProfile.equalFifteenAndUnderEighteenEmployees
        formData.b6Value = organizationProfile.b6Value
        formData.b7Value = organizationProfile.b7Value
        formData.businessModel = organizationProfile.businessModel
        formData.businessModelOtherInput = organizationProfile.businessModel === 'other' ? organizationProfile.businessModelOtherInput : ''
        formData.startedESGYear = organizationProfile.startedESGYear
        formData.websiteCompany = organizationProfile.websiteCompany
        formData.fullNameManager = organizationProfile.fullNameManager
        formData.sexManager = organizationProfile.sexManager
        formData.nationManager = organizationProfile.nationManager
        formData.workPlaceManager = organizationProfile.workPlaceManager
        formData.emailManager = organizationProfile.emailManager
        formData.phoneNumberManager = organizationProfile.phoneNumberManager
        formData.evaluatedDate = dayjs(organizationProfile.evaluatedDate)
        formData.fullName = organizationProfile.fullName
        formData.workPlace = organizationProfile.workPlace
        formData.workUnit = organizationProfile.workUnit
        formData.email = organizationProfile.email
        formData.phoneNumber = organizationProfile.phoneNumber
    }

    return {formData, update}
})
