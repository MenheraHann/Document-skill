# 支付接入全流程（IAP 内购）

## 前置条件

- 企业主体认证通过
- 已创建小游戏并获取 AppID
- 有后端服务（用于签名验证和发货）
- **必须同时接入客服能力**（IAP 游戏的审核要求）

## 支付模式

抖音小游戏支付通过 `tt.requestGamePayment` 实现，支持两种模式：

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| `game` | 游戏币模式，用户购买平台游戏币 | 通用虚拟商品 |
| `order` | 订单模式，直接购买具体商品 | 明确的商品购买 |

## 接入流程

### 1. 后台配置

1. 登录开发者控制台 → 进入小游戏
2. 进入「变现 → 应用内购买」
3. 配置**支付回调地址**（必须 HTTPS）
4. 配置**支付密钥**（用于签名验证）

### 2. 客户端发起支付

```javascript
tt.requestGamePayment({
  mode: 'game',            // 'game' 游戏币模式 | 'order' 订单模式
  env: 0,                  // 0: 正式环境, 1: 沙盒环境
  currencyType: 'CNY',     // 货币类型
  buyQuantity: 100,        // 购买数量（游戏币模式）
  customId: 'order_12345', // 自定义订单号，用于服务端对账
  extraInfo: '',           // 额外信息，会透传到回调

  success(res) {
    console.log('支付成功', res);
    // 注意：不要在这里直接发货！
    // 必须等服务端收到回调并验签后再发货
  },
  fail(err) {
    console.error('支付失败', err.errCode, err.errMsg);
    switch (err.errCode) {
      case 2: console.log('参数错误'); break;
      case 3: console.log('用户取消支付'); break;
      case 4: console.log('网络错误'); break;
      case 9: console.log('订单已支付'); break;
      default: console.log('系统错误');
    }
  }
});
```

### 3. 服务端接收回调

平台会向你配置的回调地址发送 POST 请求：

```json
{
  "appid": "你的AppID",
  "cp_orderno": "order_12345",
  "cp_extra": "",
  "way": "2",
  "token": "签名token",
  "total_amount": 100,
  "status": "success"
}
```

### 4. 服务端签名验证（必须！）

```python
# Python 示例
import hashlib

def verify_payment(params, app_secret):
    """验证支付回调签名"""
    # 1. 按 key 字母排序拼接参数
    sorted_keys = sorted(params.keys())
    sign_str = '&'.join([f'{k}={params[k]}' for k in sorted_keys if k != 'token'])

    # 2. 拼接 app_secret
    sign_str += app_secret

    # 3. MD5 签名
    expected_token = hashlib.md5(sign_str.encode()).hexdigest()

    return expected_token == params.get('token')
```

```javascript
// Node.js 示例
const crypto = require('crypto');

function verifyPayment(params, appSecret) {
  const sortedKeys = Object.keys(params).sort().filter(k => k !== 'token');
  const signStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + appSecret;
  const expectedToken = crypto.createHash('md5').update(signStr).digest('hex');
  return expectedToken === params.token;
}
```

### 5. 返回确认

验证通过后，返回以下 JSON 表示确认：

```json
{"err_no": 0, "err_tips": "success"}
```

验证失败则返回：

```json
{"err_no": 1, "err_tips": "签名验证失败"}
```

## 完整支付流程图

```
客户端                        服务端                      抖音平台
  |                            |                            |
  |-- 生成订单号 ------------->|                            |
  |<-- 返回 customId ---------|                            |
  |                            |                            |
  |-- tt.requestGamePayment -->|                            |
  |                            |                            |
  |       用户完成支付          |                            |
  |                            |<-- POST 支付回调 ----------|
  |                            |-- 验证签名                 |
  |                            |-- 发货（加游戏币/道具）     |
  |                            |-- 返回 {"err_no": 0} ---->|
  |                            |                            |
  |<-- 通知客户端发货完成 -----|                            |
  |-- 更新 UI                  |                            |
```

## 重要注意事项

1. **绝对不要在客户端 success 回调中直接发货** — 必须以服务端收到的回调为准
2. **签名验证必须在服务端** — 客户端验证会被审核拒绝
3. **处理重复回调** — 平台可能发送多次回调，需做幂等处理
4. **沙盒测试** — 开发阶段将 `env` 设为 `1` 使用沙盒环境
5. **iOS 限制** — iOS 端不支持虚拟支付，必须走平台内购通道
6. **customId 唯一** — 每笔订单的 customId 必须唯一，用于对账

## 沙盒测试

开发阶段使用沙盒环境测试：

```javascript
tt.requestGamePayment({
  mode: 'game',
  env: 1,  // 沙盒环境
  // ... 其他参数
});
```

沙盒环境不会产生真实扣款，但流程与正式环境一致。

## 客服能力（IAP 必接）

接入 IAP 的游戏**必须同时接入客服能力**，否则审核不通过。

### 接入方式（二选一）

| 方式 | 适用范围 | 说明 |
|------|---------|------|
| 抖音IM客服 | 仅抖音 App | 在开发者后台「用户服务 → 抖音IM客服」开启，配置客服账号 |
| 平台客服 | 全App通用 | 在开发者后台「用户服务 → 平台客服」开启，支持所有宿主App |

### 客服入口

在游戏内提供客服入口按钮，点击后调用：

```javascript
// 打开客服会话
tt.openCustomerServiceConversation({
  sessionFrom: 'payment_issue',  // 会话来源标识
  success() {
    console.log('客服会话已打开');
  },
  fail(err) {
    console.error('打开客服失败:', err);
  }
});
```

> 建议在游戏设置页面、支付结果页面放置客服入口。
