"""
图片转文字模块
从 Markdown 中提取图片引用，调用多模态 AI 转为文字描述
"""
import re


def extract_image_refs(md: str) -> list[dict]:
    """从 Markdown 中提取所有图片引用"""
    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    matches = re.findall(pattern, md)
    return [{"alt": alt, "src": src} for alt, src in matches]


def build_image_prompt(alt_text: str, context: str) -> str:
    """构建图片识别提示词"""
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
    """将 Markdown 中的图片引用替换为文字描述"""
    def replace_match(match):
        src = match.group(2)
        if src in replacements:
            return f"\n{replacements[src]}\n"
        return match.group(0)

    pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    return re.sub(pattern, replace_match, md)
