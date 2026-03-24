"""测试文档采集模块"""
import os
import tempfile
import pytest
from pipeline.src.fetch import fetch_page, save_raw_doc


def test_fetch_page_returns_html():
    """测试能获取网页内容"""
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
