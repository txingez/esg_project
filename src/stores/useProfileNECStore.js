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

    const update = organizationProfile => {
        formData.companyName = organizationProfile.companyName
        formData.taxCode = organizationProfile.taxCode
        formData.foundedYear = organizationProfile.foundedYear
        formData.addressCompany = organizationProfile.addressCompany
        formData.firstManufactureFactory = organizationProfile.firstManufactureFactory
        formData.secondManufactureFactory = organizationProfile.secondManufactureFactory
        formData.registrationType = organizationProfile.registrationType
        formData.insuranceEmployees = organizationProfile.insuranceEmployees
        formData.numberManagers = organizationProfile.numberManagers
        formData.numberFemaleManagers = organizationProfile.numberFemaleManagers
        formData.equalFifteenAndUnderEighteenEmployees = organizationProfile.equalFifteenAndUnderEighteenEmployees
        formData.businessModel = organizationProfile.businessModel
        formData.businessModelOtherInput = organizationProfile.businessModel === 'other' ? organizationProfile.businessModelOtherInput : ''
        formData.address = organizationProfile.address
        formData.manufactureAddress = organizationProfile.manufactureAddress
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
