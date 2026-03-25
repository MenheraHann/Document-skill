import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface VersionInfo {
  version: string;
  date: string;
  tag: "latest" | "stable" | "legacy";
  changes: string[];
  downloadUrl: string;
}

interface PackInfo {
  name: string;
  description: string;
  identity: string;
  currentVersion: string;
  references: { file: string; label: string }[];
  pitfalls: string[];
  engines: string[];
  versions: VersionInfo[];
}

const packData: Record<string, PackInfo> = {
  "douyin-minigame-v2": {
    name: "抖音小游戏开发专家 v2",
    description:
      "顾问式交互：先采访需求 → 生成定制计划 → 逐步门控推进 → 提审前自查。Agent 不再甩知识，而是像资深顾问一样一步步带你走。",
    identity:
      "安装后，你的 Agent 将成为抖音小游戏资深开发顾问——不会一上来就甩知识，而是先了解你的现状和需求，生成定制化计划，逐步门控推进，提审前还会帮你逐条自查。",
    currentVersion: "2.0.0",
    references: [
      { file: "getting-started.md", label: "从零开始创建项目" },
      { file: "payment.md", label: "支付 / 内购（IAP）接入" },
      { file: "ad-monetization.md", label: "广告变现（激励视频/Banner/插屏）" },
      { file: "social-features.md", label: "社交功能（分享/排行榜/邀请）" },
      { file: "review-submission.md", label: "提交审核与上线发布 + 自查清单详解 + 接入计划模板" },
      { file: "debugging.md", label: "调试与问题排查" },
      { file: "api-reference/login-api.md", label: "登录 API 参考" },
      { file: "api-reference/payment-api.md", label: "支付 API 参考" },
      { file: "api-reference/ad-api.md", label: "广告 API 参考" },
      { file: "api-reference/social-api.md", label: "社交 API 参考" },
      { file: "api-reference/system-api.md", label: "系统 API 参考" },
    ],
    pitfalls: [
      "Phase 1 采访不能跳过 — Agent 必须先问清现状再生成计划",
      "门控条件必须确认 — 用户未确认当前阶段完成，禁止进入下一步",
      "提审自查 10 项全过 — 任何一项未通过，禁止说「可以提审」",
      "侧边栏必接 — 所有小游戏上线前必须接入侧边栏复访能力",
      "内购必接客服 — 接入 IAP 的游戏必须同时接入客服能力",
      "有输入必过滤 — 有用户自定义输入的游戏必须接入敏感词过滤 API",
      "支付回调服务端验证 — 客户端验证会被拒审",
      "包体限制 4MB — 超出需使用分包加载",
    ],
    engines: [
      "Cocos Creator — 发布时选择「小游戏」平台",
      "Laya — 发布时选择字节跳动小游戏",
      "Egret — 发布时选择字节跳动小游戏",
      "Unity — 通过 Unity 小游戏转换工具导出",
      "无引擎 — 手动打包（需含 project.config.json 和 game.json）",
    ],
    versions: [
      {
        version: "2.0.0",
        date: "2026-03-25",
        tag: "latest",
        changes: [
          "全新顾问式交互：先采访需求，再生成定制计划",
          "新增 5 种工作模式自动切换（新手引导/阶段跳入/问题排查/API查询/提审检查）",
          "新增 Phase 1-4 四阶段流程（采访→计划→门控执行→提审自查）",
          "新增提审自查清单详解（附录 A）和接入计划模板（附录 B）",
          "SKILL.md 精简至 360 词，详细数据按需从 references 加载",
        ],
        downloadUrl: "https://github.com/MenheraHann/Document-skill/archive/refs/tags/v2.0.0.zip",
      },
    ],
  },
  "douyin-minigame-v1": {
    name: "抖音小游戏开发专家 v1",
    description:
      "百科全书式：涵盖项目创建、引擎接入、支付/广告变现、社交功能、提审上线全流程。一次性给 Agent 所有知识，让它精通每一个细节。",
    identity:
      "安装后，你的 Agent 将成为抖音小游戏资深开发者，精通从项目创建到上线运营的全流程——了解平台的每一个接口、每一个审核要求、每一个容易踩的坑。",
    currentVersion: "1.2.0",
    references: [
      { file: "getting-started.md", label: "从零开始创建项目" },
      { file: "payment.md", label: "支付 / 内购（IAP）接入" },
      { file: "ad-monetization.md", label: "广告变现（激励视频/Banner/插屏）" },
      { file: "social-features.md", label: "社交功能（分享/排行榜/邀请）" },
      { file: "review-submission.md", label: "提交审核与上线发布" },
      { file: "debugging.md", label: "调试与问题排查" },
      { file: "api-reference/login-api.md", label: "登录 API 参考" },
      { file: "api-reference/payment-api.md", label: "支付 API 参考" },
      { file: "api-reference/ad-api.md", label: "广告 API 参考" },
      { file: "api-reference/social-api.md", label: "社交 API 参考" },
      { file: "api-reference/system-api.md", label: "系统 API 参考" },
    ],
    pitfalls: [
      "侧边栏必接 — 所有小游戏上线前必须接入侧边栏复访能力，否则审核必挂",
      "软著必备 — 没有软件著作权登记证书无法通过审核",
      "内购必接客服 — 接入 IAP 的游戏必须同时接入客服能力",
      "有输入必过滤 — 有用户自定义输入的游戏必须接入敏感词过滤 API",
      "支付回调服务端验证 — 客户端验证会被拒审",
      "激励视频时机 — 需在游戏初始化完成后创建，不要在全局作用域顶层创建",
      "包体限制 4MB — 超出需使用分包加载",
      "iOS 无虚拟支付 — iOS 端必须走平台内购通道",
    ],
    engines: [
      "Cocos Creator — 发布时选择「小游戏」平台",
      "Laya — 发布时选择字节跳动小游戏",
      "Egret — 发布时选择字节跳动小游戏",
      "Unity — 通过 Unity 小游戏转换工具导出",
      "无引擎 — 手动打包（需含 project.config.json 和 game.json）",
    ],
    versions: [
      {
        version: "1.2.0",
        date: "2026-03-25",
        tag: "latest",
        changes: [
          "新增客服能力接入指南（IAP 必接）",
          "新增敏感词过滤完整实现示例",
          "修正广告初始化时机说明，适配多引擎场景",
          "好友邀请改用分享+query 方案，移除错误的 navigateToMiniGame 示例",
        ],
        downloadUrl: "https://github.com/MenheraHann/Document-skill/archive/refs/tags/v1.2.0.zip",
      },
      {
        version: "1.1.0",
        date: "2026-03-20",
        tag: "stable",
        changes: [
          "新增 Unity 小游戏转换工具接入说明",
          "支付模块增加沙盒测试环境配置",
          "补充 tt.requestSubscribeMessage 订阅消息 API",
          "debugging.md 新增性能优化专区（纹理压缩/分包加载）",
        ],
        downloadUrl: "https://github.com/MenheraHann/Document-skill/archive/refs/tags/v1.1.0.zip",
      },
      {
        version: "1.0.0",
        date: "2026-03-15",
        tag: "legacy",
        changes: [
          "首次发布",
          "涵盖注册入驻、项目创建、开发环境、支付、广告、社交、提审全流程",
          "包含 12 个参考文件，覆盖 5 大类 API",
        ],
        downloadUrl: "https://github.com/MenheraHann/Document-skill/archive/refs/tags/v1.0.0.zip",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(packData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pack = packData[slug];
  if (!pack) return { title: "未找到" };
  return {
    title: `${pack.name} — Agent Skills`,
    description: pack.description,
  };
}

export default async function PackDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pack = packData[slug];

  if (!pack) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-300">
          首页
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-300">{pack.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold">{pack.name}</h1>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed">
          {pack.description}
        </p>
      </div>

      {/* Agent identity */}
      <section className="mb-12 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
        <h2 className="text-lg font-semibold mb-3 text-blue-400">
          安装后你的 Agent 会变成什么？
        </h2>
        <p className="text-gray-300 leading-relaxed">{pack.identity}</p>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">工作原理：三层渐进式加载</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">
              1
            </div>
            <div>
              <h3 className="font-semibold">SKILL.md — 全局认知</h3>
              <p className="text-sm text-gray-400 mt-1">
                Agent 启动时自动读取。包含身份设定、开发流程总览、关键决策指引表。Agent
                立刻知道自己是谁、该做什么。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
              2
            </div>
            <div>
              <h3 className="font-semibold">references/*.md — 按需加载</h3>
              <p className="text-sm text-gray-400 mt-1">
                当用户提到具体主题（如支付、广告），Agent
                根据指引表加载对应参考文件。不浪费上下文窗口。
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-sm font-bold text-pink-400">
              3
            </div>
            <div>
              <h3 className="font-semibold">api-reference/*.md — 精准查阅</h3>
              <p className="text-sm text-gray-400 mt-1">
                写代码时，Agent 按需查阅具体 API
                的参数、返回值、错误码，像查字典一样精准。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">包含的参考文件</h2>
        <div className="rounded-xl border border-gray-800 overflow-hidden">
          {pack.references.map((ref, i) => (
            <div
              key={ref.file}
              className={`flex items-center gap-3 px-4 py-3 ${
                i !== 0 ? "border-t border-gray-800" : ""
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span className="text-sm font-mono text-gray-500">{ref.file}</span>
              <span className="text-sm text-gray-300 ml-auto">{ref.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Common pitfalls */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">知识包帮你避开的坑</h2>
        <ul className="space-y-3">
          {pack.pitfalls.map((pitfall) => (
            <li key={pitfall} className="flex gap-3 text-sm">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-gray-300">{pitfall}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Supported engines */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">支持的游戏引擎</h2>
        <ul className="space-y-2">
          {pack.engines.map((engine) => (
            <li key={engine} className="flex gap-3 text-sm text-gray-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {engine}
            </li>
          ))}
        </ul>
      </section>

      {/* Version history */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">版本历史</h2>
        <div className="space-y-4">
          {pack.versions.map((v) => (
            <div
              key={v.version}
              className={`p-5 rounded-xl border ${
                v.tag === "latest"
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "border-gray-800 bg-gray-900/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono font-bold text-lg">
                  v{v.version}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    v.tag === "latest"
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : v.tag === "stable"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                  }`}
                >
                  {v.tag}
                </span>
                <span className="text-sm text-gray-500 ml-auto">{v.date}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {v.changes.map((change) => (
                  <li
                    key={change}
                    className="flex gap-2 text-sm text-gray-300"
                  >
                    <span className="text-gray-600 shrink-0">•</span>
                    {change}
                  </li>
                ))}
              </ul>
              <a
                href={v.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  v.tag === "latest"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                下载 v{v.version}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6">安装方式</h2>
        <div className="space-y-6">
          {/* Method 1 */}
          <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                推荐
              </span>
              <h3 className="font-semibold">方式一：从 GitHub 下载</h3>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              下载整个仓库的 ZIP，解压后将{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 text-xs">
                packs/{slug}/
              </code>{" "}
              目录复制到你的项目中。
            </p>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
              <p className="text-gray-500"># 复制到 Claude Code 的 skills 目录</p>
              <p>
                cp -r packs/{slug}/ your-project/.claude/skills/{slug}/
              </p>
              <p className="text-gray-500 mt-3"># 或者 Cursor 的 skills 目录</p>
              <p>
                cp -r packs/{slug}/ your-project/.cursor/skills/{slug}/
              </p>
            </div>
          </div>

          {/* Method 2 */}
          <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                即将推出
              </span>
              <h3 className="font-semibold">方式二：CLI 一键安装</h3>
            </div>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-400">
              <p>npx agent-skills add owner/{slug}</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">CLI 工具正在开发中</p>
          </div>

          {/* Method 3 */}
          <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/50">
            <h3 className="font-semibold mb-3">方式三：手动 Clone</h3>
            <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
              <p className="text-gray-500"># 替换为实际仓库地址</p>
              <p>git clone https://github.com/your-org/agent-skills.git</p>
              <p>cd agent-skills</p>
              <p>
                cp -r packs/{slug}/
                ~/your-project/.claude/skills/{slug}/
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-8 border-t border-gray-800">
        <Link
          href="/quickstart"
          className="inline-block px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          查看完整安装教程
        </Link>
      </div>
    </div>
  );
}
