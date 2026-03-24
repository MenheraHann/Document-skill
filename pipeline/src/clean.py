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
    """
    soup = BeautifulSoup(html, "html.parser")

    tags_to_remove = ["nav", "footer", "header", "aside"]
    for tag_name in tags_to_remove:
        for tag in soup.find_all(tag_name):
            tag.decompose()

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
    """将 HTML 转为 Markdown"""
    return markdownify(html, heading_style="ATX", code_language="javascript")


def clean_markdown(md: str) -> str:
    """清理 Markdown 中的多余空行和格式问题"""
    cleaned = re.sub(r'\n{3,}', '\n\n', md)
    cleaned = re.sub(r'[ \t]+$', '', cleaned, flags=re.MULTILINE)
    cleaned = cleaned.strip()
    return cleaned
