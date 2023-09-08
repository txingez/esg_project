<script setup>

import Banner from "../components/Banner.vue";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {handleAccessForm} from "../utils/handleClickEvaluate.js";

const router = useRouter()
const isAuth = computed(() => {
    const token = sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)
    return !!token
})
</script>

<template>
    <Banner label="Tổng quan về ESG"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc8n68X2EL_7ci4BtLsWK-DbgMqsNW9oxh7C3GtU_cpDOkSt-MwEy6ADnCS1QYLAV0TEkG-IXqF8oxw4LoJ0GX66fFSod36j-MaTL-KXIMNVtFkyH0IFardEJxAFVwjyi8UvhkYHzrCc9WSrtBRdXJsr=w612-h318-s-no?authuser=0"/>

    <div class="flex flex-col md:px-10 lg:px-[150px] xl:px-[200px] px-5 gap-2 py-10 text-justify">
        <p>
            Trong bối cảnh các quốc gia thành viên của Liên Hợp Quốc, trong đó có Việt Nam, đang tích cực tham gia tiến
            trình hiện thực hóa 17 Mục tiêu Phát triển Bền vững (SDGs), đồng thời hướng đến nền kinh tế xanh, tăng
            trưởng
            xanh và phát triển bền vững. Các yếu tố này cũng được cụ thể hóa bằng nhiều quy định, tiêu chí tại các Hiệp
            định
            thương mại tự do (FTA) thế hệ mới song phương và đa phương mà Việt Nam đã ký kết tham gia. Do đó, việc gắn
            kết
            chiến lược phát triển bền vững với các mục tiêu kinh doanh sẽ giúp doanh nghiệp đạt được một số lợi ích sau:
        </p>
        <ul class="list-disc pl-10">
            <li>
                <div>
                    Việc đáp ứng được các quy định, tiêu chuẩn đang liên tục thay đổi và ngày càng chặt chẽ, sẽ gia tăng
                    khả năng cạnh tranh của doanh nghiệp khi tham gia chuỗi cung ứng toàn cầu.
                </div>
            </li>
            <li>
                <div>
                    Phát triển bền vững còn giúp doanh nghiệp nâng cao uy tín, hình ảnh và thu hút nhiều người tiêu dùng
                    thế hệ mới.
                </div>
            </li>
            <li>
                <div>
                    Doanh nghiệp có nền tảng quản trị tốt, trách nhiệm với môi trường, xã hội sẽ nhận được lòng tin của
                    đối tác, nhà đầu tư và từ đó dễ dàng hơn trong việc tiếp cận các nguồn vốn xanh và thu hút nguồn
                    nhân lực chất lượng cao.
                </div>
            </li>
            <li>
                <div>
                    Áp dụng các mô hình kinh doanh bền vững với các giải pháp khai thác hiệu quả tài nguyên, sử dụng hợp
                    lý năng lượng, ưu tiên các nguồn năng lượng sạch, năng lượng tái tạo sẽ giúp tối ưu hóa chi phí sản
                    xuất, vận hành cho doanh nghiệp, từ đó mang lại tỷ suất lợi nhuận cao hơn.
                </div>
            </li>
        </ul>
        <p class="text-3xl font-bold">
            Các Mục tiêu Phát triển Bền vững tại Việt Nam
        </p>
        <p>
            Các Mục tiêu Phát triển Bền vững kêu gọi hành động toàn cầu nhằm xóa đói giảm nghèo, bảo vệ môi trường và
            khí hậu trái đất và đảm bảo mọi người ở khắp mọi nơi có thể tận hưởng hòa bình và thịnh vượng. Đây là những
            mục tiêu mà Liên Hợp Quốc đang thực hiện ở Việt Nam.
        </p>
        <div class="grid md:grid-cols-4 xl:grid-cols-6 grid-cols-3 gap-5 md:my-10 my-2">
            <div>
                <img src="../assets/pages/overview/SDG-1.svg" alt="sdg_1">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-2.svg" alt="sdg_2">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-3.svg" alt="sdg_3">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-4.svg" alt="sdg_4">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-5.svg" alt="sdg_5">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-6.svg" alt="sdg_6">
            </div>

            <div>
                <img src="../assets/pages/overview/SDG-7.svg" alt="sdg_7">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-8.svg" alt="sdg_8">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-9.svg" alt="sdg_9">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-10.svg" alt="sdg_10">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-11.svg" alt="sdg_11">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-12.svg" alt="sdg_12">
            </div>

            <div>
                <img src="../assets/pages/overview/SDG-13.svg" alt="sdg_13">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-14.svg" alt="sdg_14">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-15.svg" alt="sdg_15">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-16.svg" alt="sdg_16">
            </div>
            <div>
                <img src="../assets/pages/overview/SDG-17.svg" alt="sdg_17">
            </div>
        </div>

        <p>
            Việt Nam đã và đang tích cực xây dựng cũng như triển khai các giải pháp thúc đẩy tăng trưởng xanh và bền
            vững như một số chính sách, chương trình nhằm nâng cao nhận thức, hỗ trợ và khuyến khích doanh nghiệp áp
            dụng các mô hình kinh doanh bền vững, cân bằng giữa các lợi ích kinh tế, xã hội và môi trường, như “Chương
            trình hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững giai đoạn 2022-2025” theo Quyết định số
            167/QĐ-TTg ngày 08 tháng 02 năm 2022 của Thủ tướng Chính phủ (Chương trình 167). Các mô hình kinh doanh bền
            vững được quy định theo Chương trình 167 bao gồm: mô hình kinh doanh áp dụng kinh tế tuần hoàn, mô hình kinh
            doanh bao trùm và mô hình kinh doanh hướng tới sự phát triển bền vững, đảm bảo hài hòa các yếu tố bền vững
            về các mặt kinh tế, bảo vệ môi trường, ứng phó biến đổi khí hậu và giải quyết các vấn đề an sinh xã hội.
        </p>
        <p class="font-bold italic m-0">→ Có thể bạn quan tâm: </p>
        <router-link to="/library/detail/14" class="font-bold italic underline">Tổng quan về mô hình kinh doanh áp dụng
            kinh tế tuần hoàn
        </router-link>
        <router-link to="/library/detail/11" class="font-bold italic underline">Tổng quan về mô hình kinh doanh bao
            trùm
        </router-link>

        <p>
            ESG (Environmental - Môi trường, Social - Xã hội và Governance - Quản trị) là 3 trụ cột trong xu thế kinh
            doanh mới, gắn bó chặt chẽ với nhau. Thực hiện ESG cũng chính là sản xuất và kinh doanh bền vững, như tinh
            thần của Quyết định 167/QĐ-TTg của Thủ tướng Chính phủ ban hành năm 2022. Việc các doanh nghiệp thực hiện
            kinh doanh hướng tới phát triển bền vững, thực hành khung đánh giá ESG không chỉ là trách nhiệm, quy định
            buộc phải tuân thủ mà sẽ trở thành giá trị cốt lõi và mục tiêu thành công dài hạn của doanh nghiệp.
        </p>
        <p class="font-bold italic">→ Có thể bạn quan tâm:
            <router-link to="/library/detail/22" class="underline">Tổng quan về ESG</router-link>
        </p>
        <div>Doanh nghiệp có thể tự đánh giá mức độ áp dụng thực hành ESG
            <a @click.prevent="handleAccessForm(isAuth, 'ESG')" class="underline">tại đây</a>
        </div>
        <div>Doanh nghiệp có thể tự đánh giá mức độ áp dụng nguyên tắc kinh tế tuần hoàn
            <a @click.prevent="handleAccessForm(isAuth, 'NEC')" class="underline">tại đây</a>
        </div>
        <!--        <div>Doanh nghiệp có thể tự đánh giá mức độ áp dụng nguyên tắc kinh doanh bao trùm-->
        <!--            <router-link to="" class="underline">tại đây</router-link>-->
        <!--        </div>-->
    </div>
</template>
