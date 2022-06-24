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
    }
}
