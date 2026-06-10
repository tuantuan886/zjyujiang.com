# 浙江宇匠工业科技有限公司官网

无需安装框架或依赖的多页面静态网站。

## 本地预览

在项目目录启动任意静态文件服务器，例如：

```powershell
python -m http.server 4173
```

然后访问 `http://localhost:4173/`。

## 上线前必须确认

1. 确定正式 HTTPS 域名后生成站点地图：

```powershell
.\tools\generate-sitemap.ps1 -BaseUrl "https://www.example.com"
```

2. 用真实域名检查所有 canonical、分享卡片和结构化数据。
3. 补充企业注册地址、统一社会信用代码、成立日期等已核验信息。
4. 如接入在线表单后端，更新隐私说明和提交逻辑；当前表单仅调用访客本机邮件应用。
5. 将检测报告和客户案例设为公开前，确认报告适用范围与客户授权。

## 主要目录

- `index.html`：首页
- `products/`：产品页
- `technology.html`：技术原理
- `quality.html`：质量验证
- `applications.html`：应用场景
- `about.html`：企业介绍
- `resources.html`：资料下载
- `contact.html`：联系询价
- `assets/`：样式、脚本、图标和实拍图
- `downloads/`：公开产品手册

内容边界和更新规则见 `CONTENT_GOVERNANCE.md`。
