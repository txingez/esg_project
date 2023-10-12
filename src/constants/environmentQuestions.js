export const EnvironmentQuestions = [
	{
		key: 'E1',
		question: 'Doanh nghiệp có chính sách quản lý, giám sát và đánh giá tác động môi trường và công bố chính sách rộng rãi (ví dụ trên website của doanh nghiệp) này không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - tự nguyện thực hiện/ tuân thủ theo tiêu chuẩn Việt Nam', point: 1},
			{key: 'C', answer: 'Có - tự nguyện thực hiện/ tuân thủ theo tiêu chuẩn Việt Nam và công bố', point: 2},
			{key: 'D', answer: 'Có - Theo tiêu chuẩn Việt Nam và chuẩn mực quốc tế', point: 2},
			{key: 'E', answer: 'Có - Theo tiêu chuẩn Việt Nam và chuẩn mực quốc tế và công bố', point: 3}
		]
	},
	{
		key: 'E2',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có bị xử phạt vi phạm liên quan tới môi trường không?',
		answers: [
			{key: 'A', answer: 'Có', point: 0},
			{key: 'B', answer: 'Không', point: 1}
		]
	},
	{
		key: 'E3',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có thực hiện báo cáo, công bố thông tin về công tác quản lý môi trường không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{
				key: 'B',
				answer: 'Có - thực hiện báo cáo và công bố thông tin theo quy định pháp luật hoặc yêu cầu của các bên liên quan',
				point: 1
			},
			{key: 'C', answer: 'Có - tự nguyện thực hiện báo cáo và công bố thông tin', point: 2},
			{key: 'D', answer: 'Không áp dụng do loại hình kinh doanh không yêu cầu', point: 'N/A'}
		]
	},
	{
		key: 'E4',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có thực hiện kiểm toán các báo cáo môi trường không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - tự thực hiện', point: 1},
			{key: 'C', answer: 'Có - do đơn vị tư vấn/ kiểm toán độc lập thực hiện', point: 2},
			{key: 'D', answer: 'Không áp dụng do loại hình kinh doanh không yêu cầu', point: 'N/A'}
		]
	},
	{
		key: 'E5',
		question: 'Doanh nghiệp có nhân sự phụ trách về vấn đề môi trường không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - kiêm nhiệm', point: 1},
			{key: 'C', answer: 'Có - chuyên trách', point: 2}
		]
	},
	{
		key: 'E6',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có tập huấn nội bộ chính sách môi trường của doanh nghiệp không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - dưới 50% người lao động tham gia tập huấn', point: 1},
			{key: 'C', answer: 'Có - bằng hoặc trên 50% người lao động tham gia tập huấn', point: 2}
		]
	},
	{
		key: 'E7',
		question: 'Doanh nghiệp có tiêu chí/ tiêu chuẩn môi trường cho nhà cung ứng không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - áp dụng không đầy đủ', point: 1},
			{key: 'C', answer: 'Có - áp dụng đầy đủ', point: 2}
		]
	},
	{
		key: 'E8',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có tái chế, tái sử dụng nguyên vật liệu không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có', point: 1},
			{key: 'C', answer: 'Không áp dụng do hoạt động của doanh nghiệp không tạo ra chất thải', point: 'N/A'}
		]
	},
	{
		key: 'E9',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có theo dõi và thống kê năng lượng tiêu thụ, năng lượng tái tạo không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - thống kê tổng năng lượng tiêu thụ', point: 1},
			{key: 'C', answer: 'Có - thống kê và đo lường năng lượng tái tạo (nếu có)', point: 2}
		]
	},
	{
		key: 'E10',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có theo dõi và thống kê lượng nước đầu vào (nước mặt, nước sâu), nước tuần hoàn và tái sử dụng không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{
				key: 'B',
				answer: 'Có - thống kê lượng nước đầu vào, không sử dụng nước tuần hoàn và tái sử dụng',
				point: 1
			},
			{
				key: 'C',
				answer: 'Có - thống kê và đo lường lượng nước đầu vào, nước tuần hoàn và nước tái sử dụng',
				point: 2
			}
		]
	},
	{
		key: 'E11',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có đánh giá và giám sát các hoạt động của doanh nghiệp mà có tác động đáng kể đến đa dạng sinh học không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - theo pháp luật Việt Nam', point: 1},
			{key: 'C', answer: 'Có -  theo pháp luật Việt Nam và chuẩn mực quốc tế', point: 2},
			{
				key: 'D',
				answer: 'Không áp dụng do hoạt động của doanh nghiệp không ảnh hưởng đến đa dạng sinh học (N/A)',
				point: 'N/A'
			}
		]
	},
	{
		key: 'E12',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có báo cáo chi tiết về lượng khí phát thải nhà kính không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có -  công bố nhưng không chi tiết theo loại khí và nguồn phát thải', point: 1},
			{key: 'C', answer: 'Có - công bố và báo cáo chi tiết theo loại khí và nguồn phát thải', point: 2}
		]
	},
	{
		key: 'E13',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có báo cáo chi tiết về tổng lượng nước thải theo chất lượng không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có -  công bố nhưng không chi tiết theo loại nước thải và nguồn phát thải', point: 1},
			{key: 'C', answer: 'Có - công bố và báo cáo chi tiết theo loại nước thải và nguồn phát thải', point: 2},
			{key: 'D', answer: 'Không áp dụng do không phát thải nước thải', point: 'N/A'}
		]
	},
	{
		key: 'E14',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có báo cáo chi tiết về tổng lượng chất thải, bao gồm chất thải nguy hại, chất thải không nguy hại, và phương pháp xử lý chất thải không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - báo cáo không đầy đủ các thông tin', point: 1},
			{key: 'C', answer: 'Có - báo cáo đầy đủ các thông tin', point: 2},
			{key: 'D', answer: 'Không áp dụng do không phát thải chất thải', point: 'N/A'}
		]
	},
	{
		key: 'E15',
		question: 'Trong 12 tháng gần nhất, doanh nghiệp có báo cáo đầy đủ việc vận chuyển chất thải nguy hại không?',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - báo cáo không đầy đủ các thông tin', point: 1},
			{key: 'C', answer: 'Có - báo cáo đầy đủ các thông tin', point: 2},
			{key: 'D', answer: 'Không áp dụng do không phát thải chất thải nguy hại', point: 'N/A'}
		]
	},
	{
		key: 'E16',
		question: 'Trong kỳ báo cáo, doanh nghiệp có theo dõi và báo cáo về tỷ trọng các loại nguyên vật liệu có thể tái chế trong cơ cấu sản phẩm không? (bao gồm cả nguyên liệu đóng gói trong quá trình phân phối)',
		answers: [
			{key: 'A', answer: 'Không', point: 0},
			{key: 'B', answer: 'Có - báo cáo không đầy đủ các thông tin', point: 1},
			{key: 'C', answer: 'Có - báo cáo đầy đủ các thông tin', point: 2},
			{key: 'D', answer: 'Không áp dụng do không sử dụng nguyên vật liệu', point: 'N/A'}
		]
	}
]
