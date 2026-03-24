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
