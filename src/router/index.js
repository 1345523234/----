import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
		children:[
			{
				path:'/check-scope',
				name:'check-scope',
				component:()=>import('../views/check-scope/check-scope.vue')
			}, 
			{
				path:'/order-edit/:id',
				name:'orderEdit',
				props:true,
				component:()=>import('../views/order/order-edit.vue')
			},
			{
				path:'/order',
				name:'order',
				component:()=>import('../views/order/order.vue')
			}, 
			{
				path:'/newsModel-edit/:id',
				name:'newsModelEdit',
				props:true,
				component:()=>import('../views/newsModel/newsModel-edit.vue')
			},
			{
				path:'/newsModel-add',
				name:'newsModelAdd',
				props:true,
				component:()=>import('../views/newsModel/newsModel-add.vue')
			},
			{
				path:'/news',
				name:'news',
				component:()=>import('../views/newsModel/news.vue')
			}, 
			{
				path:'/qrcode',
				name:'qecode',
				component:()=>import('../views/qrcode/index.vue')
			},
			{
				path:'/coupon-add',
				name:'couponAdd',
				component:()=>import('../views/coupon/coupon-add.vue')
			},
			{
				path:'/coupon-add-mud',
				name:'couponAddMud',
				component:()=>import('../views/coupon/coupon-add-mud.vue')
			},
			{
				path:'/coupon-edit/:id',
				name:'couponEdit',
				props:true,
				component:()=>import('../views/coupon/coupon-edit.vue')
			},
			{
				path:'/coupon',
				name:'coupon',
				component:()=>import('../views/coupon/coupon.vue')
			},
			{
				path:'/shop-user',
				name:"shopUser",
				component:()=>import('../views/goodsMember/goodsMember.vue')	
			},
			{
				path:'/upload',
				name:'upload',
				component:()=>import('../views/upload/upload.vue')
			},
			{
				path:'/goods',
				name:'goods',
				component:()=>import('../views/goods-model/goods.vue')
			},
			{
				path:'/goods-edit',
				name:'goodsEdit',
				component:()=>import('../views/goods-model/goods-edit.vue')
			},
			{
				path:'/goods-add',
				name:'goodsAdd',
				component:()=>import('../views/goods-model/goods-add.vue')
			},
			{
				path:'/user-type-edit',
				name:'usetTypeEdit',
				component:()=>import('../views/user-type/user-type-edit.vue')
			},
			{
				path:'/user-type-add',
				name:'userTypeAdd',
				component:()=>import('../views/user-type/user-type-add.vue')
			},
			{
				path:'/user-type',
				name:'userType',
				component:()=>import('../views/user-type/user-type.vue')
			},
			{
				path:'/news-type-edit',
				name:'newsTypeEdit',
				component:()=>import('../views/news/news-type-edit.vue')
			},
			{
				path:'/news-type-add',
				name:'newsTypeAdd',
				component:()=>import('../views/news/news-type-add.vue')
			},
			{
				path:'/news-type',
				name:'newsType',
				component:()=>import('../views/news/news-type.vue')
			},
			{
				path:'/card-type-edit',
				name:'cardTypeEdit',
				component:()=>import('../views/card/card-type-edit.vue')
			},
			{
				path:'/card-type-add',
				name:'cardTypeAdd',
				component:()=>import('../views/card/card-type-add.vue')
			},
			{
				path:'/card-type',
				name:'cardType',
				component:()=>import('../views/card/card-type.vue')
			},
			{
				path:'/goods-type-add',
				name:'goodsTypeAdd',
				component:()=>import('../views/goods/goods-type-add.vue')
			},
			{
				path:'/goods-type-edit',
				name:'goods-type-edit',
				component:()=>import('../views/goods/goods-type-edit.vue')
			},
			{
				path:"/goods-type",
				name:'goods-type',
				component:() => import('../views/goods/goods-type.vue')
			},
			{
				path:'/user',
				name:'user',
				component:() => import('../views/system/user/user.vue'),
			},
			{
				path:'/user-add',
				name:'user-add',
				component:() => import('../views/system/user/user-add.vue'),
			},
			{
				path:'/user-edit',
				name:'user-edit',
				component:() => import('../views/system/user/user-edit.vue'),
			},
			{
				path:'/menu',
				name:'menu',
				component:() => import('../views/system/menu/menu.vue'),
			},
			{
				path:'/menu-add',
				name:'menu-add',
				component:() => import('../views/system/menu/menu-add.vue'),
			},
			{
				path:'/menu-edit',
				name:'menu-edit',
				component:() => import('../views/system/menu/menu-edit.vue'),
			},
			{
				path:'/menu-add-child',
				name:'menu-add-child',
				component:() => import('../views/system/menu/menu-add-child.vue'),
			},
			{
				path:'/menu-edit-child',
				name:'menu-edit-child',
				component:() => import('../views/system/menu/menu-edit-child.vue'),
			},
			{
				path:'/role',
				name:'role',
				component:() => import('../views/system/role/role.vue'),
			},
			{
				path:'/role-add',
				name:'role-add',
				component:() => import('../views/system/role/role-add.vue'),
			},
			{
				path:'/role-edit',
				name:'role-edit',
				component:() => import('../views/system/role/role-edit.vue'),
			},
			{
				path:'/role-menu',
				name:'role-menu',
				component:() => import('../views/system/role/role-menu.vue'),
			},
			{
				path:'/test-user',
				name:'test-user',
				component:() => import('../views/test/user/test-user.vue'),
			},
			{
				path:'/user-fuxi',
				name:'user-fuxi',
				component:() => import('../views/test/user-fuxi/user-fuxi.vue')
			},
			{
				path:'/user-fuxi-add',
				name:'user-fuxi-add',
				component:() => import('../views/test/user-fuxi/user-fuxi-add.vue')
			},
			{
				path:'/user-fuxi-edit',
				name:'user-fuxi-edit',
				component:() => import('../views/test/user-fuxi/user-fuxi-edit.vue')
			},
			{
				path:'/dataStauts',
				name:'dataStauts',
				component:() => import('../views/dataStauts/index.vue')
			},
			{
				path:'/petType',
				name:'petType',
				component:() => import('../views/petType/index.vue')
			},
			{
				path:'/petTypeAdd',
				name:'petTypeAdd',
				component:() => import('../views/petType/petTypeAdd.vue')
			},
			{
				path:'/petTypeEdit',
				name:'petTypeEdit',
				component:() => import('../views/petType/petTypeEdit.vue')
			},
			{
				path:'/orderInsert',
				name:'orderInsert',
				component:() => import('../views/orderInsert/index.vue')
			},
			{
				path:'/pet',
				name:'pet',
				component:() => import('../views/pet/index.vue')
			},
			{
				path:'/petInfo',
				name:'petInfo',
				component:() => import('../views/pet/petInfo.vue')
			},
			{
				path:'/master',
				name:'master',
				component:() => import('../views/master/index.vue')
			},
			{
				path:'/masterDetails',
				name:'masterDetails',
				component:() => import('../views/master/masterDetails.vue')
			},
			{
				path:'/insertCompany',
				name:'insertCompany',
				component:() => import('../views/company/insert.vue')
			},
			{
				path:'/companyAll',
				name:'companyAll',
				component:() => import('../views/company/companyAll.vue')
			},
			{
				path:'/updateCompany',
				name:'updateCompany',
				component:() => import('../views/company/updateCompany.vue')
			},
			{
				path:'/WarehouseInfo',
				name:'WarehouseInfo',
				component:() => import('../views/WarehouseInfo/index.vue')
			},
			{
				path:'/WarehouseInfoUpdate',
				name:'WarehouseInfoUpdate',
				component:() => import('../views/WarehouseInfo/WarehouseInfoUpdate.vue')
			},
			{
				path:'/WarehouseInfoInsert',
				name:'WarehouseInfoInsert',
				component:() => import('../views/WarehouseInfo/WarehouseInfoInsert.vue')
			},
		]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
