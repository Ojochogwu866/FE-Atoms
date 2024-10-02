import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { AppDispatch, RootState } from '../store/store';

export const useFetchProducts = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		items: products,
		status,
		error,
	} = useSelector((state: RootState) => state.products);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	return { products, status, error };
};
