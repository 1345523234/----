"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _userModel = _interopRequireDefault(require("../views/system/user/user-model.js"));

var _roleModel = _interopRequireDefault(require("../views/system/role/role-model.js"));

var _menuModel = _interopRequireDefault(require("../views/system/menu/menu-model.js"));

var _userModel2 = _interopRequireDefault(require("../views/test/user-fuxi/user-model"));

var _menuApi = require("../api/menu-api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 引入了user中的user-model.js
_vue["default"].use(_vuex["default"]); // 根据登录用户的角色id获取菜单列表


var store = new _vuex["default"].Store({
  // vuex中的核心数据存储对象，相当于Vue对象中的data属性，原理就是Vue.observable时学习的响应式对象
  state: {
    menuList: [],
    //菜单列表
    tabsList: [],
    //当前打开的tabs列表
    activeMenuId: '',
    //当前选中的菜单id
    selectedMenu: []
  },
  // mutations主要用于对state中声明的属性设置值，这种写法主要为了能让Vuex的数据流向不产生紊乱，
  //所以不推荐直接修改state中的值，一定要通过mutations去设置对应的state
  mutations: {
    // 设置菜单列表的新值
    setMenuList: function setMenuList(state, menuList) {
      state.menuList = menuList;
      sessionStorage.menuList = JSON.stringify(menuList);
    },
    // 设置tabs列表的新值
    setTabsList: function setTabsList(state, tabsList) {
      state.tabsList = tabsList;
      sessionStorage.tabsList = JSON.stringify(tabsList);
    },
    // 设置当前选中菜单的新值
    setActiveMenuId: function setActiveMenuId(state, activeMenuId) {
      state.activeMenuId = activeMenuId;
      sessionStorage.activeMenuId = activeMenuId;
    }
  },
  // getters相当于Vuex对象的计算属性也就是效果等同于Vue中的computed
  getters: {
    getActiveMenuId: function getActiveMenuId(state) {
      state.activeMenuId = sessionStorage.activeMenuId ? sessionStorage.activeMenuId : state.sessionStorage;
      return state.activeMenuId;
    },
    getTabsList: function getTabsList(state) {
      try {
        var tabsList = JSON.parse(sessionStorage.tabsList);
        state.tabsList = tabsList;
      } catch (e) {}

      return state.tabsList;
    },
    // 获取菜单列表，防止刷新丢失
    getMenuList: function getMenuList(state, getters) {
      try {
        var menuList = JSON.parse(sessionStorage.menuList);
        state.menuList = menuList;
      } catch (e) {}

      return state.menuList;
    },
    // 根据当前的tabsList返回keep-alive要缓存的页面name数组
    getKeepAliveList: function getKeepAliveList(state) {
      return state.tabsList.map(function (item) {
        return item.url.replace('/', '');
      });
    },
    // 获取当前选中的菜单对象
    getActiveMenu: function getActiveMenu(state, getters) {
      var menuList = getters.getMenuList;
      var selectedMenu = {};
      menuList.forEach(function (item) {
        if (item.children) {
          item.children.forEach(function (itemChild) {
            if (itemChild.id == getters.getActiveMenuId) {
              selectedMenu = itemChild;
            }
          });
        }
      });
      state.selectedMenu = selectedMenu;
      return state.selectedMenu;
    }
  },
  // actions是Vuex中唯一可以使用异步语法的模块，用于编写业务逻辑
  actions: {
    // 根据角色id查询菜单列表，并将结果设置到menuList,tabsList,activeMenuId中
    fetchMenuByRoleId: function fetchMenuByRoleId(_ref, data) {
      var commit, res, menuList;
      return regeneratorRuntime.async(function fetchMenuByRoleId$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _menuApi.getMenuByRoleId)(data));

            case 3:
              res = _context.sent;

              if (res.data.code == 200) {
                menuList = res.data.data; // commit相当于调用了mutations中对应的方法

                commit('setActiveMenuId', menuList[0].children[0].id);
                commit('setTabsList', [menuList[0].children[0]]);
                commit('setMenuList', menuList);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  },
  modules: {
    // 将user-model.js注册到了store全局对象中，命名为userModel
    userModel: _userModel["default"],
    roleModel: _roleModel["default"],
    menuModel: _menuModel["default"],
    userFuXi: _userModel2["default"]
  }
});
var _default = store;
exports["default"] = _default;