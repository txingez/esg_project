const driveDefaultURL = "https://drive.google.com/uc?export=view&id=";
const driveExpectedURL = "https://lh3.google.com/u/0/d/"


export const handleGoogleImageLink = (oldLink) => {
	return oldLink.replace(driveDefaultURL, driveExpectedURL)
}
