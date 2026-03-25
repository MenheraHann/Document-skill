# 广告变现接入指南（IAA）

## 广告类型

| 类型 | 说明 | 适用场景 | 收益特点 |
|------|------|---------|---------|
| 激励视频 | 用户主动观看 15-30s 视频获得奖励 | 复活、获取道具、加速、解锁关卡 | 单次收益高 |
| Banner | 游戏界面底部/顶部展示广告条 | 常驻展示 | 持续曝光，单次收益低 |
| 插屏广告 | 游戏暂停或关卡切换时弹出 | 关卡间、暂停界面、结算页面 | 介于两者之间 |

## 前置条件

1. 登录开发者控制台 → 进入小游戏
2. 进入「变现 → 流量变现」
3. 创建广告位，获取**广告位 ID**（adUnitId）
4. 等待广告位审核通过

## 激励视频广告

### 接入代码

```javascript
// 创建激励视频广告实例（全局只创建一次）
// 重要：必须在游戏初始化完成后创建（如引擎的 onLoad 回调中），不要在全局顶层创建！
let rewardedAd = null;

function initRewardedAd() {
  rewardedAd = tt.createRewardedVideoAd({
    adUnitId: '你的广告位ID'
  });

  // 广告加载成功
  rewardedAd.onLoad(() => {
    console.log('激励视频加载成功');
  });

  // 广告加载失败
  rewardedAd.onError((err) => {
    console.error('激励视频加载失败:', err.errCode, err.errMsg);
  });

  // 广告关闭回调 — 这里判断是否发放奖励
  rewardedAd.onClose((res) => {
    if (res && res.isEnded) {
      // 用户完整观看了广告，发放奖励
      grantReward();
    } else {
      // 用户中途关闭，不发放奖励
      console.log('用户未看完广告');
    }
  });
}

// 展示激励视频
function showRewardedAd() {
  if (!rewardedAd) {
    console.error('广告未初始化');
    return;
  }

  rewardedAd.show().catch(() => {
    // 广告还没加载好，先加载再展示
    rewardedAd.load()
      .then(() => rewardedAd.show())
      .catch((err) => {
        console.error('广告展示失败:', err);
        // 降级处理：直接给用户奖励或提示稍后重试
      });
  });
}
```

### 关键注意事项

1. **创建时机**：必须在游戏初始化完成后创建（如 Cocos 的 `onLoad`、Laya 的 `onAwake`），不要在全局作用域顶层同步创建
2. **全局单例**：激励视频实例全局只需创建一次，重复展示调用 `show()` 即可
3. **奖励判断**：通过 `onClose` 回调的 `res.isEnded` 判断用户是否完整观看
4. **填充率**：新广告位初期可能无填充，做好降级处理
5. **展示频率**：避免过于频繁弹出广告，影响用户体验

## Banner 广告

### 接入代码

```javascript
// 创建 Banner 广告
const bannerAd = tt.createBannerAd({
  adUnitId: '你的Banner广告位ID',
  style: {
    left: 0,
    top: 0,
    width: 300  // Banner 宽度，高度会自动计算
  }
});

// 广告加载成功后显示
bannerAd.onLoad(() => {
  console.log('Banner 加载成功');
  bannerAd.show();
});

// 监听尺寸变化，调整位置（通常放在屏幕底部）
bannerAd.onResize((size) => {
  const systemInfo = tt.getSystemInfoSync();
  bannerAd.style.top = systemInfo.windowHeight - size.height;
  bannerAd.style.left = (systemInfo.windowWidth - size.width) / 2;
});

bannerAd.onError((err) => {
  console.error('Banner 加载失败:', err);
});

// 需要隐藏时
// bannerAd.hide();

// 不再需要时销毁
// bannerAd.destroy();
```

### 注意事项

- Banner 宽度最小 300px，高度自动计算
- 通常放在屏幕底部，不要遮挡核心游戏区域
- 不需要时记得 `hide()` 或 `destroy()`，避免影响游戏体验

## 插屏广告

### 接入代码

```javascript
// 创建插屏广告
const interstitialAd = tt.createInterstitialAd({
  adUnitId: '你的插屏广告位ID'
});

interstitialAd.onLoad(() => {
  console.log('插屏广告加载成功');
});

interstitialAd.onError((err) => {
  console.error('插屏广告加载失败:', err);
});

interstitialAd.onClose(() => {
  console.log('用户关闭了插屏广告');
  // 继续游戏流程
});

// 在合适的时机展示（如关卡结束、暂停恢复）
function showInterstitialAd() {
  interstitialAd.show().catch((err) => {
    console.log('插屏广告展示失败:', err);
    // 直接继续游戏流程
  });
}
```

### 展示时机建议

- 关卡结束结算页面
- 游戏暂停后恢复
- 返回主菜单时
- **避免**：游戏进行中突然弹出

## 混合变现策略

建议同时使用 IAA + IAP，最大化收益：

| 策略 | 说明 |
|------|------|
| IAA 做基础收入 | 激励视频 + Banner 覆盖所有用户 |
| IAP 做增值收入 | 皮肤、道具包等供付费用户购买 |
| A/B 测试 | 测试不同广告频率和内购定价 |
| 避免过度广告 | 每次游戏间 1-2 次激励视频为宜 |

## 常见问题

| 问题 | 解决 |
|------|------|
| 广告不展示 | 检查广告位 ID、确认审核通过、检查创建时机 |
| 填充率低 | 新广告位需要时间积累，可设置多个广告位轮询 |
| 奖励未发放 | 确认在 `onClose` 中检查了 `res.isEnded` |
| Banner 位置不对 | 在 `onResize` 中重新计算位置 |
