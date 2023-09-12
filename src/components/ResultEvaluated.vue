<script setup>
import {computed} from "vue";
import {useEvaluatedResultStore} from "../stores/useEvaluatedResultStore.js";
import RadarChart from "./RadarChart.vue";
import {useRouter} from "vue-router";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

const evaluatedResultStore = useEvaluatedResultStore()
const router = useRouter()

const summaryESGPoint = computed(() => evaluatedResultStore.getSummaryESG())
const rateInfo = computed(() => evaluatedResultStore.getRateInfoESG())
const industryWeighting = computed(() => evaluatedResultStore.getIndustryWeighting())

const columns = [
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
]

const dataSource = computed(() => {
    const routeName = router.currentRoute.value.name
    return (() => {
        switch (routeName) {
            case 'EvaluateESGForm':
                return [
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
                ]
            case 'EvaluateNECForm':
                return [
                    {
                        name: 'Nhóm tiêu chí 1: Tầm nhìn và năng lực của doanh nghiệp',
                        point: evaluatedResultStore.resultPoint.firstCriteria.point,
                        distribution: industryWeighting.value.FC
                    },
                    {
                        name: 'Nhóm tiêu chí 2: Áp dụng nguyên tắc tuần hoàn trong sản xuất và tiền sản xuất',
                        point: evaluatedResultStore.resultPoint.secondCriteria.point,
                        distribution: industryWeighting.value.SC
                    },
                    {
                        name: 'Nhóm tiêu chí 3: Áp dụng nguyên tắc tuần hoàn trong dịch vụ sau bán hàng',
                        point: evaluatedResultStore.resultPoint.thirdCriteria.point,
                        distribution: industryWeighting.value.TC
                    }
                ]
            default:
                return []
        }
    })()
})


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

    doc.save(`result.pdf`)
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
    <div class="result-container">
        <a-table :data-source="dataSource" :columns="columns" :pagination="false" :bordered="true">
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
                    <a-table-summary-cell :col-span="2" class="font-bold">Tổng điểm ESG</a-table-summary-cell>
                    <a-table-summary-cell class="text-right font-bold">{{ summaryESGPoint }}</a-table-summary-cell>
                </a-table-summary-row>
                <a-table-summary-row class="bg-[#FAFAFA]">
                    <a-table-summary-cell :col-span="2" class="font-bold">Xếp hạng</a-table-summary-cell>
                    <a-table-summary-cell class="text-right font-bold">{{ rateInfo.rate }}</a-table-summary-cell>
                </a-table-summary-row>
                <a-table-summary-row class="bg-[#FAFAFA]">
                    <a-table-summary-cell :col-span="2" class="font-bold">
                        Doanh nghiệp có tiềm năng đạt tiêu chuẩn nhận
                        hỗ trợ của CP Doanh nghiệp đủ điều kiện tiếp cận các hỗ trợ chính sách theo Quyết định số
                        167/QĐ-TTg ngày 8/2/2022 về Chương trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững
                        giai đoạn 2022-2025 hay không?
                    </a-table-summary-cell>
                    <a-table-summary-cell class="text-right font-bold">
                        {{ summaryESGPoint < 50 ? 'Không đạt' : 'Có tiềm năng đạt' }}
                    </a-table-summary-cell>
                </a-table-summary-row>
            </template>
        </a-table>

        <div class="flex justify-center">
            <div class="xl:w-1/2 xl:h-1/2 md:w-2/3 md:h-2/3 w-full h-full">
                <RadarChart id="chart_result_ESG"
                            :labels="['E-Môi trường', 'S-Xã hội', 'G-Quản trị']"
                            :data="dataSource.map(d => d.point)"
                            :title-display="true"
                            :title-label="'Đánh giá thực hành ESG'"
                            :circular="true"/>
            </div>
        </div>

        <div class="flex gap-5 flex-col py-5">
            <div class="font-bold text-xl">Đề xuất cho doanh nghiệp</div>
            <div v-html="rateInfo.suggest"/>
        </div>
    </div>

    <div>
        <a-button type="primary" class="bg-[#1677ff] h-[50px] w-[150px]" @click.prevent="exportHTMLToPDF">Lấy kết quả</a-button>
    </div>
</template>
