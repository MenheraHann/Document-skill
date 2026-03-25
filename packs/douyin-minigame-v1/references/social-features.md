# 社交功能接入指南

## 可接入的社交能力

| 功能 | 说明 | 适用场景 |
|------|------|---------|
| 分享 | 将游戏分享到抖音聊天/动态 | 拉新、裂变传播 |
| 好友邀请 | 邀请好友获得游戏奖励 | 社交裂变 |
| 排行榜 | 好友间比分排名 | 竞争动力、留存 |
| 关注抖音号 | 引导关注游戏官方号 | 私域运营 |
| 录屏分享 | 自动生成通关录像分享 | 内容传播 |
| 侧边栏复访 | 用户从侧边栏快速回到游戏 | 留存（**必接**）|

## 前置条件

社交功能需要先完成用户登录。登录和用户信息获取的 API 详见 `api-reference/login-api.md`。

## 分享功能

### 主动分享

```javascript
tt.shareAppMessage({
  title: '来挑战我的最高分！',
  imageUrl: 'https://example.com/share-image.jpg',  // 分享图片，≤128KB
  query: 'from=share&score=1000',  // 自定义参数
  success() {
    console.log('分享成功');
    // 可以给分享者奖励
  },
  fail(err) {
    console.log('分享失败或取消:', err);
  }
});
```

### 展示分享菜单

```javascript
// 在游戏初始化时调用，显示右上角分享按钮
tt.showShareMenu({
  withShareTicket: true  // 获取群分享标识
});

// 监听用户点击分享
tt.onShareAppMessage(() => {
  return {
    title: '快来和我一起玩！',
    imageUrl: 'https://example.com/share.jpg',
    query: 'inviter=user123'
  };
});
```

### 分享注意事项

- 分享图片不超过 **128KB**
- 分享标题不超过 **36 个字符**
- 不要频繁强制弹出分享，影响用户体验
- 可以给分享者适当奖励以鼓励传播

## 好友邀请

通过分享功能实现好友邀请，在 query 中携带邀请者信息：

```javascript
// 发起邀请（本质是带邀请参数的分享）
tt.shareAppMessage({
  title: '快来和我一起玩！',
  imageUrl: 'https://example.com/invite.jpg',
  query: 'inviter=user123&from=invite',  // 携带邀请者信息
  success() {
    console.log('邀请发送成功');
  }
});

// 被邀请者打开游戏时，获取邀请参数
const launchOptions = tt.getLaunchOptionsSync();
const query = launchOptions.query;
if (query.inviter) {
  // 处理邀请逻辑（如给双方发奖励）
  handleInvite(query.inviter);
}
```

## 排行榜（云存储）

使用平台云存储实现好友排行榜：

### 上传分数

```javascript
// 设置用户云存储数据（用于排行榜）
tt.setUserCloudStorage({
  KVDataList: [
    { key: 'score', value: JSON.stringify({ score: 1000, level: 5 }) }
  ],
  success() {
    console.log('分数上传成功');
  },
  fail(err) {
    console.error('分数上传失败:', err);
  }
});
```

### 获取好友排行

好友排行榜需要在**开放数据域**（子域）中渲染：

```javascript
// 在开放数据域中获取好友排行
tt.getFriendCloudStorage({
  keyList: ['score'],
  success(res) {
    const data = res.data;
    // data 是好友列表，每个包含 nickname、avatarUrl 和 KVDataList
    data.sort((a, b) => {
      const scoreA = JSON.parse(a.KVDataList[0]?.value || '{"score":0}').score;
      const scoreB = JSON.parse(b.KVDataList[0]?.value || '{"score":0}').score;
      return scoreB - scoreA;
    });
    // 渲染排行榜 UI
    renderRankList(data);
  }
});
```

### 开放数据域说明

- 好友关系数据只能在**开放数据域**（独立的 JS 运行环境）中获取
- 开放数据域通过 `sharedCanvas` 渲染，主域通过绘制 sharedCanvas 显示
- 开放数据域和主域通过 `postMessage` 通信

## 侧边栏复访（必接！）

所有小游戏必须接入，否则审核不通过。

```javascript
// 检查侧边栏设置状态
tt.checkFollowState({
  success(res) {
    if (!res.result) {
      // 用户未开启侧边栏，引导开启
      tt.showFollowChannel({
        success() {
          console.log('用户已开启侧边栏');
        },
        fail() {
          console.log('用户拒绝开启');
        }
      });
    }
  }
});
```

### 接入时机建议

- 游戏首次打开时检查并引导
- 不要在游戏过程中频繁弹出
- 可以在获得成就/奖励时顺带引导

## 录屏分享

```javascript
// 开始录屏
const recorder = tt.getGameRecorderManager();

recorder.onStart(() => {
  console.log('录屏开始');
});

recorder.onStop((res) => {
  // 录屏结束，获取视频路径
  const videoPath = res.videoPath;

  // 分享录屏
  tt.shareAppMessage({
    channel: 'video',
    title: '看我的神操作！',
    extra: {
      videoPath: videoPath,
      videoTopics: ['小游戏', '挑战']
    }
  });
});

// 开始录制
recorder.start({ duration: 30 });  // 最长30秒

// 停止录制
// recorder.stop();
```

