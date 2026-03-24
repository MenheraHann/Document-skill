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
