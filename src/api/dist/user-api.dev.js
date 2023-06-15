"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.findUserById = exports.addUser = exports.removeUserById = exports.getUserList = exports.login = void 0;

var _http = _interopRequireDefault(require("../http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 初步定义login函数，通过api中的http功能将登录实现
var login = function login(username, password) {
  return _http["default"].http({
    url: '/user/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  });
}; // 获取用户列表接口参数为接口的参数


exports.login = login;

var getUserList = function getUserList(queryForm) {
  return _http["default"].http({
    url: '/user/list/page',
    params: queryForm,
    method: 'get'
  });
};

exports.getUserList = getUserList;

var removeUserById = function removeUserById(id) {
  return _http["default"].http({
    url: "/user/id/".concat(id),
    method: 'delete'
  });
};

exports.removeUserById = removeUserById;

var addUser = function addUser(user) {
  return _http["default"].http({
    url: "/user/insert",
    method: 'put',
    data: user
  });
};

exports.addUser = addUser;

var findUserById = function findUserById(id) {
  return _http["default"].http({
    url: "/user/find/id/".concat(id),
    method: 'get'
  });
};

exports.findUserById = findUserById;

var updateUser = function updateUser(user) {
  return _http["default"].http({
    url: "/user/update",
    method: 'put',
    data: user
  });
};

exports.updateUser = updateUser;