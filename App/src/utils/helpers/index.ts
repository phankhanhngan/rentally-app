export const formatNumberWithCommas = (number: any) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const formatDate = (dateString: any) => {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};
