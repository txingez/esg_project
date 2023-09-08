<script setup>
import Banner from "../components/Banner.vue";
import {onMounted, ref} from "vue";

const documentToShow = ref([])

const allDocuments = [
    {
        id: 1,
        type: 'link',
        title: 'Nghị quyết 136/NQ-CP 2020 phát triển bền vững',
        href: 'https://chinhphu.vn/default.aspx?pageid=27160&docid=201074',
        resource: 'Chính phủ',
        datePublic: '25/09/2020',
        image: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/08/070820/080820/140820/180620/220820/250820/quoc-huy-vn-300820.jpg'
    },
    {
        id: 2,
        type: 'link',
        title: 'Quyết định số 622/QĐ-TTg của Thủ tướng Chính phủ: Về việc ban hành Kế hoạch hành động quốc gia thực hiện Chương trình nghị sự 2030 vì sự phát triển bền vững',
        href: 'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=189713',
        resource: 'Thủ tướng Chính phủ',
        datePublic: '10-05-2017',
        image: 'https://static.mediacdn.vn/baochinhphu/image/TT.png'
    },
    {
        id: 3,
        type: 'link',
        title: 'Quyết định số 1658/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt Chiến lược quốc gia về tăng trưởng xanh giai đoạn 2021 - 2030, tầm nhìn 2050',
        href: 'https://vanban.chinhphu.vn/?pageid=27160&docid=204226',
        resource: 'Thủ tướng Chính phủ',
        datePublic: '01-10-2021',
        image: 'https://static.mediacdn.vn/baochinhphu/image/TT.png'
    },
    {
        id: 4,
        type: 'link',
        title: 'Nghị định 06/2022/NĐ-CP quy định về giảm nhẹ phát thải khí nhà kính và bảo vệ tầng ô-dôn',
        href: 'https://vanban.chinhphu.vn/?pageid=27160&docid=205039',
        resource: 'Chính phủ',
        datePublic: '07-01-2022',
        image: 'https://cdnmedia.baotintuc.vn/Upload/DMDnZyELa7xUDTdLsa19w/files/2020/08/070820/080820/140820/180620/220820/250820/quoc-huy-vn-300820.jpg'
    },
    {
        id: 5,
        type: 'link',
        title: 'Quyết định số 889/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt Chương trình hành động quốc gia về sản xuất và tiêu dùng bền vững giai đoạn 2021 - 2030',
        href: 'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=200310',
        resource: 'Thủ tướng Chính phủ',
        datePublic: '24-06-2020',
        image: 'https://static.mediacdn.vn/baochinhphu/image/TT.png'
    },
    {
        id: 6,
        type: 'link',
        title: 'Quyết định số 1362/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt kế hoạch phát triển bền vững doanh nghiệp khu vực tư nhân đến năm 2025, tầm nhìn 2030',
        href: 'https://vanban.chinhphu.vn/default.aspx?pageid=27160&docid=198093',
        resource: 'Thủ tướng Chính phủ',
        datePublic: '11-10-2019',
        image: 'https://static.mediacdn.vn/baochinhphu/image/TT.png'
    },
    {
        id: 7,
        type: 'link',
        title: 'Quyết định 1604/QĐ-NHNN Phê duyệt Đề án phát triển ngân hàng xanh tại Việt Nam',
        href: 'https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Quyet-dinh-1604-QD-NHNN-2018-phe-duyet-De-an-phat-trien-ngan-hang-xanh-tai-Viet-Nam-411378.aspx',
        resource: 'Ngân hàng nhà nước',
        datePublic: '07-08-2018',
        image: 'https://cdn.haitrieu.com/wp-content/uploads/2022/08/logo-ngan-hang-nha-nuoc-viet-nam.png'
    },
    {
        id: 8,
        type: 'link',
        title: 'Quyết định số 687/QĐ-TTg của Thủ tướng Chính phủ: Phê duyệt Đề án Phát triển kinh tế tuần hoàn ở Việt Nam',
        href: 'https://vanban.chinhphu.vn/?pageid=27160&docid=205921',
        resource: 'Thủ tướng Chính phủ',
        datePublic: '07-06-2022',
        image: 'https://static.mediacdn.vn/baochinhphu/image/TT.png'
    },
    {
        id: 9,
        type: 'content',
        title: 'Những lợi ích trong việc thực hành ESG trong doanh nghiệp',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc8yG1htSdWO-Psk_b74WbUoMsDyg2YDoXj2NoSUwtbWnrryScnDz5InWt_BDZj6nAJ6FK8wqh4pSeupUfKp4oItS56uWWvD1vJHOLMoJ3foKiJTv4eryd1w1EWlbvjVoNhDlnCgP-fqVJbV7YhuXdU=w1956-h1956-s-no?authuser=0'
    },
    {
        id: 10,
        type: 'content',
        title: 'Khung đánh giá ESG: Yếu tố các Doanh nghiệp phát triển bền vững không thể bỏ qua',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-K9ihidMgHSEMeQwX1T6ZuofOuCS--npzDOI5pYM2HkryOx9yW5p2DuvIE465DITwilh8NqWNS4E46k__bcrT0LGFoQz_84vwmXhxTXoMD1Vv8HmAd5wnSAAwPkQgB-l8L424WWx91rNinrFLtVKk=w2964-h1956-s-no?authuser=0'
    },
    {
        id: 11,
        type: 'content',
        title: 'Lựa chọn mô hình kinh doanh nào là bền vững trong thời kì suy thoái kinh tế 2023?',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc8GJEIrUEE5p_RI1ZdMTX7YAvI_5rT0WCRLwIz_MIksHIaMzRoSYMYrRO88MtUbd_Vk63zKz_PEdxperrFjw9h5wTADq8NGLh2THpY47rhmCGjXRpW67sAkoclOiqAzY7yhpfOpmv6uNcYQLJ4jwNk=w2766-h1956-s-no?authuser=0'
    },
    {
        id: 12,
        type: 'content',
        title: 'Triển khai ESG - chìa khoá cạnh tranh đưa thương hiệu ra biển lớn!',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc84Z7GB-CDqveZqYzbLy4hRoEmK1fMtUsVEhyspncX-PzkjrULuTtKykpQdL-NuRNN68SD7NnrRV6udNT9dznp_q5C2U4wQ2Ywgp3LA5ASaMJ8-quwlRraEdSr1VK2tDqI4NjRUc1b6VbhRLs_6teU=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 13,
        type: 'content',
        title: 'ESG và Tác động của khung đánh giá đối với việc Đóng góp vào việc Xây dựng Chính sách Tăng trưởng Xanh của Việt Nam',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc9GscvaLH-8lLM2Gct-rN2K5yiWLwayoHy3F77jGLcz6XmWV4jXuKsPpDoYszxHtT-VTpYFoYdJDXDFZJ4O0gbrO-EDIwbLPZhzTdGLVoaBhno_AdPdfaBpzxiVKPKnP_F6HsV9JqvNe2jbAF1whsI=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 14,
        type: 'content',
        title: 'Kinh doanh bao trùm - Hướng phát triển bền vững và tất yếu cho doanh nghiệp',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-ONpHqCDLR3SkMY6jjHA6J4OvyrmW_kVRdZoCdi9ifFJVV-5I9PaXXa79Nb65R3Zv4YtnNY5UujW4jRmAtfA9xM8k-kkUXUTyz7DgXg9yhQPk50ZwOzQqSJo4yizTtCLGJbW6Ci3a9GUdIqSfhUsE=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 15,
        type: 'content',
        title: 'Khung phân tích ReSOLVE trong đánh giá chiến lược hoạt động theo hướng kinh tế tuần hoàn',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-eo3nxlCtffs1AZqCizlMhVK1kZ-EX6oilA_hLsXmVVGRScU0rLAblALPYKdxlL2i37frW-ZlwtfBDOSXkVWvH6bip-IIx5cFueGcq9IVyBxzo8b0hId8EXsED8Ll8Doatt2zTp7LT7neKMkZJjsQ=w3478-h1956-s-no?authuser=0'
    },
    {
        id: 16,
        type: 'content',
        title: 'Kinh doanh bao trùm: Cơ hội cho tất cả',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc_ctkHRsjm7hbA6oZFimRU2XQrAoKWwVmwddqRvhZIDT_9GXnbzyaTfFxQWTCX8ZVL8Nt1OppRclqIAUmG8u3fj_Q0mD-ke4j6sFGVXaQNnZzjlzFQcYoI-SCSaHOq0tCtwmmFN8tESCGFe870F5Rw=w3260-h1956-s-no?authuser=0'
    },
    {
        id: 17,
        type: 'content',
        title: 'Kinh tế tuần hoàn: Xu hướng kinh doanh bền vững mới',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-KBT0MuFPpu29IIvnMc4tZj1gcUYx44eY3NPy5rUi51QrGJHTZXGm656tMq4bBsenJxG_n0aLnp7MCQis9sLqLNetttZt2UEGBdnY6UbGcEWyHpLtes8DdUdYei6UzGGUpN_nbQDH0-ol3Dh9GS58=w3482-h1506-s-no?authuser=0'
    },
    {
        id: 18,
        type: 'content',
        title: 'Những điều doanh nghiệp cần biết về kinh tế tuần hoàn và khung đánh giá ESG',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-RSoSKp0th5coF0QDkiJ5CETvqdl86Edy5wb9dbNWjNxZywzep8YG8x_fgde8ASbaOF_lrccZI6MKWqg13QYPbsK42oTdypA9cMY6255hewGnmB7hzpcg2Awd9G7gcEZfaCwIR5JlRxQLltSoQ_wM=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 19,
        type: 'content',
        title: 'Đo lường hiệu suất ESG: Cách các công ty theo dõi tác động đến môi trường và xã hội',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc8ZievwawILCMTCR8cuFO9MNBRLJ4YFQL4BHfaU972u6EbE6aeckTbq3aGQi2YzpWYWyr-Y014d05JGGnf5tQ-0AD1kk8M4s2SWN8zNlUG3RAgJDGhgmCs21t73WQ-m_SBdba5UA0qllmcOZw4eBpA=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 20,
        type: 'content',
        title: 'Làng gốm Bát Tràng và hành trình phát triển bền vững',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-4XwEql3GRWtThQmh8e4t3LoboOa_LHJN-vpJrhyFShmg3ZbohpKVZ4KLwpQ5eSMPxbROj3oGzvtruBXUzpVfJYe9G9j6TKOfgw9AZKWVs3RzkoMVr9nih-DHJE-0iXj9ABoDo9rjJ51bSybGpv04=w1280-h849-s-no?authuser=0'
    },
    {
        id: 21,
        type: 'content',
        title: 'Tài liệu tham khảo',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc-Ixq33PzJPpTowjLRQjl-A-EUs1uJutTUvNxf5miG0UvuCDAA975PExcYB0q9_KZyNHrCp846kokkzsyAc3z14ZuxK-YQhGpw56NjYxnjJezsONa-DCoxzrgJ1a32m08oBVwYgWtJZkHUongsUeQg=w2934-h1956-s-no?authuser=0'
    },
    {
        id: 22,
        type: 'content',
        title: 'ESG là gì?',
        resource: 'Tài liệu tổng hợp',
        datePublic: '02-09-2023',
        image: 'https://lh3.googleusercontent.com/pw/AIL4fc9PygqviQehiiQ7SRYGCU7rPZAI59_FAN8qZVbbwRLmsw5MOucX_IMpHLttlhPsdvPrrRX512l11CvwYVbBl9o3zZAA8Sed3C9_op1UsPwZ_BokN7p8bk6Nvg8agOar1IMhEfndcVfzGdDTNLbDCQQ=w2934-h1956-s-no?authuser=0'
    }
]

onMounted(() => {
    documentToShow.value = allDocuments.slice(0, 8)
})

const showMore = () => {
    documentToShow.value = allDocuments.slice(0, documentToShow.value.length + 8)
}
</script>

<template>
    <Banner label="thư viện"
            img-src="https://lh3.googleusercontent.com/pw/AIL4fc9QwXF_mbUEfbpQWnx3pmvZxKgsJ6Xfy1kQkFiNLIaeWv-6GdLPfTXmVkXINRb-2rScZJ3K_Jwtd_WgHha1E4aAOKhYkbXl4DYt5B_VSII4ISSY33Xw4PF5YsUwW5a71-eatho_OfE5CDty7qOSdl0=w2934-h1956-s-no?authuser=0"/>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 space-y-5">
        <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
            <a-card v-for="document in documentToShow">
                <template #cover>
                    <a v-if="document.type === 'link'" :href="document.href" target="_blank"><img
                            class="h-[200px] w-full" :src="document.image" alt=""></a>
                    <router-link v-else :to="`/library/detail/${document.id}`">
                        <img class="h-[200px] w-full" :src="document.image" alt="">
                    </router-link>
                </template>
                <div class="space-y-2">
                    <a v-if="document.type === 'link'" :href="document.href" target="_blank"
                       class="font-bold line-clamp-2 text-ellipsis text-base">
                        {{ document.title }}
                    </a>
                    <router-link v-else :to="`/library/detail/${document.id}`"
                                 class="font-bold line-clamp-2 text-ellipsis text-base">
                        {{ document.title }}
                    </router-link>
                    <div>
                        <div>Nguồn: <span>{{ document.resource }}</span></div>
                        <div>Ngày phát hành: <span>{{ document.datePublic }}</span></div>
                    </div>
                </div>
            </a-card>
        </div>
        <div class="text-center" v-if="documentToShow.length < allDocuments.length">
            <a-button @click.prevent="showMore" class="min-h-[50px] min-w-[150px]">Xem thêm</a-button>
        </div>
    </div>
</template>
