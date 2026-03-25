import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "快速开始 — Agent Skills",
  description: "三步将知识包安装到你的 AI 编程工具中",
};

export default function QuickstartPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">快速开始</h1>
        <p className="mt-4 text-lg text-gray-400">
          三步将知识包安装到你的 AI 编程工具中
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-12">
        {/* Step 1 */}
        <section className="relative pl-12">
          <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold">
            1
          </div>
          <h2 className="text-xl font-bold mb-4">下载知识包</h2>
          <p className="text-gray-400 mb-4">
            从 GitHub 仓库下载你需要的知识包。目前可用的知识包：
          </p>
          <Link
            href="/packs/douyin-minigame"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            抖音小游戏开发专家
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
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <div className="mt-4 bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
            <p className="text-gray-500"># 克隆仓库（替换为实际仓库地址）</p>
            <p>git clone https://github.com/your-org/agent-skills.git</p>
            <p>cd agent-skills</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="relative pl-12">
          <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold">
            2
          </div>
          <h2 className="text-xl font-bold mb-4">复制到项目的 skills 目录</h2>
          <p className="text-gray-400 mb-4">
            根据你使用的 AI 编程工具，将知识包复制到对应的 skills 目录中：
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">
                Claude Code
              </h3>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                <p className="text-gray-500"># 在 agent-skills 仓库目录内执行，将知识包复制到你的项目</p>
                <p>mkdir -p ~/your-project/.claude/skills</p>
                <p>
                  cp -r packs/douyin-minigame/ ~/your-project/.claude/skills/douyin-minigame/
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/50">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Cursor</h3>
              <div className="bg-gray-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                <p className="text-gray-500"># 在 agent-skills 仓库目录内执行，将知识包复制到你的项目</p>
                <p>mkdir -p ~/your-project/.cursor/skills</p>
                <p>
                  cp -r packs/douyin-minigame/
                  ~/your-project/.cursor/skills/douyin-minigame/
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-yellow-400">目录结构</span>
              ：确保最终结构为{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-800 text-xs">
                .claude/skills/douyin-minigame/SKILL.md
              </code>{" "}
              ，SKILL.md 文件是知识包的入口。
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="relative pl-12">
          <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold">
            3
          </div>
          <h2 className="text-xl font-bold mb-4">打开 AI 编程工具，开始开发</h2>
          <p className="text-gray-400 mb-4">
            打开你的 AI 编程工具（Claude Code 或 Cursor），Agent
            会自动读取知识包。你只需要像平时一样提需求：
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-gray-900/80 border border-gray-800">
              <p className="text-sm text-gray-500 mb-1">你说：</p>
              <p className="text-gray-200">
                &ldquo;帮我创建一个抖音小游戏项目，接入激励视频广告&rdquo;
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/80 border border-gray-800">
              <p className="text-sm text-gray-500 mb-1">Agent 会：</p>
              <ul className="text-sm text-gray-300 space-y-1.5 mt-2">
                <li className="flex gap-2">
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
                  从 SKILL.md 了解整体开发流程
                </li>
                <li className="flex gap-2">
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
                  按需加载 getting-started.md 和 ad-monetization.md
                </li>
                <li className="flex gap-2">
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
                  查阅 ad-api.md 获取具体接口参数
                </li>
                <li className="flex gap-2">
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
                  自动规避常见陷阱（如激励视频创建时机）
                </li>
                <li className="flex gap-2">
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
                  生成符合平台规范的代码
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className="mt-16 pt-12 border-t border-gray-800">
        <h2 className="text-xl font-bold mb-8">常见问题</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">知识包会消耗多少上下文窗口？</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              知识包采用三层渐进式加载设计。Agent
              启动时只读取很小的 SKILL.md
              文件（约 2KB），获得全局认知。具体的参考文件只在需要时才按需加载。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">支持哪些 AI 编程工具？</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              目前已测试 Claude Code 和 Cursor。理论上任何支持读取本地 Markdown
              文件的 AI 编程工具都可以使用。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">知识包的内容准确吗？</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              知识包的内容直接来源于平台官方文档，经过结构化重组和校验。如果发现内容有误，欢迎在
              GitHub 提 Issue。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">如何贡献新的知识包？</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              欢迎为其他平台制作知识包！请参考现有知识包的结构（SKILL.md +
              references/ 目录），通过 Pull Request 提交。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-12 mt-8 border-t border-gray-800">
        <p className="text-gray-400 mb-4">准备好了？浏览可用的知识包</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:from-blue-500 hover:to-purple-500 transition-all"
        >
          浏览知识包
        </Link>
      </div>
    </div>
  );
}
