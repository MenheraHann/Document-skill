# 支付 API

## tt.requestGamePayment

发起游戏内支付。

```javascript
tt.requestGamePayment({
  mode: 'game',
  env: 0,
  currencyType: 'CNY',
  buyQuantity: 100,
  customId: 'order_12345',
  extraInfo: '',
  zoneId: '1',
  success(res) {},
  fail(err) {},
  complete() {}
});
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| mode | string | 是 | `'game'` 游戏币模式 / `'order'` 订单模式 |
| env | number | 是 | `0` 正式环境 / `1` 沙盒环境 |
| currencyType | string | 是 | 货币类型，目前仅支持 `'CNY'` |
| buyQuantity | number | 是（game模式）| 购买游戏币数量 |
| customId | string | 是 | 自定义订单号，用于服务端对账，**必须唯一** |
| extraInfo | string | 否 | 额外信息，透传到服务端回调 |
| zoneId | string | 否 | 游戏区服 ID |

### 错误码

| errCode | 含义 | 处理 |
|---------|------|------|
| 1 | 系统错误 | 重试 |
| 2 | 参数错误 | 检查参数格式和必填项 |
| 3 | 用户取消支付 | 正常流程，无需处理 |
| 4 | 网络错误 | 检查网络，提示重试 |
| 9 | 订单已支付 | 检查是否重复发起 |

### 服务端回调

平台会向配置的回调地址发送 POST 请求：

| 字段 | 类型 | 说明 |
|------|------|------|
| appid | string | 小游戏 AppID |
| cp_orderno | string | 对应客户端 customId |
| cp_extra | string | 对应客户端 extraInfo |
| way | string | 支付方式 |
| token | string | 签名 token |
| total_amount | number | 支付金额 |
| status | string | `'success'` 支付成功 |

### 回调响应

成功处理：`{"err_no": 0, "err_tips": "success"}`

处理失败：`{"err_no": 1, "err_tips": "错误原因"}`

> **签名验证**：对除 token 外的参数按 key 字母排序拼接，加上 app_secret 后 MD5，与 token 比较。详见 `references/payment.md`。
