import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import './index.css'
import Admin from './pages/Admin'
import AdminCategory from './pages/AdminCategory'
import AdminEvents from './pages/AdminEvents'
import AdminExtraIngredient from './pages/AdminExtraIngredient'
import AdminMain from './pages/AdminMain'
import AdminNotifications from './pages/AdminNotifications'
import AdminOrders from './pages/AdminOrders'
import AdminPaymentOrders from './pages/AdminPaymentOrders'
import AdminProducts from './pages/AdminProducts'
import Banquet from './pages/Banquet'
import Cafe from './pages/Cafe'
import CafeAbout from './pages/CafeAbout'
import CafeCart from './pages/CafeCart'
import CafeCategory from './pages/CafeCategory'
import CafeContacts from './pages/CafeContacts'
import CafeOrder from './pages/CafeOrder'
import CafeThanks from './pages/CafeThanks'
import FoodCourt from './pages/FoodCourt'
import FoodcourtAbout from './pages/FoodcourtAbout'
import FoodcourtCart from './pages/FoodcourtCart'
import FoodcourtCategory from './pages/FoodcourtCategory'
import FoodcourtContacts from './pages/FoodcourtContacts'
import FoodcourtOrder from './pages/FoodcourtOrder'
import FoodcourtThanks from './pages/FoodcourtThanks'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Pominki from './pages/Pominki'
import PrivateRouter from './utils/PrivateRouter'
ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' Component={Home} />

			<Route path='/foodcourt' Component={FoodCourt} />
			<Route path='/foodcourt/category/:name' Component={FoodcourtCategory} />
			<Route path='/foodcourt/order' Component={FoodcourtOrder} />
			<Route path='/foodcourt/about' Component={FoodcourtAbout} />
			<Route path='/foodcourt/contacts' Component={FoodcourtContacts} />
			<Route path='/foodcourt/thanks' Component={FoodcourtThanks} />
			<Route path='/foodcourt/cart' Component={FoodcourtCart} />
			<Route path='/cafe' Component={Cafe} />
			<Route path='/cafe/category' Component={CafeCategory} />
			<Route path='/cafe/order' Component={CafeOrder} />
			<Route path='/cafe/about' Component={CafeAbout} />
			<Route path='/cafe/contacts' Component={CafeContacts} />
			<Route path='/cafe/thanks' Component={CafeThanks} />
			<Route path='/cafe/cart' Component={CafeCart} />
			<Route path='/banquet' Component={Banquet} />
			<Route path='/pominki' Component={Pominki} />

			<Route path='*' Component={NotFound} />
			<Route path='/admin' Component={Admin} />
			<Route path='/admin/main' element={<PrivateRouter Page={AdminMain} />} />
			<Route
				path='/admin/notifications'
				element={<PrivateRouter Page={AdminNotifications} />}
			/>
			<Route
				path='/admin/events'
				element={<PrivateRouter Page={AdminEvents} />}
			/>
			<Route
				path='/admin/products'
				element={<PrivateRouter Page={AdminProducts} />}
			/>
			<Route
				path='/admin/orders'
				element={<PrivateRouter Page={AdminOrders} />}
			/>
			<Route
				path='/admin/paymentOrders'
				element={<PrivateRouter Page={AdminPaymentOrders} />}
			/>
			<Route
				path='/admin/categories'
				element={<PrivateRouter Page={AdminCategory} />}
			/>
			<Route
				path='/admin/extraIngredients'
				element={<PrivateRouter Page={AdminExtraIngredient} />}
			/>
		</Routes>
	</BrowserRouter>
)
