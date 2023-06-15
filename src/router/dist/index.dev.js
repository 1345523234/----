"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Index = _interopRequireDefault(require("../views/Index.vue"));

var _Login = _interopRequireDefault(require("../views/Login.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  name: 'Index',
  component: _Index["default"],
  children: [{
    path: '/user',
    name: 'user',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/user/user.vue'));
      });
    }
  }, {
    path: '/user-add',
    name: 'user-add',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/user/user-add.vue'));
      });
    }
  }, {
    path: '/user-edit',
    name: 'user-edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/user/user-edit.vue'));
      });
    }
  }, {
    path: '/menu',
    name: 'menu',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/menu/menu.vue'));
      });
    }
  }, {
    path: '/menu-add',
    name: 'menu-add',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/menu/menu-add.vue'));
      });
    }
  }, {
    path: '/menu-edit',
    name: 'menu-edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/menu/menu-edit.vue'));
      });
    }
  }, {
    path: '/menu-add-child',
    name: 'menu-add-child',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/menu/menu-add-child.vue'));
      });
    }
  }, {
    path: '/menu-edit-child',
    name: 'menu-edit-child',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/menu/menu-edit-child.vue'));
      });
    }
  }, {
    path: '/role',
    name: 'role',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/role/role.vue'));
      });
    }
  }, {
    path: '/role-add',
    name: 'role-add',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/role/role-add.vue'));
      });
    }
  }, {
    path: '/role-edit',
    name: 'role-edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/role/role-edit.vue'));
      });
    }
  }, {
    path: '/role-menu',
    name: 'role-menu',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/system/role/role-menu.vue'));
      });
    }
  }, {
    path: '/test-user',
    name: 'test-user',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/test/user/test-user.vue'));
      });
    }
  }, {
    path: '/user-fuxi',
    name: 'user-fuxi',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/test/user-fuxi/user-fuxi.vue'));
      });
    }
  }, {
    path: '/user-fuxi-add',
    name: 'user-fuxi-add',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/test/user-fuxi/user-fuxi-add.vue'));
      });
    }
  }, {
    path: '/user-fuxi-edit',
    name: 'user-fuxi-edit',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/test/user-fuxi/user-fuxi-edit.vue'));
      });
    }
  }]
}, {
  path: '/login',
  name: 'Login',
  component: _Login["default"]
}];
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;