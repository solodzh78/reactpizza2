export type ItemType = {
	id: string;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
};

export enum StatusEnum {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
};