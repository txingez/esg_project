<script setup>
import { computed } from "vue";
import { useEvaluatedResultStore } from "../stores/useEvaluatedResultStore.js";
import RadarChart from "./RadarChart.vue";
import { useRouter } from "vue-router";
import { ENUM } from "../constants/enumValues.js";
import { useProfileESGStore } from "../stores/useProfileESGStore.js";
import { useProfileNECStore } from "../stores/useProfileNECStore.js";

const evaluatedResultStore = useEvaluatedResultStore()
const profileESGStore = useProfileESGStore()
const profileNECStore = useProfileNECStore()
const router = useRouter()
const routeName = computed(() => router.currentRoute.value.name)

const config = computed(() => {
	switch (routeName.value) {
		case ENUM.FORM_NAME.EvaluateESGForm:
			return {
				profile: profileESGStore.formData,
				columns: [
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
				],
				dataSource: [
					{
						name: 'E - Môi trường',
						point: evaluatedResultStore.resultPoint.environment.point,
						distribution: industryWeighting.value.E
					},
					{
						name: 'S - Xã hội',
						point: evaluatedResultStore.resultPoint.social.point,
						distribution: industryWeighting.value.S
					},
					{
						name: 'G - Quản trị',
						point: evaluatedResultStore.resultPoint.governance.point,
						distribution: industryWeighting.value.G
					}
				],
				summaryPoint: evaluatedResultStore.getSummaryESG(),
				rateInfo: evaluatedResultStore.getRateInfoESG(),
				showConclude: true,
				summaryTableConfig: {title: 2, value: 1},
				chartLabels: ['E-Môi trường', 'S-Xã hội', 'G-Quản trị'],
				chartData: [evaluatedResultStore.resultPoint.environment.point, evaluatedResultStore.resultPoint.social.point, evaluatedResultStore.resultPoint.governance.point],
				chartTitle: 'ĐÁNH GIÁ THỰC HÀNH ESG'
			}
		case ENUM.FORM_NAME.EvaluateNECForm:
			return {
				profile: profileNECStore.formData,
				columns: [
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
				],
				dataSource: [
					{
						name: 'Nhóm tiêu chí 1: Tầm nhìn và chiến lược của doanh nghiệp',
						max: evaluatedResultStore.resultPoint.firstCriteria.max,
						sum: evaluatedResultStore.resultPoint.firstCriteria.sum,
						point: evaluatedResultStore.resultPoint.firstCriteria.point
					},
					{
						name: 'Nhóm tiêu chí 2: Áp dụng nguyên tắc tuần hoàn trong công đoạn sản xuất và tiền sản xuất',
						max: evaluatedResultStore.resultPoint.secondCriteria.max,
						sum: evaluatedResultStore.resultPoint.secondCriteria.sum,
						point: evaluatedResultStore.resultPoint.secondCriteria.point
					},
					{
						name: 'Nhóm tiêu chí 3: Áp dụng nguyên tắc tuần hoàn trong công đoạn sau bán hàng',
						max: evaluatedResultStore.resultPoint.thirdCriteria.max,
						sum: evaluatedResultStore.resultPoint.thirdCriteria.sum,
						point: evaluatedResultStore.resultPoint.thirdCriteria.point
					}
				],
				summaryPoint: evaluatedResultStore.getSummaryNEC(),
				rateInfo: evaluatedResultStore.getRateInfoNEC(),
				showConclude: false,
				summaryTableConfig: {title: 3, value: 1},
				chartLabels: ['Nhóm tiêu chí 1', 'Nhóm tiêu chí 2', 'Nhóm tiêu chí 3'],
				chartData: [evaluatedResultStore.resultPoint.firstCriteria.sum, evaluatedResultStore.resultPoint.secondCriteria.sum, evaluatedResultStore.resultPoint.thirdCriteria.sum],
				chartTitle: 'ĐÁNH GIÁ MỨC ĐỘ ÁP DỤNG NGUYÊN TẮC KINH TẾ TUẦN HOÀN CỦA DOANH NGHIỆP TẠI VIỆT NAM'
			}
	}
})
const industryWeighting = computed(() => evaluatedResultStore.getIndustryWeighting())
</script>

<template>
    <div class="my-3 space-y-2.5">
        <div class="md:text-xl text-base flex lg:flex-row flex-col">
            <div class="basis-2/3 space-x-2">
                <span class="font-bold">Tên doanh nghiệp:</span>
                <span>{{ config.profile.companyName }}</span>
            </div>
            <div class="basis-1/3 space-x-2">
                <span class="font-bold">Mã số doanh nghiệp:</span>
                <span>{{ config.profile.taxCode }}</span>
            </div>
        </div>
        <div>
            <div class="flex gap-2">
                <span>Thời gian đánh giá:</span>
                <span>{{ config.profile.evaluatedDate.format('DD/MM/YYYY HH:mm:ss') }}</span>
            </div>
            <!--    todo: cap nhat lai domain -->
            <div class="italic">
                (Đánh giá trên Cổng thông tin Chương trình tại địa chỉ: https://esg.business.gov.vn)
            </div>
        </div>
    </div>
    <div class="xl:px-28 lg:px-16">
        <a-table :bordered="true"
                 :columns="config.columns"
                 :data-source="config.dataSource"
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
                    <a-table-summary-cell :col-span="config.summaryTableConfig.title"
                                          class="font-bold md:text-xl text-sm">
                        Tổng điểm
                    </a-table-summary-cell>
                    <a-table-summary-cell :col-span="config.summaryTableConfig.value"
                                          class="text-right font-bold md:text-xl text-sm">
                        {{ config.summaryPoint.toString().replace('.', ',') }}
                    </a-table-summary-cell>
                </a-table-summary-row>
                <a-table-summary-row class="bg-[#FAFAFA]">
                    <a-table-summary-cell :col-span="config.summaryTableConfig.title"
                                          class="font-bold md:text-xl text-sm">
                        Xếp hạng
                    </a-table-summary-cell>
                    <a-table-summary-cell :col-span="config.summaryTableConfig.value"
                                          class="text-right font-bold md:text-xl text-sm">
                        {{ config.rateInfo.rate }}
                    </a-table-summary-cell>
                </a-table-summary-row>
                <a-table-summary-row v-if="config.showConclude" class="bg-[#FAFAFA]">
                    <a-table-summary-cell :col-span="config.summaryTableConfig.title"
                                          class="font-bold md:text-xl text-sm">
                        Doanh nghiệp có tiềm năng đạt tiêu chuẩn nhận
                        hỗ trợ của CP Doanh nghiệp đủ điều kiện tiếp cận các hỗ trợ chính sách theo Quyết định số
                        167/QĐ-TTg ngày 8/2/2022 về Chương trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững
                        giai đoạn 2022-2025 hay không?
                    </a-table-summary-cell>
                    <a-table-summary-cell :col-span="config.summaryTableConfig.value"
                                          class="text-right font-bold md:text-xl text-sm">
                        {{ config.summaryPoint < 50 ? 'Không đạt' : 'Có tiềm năng đạt' }}
                    </a-table-summary-cell>
                </a-table-summary-row>
            </template>
        </a-table>
    </div>

    <div class="flex xl:flex-row flex-col-reverse justify-between items-center">
        <div class="flex gap-5 flex-col py-5 xl:basis-1/2">
            <div class="font-bold text-xl">Đề xuất cho doanh nghiệp</div>
            <div v-html="config.rateInfo.suggest"/>
        </div>
        <div class="xl:basis-1/2 xl:w-1/2 xl:h-1/2 md:w-2/3 md:h-2/3 w-full h-full flex justify-end">
            <RadarChart id="chart_result"
                        :circular="true"
                        :data="config.chartData"
                        :labels="config.chartLabels"
                        :title-display="true"
                        :title-label="config.chartTitle"/>
        </div>
    </div>
</template>
