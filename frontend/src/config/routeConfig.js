import myProduct from "../components/myProduct/MyProduct";

export const routeConfig={
    HOME:{
        url:'/'
    },
    SHOP:{
        url:'/shop'
    },
    SHOP_PRODUCT:{
        url:'/shop/product/:productId',
        realUrl:(productId)=>`/shop/product/${productId}`
    },
    ABOUT:{
        url:'/about'
    },
    CONTACT:{
        url:'/contact'
    },
    AUTH:{
        url:'/auth'
    },
    USER_ACTIVATE:{
        url:'/user-activate/:id',

    },
    MY_PRODUCTS:{
        url:'/myProducts'
    },
    ADD_PRODUCT:{
        url:'/addProduct'
    },
    EDIT_PRODUCT:{
        url:'/product/edit/:myProductId',
        realUrl:(myProductId)=>`/product/edit/${myProductId}`
    },
    DELETE_PRODUCT:{
        url:`/product/delete/:myProductId`,
        realUrl:(myProductId)=>`/product/delete/${myProductId}`
    },
    ORDER:{
        url: '/order'
    }
}