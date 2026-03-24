# AI 开发者平台专家库 — 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个处理管线 + 抖音小游戏知识包 + 分发网站的完整 MVP

**Architecture:** Python 本地工具链处理文档并生成 agentskills.io 标准知识包（SKILL.md + references/），Next.js 静态站作为分发网站，知识包托管在 GitHub。

**Tech Stack:** Python 3.14 + BeautifulSoup + Jinja2 + Gemini API | Next.js + Vercel | Git + GitHub

---

## Task 1: 项目初始化

**Files:**
- Create: `README.md`
- Create: `pipeline/requirements.txt`
- Create: `pipeline/pyproject.toml`
- Create: `.gitignore`

**Step 1: 初始化 Git 仓库**

```bash
cd /Users/menherahan/Documents/Develop/Document-skill
git init
```

**Step 2: 创建 .gitignore**

```gitignore
# Python
__pycache__/
*.pyc
.venv/
*.egg-info/

# Node
node_modules/
.next/
out/

# 环境变量
.env
.env.local

# 原始文档（不提交，体积大）
pipeline/raw-docs/

# OS
.DS_Store
```

**Step 3: 创建 Python 项目结构**

```
Document-skill/
├── pipeline/                  # 处理引擎
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── src/
│   │   ├── __init__.py
│   │   ├── fetch.py           # Phase 1: 文档采集
│   │   ├── clean.py           # Phase 2: 清洗
│   │   ├── image_to_text.py   # Phase 3: 图片转文字
│   │   ├── reorganize.py      # Phase 4: 内容重组
│   │   └── generate_skill.py  # Phase 5: 生成 SKILL.md
│   ├── templates/
│   │   └── skill.md.j2        # SKILL.md Jinja2 模板
│   ├── raw-docs/              # 原始文档存放（gitignore）
│   └── tests/
│       ├── __init__.py
│       ├── test_clean.py
│       ├── test_image_to_text.py
│       └── test_generate_skill.py
├── packs/                     # 生成的知识包
│   └── douyin-minigame/
│       ├── SKILL.md
│       └── references/
├── website/                   # 分发网站（Next.js）
├── docs/
│   └── plans/
└── .gitignore
```

**Step 4: 创建 requirements.txt**

```
requests>=2.31.0
beautifulsoup4>=4.12.0
markdownify>=0.13.0
Jinja2>=3.1.0
pytest>=8.0.0
```

**Step 5: 创建 Python 虚拟环境并安装依赖**

```bash
cd /Users/menherahan/Documents/Develop/Document-skill
python3 -m venv .venv
source .venv/bin/activate
pip install -r pipeline/requirements.txt
```

**Step 6: 提交**

```bash
git add .gitignore README.md pipeline/requirements.txt pipeline/pyproject.toml pipeline/src/__init__.py pipeline/tests/__init__.py
git commit -m "chore: 初始化项目结构"
```

---

## Task 2: 文档采集脚本 (fetch.py)

**Files:**
- Create: `pipeline/src/fetch.py`
- Create: `pipeline/tests/test_fetch.py`

**Step 1: 写 test_fetch.py 的测试**

```python
"""测试文档采集模块"""
import os
import tempfile
import pytest
from pipeline.src.fetch import fetch_page, save_raw_doc


def test_fetch_page_returns_html():
    """测试能获取网页内容"""
    # 用一个稳定的公开页面测试
    html = fetch_page("https://httpbin.org/html")
    assert html is not None
    assert len(html) > 0
    assert "<html" in html.lower()


def test_save_raw_doc_creates_file():
    """测试保存原始文档到文件"""
    with tempfile.TemporaryDirectory() as tmpdir:
        content = "<html><body><h1>Test</h1></body></html>"
        filepath = save_raw_doc(content, tmpdir, "test-page")
        assert os.path.exists(filepath)
        with open(filepath, "r") as f:
            assert f.read() == content


def test_save_raw_doc_handles_chinese_filename():
    """测试中文文件名正常处理"""
    with tempfile.TemporaryDirectory() as tmpdir:
        content = "<html><body>测试</body></html>"
        filepath = save_raw_doc(content, tmpdir, "支付接入")
        assert os.path.exists(filepath)
```

**Step 2: 运行测试确认失败**

```bash
cd /Users/menherahan/Documents/Develop/Document-skill
source .venv/bin/activate
python -m pytest pipeline/tests/test_fetch.py -v
```

Expected: FAIL — `ModuleNotFoundError: No module named 'pipeline.src.fetch'`

**Step 3: 实现 fetch.py**

```python
"""
文档采集模块
从指定 URL 获取网页内容并保存为本地文件
"""
import os
import re
import requests


def fetch_page(url: str, timeout: int = 30) -> str:
    """
    获取网页 HTML 内容

    Args:
        url: 目标网页地址
        timeout: 请求超时时间（秒）

    Returns:
        网页 HTML 字符串
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                       "AppleWebKit/537.36 (KHTML, like Gecko) "
                       "Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers, timeout=timeout)
    response.raise_for_status()
    response.encoding = response.apparent_encoding
    return response.text


def save_raw_doc(content: str, output_dir: str, name: str) -> str:
    """
    保存原始文档内容到文件

    Args:
        content: 文档内容
        output_dir: 输出目录
        name: 文件名（不含扩展名）

    Returns:
        保存的文件路径
    """
    os.makedirs(output_dir, exist_ok=True)
    # 清理文件名中的特殊字符
    safe_name = re.sub(r'[<>:"/\\|?*]', '_', name)
    filepath = os.path.join(output_dir, f"{safe_name}.html")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return filepath
```

**Step 4: 运行测试确认通过**

```bash
python -m pytest pipeline/tests/test_fetch.py -v
```

Expected: 3 passed

**Step 5: 提交**

```bash
git add pipeline/src/fetch.py pipeline/tests/test_fetch.py
git commit -m "feat: 添加文档采集模块"
```

---

## Task 3: 文档清洗脚本 (clean.py)

**Files:**
- Create: `pipeline/src/clean.py`
- Create: `pipeline/tests/test_clean.py`

**Step 1: 写 test_clean.py 的测试**

```python
"""测试文档清洗模块"""
import pytest
from pipeline.src.clean import html_to_markdown, remove_nav_footer, clean_markdown


def test_html_to_markdown_basic():
    """测试基础 HTML 转 Markdown"""
    html = "<h1>标题</h1><p>这是一段文字</p>"
    md = html_to_markdown(html)
    assert "# 标题" in md
    assert "这是一段文字" in md


def test_html_to_markdown_code_block():
    """测试代码块正确转换"""
    html = '<pre><code class="language-javascript">const a = 1;</code></pre>'
    md = html_to_markdown(html)
    assert "```" in md
    assert "const a = 1;" in md


def test_remove_nav_footer():
    """测试移除导航栏和页脚"""
    html = """
    <nav>导航栏内容</nav>
    <main><h1>正文</h1><p>有用内容</p></main>
    <footer>页脚内容</footer>
    """
    cleaned = remove_nav_footer(html)
    assert "导航栏内容" not in cleaned
    assert "页脚内容" not in cleaned
    assert "有用内容" in cleaned


def test_clean_markdown_removes_empty_lines():
    """测试清理多余空行"""
    md = "# 标题\n\n\n\n\n内容\n\n\n结尾"
    cleaned = clean_markdown(md)
    assert "\n\n\n" not in cleaned
    assert "# 标题" in cleaned
    assert "内容" in cleaned
```

**Step 2: 运行测试确认失败**

```bash
python -m pytest pipeline/tests/test_clean.py -v
```

Expected: FAIL

**Step 3: 实现 clean.py**

```python
"""
文档清洗模块
将 HTML 转为干净的 Markdown，去除无用内容
"""
import re
from bs4 import BeautifulSoup
from markdownify import markdownify


def remove_nav_footer(html: str) -> str:
    """
    移除 HTML 中的导航栏、侧边栏、页脚等无用元素

    Args:
        html: 原始 HTML

    Returns:
        清理后的 HTML
    """
    soup = BeautifulSoup(html, "html.parser")

    # 移除常见的无用标签
    tags_to_remove = ["nav", "footer", "header", "aside"]
    for tag_name in tags_to_remove:
        for tag in soup.find_all(tag_name):
            tag.decompose()

    # 移除常见的无用 class/id
    selectors_to_remove = [
        ".sidebar", ".navigation", ".breadcrumb",
        ".footer", ".header", ".menu",
        "#sidebar", "#navigation", "#footer", "#header",
    ]
    for selector in selectors_to_remove:
        for element in soup.select(selector):
            element.decompose()

    return str(soup)


def html_to_markdown(html: str) -> str:
    """
    将 HTML 转为 Markdown

    Args:
        html: HTML 内容

    Returns:
        Markdown 字符串
    """
    return markdownify(html, heading_style="ATX", code_language="javascript")


def clean_markdown(md: str) -> str:
    """
    清理 Markdown 中的多余空行和格式问题

    Args:
        md: 原始 Markdown

    Returns:
        清理后的 Markdown
    """
    # 合并连续空行为最多两个换行
    cleaned = re.sub(r'\n{3,}', '\n\n', md)
    # 去除行尾空格
    cleaned = re.sub(r'[ \t]+$', '', cleaned, flags=re.MULTILINE)
    # 去除首尾空白
    cleaned = cleaned.strip()
    return cleaned
```

**Step 4: 运行测试确认通过**

```bash
python -m pytest pipeline/tests/test_clean.py -v
```

Expected: 4 passed

**Step 5: 提交**

```bash
git add pipeline/src/clean.py pipeline/tests/test_clean.py
git commit -m "feat: 添加文档清洗模块"
```

---

## Task 4: 图片转文字脚本 (image_to_text.py)

**Files:**
- Create: `pipeline/src/image_to_text.py`
- Create: `pipeline/tests/test_image_to_text.py`

**Step 1: 写 test_image_to_text.py 的测试**

```python
"""测试图片转文字模块"""
import pytest
from pipeline.src.image_to_text import (
    extract_image_refs,
    build_image_prompt,
    replace_images_with_text,
)


def test_extract_image_refs_markdown():
    """测试从 Markdown 中提取图片引用"""
    md = """
# 标题
![流程图](images/flow.png)
一些文字
![截图](images/screenshot.jpg)
"""
    refs = extract_image_refs(md)
    assert len(refs) == 2
    assert refs[0]["alt"] == "流程图"
    assert refs[0]["src"] == "images/flow.png"


def test_extract_image_refs_no_images():
    """测试无图片的文档"""
    md = "# 标题\n纯文字内容"
    refs = extract_image_refs(md)
    assert len(refs) == 0


def test_build_image_prompt():
    """测试生成图片识别提示词"""
    prompt = build_image_prompt("流程图", "payment")
    assert "流程图" in prompt
    assert "payment" in prompt


def test_replace_images_with_text():
    """测试将图片引用替换为文字描述"""
    md = "开始\n![支付流程](pay.png)\n结束"
    replacements = {"pay.png": "1. 调用 tt.pay()\n2. 等待回调\n3. 确认支付"}
    result = replace_images_with_text(md, replacements)
    assert "![支付流程]" not in result
    assert "调用 tt.pay()" in result
    assert "开始" in result
    assert "结束" in result
```

**Step 2: 运行测试确认失败**

```bash
python -m pytest pipeline/tests/test_image_to_text.py -v
```

Expected: FAIL

**Step 3: 实现 image_to_text.py**

```python
"""
图片转文字模块
从 Markdown 中提取图片引用，调用多模态 AI 转为文字描述
"""
import os
import re


def extract_image_refs(md: str) -> list[dict]:
    """
    从 Markdown 中提取所有图片引用

    Args:
        md: Markdown 内容

    Returns:
        图片引用列表，每项包含 alt（替代文字）和 src（图片路径）
    """
    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    matches = re.findall(pattern, md)
    return [{"alt": alt, "src": src} for alt, src in matches]


def build_image_prompt(alt_text: str, context: str) -> str:
    """
    构建图片识别提示词

    Args:
        alt_text: 图片的替代文字
        context: 图片所在文档的主题

    Returns:
        发给多模态 AI 的提示词
    """
    return (
        f"这是一张开发文档中的图片，替代文字为「{alt_text}」，"
        f"所在文档主题为「{context}」。\n\n"
        "请将图片内容转化为纯文字描述，遵循以下规则：\n"
        "- 如果是流程图/架构图：转成编号步骤\n"
        "- 如果是后台截图：转成操作路径指引（菜单 → 子菜单 → 按钮）\n"
        "- 如果是代码/终端截图：转成实际代码块\n"
        "- 如果是表格截图：转成 Markdown 表格\n"
        "- 只输出转化后的文字，不要加解释"
    )


def replace_images_with_text(md: str, replacements: dict[str, str]) -> str:
    """
    将 Markdown 中的图片引用替换为文字描述

    Args:
        md: 原始 Markdown
        replacements: {图片路径: 替换文字} 的映射

    Returns:
        替换后的 Markdown
    """
    def replace_match(match):
        alt = match.group(1)
        src = match.group(2)
        if src in replacements:
            return f"\n{replacements[src]}\n"
        return match.group(0)

    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    return re.sub(pattern, replace_match, md)
```

注意：实际调用 Gemini API 转图片的逻辑在 Task 7（主流程编排）中实现，此模块只负责提取、构建提示词、替换。

**Step 4: 运行测试确认通过**

```bash
python -m pytest pipeline/tests/test_image_to_text.py -v
```

Expected: 4 passed

**Step 5: 提交**

```bash
git add pipeline/src/image_to_text.py pipeline/tests/test_image_to_text.py
git commit -m "feat: 添加图片转文字模块"
```

---

## Task 5: SKILL.md 生成脚本 (generate_skill.py)

**Files:**
- Create: `pipeline/src/generate_skill.py`
- Create: `pipeline/templates/skill.md.j2`
- Create: `pipeline/tests/test_generate_skill.py`

**Step 1: 创建 Jinja2 模板 skill.md.j2**

```markdown
---
name: {{ name }}
description: {{ description }}
---

## 你是谁

你是{{ platform_name }}资深开发者，熟悉完整的开发和上线流程。

## 开发流程总览

{% for step in workflow %}
{{ loop.index }}. {{ step }}
{% endfor %}

## 关键决策指引

{% for guide in decision_guides %}
- {{ guide.trigger }} → 读 `references/{{ guide.reference }}`
{% endfor %}

## 必须避免的坑

{% for pitfall in pitfalls %}
{{ loop.index }}. {{ pitfall }}
{% endfor %}
```

**Step 2: 写 test_generate_skill.py 的测试**

```python
"""测试 SKILL.md 生成模块"""
import os
import tempfile
import pytest
from pipeline.src.generate_skill import generate_skill_md, scan_references


def test_scan_references():
    """测试扫描 references 目录"""
    with tempfile.TemporaryDirectory() as tmpdir:
        refs_dir = os.path.join(tmpdir, "references")
        os.makedirs(refs_dir)
        # 创建几个测试文件
        for name in ["getting-started.md", "payment.md", "debugging.md"]:
            with open(os.path.join(refs_dir, name), "w") as f:
                f.write(f"# {name}")
        files = scan_references(refs_dir)
        assert len(files) == 3
        assert "payment.md" in files


def test_generate_skill_md_output():
    """测试生成的 SKILL.md 内容"""
    config = {
        "name": "douyin-minigame",
        "description": "抖音小游戏开发专家",
        "platform_name": "抖音小游戏",
        "workflow": [
            "注册开发者账号",
            "创建小游戏项目",
            "本地开发",
        ],
        "decision_guides": [
            {"trigger": "要接入支付", "reference": "payment.md"},
        ],
        "pitfalls": [
            "支付回调必须做签名验证",
        ],
    }
    result = generate_skill_md(config)
    assert "---" in result
    assert "name: douyin-minigame" in result
    assert "抖音小游戏资深开发者" in result
    assert "注册开发者账号" in result
    assert "payment.md" in result
    assert "签名验证" in result
```

**Step 3: 运行测试确认失败**

```bash
python -m pytest pipeline/tests/test_generate_skill.py -v
```

Expected: FAIL

**Step 4: 实现 generate_skill.py**

```python
"""
SKILL.md 生成模块
基于配置和模板生成标准的 SKILL.md 文件
"""
import os
from jinja2 import Environment, FileSystemLoader


# 模板目录
TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")


def scan_references(refs_dir: str) -> list[str]:
    """
    扫描 references 目录，返回所有 .md 文件名

    Args:
        refs_dir: references 目录路径

    Returns:
        文件名列表
    """
    if not os.path.exists(refs_dir):
        return []
    files = []
    for f in sorted(os.listdir(refs_dir)):
        if f.endswith(".md"):
            files.append(f)
    return files


def generate_skill_md(config: dict) -> str:
    """
    根据配置生成 SKILL.md 内容

    Args:
        config: 知识包配置，包含以下字段：
            - name: 知识包名称（英文，kebab-case）
            - description: 一句话描述
            - platform_name: 平台中文名
            - workflow: 开发流程步骤列表
            - decision_guides: 决策指引列表
            - pitfalls: 踩坑清单列表

    Returns:
        SKILL.md 内容字符串
    """
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        keep_trailing_newline=True,
    )
    template = env.get_template("skill.md.j2")
    return template.render(**config)
```

**Step 5: 运行测试确认通过**

```bash
python -m pytest pipeline/tests/test_generate_skill.py -v
```

Expected: 2 passed

**Step 6: 提交**

```bash
git add pipeline/src/generate_skill.py pipeline/templates/skill.md.j2 pipeline/tests/test_generate_skill.py
git commit -m "feat: 添加 SKILL.md 生成模块"
```

---

## Task 6: 内容重组模块 (reorganize.py)

**Files:**
- Create: `pipeline/src/reorganize.py`
- Create: `pipeline/tests/test_reorganize.py`

**Step 1: 写 test_reorganize.py 的测试**

```python
"""测试内容重组模块"""
import os
import tempfile
import pytest
from pipeline.src.reorganize import split_by_headings, save_references


def test_split_by_headings():
    """测试按一级标题拆分文档"""
    md = """# 支付接入

支付相关内容

## 前置条件

需要先开通

# 广告接入

广告相关内容
"""
    sections = split_by_headings(md)
    assert len(sections) == 2
    assert sections[0]["title"] == "支付接入"
    assert "支付相关内容" in sections[0]["content"]
    assert sections[1]["title"] == "广告接入"


def test_split_by_headings_no_heading():
    """测试无标题的文档"""
    md = "纯文字，没有标题"
    sections = split_by_headings(md)
    assert len(sections) == 1


def test_save_references():
    """测试保存拆分后的 reference 文件"""
    with tempfile.TemporaryDirectory() as tmpdir:
        sections = [
            {"title": "支付接入", "content": "# 支付接入\n\n支付内容"},
            {"title": "广告接入", "content": "# 广告接入\n\n广告内容"},
        ]
        save_references(sections, tmpdir)
        files = os.listdir(tmpdir)
        assert len(files) == 2
        assert any("支付接入" in f for f in files)
```

**Step 2: 运行测试确认失败**

```bash
python -m pytest pipeline/tests/test_reorganize.py -v
```

Expected: FAIL

**Step 3: 实现 reorganize.py**

```python
"""
内容重组模块
将长文档按主题拆分为独立的 reference 文件
"""
import os
import re


def split_by_headings(md: str, level: int = 1) -> list[dict]:
    """
    按指定级别的标题拆分 Markdown 文档

    Args:
        md: Markdown 内容
        level: 标题级别（1 = #，2 = ## 等）

    Returns:
        拆分后的段落列表，每项包含 title 和 content
    """
    prefix = "#" * level
    pattern = rf'^{prefix}\s+(.+)$'
    sections = []
    current_title = None
    current_lines = []

    for line in md.split("\n"):
        match = re.match(pattern, line)
        if match:
            # 保存上一个段落
            if current_title is not None:
                sections.append({
                    "title": current_title,
                    "content": "\n".join(current_lines).strip(),
                })
            current_title = match.group(1).strip()
            current_lines = [line]
        else:
            current_lines.append(line)

    # 保存最后一个段落
    if current_title is not None:
        sections.append({
            "title": current_title,
            "content": "\n".join(current_lines).strip(),
        })
    elif current_lines:
        # 没有标题的文档，作为一个整体
        sections.append({
            "title": "untitled",
            "content": "\n".join(current_lines).strip(),
        })

    return sections


def save_references(sections: list[dict], output_dir: str) -> list[str]:
    """
    将拆分后的段落保存为独立的 .md 文件

    Args:
        sections: 段落列表
        output_dir: 输出目录

    Returns:
        保存的文件路径列表
    """
    os.makedirs(output_dir, exist_ok=True)
    paths = []
    for section in sections:
        # 用标题做文件名
        safe_name = re.sub(r'[<>:"/\\|?*]', '_', section["title"])
        safe_name = safe_name.strip().replace(" ", "-").lower()
        filepath = os.path.join(output_dir, f"{safe_name}.md")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(section["content"])
        paths.append(filepath)
    return paths
```

**Step 4: 运行测试确认通过**

```bash
python -m pytest pipeline/tests/test_reorganize.py -v
```

Expected: 3 passed

**Step 5: 提交**

```bash
git add pipeline/src/reorganize.py pipeline/tests/test_reorganize.py
git commit -m "feat: 添加内容重组模块"
```

---

## Task 7: 主流程编排脚本 (run_pipeline.py)

**Files:**
- Create: `pipeline/run_pipeline.py`
- Create: `pipeline/config/douyin-minigame.json`

**Step 1: 创建抖音小游戏的配置文件**

```json
{
  "name": "douyin-minigame",
  "description": "抖音小游戏开发专家。当用户需要开发抖音/字节跳动小游戏时使用。涵盖项目初始化、支付接入、广告变现、提审上线全流程。",
  "platform_name": "抖音小游戏",
  "doc_urls": [
    "https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/guide/introduction"
  ],
  "workflow": [
    "注册字节开发者账号 → 创建小游戏项目 → 获取 AppID",
    "安装开发者工具 → 初始化项目模板",
    "核心玩法开发（JavaScript/TypeScript）",
    "接入平台能力（支付/广告/社交）→ 参考对应 references/",
    "本地调试 → 真机预览",
    "提交审核 → 上线发布 → 参考 references/review-submission.md"
  ],
  "decision_guides": [
    {"trigger": "要从零开始创建项目", "reference": "getting-started.md"},
    {"trigger": "要接入支付/内购", "reference": "payment.md"},
    {"trigger": "要接入广告变现（激励视频/Banner）", "reference": "ad-monetization.md"},
    {"trigger": "要做社交功能（分享/排行榜/关注）", "reference": "social-features.md"},
    {"trigger": "要提交审核或上线", "reference": "review-submission.md"},
    {"trigger": "遇到报错或异常", "reference": "debugging.md"},
    {"trigger": "需要查具体 API 参数", "reference": "api-reference/ 目录下对应文件"}
  ],
  "pitfalls": [
    "支付回调必须做服务端签名验证，客户端验证会被拒审",
    "激励视频广告组件需要在 onLoad 后才能创建，否则会静默失败",
    "提审前必须移除所有 console.log 和测试代码",
    "小游戏包体大小限制为 4MB，超出需使用分包加载",
    "getUserInfo 已废弃，需用 getUserProfile 替代",
    "iOS 端不支持虚拟支付，需要走平台内购通道"
  ]
}
```

**Step 2: 实现主流程脚本 run_pipeline.py**

```python
"""
处理管线主入口
用法：python run_pipeline.py config/douyin-minigame.json
"""
import json
import os
import sys

from src.fetch import fetch_page, save_raw_doc
from src.clean import remove_nav_footer, html_to_markdown, clean_markdown
from src.image_to_text import extract_image_refs, replace_images_with_text
from src.reorganize import split_by_headings, save_references
from src.generate_skill import generate_skill_md


def run(config_path: str):
    """执行完整的处理管线"""
    # 加载配置
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    name = config["name"]
    output_dir = os.path.join(
        os.path.dirname(__file__), "..", "packs", name
    )
    refs_dir = os.path.join(output_dir, "references")
    raw_dir = os.path.join(os.path.dirname(__file__), "raw-docs", name)

    print(f"[Pipeline] 开始处理: {name}")

    # Phase 1: 采集（如果 raw-docs 目录已有文件则跳过）
    if not os.path.exists(raw_dir) or len(os.listdir(raw_dir)) == 0:
        print("[Phase 1] 采集文档...")
        os.makedirs(raw_dir, exist_ok=True)
        for i, url in enumerate(config.get("doc_urls", [])):
            print(f"  获取: {url}")
            html = fetch_page(url)
            save_raw_doc(html, raw_dir, f"page-{i:03d}")
        print(f"  保存到: {raw_dir}")
    else:
        print(f"[Phase 1] 跳过采集，已有原始文档: {raw_dir}")

    # Phase 2: 清洗
    print("[Phase 2] 清洗文档...")
    all_markdown = []
    for filename in sorted(os.listdir(raw_dir)):
        filepath = os.path.join(raw_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            html = f.read()
        cleaned_html = remove_nav_footer(html)
        md = html_to_markdown(cleaned_html)
        md = clean_markdown(md)
        all_markdown.append(md)
        print(f"  清洗: {filename}")

    combined_md = "\n\n---\n\n".join(all_markdown)

    # Phase 3: 图片转文字
    print("[Phase 3] 检查图片引用...")
    image_refs = extract_image_refs(combined_md)
    if image_refs:
        print(f"  发现 {len(image_refs)} 张图片，需要手动处理:")
        for ref in image_refs:
            print(f"    - {ref['alt']}: {ref['src']}")
        print("  请手动将图片描述添加到 replacements.json 后重新运行")
        # 图片替换留给手动处理（MVP 阶段）
    else:
        print("  无图片引用")

    # Phase 4: 内容重组
    print("[Phase 4] 按主题拆分...")
    sections = split_by_headings(combined_md)
    save_references(sections, refs_dir)
    print(f"  生成 {len(sections)} 个 reference 文件")

    # Phase 5: 生成 SKILL.md
    print("[Phase 5] 生成 SKILL.md...")
    skill_content = generate_skill_md(config)
    skill_path = os.path.join(output_dir, "SKILL.md")
    os.makedirs(output_dir, exist_ok=True)
    with open(skill_path, "w", encoding="utf-8") as f:
        f.write(skill_content)
    print(f"  保存到: {skill_path}")

    # Phase 6: 提示人工审查
    print("\n[Phase 6] 请人工审查以下内容:")
    print(f"  1. {skill_path}")
    print(f"  2. {refs_dir}/ 目录下所有文件")
    print("  3. 用 Agent 实测几个典型场景")
    print("\n[Pipeline] 完成！")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python run_pipeline.py config/douyin-minigame.json")
        sys.exit(1)
    run(sys.argv[1])
```

**Step 3: 提交**

```bash
git add pipeline/run_pipeline.py pipeline/config/douyin-minigame.json
git commit -m "feat: 添加主流程编排脚本和抖音小游戏配置"
```

---

## Task 8: 制作抖音小游戏知识包内容

**Files:**
- Create: `packs/douyin-minigame/SKILL.md`
- Create: `packs/douyin-minigame/references/getting-started.md`
- Create: `packs/douyin-minigame/references/payment.md`
- Create: `packs/douyin-minigame/references/ad-monetization.md`
- Create: `packs/douyin-minigame/references/social-features.md`
- Create: `packs/douyin-minigame/references/review-submission.md`
- Create: `packs/douyin-minigame/references/debugging.md`
- Create: `packs/douyin-minigame/references/api-reference/` 下多个文件

**这是最重要也最耗时的任务。** 流程：

**Step 1: 运行管线获取原始内容**

```bash
cd /Users/menherahan/Documents/Develop/Document-skill/pipeline
source ../.venv/bin/activate
python run_pipeline.py config/douyin-minigame.json
```

**Step 2: 基于管线输出 + 官方文档，手工打磨每个 reference 文件**

对管线自动拆分的内容进行人工优化：
- 补充缺失的步骤说明
- 添加代码示例（从官方文档中提取）
- 标注常见坑和注意事项
- 确保每个文件是自包含的（不依赖其他文件也能读懂）
- 图片全部替换为文字描述

可以借助 Claude API 辅助重写，但必须人工校对。

**Step 3: 打磨 SKILL.md**

基于 Jinja2 模板自动生成后，手工优化：
- 确保流程总览完整准确
- 确保决策指引覆盖所有常见场景
- 确保踩坑清单来自真实经验

**Step 4: Agent 实测验证**

将知识包放到一个测试项目中，用 Claude Code 做以下测试：
1. "帮我创建一个抖音小游戏项目" — 验证 getting-started 流程
2. "帮我接入支付功能" — 验证 payment 指引
3. "帮我接入激励视频广告" — 验证 ad-monetization 指引
4. "部署报错了帮我排查" — 验证 debugging 指引

每个场景记录 token 消耗和完成情况。

**Step 5: 提交**

```bash
git add packs/douyin-minigame/
git commit -m "feat: 添加抖音小游戏知识包 v1.0"
```

---

## Task 9: 搭建分发网站

**Files:**
- Create: `website/` 目录（Next.js 项目）
- 核心页面：首页、知识包详情页、快速开始教程

**Step 1: 初始化 Next.js 项目**

```bash
cd /Users/menherahan/Documents/Develop/Document-skill
npx create-next-app@latest website --typescript --tailwind --app --no-src-dir --no-import-alias
```

选择默认配置即可。

**Step 2: 创建首页 (app/page.tsx)**

首页展示：
- 平台 slogan
- 知识包列表（目前只有一个）
- 简要说明（什么是知识包、怎么用）

**Step 3: 创建知识包详情页 (app/packs/[slug]/page.tsx)**

详情页展示：
- 平台介绍（抖音小游戏是什么、能做什么）
- 知识包涵盖范围
- 安装/下载方式
- 使用教程

**Step 4: 创建快速开始页 (app/quickstart/page.tsx)**

教程内容：
- 第一步：下载知识包（提供 zip 下载链接和 npx 命令）
- 第二步：放到项目目录
- 第三步：打开 Claude Code / Cursor，开始开发
- 附带一个简单的演示场景

**Step 5: 本地测试**

```bash
cd website
npm run dev
```

打开 http://localhost:3000 检查所有页面。

**Step 6: 部署到 Vercel**

```bash
cd website
npx vercel --prod
```

**Step 7: 提交**

```bash
git add website/
git commit -m "feat: 添加分发网站"
```

---

## Task 10: 端到端验证 + 发布

**Step 1: 端到端测试**

完整走一遍用户流程：
1. 访问网站 → 找到抖音小游戏知识包 → 下载
2. 解压放到一个空项目目录
3. 打开 Claude Code
4. 输入："帮我从零开始做一个抖音小游戏"
5. 观察 Agent 是否能利用知识包完成任务

记录：
- Agent 是否正确识别了 Skill
- 是否按流程指引工作
- 遇到具体 API 问题时是否能从 references 找到答案
- 总 token 消耗

**Step 2: 对比测试**

不装知识包，同样的 prompt 再测一次，对比：
- 完成速度
- Token 消耗
- 准确度（是否 hallucinate API）

**Step 3: 知识包发布到 GitHub**

```bash
# 创建独立的知识包 repo（用于 skills.sh 分发）
# 或直接在当前 repo 的 packs/ 目录下提供下载
```

**Step 4: 最终提交**

```bash
git add -A
git commit -m "feat: MVP v1.0 完成 — 抖音小游戏知识包 + 分发网站"
```
