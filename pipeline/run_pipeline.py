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
    with open(config_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    name = config["name"]
    output_dir = os.path.join(
        os.path.dirname(__file__), "..", "packs", name
    )
    refs_dir = os.path.join(output_dir, "references")
    raw_dir = os.path.join(os.path.dirname(__file__), "raw-docs", name)

    print(f"[Pipeline] 开始处理: {name}")

    # Phase 1: 采集
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
