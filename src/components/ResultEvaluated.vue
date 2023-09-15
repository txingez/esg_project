<script setup>
import {computed} from "vue";
import {useEvaluatedResultStore} from "../stores/useEvaluatedResultStore.js";
import RadarChart from "./RadarChart.vue";
import {useRouter} from "vue-router";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import {ENUM} from "../constants/enumValues.js";

const evaluatedResultStore = useEvaluatedResultStore()
const router = useRouter()
const routeName = computed(() => router.currentRoute.value.name)

const config = computed(() => {
    switch (routeName.value) {
        case ENUM.FORM_NAME.EvaluateESGForm:
            return {
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
                        align: 'right'
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

const exportHTMLToPDF = async () => {
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'px',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16 // or "smart", default is 16
    })
    const elements = document.getElementsByClassName("result-container")
    await createPdf({doc, elements})

    doc.save(`${ENUM.FILE_NAME_EXPORT[routeName.value]}.pdf`)
}

const createPdf = async ({doc, elements}) => {
    let top = 20;
    const padding = 30;
    for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        const imgData = await htmlToImage.toPng(el);

        let elHeight = el.offsetHeight;
        let elWidth = el.offsetWidth;

        const pageWidth = doc.internal.pageSize.getWidth();

        if (elWidth > pageWidth) {
            const ratio = pageWidth / elWidth;
            //resize chart width and height proportionally
            elHeight = elHeight * ratio - padding;
            elWidth = elWidth * ratio - padding;
        }

        const pageHeight = doc.internal.pageSize.getHeight();
        //if chart do not fit to the page height
        if (top + elHeight > pageHeight) {
            doc.addPage(); // add new page
            top = 20; // reset height counter
        }

        doc.addImage(imgData, "PNG", padding - 15, top, elWidth, elHeight, `image${i}`, 'FAST');
        top += elHeight;
    }
}

</script>

<template>
    <a-table :data-source="config.dataSource" :columns="config.columns" :pagination="false" :bordered="true">
        <template #headerCell="{title, column}" class="bg-green-400">
            <div class="text-center">{{ title }}</div>
        </template>
        <template #bodyCell="{column, text}">
            <template v-if="column.key === 'name'">
                <div class="font-bold">{{ text }}</div>
            </template>
            <template v-else-if="column.key === 'distribution'">
                <div>{{ `${text}%` }}</div>
            </template>
            <template v-else>
                <div>{{ text }}</div>
            </template>
        </template>
        <template #summary>
            <a-table-summary-row class="bg-[#FAFAFA]">
                <a-table-summary-cell :col-span="config.summaryTableConfig.title" class="font-bold">
                    Tổng điểm
                </a-table-summary-cell>
                <a-table-summary-cell :col-span="config.summaryTableConfig.value" class="text-right font-bold">
                    {{ config.summaryPoint }}
                </a-table-summary-cell>
            </a-table-summary-row>
            <a-table-summary-row class="bg-[#FAFAFA]">
                <a-table-summary-cell :col-span="config.summaryTableConfig.title" class="font-bold">
                    Xếp hạng
                </a-table-summary-cell>
                <a-table-summary-cell :col-span="config.summaryTableConfig.value" class="text-right font-bold">
                    {{ config.rateInfo.rate }}
                </a-table-summary-cell>
            </a-table-summary-row>
            <a-table-summary-row v-if="config.showConclude" class="bg-[#FAFAFA]">
                <a-table-summary-cell :col-span="config.summaryTableConfig.title" class="font-bold">
                    Doanh nghiệp có tiềm năng đạt tiêu chuẩn nhận
                    hỗ trợ của CP Doanh nghiệp đủ điều kiện tiếp cận các hỗ trợ chính sách theo Quyết định số
                    167/QĐ-TTg ngày 8/2/2022 về Chương trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững
                    giai đoạn 2022-2025 hay không?
                </a-table-summary-cell>
                <a-table-summary-cell :col-span="config.summaryTableConfig.value" class="text-right font-bold">
                    {{ config.summaryPoint < 50 ? 'Không đạt' : 'Có tiềm năng đạt' }}
                </a-table-summary-cell>
            </a-table-summary-row>
        </template>
    </a-table>

    <div class="flex justify-center">
        <div class="xl:w-1/2 xl:h-1/2 md:w-2/3 md:h-2/3 w-full h-full">
            <RadarChart id="chart_result"
                        :labels="config.chartLabels"
                        :data="config.chartData"
                        :title-display="true"
                        :title-label="config.chartTitle"
                        :circular="true"/>
        </div>
    </div>

    <div class="flex gap-5 flex-col py-5">
        <div class="font-bold text-xl">Đề xuất cho doanh nghiệp</div>
        <div v-html="config.rateInfo.suggest"/>
    </div>

    <div>
        <a-button type="primary" class="bg-[#1677ff] h-[50px] w-[150px]" @click.prevent="exportHTMLToPDF">
            Lấy kết quả
        </a-button>
    </div>
</template>
