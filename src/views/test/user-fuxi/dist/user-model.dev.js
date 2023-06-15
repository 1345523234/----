"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userApi = require("@/api/user-api");

var _roleApi = require("@/api/role-api");

console.log(_roleApi.getAllRoleList);
var _default = {
  namespaced: true,
  //存储数据的，用来在vue视图文件中使用mapState关联到computed中
  state: {
    list: [],
    page: {
      pno: 1,
      psize: 10,
      pCount: 1,
      totalElements: 1
    },
    roleList: []
  },
  // 用来对state中的属性设置值的
  mutations: {
    setList: function setList(state, list) {
      state.list = list;
    },
    setPage: function setPage(state, page) {
      state.page = page;
    },
    setRoleList: function setRoleList(state, roleList) {
      state.roleList = roleList;
    }
  },
  // 用来调用接口处理业务的函数
  actions: {
    getListForPage: function getListForPage(_ref, queryForm) {
      var commit, res;
      return regeneratorRuntime.async(function getListForPage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return regeneratorRuntime.awrap((0, _userApi.getUserList)(queryForm));

            case 3:
              res = _context.sent;

              //判断返回结果
              if (res.data.code == 200) {
                //成功就将返回数据中的list和page放到我们state中
                commit('setList', res.data.data.list);
                commit('setPage', res.data.data.page);
              }

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    //查询当前系统的所有角色
    getRoleList: function getRoleList(_ref2) {
      var commit, res;
      return regeneratorRuntime.async(function getRoleList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commit = _ref2.commit;
              _context2.next = 3;
              return regeneratorRuntime.awrap((0, _roleApi.getAllRoleList)());

            case 3:
              res = _context2.sent;

              if (res.data.code == 200) {
                commit('setRoleList', res.data.data.list);
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    //新增用户数据
    insert: function insert(_ref3, addForm) {
      var commit;
      return regeneratorRuntime.async(function insert$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commit = _ref3.commit;
              _context3.next = 3;
              return regeneratorRuntime.awrap((0, _userApi.addUser)(addForm));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    //修改数据
    update: function update(_ref4, addForm) {
      var commit;
      return regeneratorRuntime.async(function update$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commit = _ref4.commit;
              _context4.next = 3;
              return regeneratorRuntime.awrap((0, _userApi.updateUser)(addForm));

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    //删除数据
    removeById: function removeById(_ref5, id) {
      var commit;
      return regeneratorRuntime.async(function removeById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commit = _ref5.commit;
              _context5.next = 3;
              return regeneratorRuntime.awrap((0, _userApi.removeUserById)(id));

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    findById: function findById(_ref6, id) {
      var commit, res;
      return regeneratorRuntime.async(function findById$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              commit = _ref6.commit;
              _context6.next = 3;
              return regeneratorRuntime.awrap((0, _userApi.findUserById)(id));

            case 3:
              res = _context6.sent;
              //将成功和失败的返回值分别返回去
              console.log(res.data);

              if (!(res.data.code == 200)) {
                _context6.next = 9;
                break;
              }

              return _context6.abrupt("return", res.data.data);

            case 9:
              return _context6.abrupt("return", {});

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }
};
exports["default"] = _default;