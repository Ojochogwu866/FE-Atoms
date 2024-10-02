import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAllProducts,
	fetchLimitedProducts,
	fetchProductsByCategory,
} from '../store/productsSlice';
import { AppDispatch, RootState } from '../store/store';

type ProductType = 'all' | 'limited' | 'category';

export const useFetchProducts = (type: ProductType, category?: string) => {
	const dispatch = useDispatch<AppDispatch>();
	const productsState = useSelector((state: RootState) => state.products);

	let products, status, error;

	switch (type) {
		case 'all':
			({ items: products, status, error } = productsState.allProducts);
			break;
		case 'limited':
			({ items: products, status, error } = productsState.limitedProducts);
			break;
		case 'category':
			({ items: products, status, error } = productsState.categoryProducts);
			break;
	}

	useEffect(() => {
		if (status === 'idle') {
			switch (type) {
				case 'all':
					dispatch(fetchAllProducts());
					break;
				case 'limited':
					dispatch(fetchLimitedProducts());
					break;
				case 'category':
					if (category) {
						dispatch(fetchProductsByCategory(category));
					}
					break;
			}
		}
	}, [status, dispatch, type, category]);

	return { products, status, error };
};
