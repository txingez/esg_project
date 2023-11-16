export const SecondCriteria = [
	{
		label: 'Nhóm tiêu chí 2.1: Thiết kế',
		questions: [
			{
				key: 'SC1',
				question: 'Doanh nghiệp có đề ra mục tiêu định lượng về tỷ lệ thành phần của sản phẩm có thể được tái chế/tái sử dụng không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 2}
				]
			},
			{
				key: 'SC2',
				question: 'Các sản phẩm/dịch vụ của doanh nghiệp có được thiết kế theo hướng tuần hoàn không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 1}
				]
			},
			{
				key: 'SC3',
				question: 'Thành phần trong các sản phẩm/dịch vụ của doanh nghiệp có chứa hóa chất thuộc danh mục chất bị cấm không?',
				answers: [
					{key: 'A', answer: 'Có', point: 0},
					{key: 'B', answer: 'Không', point: 2}
				]
			},
			{
				key: 'SC4',
				question: 'Sản phẩm và/hoặc bao bì sản phẩm của doanh nghiệp có chứa các hóa chất độc hại theo phân loại tại Nghị định số 82/2022/NĐ-CP không?',
				answers: [
					{key: 'A', answer: 'Có, sản phẩm có thể chứa một số hóa chất độc hại dưới ngưỡng cho phép trong Tiêu chuẩn/Quy chuẩn quốc gia nhưng doanh nghiệp chưa có biện pháp phòng ngừa việc hoá chất đó có thể rò rỉ ra môi trường.', point: 0},
					{
						key: 'B',
						answer: 'Có, sản phẩm có thể chứa một số hóa chất độc hại dưới mức cho phép theo Tiêu chuẩn/Quy chuẩn quốc gia và doanh nghiệp đã có biện pháp phòng ngừa việc hoá chất đó có thể rò rỉ ra môi trường.',
						point: 2
					},
					{
						key: 'C',
						answer: 'Không',
						point: 4
					}
				]
			},
			{
				key: 'SC5',
				question: 'Sản phẩm của doanh nghiệp có được thiết kế theo hướng tối ưu hóa công năng để đảm bảo sản phẩm có tính đa dụng, đa năng không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 1}
				]
			},
			{
				key: 'SC6',
				question: 'Sản phẩm của doanh nghiệp có được thiết kế theo hướng kéo dài tuổi đời sử dụng và có thể được sử dụng nhiều lần không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 1}
				]
			},
			{
				key: 'SC7',
				question: 'Sản phẩm của doanh nghiệp có được thiết kế theo hướng dễ tháo rời, dễ tái chế/tái sử dụng không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 1}
				]
			},
			{
				key: 'SC8',
				question: 'Sản phẩm của doanh nghiệp có được thiết kế theo hướng tối ưu hóa hiệu suất sử dụng hoặc tiêu thụ năng lượng (ví dụ có biến tần, công nghệ ánh sáng lạnh…) không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 1}
				]
			},
		]

	},
	{
		label: 'Nhóm tiêu chí 2.2: Mua sắm',
		questions: [
			{
				key: 'SC9',
				question: 'Doanh nghiệp có thực hành mua sắm xanh không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{
						key: 'B',
						answer: 'Có, doanh nghiệp lựa chọn các nhà cung ứng có các chứng chỉ/chuẩn mực/công bố về phát triển bền vững nói chung (ví dụ công bố ESG)',
						point: 1
					},
					{
						key: 'C',
						answer: 'Có, doanh nghiệp đã đưa ra các chỉ tiêu cụ thể liên quan đến áp dụng KTTH cho bộ phận mua sắm để yêu cầu nhà cung ứng phải đáp ứng, tuân thủ',
						point: 2
					}
				]
			},
			{
				key: 'SC10',
				question: 'Doanh nghiệp có lựa chọn các nguyên vật liệu có khả năng tái chế/tái sử dụng được không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 2}
				]
			},
			{
				key: 'SC11',
				question: 'Tỷ trọng vật liệu (tính theo khối lượng) cấu thành sản phẩm có thể tái chế',
				answers: [
					{key: 'A', answer: 'Dưới 25%', point: 0},
					{key: 'B', answer: '25% - dưới 50%', point: 2},
					{key: 'C', answer: '50% - dưới 75%', point: 4},
					{key: 'D', answer: '75% trở lên', point: 6}
				]
			},
			{
				key: 'SC12',
				question: 'Tỷ trọng vật liệu (tính theo khối lượng) cấu thành sản phẩm có thể tái sử dụng',
				answers: [
					{key: 'A', answer: 'Dưới 25%', point: 0},
					{key: 'B', answer: '25% - dưới 50%', point: 2},
					{key: 'C', answer: '50% - dưới 75%', point: 4},
					{key: 'D', answer: '75% trở lên', point: 6}
				]
			},
			{
				key: 'SC13',
				question: 'Tỷ trọng thành phần bao bì từ các nguồn vật liệu tái chế hoặc tái sử dụng',
				answers: [
					{key: 'A', answer: 'Dưới 25%', point: 0},
					{key: 'B', answer: '25% - dưới 50%', point: 1},
					{key: 'C', answer: '50% - dưới 75%', point: 2},
					{key: 'D', answer: '75% trở lên', point: 3}
				]
			},
			{
				key: 'SC14',
				question: 'Sản phẩm có sử dụng các nguyên liệu hiếm không?',
				answers: [
					{key: 'A', answer: 'Có', point: 0},
					{key: 'B', answer: 'Không', point: 2}
				]
			}
		]
	},
	{
		label: 'Nhóm tiêu chí 2.3: Sản xuất',
		questions: [
			{
				key: 'SC15',
				question: 'Trong năm ngay trước năm đánh giá, tỷ trọng (theo khối lượng) vật liệu bị thất thoát trong quá trình sản xuất là bao nhiêu?',
				answers: [
					{key: 'A', answer: '50% trở lên', point: 0},
					{key: 'B', answer: '30% - dưới 50%', point: 1},
					{key: 'C', answer: '10% - dưới 30%', point: 2},
					{key: 'D', answer: 'Dưới 10%', point: 3}
				]
			},
			{
				key: 'SC16',
				question: 'Doanh nghiệp có tái sử dụng nước thải sau khi xử lý không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 2}
				]
			},
			{
				key: 'SC17',
				question: 'Trong năm ngay trước năm đánh giá, tỷ lệ tái sử dụng nước thải của doanh nghiệp là bao nhiêu?',
				answers: [
					{key: 'A', answer: 'Dưới 10%', point: 0},
					{key: 'B', answer: '10% - dưới 30%', point: 2},
					{key: 'C', answer: '30% - dưới 50%', point: 4},
					{key: 'D', answer: '50% trở lên', point: 6}
				]
			},
			{
				key: 'SC18',
				question: 'Doanh nghiệp có hệ thống quản lý năng lượng không?',
				answers: [
					{key: 'A', answer: 'Không', point: 0},
					{key: 'B', answer: 'Có', point: 2}
				]
			},
			{
				key: 'SC19',
				question: 'Trong năm ngay trước năm đánh giá, doanh nghiệp đã sử dụng bao nhiêu % năng lượng từ năng lượng tái trong sản xuất ra sản phẩm/dịch vụ?',
				answers: [
					{key: 'A', answer: 'Dưới 25%', point: 0},
					{key: 'B', answer: '25% - dưới 50%', point: 1},
					{key: 'C', answer: '50% - dưới 75%', point: 2},
					{key: 'D', answer: '75% trở lên', point: 3}
				]
			}
		]
	}
]
