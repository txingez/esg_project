export const OPTIONS = {

	BUSINESS_TYPE_OPTS: [
		{label: 'Doanh nghiệp niêm yết', value: 'Doanh nghiệp niêm yết'},
		{label: 'Doanh nghiệp không niêm yết', value: 'Doanh nghiệp không niêm yết'}
	],

	YES_NO_OPTS: [
		{label: 'Có', value: 'Có'},
		{label: 'Không', value: 'Không'}
	],

	SEX_OPTS: [
		{label: 'Nam', value: 'Nam'},
		{label: 'Nữ', value: 'Nữ'}
	],

	REGISTRATION_TYPE_OPTS: [
		{label: 'Doanh nghiệp tư nhân', value: 'Doanh nghiệp tư nhân'},
		{label: 'Công ty trách nhiệm hữu hạn một thành viên', value: 'Công ty trách nhiệm hữu hạn một thành viên'},
		{
			label: 'Công ty trách nhiệm hữu hạn từ hai thành viên trở lên',
			value: 'Công ty trách nhiệm hữu hạn từ hai thành viên trở lên'
		},
		{label: ' Công ty cổ phần, niêm yết', value: 'Công ty cổ phần, niêm yết'},
		{label: ' Công ty cổ phần, không niêm yết', value: 'Công ty cổ phần, không niêm yết'},
		{label: 'Công ty hợp danh', value: 'Công ty hợp danh'},
		{label: 'Loại hình khác (ghi cụ thể tên loại hình)', value: 'other'}
	],

	OPTION_JS_PDF: {
		margin: [20, 60, 20, 20],
		filename: 'ket_qua_cua_ban.pdf',
		image: {type: 'jpeg', quality: 0.98},
		html2canvas: {scale: 1, useCORS: true},
		jsPDF: {unit: 'px', format: [2200, 1000], orientation: 'p'},
		putOnlyUsedFonts: true
	}
}
