# 广告 API

## tt.createRewardedVideoAd

创建激励视频广告实例。

```javascript
const rewardedAd = tt.createRewardedVideoAd({
  adUnitId: '广告位ID'  // 在开发者后台创建
});
```

### 实例方法

| 方法 | 说明 |
|------|------|
| `load()` | 加载广告，返回 Promise |
| `show()` | 展示广告，返回 Promise |
| `onLoad(callback)` | 监听加载成功 |
| `onError(callback)` | 监听加载失败 |
| `onClose(callback)` | 监听广告关闭 |
| `offLoad(callback)` | 取消监听加载成功 |
| `offError(callback)` | 取消监听加载失败 |
| `offClose(callback)` | 取消监听关闭 |

### onClose 回调参数

```javascript
rewardedAd.onClose((res) => {
  res.isEnded  // boolean - 用户是否完整观看了广告
});
```

### onError 回调参数

```javascript
rewardedAd.onError((err) => {
  err.errCode  // number - 错误码
  err.errMsg   // string - 错误信息
});
```

> **注意**：必须在游戏初始化完成后创建实例（不要在全局作用域顶层同步创建），否则静默失败。全局只需创建一次。

---

## tt.createBannerAd

创建 Banner 广告实例。

```javascript
const bannerAd = tt.createBannerAd({
  adUnitId: '广告位ID',
  style: {
    left: 0,       // 左上角横坐标
    top: 0,        // 左上角纵坐标
    width: 300     // 宽度，最小 300，高度自动计算
  }
});
```

### 实例方法

| 方法 | 说明 |
|------|------|
| `show()` | 显示 Banner |
| `hide()` | 隐藏 Banner |
| `destroy()` | 销毁 Banner 实例 |
| `onLoad(callback)` | 监听加载成功 |
| `onError(callback)` | 监听加载失败 |
| `onResize(callback)` | 监听尺寸变化 |

### onResize 回调参数

```javascript
bannerAd.onResize((size) => {
  size.width   // number - 实际宽度
  size.height  // number - 实际高度
});
```

---

## tt.createInterstitialAd

创建插屏广告实例。

```javascript
const interstitialAd = tt.createInterstitialAd({
  adUnitId: '广告位ID'
});
```

### 实例方法

| 方法 | 说明 |
|------|------|
| `load()` | 加载广告，返回 Promise |
| `show()` | 展示广告，返回 Promise |
| `destroy()` | 销毁实例 |
| `onLoad(callback)` | 监听加载成功 |
| `onError(callback)` | 监听加载失败 |
| `onClose(callback)` | 监听广告关闭 |
