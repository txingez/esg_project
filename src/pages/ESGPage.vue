<script setup>

import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, ref } from "vue";
import { SUCCESS_STORIES } from "../constants/successStories.js";

const screenWidth = ref(0)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const srcViewer = ref('')

const routes = [
	{name: 'Home', to: '/'},
	{name: 'Sáng kiến ESG Việt Nam', to: '/esg-vietnam'},
]

const titleStories = 'Câu chuyện điển hình về kinh doanh bền vững'
const timelineContents = [
	{
		time: 'Tháng 3 - Tháng 4/2023',
		title: 'Mở cổng đăng kí hồ sơ tham gia Sáng kiến ESG Việt Nam Đợt 1 - Năm 2023',
		description: 'Tiếp nhận 144 hồ sơ đăng ký từ các doanh nghiệp, hợp tác xã, hộ kinh doanh trên khắp cả nước.',
		bgColor: '#46b8e9'
	},
	{
		time: '12/5/2023',
		title: 'Đào tạo cơ bản về kinh doanh bền vững',
		description: 'Dành cho tất cả các doanh nghiệp đăng ký tham gia chương trình',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHdmuiSYbAlzfZabZzQDg60zkjAWFS3cp1q0ESXKX7Y2Bekfs-wnkt5w6FKV0jy4bHmqXZrj8GMl1A0XB-nKKtRKZNsI9uSa3YPQ_ByVYjT62pbhOq0pGMSQIFmDjPUvM8Q-mR-TlymuY6Iymz6MNjYq=w1724-h970-s-no?authuser=0',
		bgColor: '#3ee9d1'
	},
	{
		time: '6/2023',
		title: 'Công bố Top 10 doanh nghiệp xuất sắc nhất tham gia Vòng chung kết',
		description: 'Top 10 doanh nghiệp được nhận đào tạo và tư vấn chuyên sâu 1-1 nhằm nâng cao năng lực và hiểu biết về ESG, kinh tế tuần hoàn và kinh doanh bao trùm, từ đó điều chỉnh và hoàn thiện kế hoạch triển khai ESG và kinh doanh bền vững tại doanh nghiệp',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHe8f_vNwCpAWURJwIuJ57thmy2vbK7l0S9vBk01mObpLXxnnqzwcT3iulaA1XIq4HX_X8_tDisXif9hJ8C3hYSfV1VIc9DbXfugw170MTkIwMQ4RKHay1rumiXCxntrMjqCxO29_OzQw7MLvion4Wud=w1315-h738-s-no?authuser=0',
		bgColor: '#72a3e1'
	},
	{
		time: '21-22/6/2023',
		title: 'Đào tạo trực tiếp - Chủ đề: “Thúc đẩy kinh doanh bền vững”',
		description: 'Chương trình đào tạo trực tiếp, kéo dài 2 ngày tại TP. Hồ Chí Minh, được thiết kế dành riêng cho Top 10 doanh nghiệp tham gia Vòng chung kết\n' +
			'–  \tTìm hiểu và lên kế hoạch triển khai ESG (Môi trường – Xã hội – Quản trị) trong doanh nghiệp.\n' +
			'–  \tNâng cao hiểu biết và chia sẻ kinh nghiệm áp dụng các xu hướng kinh doanh bền vững: Kinh doanh bao trùm, Kinh tế tuần hoàn.\n' +
			'–  \tHiểu biết về các quy định pháp luật liên quan và hỗ trợ của nhà nước dành cho doanh nghiệp thực hành ESG và kinh doanh bền vững.',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHeuTA9FW06KSUilvWLixteI-G-buaTc9oTmx20vW7_9hv1QXAuTsxy9ljZ7zTtFcFsLcORxZypJ5Mx6vWJkCV63y13AA0giwI-0r9m8LEnlxp4hZEURbiei2-hObaHVCD68gzFzFdHBcogkzGO89SCy=w1167-h640-s-no?authuser=0',
		bgColor: '#4d92eb'
	},
	{
		time: '18/07/2023',
		title: 'Phiên làm việc trực tuyến - Chủ đề: Lộ trình hỗ trợ Top 10 doanh nghiệp trong khuôn khổ Vòng chung kết',
		description: '–  \tTìm hiểu lộ trình hỗ trợ doanh nghiệp và xác định cách xây dựng đề xuất chi tiết trong khuôn khổ Vòng chung kết chương trình Sáng kiến ESG Việt Nam 2023.\n' +
			'–  \tGiới thiệu phương pháp tư vấn 1-1 và làm quen với các chuyên gia',
		bgColor: '#46b8e9'
	},
	{
		time: 'Tháng 7/2023 - Tháng 8/2023',
		title: 'Top 10 doanh nghiệp nhận tư vấn chuyên sâu 1-1',
		description: 'Các doanh nghiệp được tư vấn 1-1 bởi các chuyên gia hàng đầu trong lĩnh vực kinh doanh bền vững nhằm xây dựng kế hoạch triển khai ESG và hoàn thiện đề xuất sáng kiến ESG, với tổng thời gian tư vấn cho 10 DN lên đến 80 giờ.',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHdrKNhrWf1cIJEo0wZK_HaNl1OWe8LOnc9beIEYZqCsqzvco6lPQJ4n1Now5MyL4E_IoSFBBUlMPsXgmBUEEONR0G37hZLAKzZdbo2X8G5Yo-URpsfEcqaem198FDfgEf-_HBIKDfUfDwwHGVHKkDzC=w974-h500-s-no?authuser=0',
		bgColor: '#3ee9d1'
	},
	{
		time: '10-11/8/2023',
		title: 'Phiên làm việc trực tuyến - Chủ đề: “Xác định vấn đề trọng yếu và Xây dựng báo cáo ESG cho doanh nghiệp”',
		description: '–  \tXác định các vấn đề trọng yếu của doanh nghiệp liên quan tới môi trường, xã hội và quản trị\n' +
			'–  \tXây dựng kế hoạch và chiến lược ESG của doanh nghiệp\n' +
			'–  \tHoàn thiện đề xuất sáng kiến ESG trong khuôn khổ chương trình',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHcgKse7lttwQnhPYoef-WrrlOBTeMlgitGtbtdxfTSdZ6GvG8GVq_C7y0vlaWkkHg78gzLmmZOWJQ0ZvKd-yBI3vLYBFR-qoqYnOcxbKUiqAIDFJeCiWcg23hDP5m4QwUgWvoLpZ8Gtw-9lGP5M9SNM=w970-h970-s-no?authuser=0',
		bgColor: '#3ee9d1'
	},
	{
		time: '25/08/2023',
		title: 'Phiên làm việc trực tuyến - Chủ đề: “Tổng quan về kiểm kê phát thải khí nhà kính và tín chỉ carbon”',
		description: '–  \tGiới thiệu tổng quan về khí nhà kính (KNK)\n' +
			'–  \tCác khái niệm về kiểm kê KNK, các phương pháp kiểm kê và hàm ý\n' +
			'–  \tTìm hiểu các chính sách liên quan có tác động tới hoạt động doanh nghiệp (DN)\n' +
			'–  \tKhái niệm cơ bản về tín chỉ carbon\n' +
			'–  \tCơ hội và phương thức tham gia thị trường carbon',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHddOmTWdXdS-zAlh5i6O6XQUy0FjX3q7wiNmKlb92NN_sRMtRo6u2s-nThrHUrachfzEmCQBDv4gCtYWYJ2qlmzCWz5hm6oEMebArjINs4KasGOUklWU6OvxnARyRG9cTXqwEAm21MWPkQEIETeLYWS=w1000-h563-s-no?authuser=0',
		bgColor: '#4d92eb'
	},
	{
		time: '28/08/2023',
		title: 'Phiên làm việc trực tuyến - Chủ đề: “Kỹ năng pitching”',
		description: '–  \tNhững điểm cần lưu ý khi chuẩn bị và tiến hành pitching (thuyết trình dự án)\n' +
			'–  \tLuyện tập pitching nhằm chuẩn bị cho phiên thuyết trình ý tưởng trước Hội đồng đánh giá',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHcKoO6jZahQ_z0EvWQRWiTF_5jPJtOCLgmhoBTBli-01M416h-MDWR3WmaB1FXQW3Of828SMt91ndIJ_XIFQrc53IPxcSFWTNNsPlN4RMvDA0u3ZkmPLEN7WaKxh2WraaS-iowTQ91btEHxEjDpf8vv=w1217-h688-s-no?authuser=0',
		bgColor: '#72a3e1'
	},
	{
		time: '7/9/2023',
		title: 'Buổi thuyết trình chung kết Sáng kiến ESG Việt Nam 2023',
		description: 'Top 10 doanh nghiệp trình bày về các đề xuất, sáng kiến triển khai ESG và thực hành kinh doanh bền vững tại doanh nghiệp trước Hội đồng đánh giá',
		image: 'https://lh3.googleusercontent.com/pw/ADCreHeVrrN8dMMnmhyjbOt4ZYPNW3yWNhg533WVbfVh9eDJnSwp69UE11l0JIFfZYEMmsmtICarRq4wKGZgCHPI5ANMNw9E9De4cA3cZaKv27U54M4_aLsnuTyiyfctQSWAbx2LIT3yV8nrH7uTcfVJCMF_=w1293-h970-s-no?authuser=0',
		bgColor: '#3ee9d1'
	},
]

const updateScreenWidth = () => {
	screenWidth.value = window.innerWidth;
}

const onScreenResize = () => {
	window.addEventListener("resize", () => {
		updateScreenWidth();
	});
}

onMounted(() => {
	updateScreenWidth()
	onScreenResize()
	storiesToShow.value = SUCCESS_STORIES.slice(0, 6)
})

const showMore = () => {
	const newStoriesToShow = SUCCESS_STORIES.slice(0, storiesToShow.value.length + 6)
	storiesToShow.value = newStoriesToShow
	isAllStories.value = newStoriesToShow.length === SUCCESS_STORIES.length
}

const setVisible = (story) => {
	isVisible.value = true
	srcViewer.value = story.content
}

const closeImageViewer = () => {
	isVisible.value = false
	srcViewer.value = ''
}
</script>

<template>
    <div v-if="isVisible"
         class="fixed z-[1000] p-1 left-0 top-0 w-screen h-screen overflow-auto bg-black bg-opacity-70 flex justify-center items-center">
        <font-awesome-icon
                class="absolute top-0 right-0 -translate-x-6 translate-y-6 text-4xl text-white hover:cursor-pointer"
                icon="fa-solid fa-xmark"
                @click.prevent="closeImageViewer"/>
        <img :src="srcViewer" alt="">
    </div>

    <div class="">
        <img src="https://lh3.googleusercontent.com/pw/ADCreHenCPlk7_vpRNMLY0ia25bizXzCsfDvrqQysdtatMCeMi2bbNDOMpdmyOJV3-PA8iXUR9llr9wEEXja5cG0iPvBtuNhjvRzOHjzHy1oCqYNFKACjFza3XtWxWyKp7EJ2knV5fmA5wxr7lvDvnLaCNrS=w1600-h900-s-no?authuser=0"
             class="w-full"
             alt="banner_esg">
    </div>
    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <BreadCrumb :routes="routes"/>
        <div>
            <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mt-5 mb-10">
                Giới thiệu "Sáng kiến ESG Việt Nam 2023"
            </div>
            <div class="text-justify">
                <p>
                    <strong>ESG</strong> là cụm từ viết tắt của <strong>"Environmental"</strong> (Môi trường), <strong>“Social”</strong>
                    (Xã hội), và <strong>“Governance”</strong> (Quản trị doanh nghiệp). Đây là khung đánh giá để đo
                    lường
                    các yếu tố liên quan đến phát triển bền vững và ảnh hưởng của doanh nghiệp đến cộng đồng.
                </p>
                <p>
                    <strong>Sáng kiến ESG Việt Nam 2023 (Vietnam ESG Initiative 2023)</strong> là chương trình hỗ trợ
                    các
                    doanh nghiệp kinh doanh bền vững triển khai thực hành khung đánh giá ESG.
                </p>
                <iframe src="https://www.youtube.com/embed/AkbGz3CYvqE?si=0T0X31Q3Hf0JWH14"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen></iframe>
                <p>
                    Sáng kiến được hình thành trong khuôn khổ hợp tác giữa Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) và
                    Bộ
                    Kế hoạch và Đầu tư, nhằm thúc đẩy tăng trưởng bền vững và bao trùm trong khu vực kinh tế tư nhân tại
                    Việt Nam. Sáng kiến này là một phần của Dự án Tăng cường năng lực cạnh tranh khu vực tư nhân Việt
                    Nam
                    (USAID IPSC) do Cơ quan Phát triển Quốc tế Hoa Kỳ (USAID) tài trợ và Cục Phát triển doanh nghiệp
                    thuộc
                    Bộ Kế hoạch và Đầu tư là chủ dự án.
                </p>
                <p>
                    Sáng kiến ESG Việt Nam 2023 là một trong những nỗ lực góp phần vào thực hiện Chiến lược tăng trưởng
                    xanh
                    của Việt Nam giai đoạn 2021-2030 và Quyết định 167/QD-TTg 2022 của Thủ tướng Chính phủ về Chương
                    trình
                    hỗ trợ doanh nghiệp khu vực tư nhân kinh doanh bền vững. Việc áp dụng thực hành ESG sẽ giúp nâng cao
                    sức
                    cạnh tranh của các doanh nghiệp khi tham gia vào chuỗi cung ứng xanh toàn cầu.
                </p>
                <p>
                    Là sáng kiến đầu tiên của USAID tại Việt Nam về ESG dành cho các doanh nghiệp, sáng kiến sẽ
                    <strong>tài trợ thí điểm, triển khai hoặc nhân rộng 3 sáng kiến xuất sắc</strong> trong lĩnh vực
                    kinh tế
                    tuần hoàn
                    và kinh doanh bao trùm, nhằm lan tỏa các mô hình kinh doanh bền vững với <strong>tổng giá trị hỗ trợ
                    kỹ
                    thuật lên tới 2 tỷ đồng</strong>.
                </p>
            </div>
        </div>
    </div>
    <div class="bg-[url(https://main.ipsc.vn/hubfs/raw_assets/public/IPSC%20v2/css/images/graphics/bg-support-project.png)]
    text-white md:px-10 lg:px-[100px] xl:px-[150px] px-5 pb-20">
        <div class="xl:text-[40px] lg:text-[34px] md:text-[28px] text-2xl leading-none text-center py-10 font-bold">
            <div v-if="screenWidth <= 430">
                <div>Lợi ích khi tham gia</div>
                <div>Sáng kiến ESG Việt Nam 2023</div>
            </div>
            <span v-else>Lợi ích khi tham gia Sáng kiến ESG Việt Nam 2023</span>
        </div>
        <div class="text-justify space-y-8">
            <div class="space-y-1">
                <div class="font-semibold xl:text-2xl md:text-xl text-lg">
                    1. Cơ hội nhận hỗ trợ kỹ thuật với tổng giá trị lên tới 2 tỷ đồng
                </div>
                <div>
                    Top 3 doanh nghiệp giành chiến thắng chung cuộc sẽ được nhận hỗ trợ kỹ thuật chuyên sâu từ Dự án
                    USAID IPSC nhằm thí điểm, triển khai, hoặc nhân rộng các sáng kiến ESG xuất sắc.
                    <span class="underline">Tổng giá trị tài trợ kỹ thuật lên tới 2 tỷ đồng</span>.
                </div>
            </div>
            <div class="space-y-1">
                <div class="font-semibold xl:text-2xl md:text-xl text-lg">
                    2. Được đào tạo, tư vấn hoàn thiện mô hình kinh doanh lồng ghép ESG
                </div>
                <div>
                    Top 10 doanh nghiệp vào vòng chung kết sẽ được tham gia chương trình đào tạo/tư vấn của Dự án
                    USAID IPSC (kéo dài 4-6 tuần) nhằm nâng cao hiểu biết về mô hình kinh tế tuần hoàn và kinh doanh
                    bao trùm, điều chỉnh/hoàn thiện mô hình kinh doanh lồng ghép các yếu tố ESG, và xây dựng/hoàn
                    thiện kế hoạch triển khai ESG tại doanh nghiệp.
                </div>
            </div>
            <div class="space-y-1">
                <div class="font-semibold xl:text-2xl md:text-xl text-lg">
                    3. Được hỗ trợ mở rộng mạng lưới kinh doanh bền vững
                </div>
                <div>
                    Các doanh nghiệp tham gia chương trình sẽ được hỗ trợ tiếp cận các đối tác trong và ngoài nước ở
                    cả cấp trung ương và địa phương hỗ trợ hệ sinh thái kinh doanh bền vững nhằm phát triển mạng
                    lưới, mở rộng quan hệ đối tác và học hỏi nâng cao kiến thức, kinh nghiệm về áp dụng ESG, kinh tế
                    tuần hoàn và kinh doanh bao trùm.
                </div>
            </div>
            <div class="space-y-1">
                <div class="font-semibold xl:text-2xl md:text-xl text-lg">
                    4. Được hỗ trợ tiếp cận các chương trình hỗ trợ khác và nhà đầu tư
                </div>
                <div>
                    Các doanh nghiệp tham gia chương trình sẽ được nâng cao năng lực và khả năng tiếp cận các chương
                    trình hỗ trợ của nhà nước, quỹ đầu tư, tổ chức tín dụng, và các tổ chức khác dành cho doanh
                    nghiệp kinh doanh bền vững tại Việt Nam.
                </div>
            </div>
            <div class="space-y-1">
                <div class="font-semibold xl:text-2xl md:text-xl text-lg">
                    5. Được nâng cao hiểu biết về ESG
                </div>
                <div>
                    Các doanh nghiệp tham gia chương trình sẽ được nâng cao hiểu biết về tầm quan trọng của ESG, các
                    công cụ đánh giá ESG từ góc nhìn của nhà đầu tư, các tổ chức tín dụng, các thị trường xuất khẩu
                    trọng tâm, và các quy định pháp luật liên quan.
                </div>
            </div>
        </div>
    </div>

    <div class="bg-[url(https://main.ipsc.vn/hubfs/raw_assets/public/IPSC%20v2/css/images/graphics/bg-support-enterprise.png)]
    md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
            Điều kiện tham gia chương trình
        </div>
        <div class="text-justify">
            <div class="mb-10">Để tham gia chương trình, các doanh nghiệp Việt Nam cần đáp ứng các tiêu chí sau đây:
            </div>
            <div class="md:px-16 mb-10">
                <ul class="list-[square] list-inside">
                    <li>
                        Là tổ chức/đơn vị kinh tế Việt Nam, bao gồm các doanh nghiệp tư nhân, hợp tác xã, và hộ kinh
                        doanh, với không quá 500 nhân viên toàn thời gian và đang không có tranh chấp pháp lý.
                    </li>
                    <li>
                        Hoạt động trong các lĩnh vực ưu tiên của dự án USAID IPSC (nông-lâm-ngư nghiệp, công nghiệp chế
                        biến và chế tạo, công nghệ thông tin, logistics, du lịch và sản phẩm hỗ trợ).
                    </li>
                    <li>
                        Có mô hình kinh doanh hiệu quả, tạo ra lợi nhuận.
                    </li>
                    <li>
                        Áp dụng mô hình kinh tế tuần hoàn hoặc/và mô hình kinh doanh bao trùm.
                        <div>
                            <ul class="md:pl-10">
                                <li>
                                    Mô hình kinh tế tuần hoàn: Có mô hình kinh doanh, với các thực hành xanh, với các
                                    giải pháp chuyển đổi tuần hoàn thượng nguồn (upstream, ở đầu chuỗi giá trị) thông
                                    qua hoạt động thiết kế, sản xuất, tiêu dùng và dịch vụ nhằm giảm khai thác nguyên
                                    liệu, vật liệu, kéo dài vòng đời sản phẩm, hạn chế chất thải phát sinh và giảm thiểu
                                    tác động xấu đến môi trường và khí hậu, không tạo ra rủi ro về môi trường và khí hậu
                                    tại thời điểm sản xuất kinh doanh và trong tương lai..
                                </li>
                                <li>
                                    Mô hình kinh doanh bao trùm: Có mô hình kinh doanh/chuỗi giá trị sáng tạo, có sự
                                    tham gia của người thu nhập thấp (ở vai trò cung cấp, tiêu dùng, phân phối, người
                                    lao động, v.v) qua đó giải quyết các vấn đề của người thu nhập thấp, tạo thêm thu
                                    nhập, cải thiện chất lượng cuộc sống, cung cấp sản phẩm dịch vụ có chất lượng tốt,
                                    giá cả phù hợp, dễ tiếp cận với người thu nhập thấp.
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        Có kế hoạch chuyển đổi sang kinh doanh bền vững hoặc mở rộng mô hình kinh doanh bền vững, cam
                        kết hành động thí điểm để chuyển đổi/nhân rộng sáng kiến kinh doanh bền vững.
                    </li>
                </ul>
            </div>
            <div>
                Tìm hiểu thêm về mô hình kinh tế tuần hoàn và mô hình kinh doanh bao trùm
                <a href="https://esg-demo.web.app/library/detail/14"
                   target="_blank"
                   class="text-blue-600 font-semibold">tại đây</a>.
            </div>
        </div>
    </div>

    <section id=timeline class="py-16 bg-[#f7f7f7]">
        <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
            Lộ trình lựa chọn và hỗ trợ doanh nghiệp
        </div>
        <div class="lg:grid lg:grid-cols-2 grid-cols-1 relative">
            <div v-for="(tlc, index) in timelineContents" class="demo-card-block flex border-1 border-[#bdbdbd] lg:py-5 md:p-0 lg:static lg:m-0 lg:after:hidden
            relative m-auto after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:border-l after:border-[#bdbdbd]">
                <div class="demo-card h-fit md:!max-w-[60%] lg:!max-w-[450px] shadow-md">
                    <div class="head border-none flex-col gap-1 h-[160px] p-2 !items-start"
                         :class="`bg-[${tlc.bgColor}] after:border-[${tlc.bgColor}]`">
                        <div class="bg-black bg-opacity-10 p-2.5">
                            <span class="text-xl font-semibold">{{ tlc.time }}</span>
                        </div>
                        <div class="text-xl px-2">
                            {{ tlc.title.toUpperCase() }}
                        </div>
                    </div>
                    <div class="body">
                        <p class="whitespace-pre-wrap text-base">{{ tlc.description }}</p>
                        <div :class="tlc.image ? '' :'h-[235px]' ">
                            <img v-if="tlc.image" :src="tlc.image" alt="Graphic">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
        <div class="text-[#004990] xl:text-3xl md:text-2xl text-lg text-center mb-10">
            {{ titleStories }}
        </div>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-24 mt-[45px]">
            <div class="relative hover:cursor-pointer" v-for="story in storiesToShow"
                 @click.prevent="setVisible(story)">
                <div class="h-[250px] w-full border border-[#c1da73] rounded-[10px] overflow-hidden">
                    <img class="rounded-[10px] h-full w-full hover:scale-110 transition-all duration-500 ease-in-out" :src="story.thumbnail"
                         :alt="story.name">
                </div>
                <div class="bg-white rounded-[10px] p-2.5 flex justify-between 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
                     @click.prevent="setVisible(story)">
                    <div class="flex justify-between gap-2 h-[70px]">
                        <div class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-[0.05em] text-[#263238] flex items-end">
                            <div class="line-clamp-3 text-ellipsis">
                                {{ story.description }}
                            </div>
                        </div>
                        <div class="w-[50px] self-end flex items-end min-h-[70px]">
                            <img class="w-[20px] h-[20px]" src="../assets/arrow_right.png"
                                 alt="arrow_right">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-[120px] text-center mb-[50px]" v-if="!isAllStories">
            <a-button
                    class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
                    @click.prevent="showMore">
                XEM THÊM
            </a-button>
        </div>
    </div>
</template>

<style scoped>
iframe {
    margin: 20px auto;
    width: calc(100vw - 50%);
    height: 500px;
}

@media screen and (max-width: 430px) {
    iframe {
        width: 100%;
        height: 250px;
    }
}

@media screen and (min-width: 431px) and (max-width: 768px) {
    iframe {
        width: calc(100vw - 40%);
        height: 300px;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    iframe {
        width: calc(100vw - 50%);
        height: 350px;
    }
}

@media (min-width: 1000px) {
    #timeline .demo-card:nth-child(even) .head::after, #timeline .demo-card:nth-child(odd) .head::after {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
    }

    #timeline .demo-card:nth-child(even) .head::before, #timeline .demo-card:nth-child(odd) .head::before {
        position: absolute;
        content: "";
        width: 9px;
        height: 9px;
        background-color: #bdbdbd;
        border-radius: 9px;
        box-shadow: 0px 0px 2px 8px #f7f7f7;
    }
}

/* Some Cool Stuff */

#timeline .demo-card {
    position: relative;
    display: block;
    margin: 10px auto 80px;
    max-width: 94%;
    z-index: 2;
}

#timeline .demo-card-block:nth-child(odd) {
    justify-self: end;
    border-right: 1px solid #000;
}

#timeline .demo-card-block:nth-child(even) {
    justify-self: start;
}

@media only screen and (max-width: 768px) {
    #timeline .demo-card-block:nth-child(odd) {
        border-right: none;
    }
}

@media (min-width: 1000px) {
    #timeline .demo-card {
        max-width: 450px;
    }

    #timeline .demo-card-block:nth-child(odd) .demo-card {
        margin-right: 45px;
    }

    #timeline .demo-card-block:nth-child(odd) .demo-card .head::after {
        border-left-width: 15px;
        border-left-style: solid;
        left: 100%;
        top: 40%;
    }

    #timeline .demo-card-block:nth-child(odd) .demo-card .head::before {
        left: 491.5px;
        top: 47%;
    }

    #timeline .demo-card-block:nth-child(even) .demo-card {
        margin-left: 45px;
        transform: translateY(100px);
    }

    #timeline .demo-card-block:nth-child(even) .demo-card .head::after {
        border-right-width: 15px;
        border-right-style: solid;
        left: -14px;
        top: 40%;
    }

    #timeline .demo-card-block:nth-child(even) .demo-card .head::before {
        right: 489.5px;
        top: 47%;
    }
}

#timeline .demo-card .head {
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    font-weight: 400;
}

#timeline .demo-card .body {
    background: #fff;
    border: 1px solid rgba(191, 191, 191, 0.4);
    border-top: 0;
    padding: 15px;
}
</style>
