# 登录 API

## tt.login

获取临时登录凭证 code，用于服务端换取 openid 和 session_key。

```javascript
tt.login({
  force: false,  // 是否强制重新登录，默认 false
  success(res) {
    // res.code - 临时登录凭证
    // res.anonymousCode - 匿名登录凭证
    // res.isLogin - 是否已登录抖音
  },
  fail(err) {},
  complete() {}
});
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| force | boolean | 否 | 是否强制重新登录，默认 false |
| success | function | 否 | 成功回调 |
| fail | function | 否 | 失败回调 |

### 返回值

| 字段 | 类型 | 说明 |
|------|------|------|
| code | string | 临时登录凭证，有效期 5 分钟 |
| anonymousCode | string | 匿名登录凭证 |
| isLogin | boolean | 用户是否已登录抖音 |

### 服务端换取 session

```
POST https://developer.toutiao.com/api/apps/v2/jscode2session

请求体:
{
  "appid": "你的AppID",
  "secret": "你的AppSecret",
  "code": "客户端获取的code"
}

响应:
{
  "err_no": 0,
  "data": {
    "session_key": "xxx",
    "openid": "用户唯一标识",
    "anonymous_openid": "匿名openid",
    "unionid": "跨应用用户标识（需满足条件）"
  }
}
```

---

## tt.checkSession

检查当前 session_key 是否有效。

```javascript
tt.checkSession({
  success() {
    // session_key 有效，可直接使用缓存的用户信息
  },
  fail() {
    // session_key 已失效，需重新 tt.login
    tt.login({ ... });
  }
});
```

---

## tt.getUserProfile

获取用户信息（替代已废弃的 tt.getUserInfo）。

```javascript
// 必须在用户点击事件中调用
tt.getUserProfile({
  desc: '用于完善游戏角色信息',  // 必填，说明用途
  success(res) {
    // res.userInfo.nickName - 昵称
    // res.userInfo.avatarUrl - 头像 URL
    // res.userInfo.gender - 性别 (0未知/1男/2女)
    // res.rawData - 原始数据 JSON 字符串
    // res.signature - 数据签名
    // res.encryptedData - 加密数据
    // res.iv - 加密算法初始向量
  },
  fail(err) {
    // 用户拒绝授权
  }
});
```

### 关键限制

- **必须在用户主动点击事件中调用**，不能在游戏启动时自动调用
- **必须填写 desc 参数**说明获取用途
- 基础库版本 >= 2.30.0
