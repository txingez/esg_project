import {defineStore} from "pinia";
import {reactive} from "vue";
import dayjs from "dayjs";

export const useProfileNECStore = defineStore('ProfileNEC', () => {
    const formData = reactive({
        companyName: '',
        taxCode: '',
        foundedYear: '',
        addressCompany: '',
        firstManufactureFactory: '',
        secondManufactureFactory: '',
        registrationType: null,
        insuranceEmployees: '',
        numberManagers: '',
        numberFemaleManagers: '',
        equalFifteenAndUnderEighteenEmployees: '',
        businessModel: null,
        businessModelOtherInput: '',
        address: '',
        manufactureAddress: '',
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
        formData.insuranceEmployees = payload.insuranceEmployees
        formData.numberManagers = payload.numberManagers
        formData.numberFemaleManagers = payload.numberFemaleManagers
        formData.equalFifteenAndUnderEighteenEmployees = payload.equalFifteenAndUnderEighteenEmployees
        formData.businessModel = payload.businessModel
        formData.businessModelOtherInput = payload.businessModel === 'other' ? payload.businessModelOtherInput : ''
        formData.address = payload.address
        formData.manufactureAddress = payload.manufactureAddress
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
