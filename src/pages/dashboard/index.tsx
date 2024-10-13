import AllProducts from './AllProducts';
import FlashSales from './FlashSales';
import Main from './Main';

function index() {
	return (
		<div className=" mt-8">
			<Main />
			<FlashSales />
			<AllProducts />
		</div>
	);
}

export default index;
