<script setup>

import RadarChart from "../components/RadarChart.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getDetailForm } from "../services/evaluatedForm.js";
import { handleError } from "../utils/handleErrorMessage.js";
import dayjs from "dayjs";
import { useJwt } from '@vueuse/integrations/useJwt'
import { ENUM } from "../constants/enumValues.js";
import { RatingClassificationESG } from "../constants/ratingClassificationESG.js";
import { RatingClassificationNEC } from "../constants/ratingClassificationNEC.js";
import BreadCrumb from "../components/BreadCrumb.vue";

const router = useRouter()

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
	{name: 'Lịch sử đánh giá', to: '/history'},
	{name: 'Kết quả đánh giá', to: `/result-evaluated/${router.currentRoute.value.params.id}`},
]

const formId = ref('');
const resultData = reactive({
	profile: {
		evaluatedDate: dayjs()
	},
	columns: [],
	dataSource: [],
	summaryPoint: 0,
	rateInfo: {
		rate: null,
		suggest: null
	},
	summaryTableConfig: {},
	chartLabels: [],
	chartData: [],
	chartTitle: ''
})
const showConclude = ref(false)

onMounted(() => {
	const id = router.currentRoute.value.params.id
	getDetailForm(id)
		.then(res => {
			const resData = res.data
			formId.value = resData.form_id
			const dataDecoded = useJwt(resData.data).payload.value
			resultData.profile = {...dataDecoded.data?.organizationProfile, ...{evaluatedDate: dayjs(dataDecoded.data?.organizationProfile.evaluatedDate)}}
			resultData.columns = getColumns(resData.form_id)
			resultData.dataSource = getDataSource(resData.form_id, dataDecoded.data?.result)
			resultData.summaryPoint = dataDecoded.data?.result?.total
			resultData.rateInfo = getRateInfo(resData.form_id, dataDecoded.data?.result?.rate)

			const otherConfig = getOtherConfig(resData.form_id, dataDecoded.data?.result)
			resultData.summaryTableConfig = otherConfig.summaryTableConfig
			resultData.chartLabels = otherConfig.chartLabels
			resultData.chartData = otherConfig.chartData
			resultData.chartTitle = otherConfig.chartTitle
			showConclude.value = otherConfig.showConclude
		})
		.catch(err => {
			console.log(err)
			handleError(err)
		})
})

const getColumns = formId => {
	switch (formId) {
		case ENUM.FORM_ID.ESG:
			return [
				{
					title: '',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: 'Tổng điểm trên thang điểm 100',
					dataIndex: 'point',
					key: 'point',
					align: 'right'
				},
				{
					title: 'Phân bố tỷ trọng theo ngành',
					dataIndex: 'distribution',
					key: 'distribution',
					align: 'right',
					width: {md: 200}
				}
			]
		case ENUM.FORM_ID.NEC:
			return [
				{
					title: '',
					dataIndex: 'name',
					key: 'name'
				},
				{
					title: 'Điểm tối đa',
					dataIndex: 'max',
					key: 'max',
					align: 'right'
				},
				{
					title: 'Điểm trên thang điểm 100',
					dataIndex: 'point',
					key: 'point',
					align: 'right'
				},
				{
					title: 'Điểm tự đánh giá',
					dataIndex: 'sum',
					key: 'sum',
					align: 'right'
				}
			]
	}
}

const getDataSource = (formId, formResult) => {
	switch (formId) {
		case ENUM.FORM_ID.ESG:
			return [
				{
					name: 'E - Môi trường',
					point: formResult.environment.point,
					distribution: formResult.environment.distribution
				},
				{
					name: 'S - Xã hội',
					point: formResult.social.point,
					distribution: formResult.social.distribution
				},
				{
					name: 'G - Quản trị',
					point: formResult.governance.point,
					distribution: formResult.governance.distribution
				}
			]
		case ENUM.FORM_ID.NEC:
			return [
				{
					name: 'Nhóm tiêu chí 1: Tầm nhìn và chiến lược của doanh nghiệp',
					max: formResult.firstCriteria.max,
					sum: formResult.firstCriteria.sum,
					point: formResult.firstCriteria.point
				},
				{
					name: 'Nhóm tiêu chí 2: Áp dụng nguyên tắc tuần hoàn trong công đoạn sản xuất và tiền sản xuất',
					max: formResult.secondCriteria.max,
					sum: formResult.secondCriteria.sum,
					point: formResult.secondCriteria.point
				},
				{
					name: 'Nhóm tiêu chí 3: Áp dụng nguyên tắc tuần hoàn trong công đoạn sau bán hàng',
					max: formResult.thirdCriteria.max,
					sum: formResult.thirdCriteria.sum,
					point: formResult.thirdCriteria.point
				}
			]
	}
}

const getRateInfo = (formId, rate) => {
	const classification = (() => {
		switch (formId) {
			case ENUM.FORM_ID.ESG:
				return RatingClassificationESG

			case ENUM.FORM_ID.NEC:
				return RatingClassificationNEC
		}
	})()
	return {rate: rate, suggest: classification.find(cl => cl.rate === rate)?.suggest}
}

const getOtherConfig = (formId, formResult) => {
	switch (formId) {
		case ENUM.FORM_ID.ESG:
			return {
				showConclude: true,
				summaryTableConfig: {title: 2, value: 1},
				chartLabels: ['E-Môi trường', 'S-Xã hội', 'G-Quản trị'],
				chartData: [formResult.environment.point, formResult.social.point, formResult.governance.point],
				chartTitle: 'ĐÁNH GIÁ THỰC HÀNH ESG'
			}
		case ENUM.FORM_ID.NEC:
			return {
				showConclude: false,
				summaryTableConfig: {title: 3, value: 1},
				chartLabels: ['Nhóm tiêu chí 1', 'Nhóm tiêu chí 2', 'Nhóm tiêu chí 3'],
				chartData: [formResult.firstCriteria.sum, formResult.secondCriteria.sum, formResult.thirdCriteria.sum],
				chartTitle: 'ĐÁNH GIÁ MỨC ĐỘ ÁP DỤNG NGUYÊN TẮC KINH TẾ TUẦN HOÀN CỦA DOANH NGHIỆP TẠI VIỆT NAM'
			}
	}
}
</script>

<template>
    <div class="md:px-10 lg:px-[150px] px-5 mt-2.5 xl:min-h-[calc(100vh_-_154px_-_437px
    )] lg:min-h-[calc(100vh_-_115px_-_425px)] md:min-h-[calc(100vh_-_120px_-_389px)]">
        <BreadCrumb :routes="routes"/>
        <div class="border rounded-[10px] p-5 my-5 shadow-lg result-container">
            <div class="font-bold text-3xl text-center mb-10">
                KẾT QUẢ ĐÁNH GIÁ
            </div>
            <div class="my-3 space-y-2.5">
                <div class="md:text-xl text-base flex lg:flex-row flex-col">
                    <div class="basis-2/3 space-x-2">
                        <span class="font-bold">Tên doanh nghiệp:</span>
                        <span>{{ resultData.profile.companyName }}</span>
                    </div>
                    <div class="basis-1/3 space-x-2">
                        <span class="font-bold">Mã số doanh nghiệp:</span>
                        <span>{{ resultData.profile.taxCode }}</span>
                    </div>
                </div>
                <div>
                    <div class="flex gap-2">
                        <span>Thời gian đánh giá:</span>
                        <span>{{ resultData.profile.evaluatedDate.format('DD/MM/YYYY HH:mm:ss') }}</span>
                    </div>
                    <!--    todo: cap nhat lai domain -->
                    <div class="italic">
                        (Đánh giá trên Cổng thông tin Chương trình tại địa chỉ: https://domain.gov.vn)
                    </div>
                </div>
            </div>
            <div class="xl:px-28 lg:px-16">
                <a-table :bordered="true"
                         :columns="resultData.columns"
                         :data-source="resultData.dataSource"
                         :pagination="false"
                         class="text-xl"
                         size="middle">
                    <template #headerCell="{title, column}" class="bg-green-400">
                        <div class="text-center md:text-xl text-sm">{{ title }}</div>
                    </template>
                    <template #bodyCell="{column, text}">
                        <template v-if="column.key === 'name'">
                            <div class="font-bold md:text-xl text-sm">{{ text }}</div>
                        </template>
                        <template v-else-if="column.key === 'distribution'">
                            <div class="md:text-xl text-sm">{{ `${text.toLocaleString('vi')}%` }}</div>
                        </template>
                        <template v-else>
                            <div class="md:text-xl text-sm">{{ text.toLocaleString('vi') }}</div>
                        </template>
                    </template>
                    <template #summary>
                        <a-table-summary-row class="bg-[#FAFAFA]">
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.title"
                                                  class="font-bold md:text-xl text-sm">
                                Tổng điểm
                            </a-table-summary-cell>
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.value"
                                                  class="text-right font-bold md:text-xl text-sm">
                                {{ resultData.summaryPoint.toString().replace('.', ',') }}
                            </a-table-summary-cell>
                        </a-table-summary-row>
                        <a-table-summary-row class="bg-[#FAFAFA]">
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.title"
                                                  class="font-bold md:text-xl text-sm">
                                Xếp hạng
                            </a-table-summary-cell>
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.value"
                                                  class="text-right font-bold md:text-xl text-sm">
                                {{ resultData.rateInfo.rate }}
                            </a-table-summary-cell>
                        </a-table-summary-row>
                        <a-table-summary-row v-if="showConclude" class="bg-[#FAFAFA]">
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.title"
                                                  class="font-bold md:text-xl text-sm">
                                Doanh nghiệp có tiềm năng đạt tiêu chuẩn nhận
                                hỗ trợ của CP Doanh nghiệp đủ điều kiện tiếp cận các hỗ trợ chính sách theo Quyết định
                                số
                                167/QĐ-TTg ngày 8/2/2022 về Chương trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh
                                bền
                                vững
                                giai đoạn 2022-2025 hay không?
                            </a-table-summary-cell>
                            <a-table-summary-cell :col-span="resultData.summaryTableConfig.value"
                                                  class="text-right font-bold md:text-xl text-sm">
                                {{ resultData.summaryPoint < 50 ? 'Không đạt' : 'Có tiềm năng đạt' }}
                            </a-table-summary-cell>
                        </a-table-summary-row>
                    </template>
                </a-table>
            </div>

            <div class="flex xl:flex-row flex-col-reverse justify-between items-center">
                <div class="flex gap-5 flex-col py-5 xl:basis-1/2">
                    <div class="font-bold text-xl">Đề xuất cho doanh nghiệp</div>
                    <div v-html="resultData.rateInfo.suggest"/>
                </div>
                <div class="xl:basis-1/2 xl:w-1/2 xl:h-1/2 md:w-2/3 md:h-2/3 w-full h-full flex justify-end">
                    <RadarChart v-if="resultData.chartLabels.length !== 0 && resultData.chartData.length !== 0"
                                id="chart_result"
                                :circular="true"
                                :data="resultData.chartData"
                                :labels="resultData.chartLabels"
                                :title-display="true"
                                :title-label="resultData.chartTitle"/>
                </div>
            </div>
        </div>
    </div>
</template>
