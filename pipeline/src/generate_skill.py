"""
SKILL.md 生成模块
基于配置和模板生成标准的 SKILL.md 文件
"""
import os
from jinja2 import Environment, FileSystemLoader

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "..", "templates")


def scan_references(refs_dir: str) -> list[str]:
    """扫描 references 目录，返回所有 .md 文件名"""
    if not os.path.exists(refs_dir):
        return []
    files = []
    for f in sorted(os.listdir(refs_dir)):
        if f.endswith(".md"):
            files.append(f)
    return files


def generate_skill_md(config: dict) -> str:
    """根据配置生成 SKILL.md 内容"""
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_DIR),
        keep_trailing_newline=True,
    )
    template = env.get_template("skill.md.j2")
    return template.render(**config)
