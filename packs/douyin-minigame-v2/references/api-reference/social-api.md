# 社交 API

## tt.shareAppMessage

主动触发分享。

```javascript
tt.shareAppMessage({
  title: '分享标题',           // 最多 36 个字符
  imageUrl: 'https://...',     // 分享图片 URL，≤128KB
  query: 'key1=val1&key2=val2', // 自定义参数
  success() {},
  fail(err) {},
  complete() {}
});
```

---

## tt.showShareMenu

显示右上角分享按钮。

```javascript
tt.showShareMenu({
  withShareTicket: true  // 是否获取群分享标识
});
```

---

## tt.onShareAppMessage

监听用户点击右上角分享。

```javascript
tt.onShareAppMessage(() => {
  return {
    title: '分享标题',
    imageUrl: 'https://...',
    query: 'from=menu_share'
  };
});
```

---

## tt.setUserCloudStorage

设置用户云存储数据（用于排行榜）。

```javascript
tt.setUserCloudStorage({
  KVDataList: [
    { key: 'score', value: JSON.stringify({ score: 1000 }) }
  ],
  success() {},
  fail(err) {}
});
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| KVDataList | Array | 是 | 键值对数组 |
| KVDataList[].key | string | 是 | 数据键名 |
| KVDataList[].value | string | 是 | 数据值（JSON 字符串）|

---

## tt.getFriendCloudStorage

获取好友云存储数据（**仅限开放数据域调用**）。

```javascript
// 在开放数据域中调用
tt.getFriendCloudStorage({
  keyList: ['score'],
  success(res) {
    // res.data - 好友数据数组
    // 每项包含: nickName, avatarUrl, openid, KVDataList
  },
  fail(err) {}
});
```

---

## tt.checkFollowState

检查侧边栏复访状态。

```javascript
tt.checkFollowState({
  success(res) {
    // res.result - boolean, 是否已开启侧边栏
  },
  fail(err) {}
});
```

---

## tt.showFollowChannel

引导用户开启侧边栏复访。

```javascript
tt.showFollowChannel({
  success() {
    // 用户同意开启
  },
  fail() {
    // 用户拒绝
  }
});
```

---

## tt.getGameRecorderManager

获取录屏管理器。

```javascript
const recorder = tt.getGameRecorderManager();

// 开始录屏
recorder.start({
  duration: 30  // 最长录制时长（秒）
});

// 监听事件
recorder.onStart(() => {});
recorder.onStop((res) => {
  res.videoPath  // 录屏文件路径
});
recorder.onError((err) => {});

// 停止录屏
recorder.stop();
```

---

## tt.requestSubscribeMessage

请求订阅消息授权。

```javascript
tt.requestSubscribeMessage({
  tmplIds: ['模板ID1', '模板ID2'],  // 在开发者后台配置
  success(res) {
    // res['模板ID1'] - 'accept' | 'reject' | 'ban'
  },
  fail(err) {}
});
```

---

## tt.openAwemeUserProfile

打开抖音用户主页（引导关注）。

```javascript
tt.openAwemeUserProfile({
  uid: '抖音号UID',  // 游戏官方抖音号
  success() {},
  fail(err) {}
});
```
