import { detectPlatform } from "./detectPlatform.js";

const driveDefaultURL = "https://drive.google.com/uc?export=view&id=";
const driveExpectedURL = "https://lh3.googleusercontent.com/d/"

export const handleGoogleImageLink = (oldLink) => {
	const platform = detectPlatform()
	switch (platform) {
		case 'iOS':
			return oldLink;
		default:
			return oldLink.replace(driveDefaultURL, driveExpectedURL)
	}
}
