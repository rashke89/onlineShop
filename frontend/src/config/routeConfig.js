// outsourcing vars
export const routeConfig = {
    HOME: {
        url: '/'
    },
    SHOP: {
        url: '/shop'
    },
    AD_SHOP: {
        url: '/shop/ad/:adId',
        realUrl: (adId) => `/shop/ad/${adId}`
    },
    ABOUT: {
        url: '/about'
    },
    CONTACT: {
        url: '/contact'
    },
    AUTH: {
        url: '/auth'
    },
    USER_ACTIVATE: {
        url: '/user-activate/:id',
        realUrl: id => `/user-activate/${id}`
    },
    ORDER: {
        url: '/order'
    },
    USER_PROFILE: {
        url: '/userProfile'
    },
    UNSUBSCRIBE: {
        url: '/unsubscribe/:id',
        realUrl: id => `/unsubscribe/${id}`,
    },
    DASHBOARD: {
        url: '/dashboard',
    },
    ADMIN_USERS: {
        url: 'users',
    },
    ADMIN_PRODUCTS: {
        url: 'products',
    },
    ADMIN_EMAILS: {
        url: 'emails',
    },
    ADMIN_SUBS: {
        url: 'subs',
    },
    ADMIN_CATEGORIES: {
        url: 'categories',
    },
    ADMIN_COMMENTS: {
        url: 'comments',
    }
}
