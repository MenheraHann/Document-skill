"""
内容重组模块
将长文档按主题拆分为独立的 reference 文件
"""
import os
import re


def split_by_headings(md: str, level: int = 1) -> list[dict]:
    """按指定级别的标题拆分 Markdown 文档"""
    prefix = "#" * level
    pattern = rf'^{prefix}\s+(.+)$'
    sections = []
    current_title = None
    current_lines = []

    for line in md.split("\n"):
        match = re.match(pattern, line)
        if match:
            if current_title is not None:
                sections.append({
                    "title": current_title,
                    "content": "\n".join(current_lines).strip(),
                })
            current_title = match.group(1).strip()
            current_lines = [line]
        else:
            current_lines.append(line)

    if current_title is not None:
        sections.append({
            "title": current_title,
            "content": "\n".join(current_lines).strip(),
        })
    elif current_lines:
        sections.append({
            "title": "untitled",
            "content": "\n".join(current_lines).strip(),
        })

    return sections


def save_references(sections: list[dict], output_dir: str) -> list[str]:
    """将拆分后的段落保存为独立的 .md 文件"""
    os.makedirs(output_dir, exist_ok=True)
    paths = []
    for section in sections:
        safe_name = re.sub(r'[<>:"/\\|?*]', '_', section["title"])
        safe_name = safe_name.strip().replace(" ", "-").lower()
        filepath = os.path.join(output_dir, f"{safe_name}.md")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(section["content"])
        paths.append(filepath)
    return paths
