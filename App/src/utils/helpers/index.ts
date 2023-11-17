export const formatNumberWithCommas = (number: any) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const formatDate = (dateString: string) => {
	const parts = dateString.split('/');
	return `${parts[2]}/${parts[1]}/${parts[0]}`;
};
