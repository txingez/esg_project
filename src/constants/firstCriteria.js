export const FirstCriteria = [
    {
        key: 'FC1',
        question: 'Chiến lược kinh doanh của doanh nghiệp có đề cập đến áp dụng Kinh tế tuần hoàn (KTTH) không?',
        answers: [
            {key: 'A', answer: 'Chưa đề cập', point: 0},
            {
                key: 'B',
                answer: 'Chiến lược kinh doanh đã có đề cập đến một số khái niệm liên quan (Ví dụ: tuần hoàn vật liệu, hiệu quả tài nguyên…)',
                point: 2
            },
            {key: 'C', answer: 'Chiến lược kinh doanh đã có đề cập cụ thể đến KTTH bằng văn bản cụ thể', point: 4}
        ]
    },
    {
        key: 'FC2',
        question: 'Doanh nghiệp đã có đề ra các mục tiêu cụ thể về KTTH trong hoạt động sản xuất, kinh doanh không?',
        answers: [
            {key: 'A', answer: 'Chưa có', point: 0},
            {key: 'B', answer: 'Đang tìm hiểu, nghiên cứu để xây dựng các mục tiêu về KTTH', point: 1},
            {key: 'C', answer: 'Đã có đề ra các mục tiêu chung nhưng chưa phải là mục tiêu định lượng', point: 2},
            {key: 'D', answer: 'Có đề ra các mục tiêu KTTH mang tính định lượng', point: 3}
        ]
    },
    {
        key: 'FC3',
        question: 'Doanh nghiệp đã có kế hoạch thực hiện KTTH chưa?',
        answers: [
            {key: 'A', answer: 'Chưa có', point: 0},
            {key: 'B', answer: 'Đang xây dựng', point: 2},
            {key: 'C', answer: 'Đã có', point: 4}
        ]
    },
    {
        key: 'FC4',
        question: 'Doanh nghiệp có từng bị xử lý vì vi phạm các quy định pháp luật trong lĩnh vực môi trường trong 2 năm gần đây không?',
        answers: [
            {key: 'A', answer: 'Có', point: 0},
            {key: 'B', answer: 'Không', point: 4}
        ]
    },
    {
        key: 'FC5',
        question: 'Doanh nghiệp có thực hiện đánh giá vòng đời sản phẩm (LCA) để đánh giá tác động môi trường tổng thể không?',
        answers: [
            {key: 'A', answer: 'Có', point: 2},
            {key: 'B', answer: 'Không', point: 0}
        ]
    },
    {
        key: 'FC6',
        question: 'Doanh nghiệp đã cử nhân viên tham gia/đăng ký các chương trình đào tạo, khoá học về KTTH không',
        answers: [
            {key: 'A', answer: 'Đã tham gia đầy đủ trong khả năng có thể (ít nhất >5 khoá/năm)', point: 2},
            {key: 'B', answer: 'Đang có kế hoạch tham gia hoặc mới tham gia một vài khoá học nhưng rất hạn chế về thông tin (<5 khoá/năm)', point: 1},
            {key: 'C', answer: 'Chưa từng cử nhân viên tham gia/đăng ký khoá học nào', point: 0}
        ]
    },
    {
        key: 'FC7',
        question: 'Doanh nghiệp có cán bộ chuyên trách về môi trường (tốt nghiệp bậc Cử nhân trở lên chuyên ngành môi trường) không?',
        answers: [
            {key: 'A', answer: 'Có', point: 1},
            {key: 'B', answer: 'Không', point: 0}
        ]
    }
]
