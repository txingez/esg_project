import jsPDF from "jspdf";
import { ENUM } from "../constants/enumValues.js";
import * as htmlToImage from "html-to-image";

export const exportHTMLToPDF = async formName => {
	const doc = new jsPDF({
		orientation: 'p',
		unit: 'px',
		format: 'a4',
		putOnlyUsedFonts: true,
		floatPrecision: 16 // or "smart", default is 16
	})
	const elements = document.getElementsByClassName("result-container")
	await createPdf({doc, elements})

	doc.save(`${ENUM.FILE_NAME_EXPORT[formName]}.pdf`)
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


