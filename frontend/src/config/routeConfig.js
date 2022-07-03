// outsourcing vars
export const routeConfig = {
	HOME: {
		url: '/'
	},
	SHOP: {
		url: '/shop'
	},
	SHOP_PRODUCT: {
		url: '/shop/product/:productId',
		fullUrl: (productId) => `/shop/product/${productId}`
	},
	ABOUT: {
		url: '/about-us'
	},
	CONTACT: {
		url: '/contact'
	},
	AUTH: {
		url: '/auth'
	},
	USER_ACTIVATE: {
		url: '/user-activate/:id',
		fullUrl: id => `/user-activate/${id}`
	},
	MY_PRODUCTS: {
		url: '/my-products'
	},
	ADD_PRODUCT: {
		url: '/add-product'
	},
	EDIT_PRODUCT: {
		url: '/product/edit/:myProductId',
		fullUrl: (myProductId) => `/product/edit/${myProductId}`
	},
	DELETE_PRODUCT: {
		url: '/product/delete/:myProductId',
		fullUrl: (myProductId) => `/product/delete/${myProductId}`
	}
}