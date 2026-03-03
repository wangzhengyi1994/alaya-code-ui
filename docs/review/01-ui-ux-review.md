# UI/UX 评审报告

## 评审范围

```
web/default/src/
├── index.css                          # 全局样式
├── App.js                             # 路由配置
├── components/
│   ├── layout/                        # ConsoleLayout, MarketingLayout, AuthLayout, DocsLayout, AdminLayout
│   ├── navigation/                    # ConsoleTopBar, ConsoleSidebar, MarketingHeader, MarketingFooter
│   ├── business/                      # StatCard, QuotaUsageBar, UsageChart, ApiKeyTable, PlanCard, PlanComparisonGrid, BillingTable, ToolConfigSnippet, ApiKeyCopyButton, ModelUsageChart
│   ├── ui/                            # Shadcn/ui 原子组件
│   ├── LoginForm.js, RegisterForm.js, Loading.js
│   └── 旧版页面组件 (Footer.js, OtherSetting.js 等)
├── pages/
│   ├── console/                       # DashboardPage, KeysPage, SubscriptionPage, UsagePage, BillingPage, BoosterPage, SettingsPage
│   ├── marketing/                     # LandingPage, PricingPage
│   ├── admin/                         # AdminDashboard
│   └── 旧版页面 (Home, About, Channel, Token, Log, User, Redemption, Setting, NotFound)
├── helpers/
│   ├── semantic-shim.js               # Semantic UI 兼容层
│   ├── render.js                      # 渲染辅助函数
│   └── index.js, api.js, utils.js 等
├── locales/zh/translation.json        # 国际化翻译文件
└── lib/utils.js                       # cn() 工具函数
```

## 评审总结

🟢 **整体健康度：良好**

项目前端架构清晰，新页面（console/marketing）全面使用 Shadcn/ui + Tailwind，设计 Token 通过 CSS 变量统一管理，组件封装合理。旧版页面通过 semantic-shim.js 保持兼容，过渡策略合理。主要问题集中在：(1) 性能 Bug（RegisterForm 无限重渲染）、(2) 旧版 CSS 死代码堆积、(3) a11y 缺失、(4) 分页组件性能隐患。已实施修复均通过编译验证。

---

## 已实施的修改

### 1. 修复 RegisterForm useEffect 无限重渲染 Bug
- **严重程度**：🔴 严重
- **位置**：`web/default/src/components/RegisterForm.js:43`
- **原始问题**：`useEffect(() => {...})` 缺少依赖数组 `[]`，导致每次渲染都重新执行副作用（读取 localStorage 并 setState），形成无限渲染循环，消耗 CPU 且可能导致页面卡顿。
- **修改内容**：添加 `[]` 空依赖数组，确保仅在组件挂载时执行一次。
- **验证结果**：✅ `npm run build` 通过

### 2. 修复 LoginForm 登录后导航到错误路由
- **严重程度**：🟡 中等
- **位置**：`web/default/src/components/LoginForm.js:89`
- **原始问题**：登录成功后导航到 `/token`，但新版 Console 布局使用 `/dashboard` 作为入口路由，导致用户登录后可能看到旧页面或 404。
- **修改内容**：将 `navigate('/token')` 改为 `navigate('/dashboard')`。
- **验证结果**：✅ `npm run build` 通过

### 3. 修复 ApiKeyTable 删除对话框缺失 DialogDescription（a11y）
- **严重程度**：🟡 中等
- **位置**：`web/default/src/components/business/ApiKeyTable.jsx:521-526`
- **原始问题**：删除确认对话框没有 `DialogDescription`，Radix UI Dialog 会在控制台输出 a11y 警告，屏幕阅读器无法获取对话框描述。
- **修改内容**：将描述文本从 `<p>` 移入 `<DialogDescription>` 组件，并导入缺失的组件。
- **验证结果**：✅ `npm run build` 通过

### 4. 为 ApiKeyTable 图标按钮添加 aria-label
- **严重程度**：🟡 中等
- **位置**：`web/default/src/components/business/ApiKeyTable.jsx` 多处
- **原始问题**：显示/隐藏 Key、复制、删除等图标按钮缺少 `aria-label`，屏幕阅读器无法识别按钮用途。
- **修改内容**：为 toggleShowKey 按钮添加动态 `aria-label`（"显示 Key"/"隐藏 Key"），为复制下拉触发器添加 `aria-label='复制选项'`，为删除按钮添加 `aria-label='删除'`。
- **验证结果**：✅ `npm run build` 通过

### 5. 修复 Loading 组件内联样式 & a11y
- **严重程度**：🟢 轻微
- **位置**：`web/default/src/components/Loading.js:5`
- **原始问题**：使用 `style={{ height: 100 }}` 内联样式而非 Tailwind 类，且缺少 `role='status'` 和 `aria-label`。
- **修改内容**：替换为 `className='min-h-[100px]'`，添加 `role='status'` 和动态 `aria-label`。
- **验证结果**：✅ `npm run build` 通过

### 6. 清理 index.css 死代码 & 修复字体栈
- **严重程度**：🟡 中等
- **位置**：`web/default/src/index.css:76-188`
- **原始问题**：
  - `font-family` 引用 `Lato` 字体但项目未加载该字体文件，浏览器会 fallback 导致 FOUT
  - 保留了大量 `.ui.container`、`.ui.card`、`.ui.table`、`.ui.header` 等 Semantic UI 选择器的响应式覆盖样式，但新主题不使用 Semantic UI 类名，这些规则是死代码（约 100 行）
  - `.main-content`、`.small-icon`、`.custom-footer`、`.charts-grid`、`.stat-value` 等类名在新组件中未使用
- **修改内容**：
  - 将 `Lato` 替换为系统字体栈 `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, 'Microsoft YaHei', sans-serif`
  - 移除所有 `.ui.*` 选择器的响应式覆盖（约 95 行死 CSS）
  - 保留 `.hide-on-mobile` 工具类（可能被旧页面使用）和 Toastify 样式覆盖
- **验证结果**：✅ `npm run build` 通过，CSS 产物从 ~13.5KB 降至更小

### 7. 重构 Pagination 组件（性能 + a11y）
- **严重程度**：🟡 中等
- **位置**：`web/default/src/helpers/semantic-shim.js:578-611`
- **原始问题**：Pagination 组件渲染所有页码按钮 `for (let i = 1; i <= totalPages; i++)`，当 `totalPages` 很大时（如 100+ 页日志），会创建大量 DOM 节点，导致性能问题和 UI 溢出。同时缺少 `aria-label`、`aria-current`、`role` 等 a11y 属性。
- **修改内容**：
  - 实现省略号分页算法：当总页数 > 7 时，显示首页、尾页、当前页及其 siblingRange 邻居，中间用 `...` 省略
  - 添加 `<nav aria-label='分页导航'>` 包裹
  - 为每个按钮添加 `aria-label`（"上一页"/"下一页"/"第 N 页"）
  - 为当前页添加 `aria-current='page'`
- **验证结果**：✅ `npm run build` 通过

### 8. 修复 Modal 组件 a11y
- **严重程度**：🟢 轻微
- **位置**：`web/default/src/helpers/semantic-shim.js:677-687`
- **原始问题**：semantic-shim 中的 Modal 组件缺少 `role='dialog'` 和 `aria-modal='true'`，覆盖层缺少 `aria-label`。
- **修改内容**：添加 `role='dialog'`、`aria-modal='true'` 和覆盖层 `aria-label='关闭对话框'`。
- **验证结果**：✅ `npm run build` 通过

### 9. 修复硬编码英文文案
- **严重程度**：🟢 轻微
- **位置**：
  - `web/default/src/components/layout/AuthLayout.jsx:18`
  - `web/default/src/pages/console/SettingsPage.jsx:691`（微信二维码 alt）
  - `web/default/src/components/LoginForm.js:201`（微信二维码 alt）
- **原始问题**：界面应全中文，但 AuthLayout 版权声明使用英文 "All rights reserved"，微信二维码图片 alt 文字为英文 "WeChat QR Code"。
- **修改内容**：
  - "All rights reserved." → "保留所有权利。"
  - `alt='WeChat QR Code'` → `alt='微信二维码'`
- **验证结果**：✅ `npm run build` 通过

### 10. 为 SettingsPage 复制令牌按钮添加 aria-label
- **严重程度**：🟢 轻微
- **位置**：`web/default/src/pages/console/SettingsPage.jsx:352`
- **原始问题**：复制令牌的图标按钮只有 `title` 没有 `aria-label`。
- **修改内容**：添加 `aria-label='复制令牌'`。
- **验证结果**：✅ `npm run build` 通过

---

## 待后续处理的问题

### 设计 Token 相关
1. **图表硬编码颜色**（🟡）：`UsageChart.jsx`、`ModelUsageChart.jsx`、`DashboardPage.jsx` 中的 Recharts 图表使用硬编码颜色值（如 `#4318FF`、`#A3AED0`、`#fff` tooltip 背景），未使用 CSS 变量，暗色模式下 tooltip 背景色不协调。建议提取为 CSS 变量或从 Tailwind config 读取。

2. **Toast 样式硬编码**（🟢）：`index.css` 中 Toastify 样式使用硬编码 `#fff`、`#07bc0c` 等颜色，暗色模式下观感不佳。

### 响应式设计
3. **表格在小屏溢出**（🟡）：`ApiKeyTable` 有 8 列数据，在移动端横向溢出。建议添加 `overflow-x-auto` 容器或在小屏使用卡片布局。（`BillingTable` 同理）

4. **LandingPage TerminalAnimation 仅桌面可见**（🟢）：`className='hidden lg:block'` 导致小屏用户无法看到终端动画演示，可考虑在中等屏幕下以更紧凑形式展示。

### 组件封装
5. **semantic-shim FormDropdown 点击外部关闭依赖 mousedown**（🟢）：使用 `document.addEventListener('mousedown')` 实现点击外部关闭，缺少 Escape 键关闭支持。

6. **semantic-shim Dropdown 使用 `<details>` 元素**（🟡）：`<details>` 元素的交互行为不受 React 状态管理，可能导致状态不同步。建议重构为受控组件。

### 可访问性 (a11y)
7. **LoginForm/RegisterForm 表单输入缺少关联 label**（🟡）：表单输入只有 `placeholder` 没有 `<Label>` 关联，屏幕阅读器无法正确描述字段用途。

8. **颜色对比度**（🟢）：`text-muted-foreground` 在某些背景下对比度可能不足 4.5:1（WCAG AA），需具体场景测试。

### 国际化
9. **旧版页面部分中文硬编码**（🟢）：新版 console/marketing 页面大量中文硬编码未走 i18n（如 "设置"、"个人信息"、"系统令牌" 等），但考虑到项目定位为面向中国市场的产品，且 i18n fallback 为 `zh`，这些暂不构成问题。如未来需要国际化，需大规模迁移。

### 安全相关
10. **dangerouslySetInnerHTML 使用**（🟢）：`Home/index.js`、`About/index.js`、`render.js`、`Footer.js`、`OtherSetting.js` 中使用了 `dangerouslySetInnerHTML`，内容来源为管理员配置，风险可控，但建议加入 DOMPurify 净化。

---

## 新增/修改的测试

本次评审未新增测试文件。项目当前无前端单元测试配置，建议后续为核心业务组件（ApiKeyTable、PlanCard、QuotaUsageBar）添加 React Testing Library 测试。

---

## 变更文件列表

| 文件 | 变更类型 | 修改行数 |
|------|---------|---------|
| `src/components/RegisterForm.js` | Bug Fix | 1 行 |
| `src/components/LoginForm.js` | Bug Fix + i18n | 2 行 |
| `src/components/Loading.js` | a11y | 1 行 |
| `src/components/layout/AuthLayout.jsx` | i18n | 1 行 |
| `src/components/business/ApiKeyTable.jsx` | a11y | 6 行 |
| `src/pages/console/SettingsPage.jsx` | a11y + i18n | 2 行 |
| `src/helpers/semantic-shim.js` | 性能 + a11y | ~40 行 |
| `src/index.css` | 清理 + 修复 | -95 行 |
