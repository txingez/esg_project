<script setup>

import BreadCrumb from "../components/BreadCrumb.vue";
import { onMounted, reactive, ref } from "vue";
import { SUCCESS_STORIES } from "../constants/successStories.js";
import { getPosts } from "../services/posts.js";
import { useJwt } from "@vueuse/integrations/useJwt";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/flicking-plugins/dist/pagination.css";
import { Arrow, Fade, Pagination } from "@egjs/flicking-plugins";
import Galleria from 'primevue/galleria';
import { handleOpenLink } from "../utils/handleOpenLink.js";
import { CaretLeftOutlined, CaretRightOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue"

const screenWidth = ref(0)
const isAllStories = ref(false)
const storiesToShow = ref([])
const isVisible = ref(false)
const visible = ref(false)
const collapseKey = ref([]);
const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 5
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '560px',
    numVisible: 2
  }
]);

const showFullscreen = ref(false)
const activeIndex = ref(0)

const pageData = reactive({
  banner: '',
  titleIntroduction: '',
  contentIntroduction: '',
  titleBenefit: '',
  contentsBenefit: [],
  titleCondition: '',
  contentCondition: '',
  titleTimeline: '',
  timelines: []
})

const plugins = ref([
  new Fade(),
  new Arrow(),
  new Pagination({
    type: 'bullet',
  })
])

const routes = [
  {name: 'Home', to: '/'},
  {name: 'Sáng kiến ESG Việt Nam', to: '/esg-vietnam'},
]

const bannerTitle = "SÁNG KIẾN ESG VIỆT NAM 2024\nĐÓN ĐẦU CƠ HỘI CHUYỂN ĐỔI XANH"
const titleStories = 'Câu chuyện điển hình: Top 10 doanh nghiệp tham gia vòng chung kết Sáng kiến ESG Việt Nam 2023'
const timelineColors = ['#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1', '#46b8e9', '#4d92eb', '#72a3e1', '#4d92eb', '#72a3e1', '#46b8e9', '#3ee9d1', '#72a3e1', '#4d92eb', '#46b8e9', '#3ee9d1', '#3ee9d1', '#4d92eb', '#72a3e1', '#3ee9d1']
const titleSupport = 'Các hạng mục hỗ trợ kỹ thuật nổi bật'
const supports = [
  {
    number: '01',
    description: 'Đào tạo, năng cao năng lực về ESG, chuyển đổi xanh, kinh tế tuần hoàn, kinh doanh bao trùm, v.v.'
  },
  {
    number: '02',
    description: 'Thuê chuyên gia tư vấn chiến lược và kế hoạch hành động về kinh doanh bền vững'
  },
  {
    number: '03',
    description: 'Xây dựng Báo cáo phát triển bền vững/ Báo cáo ESG năm đầu tiên'
  },
  {
    number: '04',
    description: 'Tiến hành kiểm kê khí nhà kính và xây dựng kế hoạch giảm phát thải'
  },
  {
    number: '05',
    description: 'Tổ chức các sự kiện, tập huấn cho đối tác trong chuỗi cung ứng về kinh doanh bền vững'
  }
]

const testimonials = [
  {
    avatar: 'https://lh3.googleusercontent.com/pw/ABLVV84ZtITf4307IVQgtBw8PO3j7BNzu-7MR_XRb0rUlhltbrudO8m4g55dyLaE1jmfKxeNQQj4gdSLATpiUXiHntWPBaPfb6ssq8jDtIuDH5erMqgdOYdMfecYx36KeK8XzpI4EvpF0y3VwgsaeVW1Hwa7=w831-h837-s-no-gm?authuser=0',
    name: 'Nguyễn Thị Phương Liên',
    title: 'Giám đốc chứng nhận, Vinasamex',
    quote: 'Thực ra đâu đó những doanh nghiệp ở đây đã làm kinh doanh bền vững, kinh doanh bao trùm, kinh tế tuần hoàn rồi. Nhưng chúng ta không xây dựng được mô hình của mình để thể hiện điêu đó ra bên ngoài cho người khác biết, thậm chí đôi khi chúng ta cũng chưa hiểu được mình chính là như thế. Qua đợt tập huấn này, chúng ta đã hiểu được mô hình của chúng ta rõ ràng hơn, đồng thời biết cách kể chuyện, đưa các chỉ số vào để khẳng định điều đó.'
  },
  {
    avatar: 'https://lh3.googleusercontent.com/pw/ABLVV87MDEeGno-nOsbRlFDUQv2S2C2qWP1BkGQHEVNAIwhtk10DAUq6JCb1vaOeH01jIaskWt72y7XsMrChUaLd6Nud36d89FQYpAcSlhOvFwVsqKcrRJOkLrayz4timb9OqGWmgShT76ZVciwa3xgwrK5R=w857-h857-s-no-gm?authuser=0',
    name: 'Châu Thị Nương',
    title: 'Giám đốc, Hợp tác xã Tà Đảnh',
    quote: 'Việc tham gia chương trình Sáng kiến ESG Việt Nam 2023 rất có ý nghĩa với chúng tôi. Đến với Vòng chung kết và khóa đào tạo ngày hôm nay, chúng tôi không ưu tiên tranh giành giải nhất, giải nhì, mà quan trọng hơn là có cơ hội học hỏi, tiếp thu những kiến thức mới, sáng kiến mới rất quý báu với doanh nghiệp. Những kiến thức về ESG và kinh doanh bền vững thu lượm được từ chương trình hôm nay sẽ giúp chúng tôi tự tin hơn trong việc vận hành kinh doanh và xây dựng thương hiệu đạt chuẩn để có thể cạnh tranh ra thị trường trong nước và quốc tế.'
  }
]

const titleGallery = 'Nhìn lại hành trình 2023'
const gallery = ref([
  {
    index: 0,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87Khw4HpfWGrR86JSrqvz-V-rWM4ySnOUffzCY2pblWKXtRMD-B7a8e6u_BKM49As17nOfdj2QkFl-y7GgMg4_5BWxRpmDIQpVf7sGVdSWBHoAhF3iMAa2RV4YYIWZuNXYzxgepxKCvzeP8cJ53o3mQ=w1920-h763-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87Khw4HpfWGrR86JSrqvz-V-rWM4ySnOUffzCY2pblWKXtRMD-B7a8e6u_BKM49As17nOfdj2QkFl-y7GgMg4_5BWxRpmDIQpVf7sGVdSWBHoAhF3iMAa2RV4YYIWZuNXYzxgepxKCvzeP8cJ53o3mQ=w1920-h763-s-no-gm?authuser=0',
    alt: '13/10/2023: Lễ vinh danh Top 10 doanh nghiệp tham gia Vòng  chung kết và Công bố Top 3 doanh nghiệp giành chiến thắng chung cuộc: \nHHP GLOBAL, VIETNAM FOOD và VINASAMEX'
  },
  {
    index: 1,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86ZUL3V861DBijh85EhSQYpeTFJY-3mxvimUuHVONG_LGz7sw4VDt-3vHOU73mR0rnwsVC2U6E4pU3WW8d7dIaFHtwh7wg36dxpiOssMy93nOIInhUlECRA8VXcBpNzb75-gGRvLfIX6LxszAX51cF6=w1721-h968-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86ZUL3V861DBijh85EhSQYpeTFJY-3mxvimUuHVONG_LGz7sw4VDt-3vHOU73mR0rnwsVC2U6E4pU3WW8d7dIaFHtwh7wg36dxpiOssMy93nOIInhUlECRA8VXcBpNzb75-gGRvLfIX6LxszAX51cF6=w1721-h968-s-no-gm?authuser=0',
    alt: '12/5/2023: Đào tạo cơ bản về kinh doanh bền vững'
  },
  {
    index: 2,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86oPWSCc-fJLyd7TgWcilIUJo2mJvYYuk4oGCF0dc_QeE1-gm27pGVue2x-u2dtkTrt4P1gw1aZETBpOuD_lC1Cuu_Imq4dLz_kOAgto1zkcsGRB_V-3IsYFK_pDeThupZUFguSXQ2dE8jsLaOYmUeL=w1315-h738-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86oPWSCc-fJLyd7TgWcilIUJo2mJvYYuk4oGCF0dc_QeE1-gm27pGVue2x-u2dtkTrt4P1gw1aZETBpOuD_lC1Cuu_Imq4dLz_kOAgto1zkcsGRB_V-3IsYFK_pDeThupZUFguSXQ2dE8jsLaOYmUeL=w1315-h738-s-no-gm?authuser=0',
    alt: '6/2023: Công bố Top 10 doanh nghiệp xuất sắc nhất tham gia Vòng chung kết'
  },
  {
    index: 3,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87rI6IJn6ZLKnmhszhRp7cQO51xqbIesdwVowF9J0XCs_4vP-I4EJhzNw5TBNbt1dTwDwL0xQVkM4w-oE98qdpOgvXICBUiFGmby5EaPhRJv826WbGsBFpL3qkWk_KQMgWvtY84_uB3eDWG69cvCffo=w1167-h640-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87rI6IJn6ZLKnmhszhRp7cQO51xqbIesdwVowF9J0XCs_4vP-I4EJhzNw5TBNbt1dTwDwL0xQVkM4w-oE98qdpOgvXICBUiFGmby5EaPhRJv826WbGsBFpL3qkWk_KQMgWvtY84_uB3eDWG69cvCffo=w1167-h640-s-no-gm?authuser=0',
    alt: '21-22/6/2023: Đào tạo trực tiếp - Chủ đề: “Thúc đẩy kinh doanh bền vững”'
  },
  {
    index: 4,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86AuOG9V_sL7_eJ8ReHU5OCNhRTgU0t0cmtp3rpAxmMeaq5A6zAxp2lqOuuvJ5jktRWVorhqmE4dPJv5oyg5rHVPoztkAFt59g4yMle8wOA3k5woUMmrDJ0n2HtDY7GCwoUBhPwQ1j6x7m0vyVzzubs=w1453-h968-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV86AuOG9V_sL7_eJ8ReHU5OCNhRTgU0t0cmtp3rpAxmMeaq5A6zAxp2lqOuuvJ5jktRWVorhqmE4dPJv5oyg5rHVPoztkAFt59g4yMle8wOA3k5woUMmrDJ0n2HtDY7GCwoUBhPwQ1j6x7m0vyVzzubs=w1453-h968-s-no-gm?authuser=0',
    alt: '21-22/6/2023: Đào tạo trực tiếp - Chủ đề: “Thúc đẩy kinh doanh bền vững”'
  },
  {
    index: 5,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87L8Yh_y3cfzpb-LYMT1wD5ZGHYlMBN6aQIJ7VaJgBkVoq6qWl43CkjmG0wfQHanD86qdzw6BNtkH2IsHt8g3r0AHrns4fKuS3y4I2CVPh1VR7lq1Ip4JqtUf3mFwSmgpE9iYno0XjoYFLRzvIq9b6Q=w974-h500-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87L8Yh_y3cfzpb-LYMT1wD5ZGHYlMBN6aQIJ7VaJgBkVoq6qWl43CkjmG0wfQHanD86qdzw6BNtkH2IsHt8g3r0AHrns4fKuS3y4I2CVPh1VR7lq1Ip4JqtUf3mFwSmgpE9iYno0XjoYFLRzvIq9b6Q=w974-h500-s-no-gm?authuser=0',
    alt: 'Tháng 7/2023 - Tháng 8/2023: Top 10 doanh nghiệp nhận tư vấn chuyên sâu 1-1'
  },
  {
    index: 6,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87WMtLKvQCEbXbA22aHWa0MLMH1ahbdqIXxDcVIOghYB9OpWlsvHHxWPZ08TPBprJnCrDr4fPHUYORVXmQz-pe80JVFKiLOW262ggr-3_-1BAhGhaVF6L93Ic1D3mkfXxT-j0tvEJVPMYhKXPBlYL2G=w968-h968-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87WMtLKvQCEbXbA22aHWa0MLMH1ahbdqIXxDcVIOghYB9OpWlsvHHxWPZ08TPBprJnCrDr4fPHUYORVXmQz-pe80JVFKiLOW262ggr-3_-1BAhGhaVF6L93Ic1D3mkfXxT-j0tvEJVPMYhKXPBlYL2G=w968-h968-s-no-gm?authuser=0',
    alt: '10-11/8/2023: Phiên làm việc trực tuyến - Chủ đề: “Xác định vấn đề trọng yếu và Xây dựng báo cáo ESG cho doanh nghiệp”'
  },
  {
    index: 7,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV843qGepZOjeTaHvzVZOQaDH45rqCo9D8-w5pIuwuxLsLqcyfjIVPteRNvzaBF6jBb5KEflh9tlfUaYU3oBGVVirqPXh_78nv-qxe3O1E1Q2hfGBylD-ViwXuECQctWtXfPDHiMVsNkF1dEAd_sNAn1C=w1000-h563-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV843qGepZOjeTaHvzVZOQaDH45rqCo9D8-w5pIuwuxLsLqcyfjIVPteRNvzaBF6jBb5KEflh9tlfUaYU3oBGVVirqPXh_78nv-qxe3O1E1Q2hfGBylD-ViwXuECQctWtXfPDHiMVsNkF1dEAd_sNAn1C=w1000-h563-s-no-gm?authuser=0',
    alt: '25/08/2023: Phiên làm việc trực tuyến - Chủ đề: “Tổng quan về kiểm kê phát thải khí nhà kính và tín chỉ carbon”'
  },
  {
    index: 8,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87rSC0Sua-PCCfiO34NfaqD7Rcr7vU4MQ6KcC1KNCjrHejO7lrUZKoi1bhVwNR9D1gvHBxM9ajCtiiISw85i1JvplISvTa_Eahg1cWV3iKaRDrKAXJl6I7lcaqbrFpDMBSPjewnt3v_FjI4fmMGuXQ_=w1217-h688-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV87rSC0Sua-PCCfiO34NfaqD7Rcr7vU4MQ6KcC1KNCjrHejO7lrUZKoi1bhVwNR9D1gvHBxM9ajCtiiISw85i1JvplISvTa_Eahg1cWV3iKaRDrKAXJl6I7lcaqbrFpDMBSPjewnt3v_FjI4fmMGuXQ_=w1217-h688-s-no-gm?authuser=0',
    alt: '28/08/2023: Phiên làm việc trực tuyến - Chủ đề: “Kỹ năng pitching”'
  },
  {
    index: 9,
    itemImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV85NpdakJ0ZTy5FtJ9mK9Rmxl6zqgtD31hMI8EdjvJbgvz8bm1HM7UfPIqB2StEJYYs8H8PYMXA8teY1nboqoMWRIDomcZlJ97sOv9QuaGJi_OM02myLMMMPwfB1qxtI0dg4fH-2XVp71Hre4tOUg8_H=w1291-h968-s-no-gm?authuser=0',
    thumbnailImageSrc: 'https://lh3.googleusercontent.com/pw/ABLVV85NpdakJ0ZTy5FtJ9mK9Rmxl6zqgtD31hMI8EdjvJbgvz8bm1HM7UfPIqB2StEJYYs8H8PYMXA8teY1nboqoMWRIDomcZlJ97sOv9QuaGJi_OM02myLMMMPwfB1qxtI0dg4fH-2XVp71Hre4tOUg8_H=w1291-h968-s-no-gm?authuser=0',
    alt: '7/9/2023: Buổi thuyết trình chung kết Sáng kiến ESG Việt Nam 2023'
  }
])

const faqs = [
  {
    key: 1,
    question: 'Doanh nghiệp có thể nộp hồ sơ đăng ký tham gia Sáng kiến ESG Việt Nam 2024 ở đâu?',
    answer: 'Doanh nghiệp quan tâm nộp hồ sơ bản mềm trước 17h ngày 31/03/2024 qua địa chỉ: https://bit.ly/dangki-esg-2024\n' +
        'Các thông tin cần cung cấp bao gồm:\n' +
        '• Thông tin tổng quan về doanh nghiệp\n' +
        '• Thông tin liên lạc của cán bộ phụ trách hồ sơ\n' +
        '• Đánh giá về thực hành ESG và kinh doanh bền vững\n' +
        '• Đề xuất sáng kiến triển khai ESG tại doanh nghiệp nhằm đón đầu cơ hội chuyển đổi xanh\n'
  },
  {
    key: 2,
    question: 'Sáng kiến ESG Việt Nam 2024 đánh giá và lựa chọn doanh nghiệp nhận hỗ trợ dựa trên những tiêu chí nào?',
    answer: 'Hội đồng đánh giá sẽ căn cứ vào các tiêu chí sau đây để đánh giá và lựa chọn các doanh nghiệp được nhận hỗ trợ từ Sáng kiến ESG Việt Nam 2024:\n' +
        '• Mô hình và hoạt động kinh doanh\n' +
        '• Tác động xã hội – môi trường\n' +
        '• Tính đổi mới sáng tạo và khả năng nhân rộng\n' +
        '• Mức độ cam kết và tính khả thi của kế hoạch triển khai ESG, chuyển đổi xanh, kinh doanh bền vững\n'
  },
  {
    key: 3,
    question: 'Doanh nghiệp sẽ nhận được những hỗ trợ gì từ chương trình?',
    answer: 'Sáng kiến ESG Việt Nam 2024 sẽ cung cấp các hỗ trợ kỹ thuật và tư vấn chuyên sâu với tổng trị giá lên tới 2 tỷ đồng cho Top 3 doanh nghiệp giành chiến thắng chung cuộc để triển khai hoặc nhân rộng các sáng kiến kinh doanh bền vững. Top 10 doanh nghiệp xuất sắc nhất sẽ được đào tạo và tư vấn chuyên sâu trong 2-3 tháng để điều chỉnh hoặc hoàn thiện mô hình kinh doanh lồng ghép các yếu tố ESG. Bên cạnh đó, tất cả các doanh nghiệp nộp hồ sơ tham gia và đáp ứng các tiêu chí của chương trình sẽ được đào tạo cơ bản nhằm nâng cao hiểu biết về ESG, chuyển đổi xanh và kinh doanh bền vững, đồng thời tiếp cận các đối tác trong và ngoài nước hỗ trợ hệ sinh thái kinh doanh bền vững.\n\n' +
        'Gói hỗ trợ kĩ thuật dành cho Top 3 doanh nghiệp giành chiến thắng chung cuộc có thể gồm các hạng mục khác nhau, được xác định tùy thuộc vào nhu cầu cụ thể của mỗi doanh nghiệp, tuy nhiên cần đảm bảo mục tiêu giúp thí điểm, triển khai hoặc nhân rộng việc thực hành ESG hoặc mô hình kinh doanh bền vững. Một số hạng mục điển hình bao gồm:\n\n' +
        '• Thuê chuyên gia đào tạo, tư vấn hoặc chuyên gia kỹ thuật đồng hành cùng doanh nghiệp, hỗ trợ doanh nghiệp lên chiến lược hoặc triển khai ESG, chuyển đổi xanh. (Ví dụ: Đào tạo, năng cao năng lực về ESG, chuyển đổi xanh; Thuê chuyên gia tư vấn chiến lược và xây dựng kế hoạch hành động về kinh doanh bền vững; Xây dựng Báo cáo Phát triển bền vững/Báo cáo ESG năm đầu tiên; Tiến hành kiểm kê khí nhà kính; Xây dựng kế hoạch giảm phát thải, v.v). Doanh nghiệp có thể đề xuất danh sách chuyên gia để Dự án USAID IPSC xem xét.\n\n' +
        '• Tổ chức các sự kiện, tập huấn liên quan, hoạt động cho nội bộ doanh nghiệp và đối tác trong chuỗi sản xuất và cung ứng của doanh nghiệp, qua đó thúc đẩy chuyển đổi xanh, tính tuần hoàn trong chuỗi cung ứng, hoặc khuyến khích sự tham gia của người thu nhập thấp, nhóm yếu thế trong chuỗi giá trị hoặc mô hình kinh doanh của doanh nghiệp.\n\n' +
        '• Các hạng mục khác sẽ được xác định tùy thuộc nhu cầu cụ thể của mỗi doanh nghiệp. Trong thời gian đào tạo và tư vấn trong phạm vi Vòng chung kết, Dự án sẽ đồng hành và hỗ trợ Quý doanh nghiệp hoàn thiện kế hoạch triển khai sáng kiến, đồng thời làm rõ và xác định nhu cầu cụ thể mà doanh nghiệp cần được hỗ trợ liên quan tới ESG, chuyển đổi xanh và kinh doanh bền vững.\n\n' +
        'Gói hỗ trợ kĩ thuật KHÔNG bao gồm các hạng mục sau:\n' +
        'a. Nghiên cứu và phát triển sản phẩm/dịch vụ ở giai đoạn đánh giá tính tiền khả thi cho dòng sản phẩm/dịch vụ mới.\n' +
        'b. Cung cấp các học bổng cho lãnh đạo, cán bộ của doanh nghiệp không liên quan đến kế hoạch triển khai hoặc chuyển đổi sang kinh doanh bền vững hoặc mở rộng mô hình kinh doanh bền vững, cam kết hành động thí điểm để chuyển đổi/nhân rộng sáng kiến kinh doanh bền vững.\n' +
        'c. Mua sắm trang thiết bị, phần mềm.\n' +
        'd. Chi phí truyền thông, quảng bá (marketing-PR) thông thường của doanh nghiệp.\n'
  },
  {
    key: 4,
    question: 'Gói hỗ trợ kỹ thuật với tổng giá trị lên tới 2 tỷ đồng dành cho Top 3 doanh nghiệp giành chiến thắng chung cuộc sẽ được giải ngân dưới hình thức nào?',
    answer: 'Kinh phí sẽ không được chuyển trực tiếp cho Doanh nghiệp, mà được giải ngân thông qua kênh mua sắm của dự án USAID IPSC. Tổng gói hỗ trợ là 2 tỷ đồng có thể không phân bổ đều cho Top 3 doanh nghiệp giành chiến thắng chung cuộc, mà mức hỗ trợ sẽ được xác định dựa trên nhu cầu của doanh nghiệp.\n' +
        'Dựa theo kế hoạch triển khai cụ thể, nhu cầu hỗ trợ và thống nhất với Top 3 doanh nghiệp thắng cuộc, Dự án sẽ tiến hành mua sắm các sản phẩm/dịch vụ cần thiết cho việc thí điểm, triển khai hoặc nhân rộng các sáng kiến ESG và mô hình kinh doanh bền vững của doanh nghiệp.\n' +
        'Lưu ý: Dự án ưu tiên cơ chế đồng đầu tư từ doanh nghiệp cho việc thí điểm, triển khai hoặc nhân rộng các sáng kiến ESG và mô hình kinh doanh bền vững được đề xuất.\n'
  },
  {
    key: 5,
    question: 'Chương trình sẽ hỗ trợ việc thí điểm, triển khai hoặc nhân rộng các sáng kiến ESG, chuyển đổi xanh và mô hình kinh doanh bền vững của doanh nghiệp trong thời gian bao lâu?',
    answer: 'Chương trình sẽ tập trung hỗ trợ Top 3 doanh nghiệp giành chiến thắng chung cuộc triển khai kế hoạch hành động trong vòng 6-12 tháng kể từ khi công bố kết quả. Thời gian triển khai cụ thể sẽ tùy thuộc kế hoạch được thống nhất giữa Dự án và Quý doanh nghiệp.'
  }
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
  getPosts('IDEA', 10, 0).then(response => {
    const getPostDatDecoded = useJwt(response.data[0].content).payload.value
    console.log(getPostDatDecoded)
    // pageData.banner = getPostDatDecoded.data.banner[0]?.url
    pageData.banner = 'https://lh3.googleusercontent.com/pw/ABLVV84zelMNQpIziyRnTV5bb0Xd9KvAagiM7OMEiZIh9GgRixdJsZO1lsYHBNlhHTQuCZO6dnhYeAv96QLhC9fsAM6qQyCezpD6esOy9ow_2q12tB35l_SHu9wn1JQukuFo9N3bZ84ivpfV5p72OI_Ao-3A=w1600-h900-s-no-gm?authuser=0'
    pageData.titleIntroduction = getPostDatDecoded.data.introduction.title
    pageData.contentIntroduction = getPostDatDecoded.data.introduction.content
    pageData.titleBenefit = getPostDatDecoded.data.benifit.headTitle
    pageData.contentsBenefit = getPostDatDecoded.data.benifit.contents
    pageData.titleCondition = getPostDatDecoded.data.condition.title
    pageData.contentCondition = getPostDatDecoded.data.condition.content
    pageData.titleTimeline = getPostDatDecoded.data.timeline.headTitle
    pageData.timelines = getPostDatDecoded.data.timeline.contents
        .filter(t => t.datetime !== '' && t.title !== '' && t.description !== '')
        .map((t, index) => ({...t, ...{bgColor: timelineColors[index]}}))
  })
  storiesToShow.value = SUCCESS_STORIES.slice(0, 3)
})

const showMore = () => {
  const newStoriesToShow = SUCCESS_STORIES.slice(0, storiesToShow.value.length + 3)
  storiesToShow.value = newStoriesToShow
  isAllStories.value = newStoriesToShow.length === SUCCESS_STORIES.length
}

const imageClick = (index) => {
  activeIndex.value = index;
  showFullscreen.value = true;
};


function scrollToSmooth(scrollContainer, x) {
  scrollContainer.scrollTo({
    left: x,
    behavior: 'smooth'
  });
}

const scrollToLeft = () => {
  const scrollContainer = document.querySelector("#timelines");
  const timeline = document.querySelector("#timelineElement")
  const currentScrollLeft = scrollContainer.scrollLeft;
  const targetScrollLeft = currentScrollLeft - timeline.clientWidth - 42; // Điều chỉnh giá trị cuộn trái
  scrollToSmooth(scrollContainer, targetScrollLeft);
}

const scrollToRight = () => {
  const scrollContainer = document.querySelector("#timelines");
  const timeline = document.querySelector("#timelineElement")
  const currentScrollLeft = scrollContainer.scrollLeft;
  const targetScrollLeft = currentScrollLeft + timeline.clientWidth + 42; // Điều chỉnh giá trị cuộn phải
  scrollToSmooth(scrollContainer, targetScrollLeft);
}
</script>

<template>
  <div class="relative">
    <div class="absolute flex flex-col justify-center items-center w-full h-full lg:p-14 md:p-8 p-5">
      <div class="flex flex-col gap-5">
        <div class="text-center h-fit xl:text-[7vh]/[8vh] lg:text-5xl/[4vh] lg:py-1 md:text-4xl/[4vh] text-base break-after-auto font-bold whitespace-pre-wrap
                  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 w-full">
          {{ bannerTitle }}
        </div>
      </div>
      <div class="md:mt-5 flex flex-col justify-center items-center gap-2">
        <div class="md:px-6 px-2 md:py-2 lg:py-3 md:text-base xl:text-2xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border rounded border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                    text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white w-fit whitespace-pre-wrap"
             style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
             @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
          Tham gia ngay
        </div>
        <div class="text-gray-600 md:text-base text-[10px] italic">
          Hạn cuối: 17h 31/03/2024
        </div>
      </div>
    </div>
    <img :src="pageData.banner"
         class="h-full w-full"
         alt="banner_esg">
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <BreadCrumb :routes="routes"/>
      <div>
        <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mt-5 mb-10">
          {{ pageData.titleIntroduction }}
        </div>
        <div class="ql-editor text-gray-600" v-html="pageData.contentIntroduction"/>
        <div class="flex flex-col items-center justify-center gap-1.5 mt-2.5">
          <div class="md:px-6 px-3 md:py-2 lg:py-3 md:text-base xl:text-xl md:min-h-[50px] min-h-[30px] flex justify-center items-center border border-image hover:bg-gradient-to-r hover:from-blue-400 hover:to-green-500 hover:cursor-pointer
                                         text-transparent bg-gradient-to-r bg-clip-text from-blue-400 to-green-500 hover:bg-clip-padding hover:text-white w-fit"
               style="border-image: linear-gradient(45deg, #60a5fa, #22c55e) 1"
               @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
            Tham gia ngay
          </div>
          <div class="text-gray-600 md:text-sm text-[10px] italic">
            Hạn cuối: 17h 31/03/2024
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
      class="flex justify-center bg-[url(https://lh3.googleusercontent.com/pw/ABLVV87lgnRMUdkVrj0NutH9xwbeil2GSIXbBu-JaiMS4B7TV3zvrejYwnnBx5QXIxI2AX2escv88fM6eApZtGZG-O643MNRJGthQTvn36aObvOyk6bA6DS3FZ3z7Y6uPqNJWhq3Fj92SKG3EXh9tW_I2fRp=w1920-h722-s-no-gm?authuser=0)]">
    <div class="text-white md:px-10 lg:px-[100px] xl:px-[150px] px-5 pb-20 max-w-[1440px]">
      <div class="font-semibold xl:text-4xl md:text-3xl text-xl leading-none text-center py-10 font-bold">
        <span>{{ pageData.titleBenefit }}</span>
      </div>
      <div class="text-justify space-y-8">
        <div class="space-y-1" v-for="benefit in pageData.contentsBenefit">
          <div class="font-semibold xl:text-2xl md:text-xl text-lg">
            {{ benefit.title }}
          </div>
          <div>{{ benefit.description }}</div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10 tracking-wide">
        {{ pageData.titleCondition }}
      </div>
      <div class="flex gap-5 justify-between flex-col md:flex-row">
        <div
            class="text-black lg:text-[20px] text-base lg:leading-[30px] leading-[25px] basis-1/2 tracking-wide lg:px-14">
          Để tham gia chương trình, các doanh nghiệp Việt Nam cần đáp ứng các tiêu chí sau đây:
        </div>
        <div class="basis-1/2 space-y-10">
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                1
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              Là tổ chức/đơn vị kinh tế Việt Nam, bao gồm các doanh nghiệp tư nhân, hợp tác xã, và hộ kinh doanh, với
              không quá 500 nhân viên toàn thời gian và đang không có tranh chấp pháp lý.
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                2
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              Hoạt động trong các lĩnh vực ưu tiên của dự án USAID IPSC như nông-lâm-ngư nghiệp, công nghiệp chế biến và
              chế tạo, công nghệ thông tin, logistics, du lịch và sản phẩm hỗ trợ.
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                3
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              Có mô hình kinh doanh hiệu quả, tạo ra lợi nhuận.
            </div>
          </div>
          <div class="flex gap-5">
            <div class="flex gap-2">
              <div
                  class="text-[#004990] border border-[#004990] rounded-[50%] w-[20px] h-[20px] flex justify-center items-center">
                4
              </div>
              <div class="w-[5px] bg-[#004990] rounded-[10px]"/>
            </div>
            <div class="text-[#263238] tracking-wide">
              Có dự định và cam kết hành động để triển khai ESG tại doanh nghiệp, chuyển đổi hoặc mở rộng mô hình kinh
              doanh bền vững.
            </div>
          </div>
          <div class="text-[#263238] tracking-wide">
            Tìm hiểu thêm về ESG <a href="https://esg.business.gov.vn/library/detail/22" class="font-bold">tại đây</a>.
          </div>
        </div>
      </div>
      <!--      <div class="ql-editor text-gray-600" v-html="pageData.contentCondition"/>-->
    </div>
  </div>

  <section id=timeline class="py-16 bg-[#f7f7f7] flex flex-col items-center justify-center">
    <div class="max-w-[1440px] w-full">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10 tracking-wide">
        {{ pageData.titleTimeline }}
      </div>
      <div class="lg:px-14 px-1 flex gap-2 items-center">
        <div class="text-black hover:cursor-pointer"
             @click.prevent="scrollToLeft">
          <LeftOutlined class="md:text-[40px] text-[30px] text-[#93ca5c]"/>
        </div>
        <div class="lg:px-0 md:px-3 px-5 flex gap-10 overflow-hidden" id="timelines">
          <div v-for="(tlc, index) in pageData.timelines"
               id="timelineElement"
               class="snap-always snap-center border border-[#004990] bg-white rounded-[25px] lg:h-[400px] h-[470px] w-full lg:max-w-[380px] max-w-[300px] lg:p-[30px] p-5 shrink-0">
            <div class="text-[#93ca5c] lg:text-[20px] text-[16px] tracking-wide">{{ tlc.datetime.toUpperCase() }}</div>
            <div class="text-[#004990] lg:text-[25px] text-[20px] mt-[25px] leading-[30px] tracking-wide">
              {{ tlc.title }}
            </div>
            <div class="text-[#333333] mt-[20px] whitespace-pre-wrap tracking-wide">
              {{ tlc.description }}
            </div>
          </div>
        </div>
        <div class="text-black hover:cursor-pointer"
             @click.prevent="scrollToRight">
          <RightOutlined class="md:text-[40px] text-[30px] text-[#93ca5c]"/>
        </div>
      </div>
    </div>

    <!--    <div class="lg:grid lg:grid-cols-2 grid-cols-1 relative">-->

    <!--      <div v-for="(tlc, index) in pageData.timelines" class="demo-card-block flex border-1 border-[#bdbdbd] lg:py-5 md:p-0 lg:static lg:m-0 lg:after:hidden-->
    <!--            relative m-auto after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-1/2 after:border-l after:border-[#bdbdbd]">-->
    <!--        <div class="demo-card h-fit md:!max-w-[60%] lg:!max-w-[450px] shadow-md">-->
    <!--          <div class="head border-none flex-col gap-1 h-fit p-2 !items-start"-->
    <!--               :class="`bg-[${tlc.bgColor}] after:border-[${tlc.bgColor}]`">-->
    <!--            <div class="bg-black bg-opacity-10 p-2.5">-->
    <!--              <span class="text-xl font-semibold">{{ tlc.datetime }}</span>-->
    <!--            </div>-->
    <!--            <div class="text-xl px-2">-->
    <!--              {{ tlc.title.toUpperCase() }}-->
    <!--            </div>-->
    <!--            <div class="whitespace-pre-wrap text-base px-2 text-black">{{ tlc.description }}</div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash;          <div class="body">&ndash;&gt;-->
    <!--          &lt;!&ndash;            <p class="whitespace-pre-wrap text-base">{{ tlc.description }}</p>&ndash;&gt;-->
    <!--          &lt;!&ndash;            <div :class="tlc.image.length !== 0 ? '' :'h-[235px]' ">&ndash;&gt;-->
    <!--          &lt;!&ndash;              <img v-if="tlc.image.length !== 0" :src="tlc.image[0]?.url" alt="Graphic">&ndash;&gt;-->
    <!--          &lt;!&ndash;            </div>&ndash;&gt;-->
    <!--          &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </section>

  <div class="flex justify-center">
    <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10 max-w-[1440px]">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">
        {{ titleSupport }}
      </div>
      <div class="mt-24 flex md:gap-x-10 md:gap-y-16 gap-16 justify-center flex-wrap">
        <div v-for="support in supports"
             class="bg-gray-200 px-5 pt-10 pb-5 relative border rounded-[10px] w-[300px] h-[150px] transition-all ease-in-out duration-500 group hover:-translate-y-3 hover:bg-[#004990]">
          <div class="border border-[#004990] rounded-full w-[70px] h-[70px] flex justify-center items-center bg-[#004990] group-hover:bg-white
                    absolute -top-1/4 left-1/2 -translate-x-10 shadow shadow-[#004990]/50	">
            <span class="text-white font-bold text-4xl group-hover:text-[#004990]">{{ support.number }}</span>
          </div>
          <div class="tracking-wider text-center space-y-2.5">
            <div class="text-gray-600 group-hover:text-white">
              {{ support.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-[url(https://lh3.googleusercontent.com/pw/ABLVV87lgnRMUdkVrj0NutH9xwbeil2GSIXbBu-JaiMS4B7TV3zvrejYwnnBx5QXIxI2AX2escv88fM6eApZtGZG-O643MNRJGthQTvn36aObvOyk6bA6DS3FZ3z7Y6uPqNJWhq3Fj92SKG3EXh9tW_I2fRp=w1920-h722-s-no-gm?authuser=0)]
              flex justify-center group">
    <div class="max-w-[1440px] md:h-[430px] flex flex-col items-center">
      <Flicking :options="{ align: 'center', circular: false, adaptive: true }"
                :plugins="plugins"
                class="rounded-[15px] !h-full">
        <div v-for="(testimonial, index) in testimonials"
             :key="index"
             class="w-full h-full flex justify-center items-center px-10">
          <div class="max-w-[800px] flex md:flex-row flex-col gap-10">
            <div>
              <a-avatar :size="120" class="flex justify-center items-center">
                <template #icon>
                  <img :src="testimonial.avatar" alt="">
                </template>
              </a-avatar>
            </div>
            <div class="text-white text-lg space-y-5">
              <div class="tracking-wider">"{{ testimonial.quote }}"</div>
              <div>
                <div>{{ testimonial.name }}</div>
                <div class="text-base italic text-gray-400">{{ testimonial.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <template #viewport>
          <span
              class="evaluate-slide-arrow flicking-arrow-prev is-thin invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all ease-in duration-200 before:!w-[15px] after:!w-[15px] before:!bg-[#d1d5db] after:!bg-[#d1d5db] hover:before:!bg-white hover:after:!bg-white"/>
          <span
              class="evaluate-slide-arrow flicking-arrow-next is-thin invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all ease-in duration-200 before:!w-[15px] after:!w-[15px] before:!bg-[#d1d5db] after:!bg-[#d1d5db] hover:before:!bg-white hover:after:!bg-white"/>
          <div class="evaluate-slide-pagination flicking-pagination"/>
        </template>
      </Flicking>
    </div>
  </div>

  <div class="flex flex-col items-center justify-center py-5">
    <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-5">
      {{ titleGallery }}
    </div>
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5">
      <Galleria :value="gallery"
                :responsiveOptions="responsiveOptions"
                :numVisible="5">
        <template #item="slotProps">
          <div class="w-full relative">
            <div
                class="absolute bottom-0 text-white bg-black bg-opacity-50 w-full flex justify-center items-center min-h-[50px] whitespace-pre-wrap">
              {{ slotProps.item.alt }}
            </div>
            <img class="w-full xl:h-[650px] lg:h-[450px] md:h-[400px] object-cover" :src="slotProps.item.itemImageSrc"
                 :alt="slotProps.item.alt"
                 @click.prevent="imageClick(slotProps.item.index)"/>
          </div>
        </template>
        <template #thumbnail="slotProps">
          <img class="lg:w-[200px] md:w-[180px] w-[100px] lg:h-[120px] md:h-[100px] h-[50px] object-cover"
               :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt"/>
        </template>
      </Galleria>
    </div>
  </div>

  <Galleria v-model:activeIndex="activeIndex" v-model:visible="showFullscreen" :value="gallery"
            :responsiveOptions="responsiveOptions" :numVisible="5"
            containerStyle="max-width: 1440px" :circular="true" :fullScreen="true" :showItemNavigators="true"
            :showThumbnails="false">
    <template #item="slotProps">
      <div class="w-full relative">
        <div
            class="absolute bottom-0 text-white bg-black bg-opacity-50 w-full flex justify-center items-center min-h-[50px]">
          {{ slotProps.item.alt }}
        </div>
        <img class="w-full" :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
             @click.prevent="imageClick(slotProps.item.index)"/>
      </div>
    </template>
  </Galleria>

  <div class="flex flex-col items-center justify-center bg-[#f7f7f7] py-5">
    <div class="max-w-[1440px] md:px-10 lg:px-[100px] xl:px-[150px] px-5 py-10">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">
        {{ titleStories }}
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-24 mt-[45px]">
        <div class="relative hover:cursor-pointer" v-for="story in storiesToShow"
             @click.prevent="handleOpenLink(story.content)">
          <div class="h-[250px] w-full border border-[#c1da73] rounded-[10px] overflow-hidden">
            <img class="rounded-[10px] h-full w-full hover:scale-110 transition-all duration-500 ease-in-out"
                 :src="story.thumbnail"
                 :alt="story.name">
          </div>
          <div
              class="bg-white rounded-[10px] p-2.5 flex justify-between 2xl:w-[88%] xl:w-[85%] lg:w-[80%] w-[83%] border-b-4 border-[#659D51] absolute -bottom-[15%] left-[29px] hover:cursor-pointer"
              @click.prevent="handleOpenLink(story.content)">
            <div class="flex justify-between gap-2 h-[70px]">
              <div
                  class="font-medium xl:text-lg/[22px] lg:text-[13px]/[20px] text-base/[22px] tracking-[0.05em] text-[#263238] flex items-end">
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
      <div class="mt-[120px] text-center" v-if="!isAllStories">
        <a-button
            class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
            @click.prevent="showMore">
          XEM THÊM
        </a-button>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="max-w-[1440px] w-full md:px-10 lg:px-[100px] xl:px-[150px] px-5 pt-5">
      <div
          class="min-h-[150px] flex md:flex-row flex-col md:gap-0 gap-5 justify-between md:items-center items-start rounded-[5px] bg-gradient-to-r from-green-300 to-emerald-200 xl:p-10 p-5 shadow-md">
        <div>
          <div class="xl:text-4xl lg:text-2xl md:text-xl text-base break-after-auto font-bold whitespace-pre-wrap
                  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 w-full">
            {{ bannerTitle }}
          </div>
        </div>
        <div class="flex flex-col justify-center gap-1">
          <a-button shape="round"
                    class="md:min-h-[60px] min-h-[50px] text-white xl:text-xl md:text-lg text-base bg-orange-400 shadow-md focus:!bg-orange-500 hover:!bg-orange-500"
                    type="primary"
                    @click.prevent="handleOpenLink('https://bit.ly/dangki-esg-2024')">
            Đăng ký tham gia
          </a-button>
          <div class="text-black md:text-sm text-[10px] italic text-center">
            Hạn cuối: 17h 31/03/2024
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center py-10">
    <div class="max-w-[1440px] w-full flex flex-col justify-center items-center">
      <div class="text-[#004990] font-semibold xl:text-4xl md:text-3xl text-xl text-center mb-10">Câu hỏi thường gặp
      </div>
      <div class="md:px-10 lg:px-[100px] xl:px-[150px] px-5">
        <a-collapse v-model:activeKey="collapseKey"
                    ghost
                    :bordered="false"
                    class="w-full space-y-2.5"
                    expand-icon-position="end">
          <a-collapse-panel v-for='faq in faqs' :key="faq.key" class="bg-white !rounded-[4px]">
            <template #header>
              <div class="min-h-[50px] flex items-center tracking-wide text-[#004990]"
                   :class="collapseKey.includes(faq.key.toString()) ? 'font-semibold' : ''">{{ faq.key }}.
                {{ faq.question }}
              </div>
            </template>
            <div class="whitespace-pre-wrap tracking-wide text-black">{{ faq.answer }}</div>
          </a-collapse-panel>
        </a-collapse>
        <div class="mt-5 text-center">
          <a-button
              class="rounded-[88px] border-[#BABABA] h-[50px] lg:w-[300px] w-[220px] font-medium lg:text-2xl/[40px] text-xl/[40px] text-[#717171] tracking-[.2em]"
              @click.prevent="handleOpenLink('https://esg.business.gov.vn/library/detail/83')">
            XEM THÊM
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>


.flicking-pagination-bullet-active {
  background-color: #fff;
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
  align-items: center;
}

.ant-collapse-content-box {
  padding-top: 0 !important;
  padding-bottom: 10px !important;
}

.ant-steps-item-container {
  margin-right: 10px;

}

.ant-steps-item-title {
  white-space: nowrap;
  font-size: 12px !important;
}

.ant-steps-item-description {
  font-size: 13px !important;
}
</style>
