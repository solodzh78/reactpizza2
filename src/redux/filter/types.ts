export enum SortPropertyEnum {
	RAITING_DESC = '-rating',
	RAITING_ASC = 'rating',
	PRICE_DESC = '-price',
	PRICE_ASC = 'price',
	TITLE_DESC = '-title',
	TITLE_ASC = 'title',
};

export type FilterStateType = {
	categoryId: number;
	sort: {
		title: string;
		sortParameter: SortPropertyEnum;
	};
	search: string;
	page: number;
};