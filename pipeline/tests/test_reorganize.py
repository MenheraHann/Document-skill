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
