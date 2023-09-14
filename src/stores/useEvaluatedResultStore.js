import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {IndustryCode} from "../constants/industryCode.js";
import {IndustryWeighting} from "../constants/industryWeighting.js";
import {RatingClassificationESG} from "../constants/ratingClassificationESG.js";
import {RatingClassificationNEC} from "../constants/ratingClassificationNEC.js";

export const useEvaluatedResultStore = defineStore('evaluatedResult', () => {
    const initialState = {
        environment: {max: 0, sum: 0, point: 0},
        social: {max: 0, sum: 0, point: 0},
        governance: {max: 0, sum: 0, point: 0},
        firstCriteria: {max: 0, sum: 0, point: 0},
        secondCriteria: {max: 0, sum: 0, point: 0},
        thirdCriteria: {max: 0, sum: 0, point: 0}
    }
    const resultPoint = reactive(initialState)
    const industryCode = ref('')

    const update = (key, newVal) => resultPoint[key] = newVal

    const updateIndustryCode = businessModel => industryCode.value = IndustryCode[businessModel]

    const getIndustryWeighting = () => {
        return {
            E: IndustryWeighting[industryCode.value].E,
            S: IndustryWeighting[industryCode.value].S,
            G: IndustryWeighting[industryCode.value].G
        }
    }

    const getSummaryESG = () => {
        const industryWeightingESG = getIndustryWeighting()
        return ((resultPoint.environment.point * (industryWeightingESG.E / 100)) + (resultPoint.social.point * (industryWeightingESG.S / 100)) + (resultPoint.governance.point * (industryWeightingESG.G / 100))).toFixed(2)
    }

    const getRateInfoESG = () => {
        const summaryESG = getSummaryESG()
        const classification = RatingClassificationESG.find(cl => {
            return summaryESG >= cl.min && (cl.max === 100 ? summaryESG <= cl.max : summaryESG < cl.max)
        })

        const rate = classification.rate
        const suggest = classification.suggest
        return {rate, suggest}
    }

    const getSummaryNEC = () => {
        return (resultPoint.firstCriteria.sum + resultPoint.secondCriteria.sum + resultPoint.thirdCriteria.sum)
    }

    const getRateInfoNEC = () => {
        const summaryNEC = getSummaryNEC()
        const classification = RatingClassificationNEC.find(cl => {
            return summaryNEC >= cl.min && (cl.max === 100 ? summaryNEC <= cl.max : summaryNEC < cl.max)
        })

        const rate = classification.rate
        const suggest = classification.suggest
        return {rate, suggest}
    }

    const reset = () => {
        industryCode.value = ''
        Object.assign(resultPoint, initialState)
    }

    return {
        resultPoint,
        industryCode,
        update,
        updateIndustryCode,
        reset,
        getIndustryWeighting,
        getSummaryESG,
        getRateInfoESG,
        getSummaryNEC,
        getRateInfoNEC
    }
})
