import Link from "next/link";

const packs = [
  {
    slug: "douyin-minigame-v2",
    name: "抖音小游戏开发专家 v2",
    description:
      "顾问式交互：先采访需求 → 生成定制计划 → 逐步门控推进 → 提审前自查。Agent 不再甩知识，而是像资深顾问一样一步步带你走。",
    tags: ["抖音", "小游戏", "变现", "顾问式", "门控推进"],
    fileCount: 12,
  },
  {
    slug: "douyin-minigame-v1",
    name: "抖音小游戏开发专家 v1",
    description:
      "百科全书式：涵盖项目创建、引擎接入、支付/广告变现、社交功能、提审上线全流程。一次性给 Agent 所有知识。",
    tags: ["抖音", "小游戏", "变现", "Cocos", "Unity"],
    fileCount: 12,
  },
];

function BookIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="url(#card-grad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      <path d="M8 7h6" />
      <path d="M8 11h4" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            下载一个知识包
          </span>
          <br />
          你的 Agent 就变成那个平台的资深开发者
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          将平台官方文档转化为 AI 可直接使用的结构化知识。
          不用自己读文档，不用自己踩坑，Agent 帮你搞定。
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/quickstart"
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:from-blue-500 hover:to-purple-500 transition-all"
          >
            快速开始
          </Link>
          <a
            href="#packs"
            className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 font-medium text-sm hover:border-gray-500 hover:text-white transition-all"
          >
            浏览知识包
          </a>
        </div>
      </section>

      {/* What are knowledge packs */}
      <section className="py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-12">知识包是什么？</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">第一层：身份与流程</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              告诉 Agent 它是谁、开发流程是什么，遇到问题该查哪个文件。Agent
              立刻获得全局认知。
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">第二层：专题参考</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              支付、广告、社交、调试……每个主题一个文件，Agent
              按需加载，不浪费上下文窗口。
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ec4899"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 18l6-6-6-6" />
                <path d="M8 6l-6 6 6 6" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">第三层：API 细节</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              具体的接口参数、返回值、错误码。Agent
              写代码时按需查阅，像查字典一样精准。
            </p>
          </div>
        </div>
      </section>

      {/* Pack listing */}
      <section id="packs" className="py-16 border-t border-gray-800">
        <h2 className="text-2xl font-bold text-center mb-4">可用知识包</h2>
        <p className="text-center text-gray-400 mb-12">
          更多知识包持续制作中，欢迎贡献
        </p>
        <div className="grid gap-6">
          {packs.map((pack) => (
            <Link
              key={pack.slug}
              href={`/packs/${pack.slug}`}
              className="block group rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-all bg-gray-900/50 hover:bg-gray-900"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 mt-1">
                  <BookIcon />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                    {pack.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                    {pack.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pack.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-gray-800 text-gray-400 border border-gray-700">
                      {pack.fileCount} 个参考文件
                    </span>
                  </div>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors mt-1"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
