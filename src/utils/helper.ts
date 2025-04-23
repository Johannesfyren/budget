export default function getUniqueCategories(data: Array<{ category: string }>) {
	const uniqueCategories: string[] = [];

	for (let i = 0; i < data.length; i++) {
		const currentCategory = data[i].category;

		if (!uniqueCategories.includes(currentCategory)) {
			uniqueCategories.push(currentCategory);
		}
	}

	return uniqueCategories;
}

//export { getUniqueCategories };
