export function getUniqueCategories(data: Array<{ category: string }>) {
	const uniqueCategories: string[] = [];

	for (let i = 0; i < data.length; i++) {
		const currentCategory = data[i].category;

		if (!uniqueCategories.includes(currentCategory)) {
			uniqueCategories.push(currentCategory);
		}
	}

	return uniqueCategories;
}

export function setCurrencyPeriod(value: number, returnCurrencyText: boolean) {
	if (value < 1000) return value;
	if (returnCurrencyText) {
		return new Intl.NumberFormat("da-DK", {
			style: "currency",
			currency: "DKK",
		}).format(value);
	} else {
		return new Intl.NumberFormat("da-DK").format(value);
	}
}
// export { getUniqueCategories, setCurrencyPeriod };
