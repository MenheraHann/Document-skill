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
