<script setup>
import BreadCrumb from "../components/BreadCrumb.vue";
import { nextTick, onMounted, ref } from 'vue';
import { HistoryOutlined, StarOutlined } from '@ant-design/icons-vue'
import { getHistories } from "../services/evaluatedForm.js";
import { useJwt } from '@vueuse/integrations/useJwt'
import { handleError } from "../utils/handleErrorMessage.js";
import dayjs from "dayjs";
import { ENUM } from "../constants/enumValues.js";
import { useRouter } from "vue-router";

const router = useRouter()

const count = 3;

const initLoading = ref(true);
const loading = ref(false);
const isAll = ref(false);
const currentOffset = ref(0);
const data = ref([]);
const list = ref([]);

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Đánh giá kinh doanh bền vững', to: '/evaluate'},
	{name: 'Lịch sử đánh giá', to: '/history'},
]

const getData = (body) => {
	getHistories(body)
		.then((res) => {
			const dataConverted = res.data.data.results.map(result => {
				const {payload} = useJwt(result.data)
				return {
					id: result.id,
					form_id: result.form_id,
					form_result: payload.value
				}
			})
			const newData = [...data.value, ...dataConverted];
			data.value = newData;
			list.value = newData;
			if (dataConverted.length < count) {
				isAll.value = true
			}
		})
		.catch((err) => {
			console.log(err)
			handleError(err)
		})
		.finally(() => {
			initLoading.value = false;
			loading.value = false;
			nextTick(() => {
				// Resetting window's offsetTop so as to display react-virtualized demo underfloor.
				// In real scene, you can using public method of react-virtualized:
				// https://stackoverflow.com/questions/46700726/how-to  -use-public-method-updateposition-of-react-virtualized
				window.dispatchEvent(new Event('resize'));
			});
		})
}

onMounted(() => {
	const body = {
		limit: count,
		offset: currentOffset.value,
		user_id: localStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
	}
	getData(body)
});

const onLoadMore = () => {
	loading.value = true;
	list.value = [...data.value, ...[...new Array(count)].map(() => ({
		loading: true,
		form_result: {data: {result: {}, organizationProfile: {}}}
	}))]
	const body = {
		limit: count,
		offset: currentOffset.value + count,
		user_id: localStorage.getItem(import.meta.env.ENV_USER_ID_KEY)
	}
	getData(body)
	currentOffset.value = currentOffset.value + count
};

const handleShowResult = id => {
	router.push(`/result-evaluated/${id}`)
}

const handleFormName = form_id => {
	switch (form_id) {
		case ENUM.FORM_ID.ESG:
			return 'MỨC ĐỘ THỰC HÀNH KINH DOANH BỀN VỮNG CỦA DOANH NGHIỆP THEO KHUNG MÔI TRƯỜNG-XÃ HỘI-QUẢN TRỊ (ESG)'
		case ENUM.FORM_ID.NEC:
			return 'MỨC ĐỘ ÁP DỤNG NGUYÊN TẮC KINH TẾ TUẦN HOÀN CỦA DOANH NGHIỆP'
	}
}
</script>

<template>
    <div class="md:px-10 lg:px-[100px] px-5 mt-2.5 xl:min-h-[calc(100vh_-_154px_-_437px
    )] lg:min-h-[calc(100vh_-_115px_-_425px)] md:min-h-[calc(100vh_-_120px_-_389px)]">
        <BreadCrumb :routes="routes"/>
        <div class="md:text-3xl text-2xl my-5 text-gray-600">Lịch sử đánh giá</div>

        <div class="pb-10">
            <a-list :data-source="list"
                    :loading="initLoading"
                    bordered
                    item-layout="vertical"
                    size="large">
                <template #loadMore>
                    <div v-if="!initLoading && !loading && !isAll"
                         class="text-center py-5">
                        <a-button @click="onLoadMore">Xem thêm</a-button>
                    </div>
                </template>
                <template #renderItem="{ item, index }">
                    <a-list-item :class="index % 2 ? '' : 'bg-gray-50'">
                        <template #actions>
                            <span class="flex items-center gap-2">
                                <StarOutlined/>
                                {{ item.form_result.data.result.rate }}
                            </span>
                            <span class="flex items-center gap-2">
                                <HistoryOutlined/>
                                {{
                                dayjs(item.form_result.data.organizationProfile.evaluatedDate).format('DD/MM/YYYY')
                                }}
                            </span>
                        </template>
                        <template #extra>
                            <a-button class="flex items-center" @click.prevent="handleShowResult(item.id)">
                                <HistoryOutlined/>
                                Kết quả đánh giá
                            </a-button>
                        </template>
                        <a-skeleton :loading="!!item.loading" :title="false" active avatar>
                            <a-list-item-meta>
                                <template #title>
                                    <div class="space-x-3 text-xl">
                                        <font-awesome-icon icon="fa-solid fa-chart-simple"/>
                                        <span>{{ handleFormName(item.form_id) }}</span>
                                    </div>
                                </template>
                            </a-list-item-meta>
                        </a-skeleton>
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </div>
</template>
