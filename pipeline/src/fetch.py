"""
文档采集模块
从指定 URL 获取网页内容并保存为本地文件
"""
import os
import re
import requests


def fetch_page(url: str, timeout: int = 30) -> str:
    """
    获取网页 HTML 内容

    Args:
        url: 目标网页地址
        timeout: 请求超时时间（秒）

    Returns:
        网页 HTML 字符串
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                       "AppleWebKit/537.36 (KHTML, like Gecko) "
                       "Chrome/120.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers, timeout=timeout)
    response.raise_for_status()
    response.encoding = response.apparent_encoding
    return response.text


def save_raw_doc(content: str, output_dir: str, name: str) -> str:
    """
    保存原始文档内容到文件

    Args:
        content: 文档内容
        output_dir: 输出目录
        name: 文件名（不含扩展名）

    Returns:
        保存的文件路径
    """
    os.makedirs(output_dir, exist_ok=True)
    safe_name = re.sub(r'[<>:"/\\|?*]', '_', name)
    filepath = os.path.join(output_dir, f"{safe_name}.html")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return filepath
