# 系统 API

## tt.getSystemInfoSync

同步获取系统信息。

```javascript
const info = tt.getSystemInfoSync();
```

### 返回值

| 字段 | 类型 | 说明 |
|------|------|------|
| brand | string | 设备品牌 |
| model | string | 设备型号 |
| system | string | 操作系统及版本 |
| platform | string | `'ios'` / `'android'` / `'devtools'` |
| screenWidth | number | 屏幕宽度（px）|
| screenHeight | number | 屏幕高度（px）|
| windowWidth | number | 可用窗口宽度 |
| windowHeight | number | 可用窗口高度 |
| pixelRatio | number | 设备像素比 |
| SDKVersion | string | 基础库版本 |
| appName | string | `'Douyin'` / `'Toutiao'` 等 |

---

## tt.createCanvas

创建 Canvas 画布。

```javascript
// 创建主画布（第一次调用返回屏幕大小的主画布）
const canvas = tt.createCanvas();
const ctx = canvas.getContext('2d');

// 后续调用创建离屏画布
const offscreen = tt.createCanvas();
offscreen.width = 200;
offscreen.height = 200;
```

---

## tt.createImage

创建图片对象。

```javascript
const img = tt.createImage();
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};
img.src = 'images/bg.png';  // 本地路径或网络 URL
```

---

## tt.getPerformance

获取性能管理器（用于性能监控）。

```javascript
const perf = tt.getPerformance();
const entries = perf.getEntries();
// 分析启动耗时等性能指标
```

---

## tt.onKeyboardInput

监听键盘输入（用于聊天/昵称输入场景）。

```javascript
tt.showKeyboard({
  defaultValue: '',
  maxLength: 20,
  multiple: false,
  confirmType: 'done'
});

tt.onKeyboardInput((res) => {
  const input = res.value;
  // 必须对输入做敏感词过滤！（有用户输入的游戏必接）
  filterSensitiveWords(input);
});

tt.onKeyboardConfirm((res) => {
  console.log('用户确认输入:', res.value);
});

tt.hideKeyboard();
```

> **注意**：有用户自定义输入的游戏必须接入敏感词过滤，否则审核不通过。

### 敏感词过滤实现

抖音小游戏通过服务端内容安全检测 API 实现敏感词过滤：

```javascript
// 客户端：将用户输入发送到自己的服务端过滤
async function filterSensitiveWords(text) {
  const res = await new Promise((resolve, reject) => {
    tt.request({
      url: 'https://你的服务端/api/check-text',
      method: 'POST',
      data: { content: text },
      success: resolve,
      fail: reject
    });
  });

  if (res.data.isSafe) {
    // 文本安全，正常使用
    applyUserInput(text);
  } else {
    // 文本包含敏感词，提示用户
    showToast('输入包含违规内容，请修改');
  }
}
```

服务端调用平台内容安全接口：

```
POST https://developer.toutiao.com/api/v2/tags/text/antidirt
Headers: { "X-Token": "你的access_token" }
Body: { "tasks": [{ "content": "待检测文本" }] }

响应:
{
  "data": [{
    "predicts": [{ "model_name": "porn", "hit": false }],
    "code": 0
  }]
}
```

> 所有 `predicts` 中 `hit` 均为 `false` 表示文本安全。

---

## tt.getStorageSync / tt.setStorageSync

本地数据缓存。

```javascript
// 存储
tt.setStorageSync('gameData', JSON.stringify({ level: 5, score: 1000 }));

// 读取
const data = JSON.parse(tt.getStorageSync('gameData') || '{}');

// 异步版本
tt.setStorage({
  key: 'gameData',
  data: JSON.stringify({ level: 5 }),
  success() {}
});

tt.getStorage({
  key: 'gameData',
  success(res) {
    const data = JSON.parse(res.data);
  }
});

// 删除
tt.removeStorageSync('gameData');

// 清空
tt.clearStorageSync();
```

### 存储限制

- 单个 key 最大 1MB
- 总存储上限 10MB
