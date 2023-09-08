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

    const update = payload => {
        formData.companyName = payload.companyName
        formData.taxCode = payload.taxCode
        formData.foundedYear = payload.foundedYear
        formData.addressCompany = payload.addressCompany
        formData.firstManufactureFactory = payload.firstManufactureFactory
        formData.secondManufactureFactory = payload.secondManufactureFactory
        formData.registrationType = payload.registrationType
        formData.registrationTypeOtherInput = payload.registrationType === 'other' ? payload.registrationTypeOtherInput : ''
        formData.businessType = payload.businessType
        formData.fullTimeEmployees = payload.fullTimeEmployees
        formData.femaleFullTimeEmployees = payload.femaleFullTimeEmployees
        formData.partTimeEmployees = payload.partTimeEmployees
        formData.femalePartTimeEmployees = payload.femalePartTimeEmployees
        formData.seasonalEmployees = payload.seasonalEmployees
        formData.femaleSeasonalEmployees = payload.femaleSeasonalEmployees
        formData.numberManagers = payload.numberManagers
        formData.numberFemaleManagers = payload.numberFemaleManagers
        formData.equalFifteenAndUnderEighteenEmployees = payload.equalFifteenAndUnderEighteenEmployees
        formData.b6Value = payload.b6Value
        formData.b7Value = payload.b7Value
        formData.businessModel = payload.businessModel
        formData.businessModelOtherInput = payload.businessModel === 'other' ? payload.businessModelOtherInput : ''
        formData.startedESGYear = payload.startedESGYear
        formData.websiteCompany = payload.websiteCompany
        formData.fullNameManager = payload.fullNameManager
        formData.sexManager = payload.sexManager
        formData.nationManager = payload.nationManager
        formData.workPlaceManager = payload.workPlaceManager
        formData.emailManager = payload.emailManager
        formData.phoneNumberManager = payload.phoneNumberManager
        formData.evaluatedDate = dayjs(payload.evaluatedDate)
        formData.fullName = payload.fullName
        formData.workPlace = payload.workPlace
        formData.workUnit = payload.workUnit
        formData.email = payload.email
        formData.phoneNumber = payload.phoneNumber
    }

    return {formData, update}
})
