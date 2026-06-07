# Roadmap / 开发路线

This roadmap keeps Study Abroad Life Toolkit focused as a small mobile app prototype.

本路线图用于保持海外留学生活助手的开发范围清晰，先完成一个小而实用的手机端原型。

## Suggested Direction / 建议实现方向

- Mobile framework: Expo + React Native + TypeScript.
- Data storage: local-first storage, to be confirmed during implementation.
- File handling: local file/image picker, to be confirmed during implementation.
- Cloud sync: not included in the first version.
- Login: not included in the first version.

- 移动端框架：Expo + React Native + TypeScript。
- 数据存储：本地优先，具体方案在实现阶段确认。
- 文件处理：本地文件/图片选择器，具体方案在实现阶段确认。
- 云端同步：第一版不包含。
- 登录：第一版不包含。

## Phase 1: Documentation And Planning / 文档与规划

Goal:

Define the product scope before writing app code.

目标：

在开始写 App 代码前，先明确项目范围。

Tasks:

- Create README.
- Define project brief.
- Document features.
- Plan screens.
- Draft TypeScript-style data model.
- Prepare default English and Chinese content.
- Write privacy notes.

任务：

- 创建 README。
- 明确项目说明。
- 整理功能规划。
- 规划页面。
- 编写 TypeScript 风格数据结构文档。
- 准备中英文默认内容。
- 编写隐私说明。

Status:

Completed.

状态：

已完成。

## Phase 2: Basic Expo Project Setup / 基础 Expo 项目搭建

Goal:

Create the app project structure.

目标：

创建基础 App 项目结构。

Tasks:

- Scaffold Expo project with TypeScript.
- Confirm package manager.
- Set up basic folders.
- Confirm navigation approach.
- Update README with real run commands.

任务：

- 使用 TypeScript 创建 Expo 项目。
- 确认包管理器。
- 建立基础目录结构。
- 确认导航方案。
- 更新 README 中真实的本地运行命令。

Status:

Completed with Expo Router, local mock data, and a clear `app/` + `src/` structure.

状态：

已完成。当前使用 Expo Router、本地 mock data，以及清晰的 `app/` + `src/` 结构。

## Phase 3: Static Screens And Navigation / 静态页面与导航

Goal:

Build the main screens without full persistence first.

目标：

先搭建主要页面和跳转，不急着加入完整数据持久化。

Tasks:

- Build Home.
- Build Checklist.
- Build Documents and Document Detail.
- Build Travel and Travel Detail.
- Build Budget.
- Build Emergency Contacts.
- Build Search.
- Build Settings / Language.

任务：

- 创建首页。
- 创建生活事项清单。
- 创建文件列表和文件详情。
- 创建旅行列表和旅行详情。
- 创建预算页面。
- 创建紧急联系方式页面。
- 创建搜索页面。
- 创建设置 / 语言页面。

Status:

Completed as static screens and navigation. Real local storage, real file upload, and CRUD persistence are not implemented yet.

状态：

已完成静态页面和导航。真实本地存储、真实文件上传和持久化增删改查尚未实现。

## Phase 4: Local Storage And CRUD / 本地存储与增删改查

Goal:

Make local records editable and persistent.

目标：

让本地记录可以新增、编辑、删除并保存。

Tasks:

- Confirm local storage solution.
- Implement CRUD for checklist items.
- Implement CRUD for document records.
- Implement CRUD for trips and trip checklists.
- Implement CRUD for budget records.
- Implement CRUD for emergency contacts.
- Add simple field validation.

任务：

- 确认本地存储方案。
- 实现生活事项的增删改查。
- 实现文件记录的增删改查。
- 实现旅行和旅行 checklist 的增删改查。
- 实现预算记录的增删改查。
- 实现紧急联系方式的增删改查。
- 添加简单字段校验。

## Phase 5: File Upload / Image Picker / 文件上传与图片选择

Goal:

Attach local images or files to document and travel records.

目标：

为文件记录和旅行记录添加本地图片或文件引用。

Tasks:

- Confirm file/image picker package.
- Save local file references for document records.
- Save local file references for travel records.
- Add preview when supported.
- Keep file handling local-only.

任务：

- 确认文件/图片选择器方案。
- 为文件记录保存本地文件引用。
- 为旅行记录保存本地文件引用。
- 在支持时添加预览。
- 文件处理保持仅本地保存。

## Phase 6: Search And Language Switching / 搜索与中英切换

Goal:

Improve daily usability.

目标：

提升日常使用效率。

Tasks:

- Add local search across records and notes.
- Group search results by type.
- Add English and Chinese label dictionaries.
- Add language setting.
- Save selected language locally.

任务：

- 添加本地搜索。
- 按类型分组展示搜索结果。
- 添加中英文文案字典。
- 添加语言设置。
- 本地保存用户选择的语言。

## Phase 7: Polish README, Screenshots, And GitHub Presentation / README、截图与 GitHub 展示完善

Goal:

Make the repository clear for GitHub readers.

目标：

让 GitHub 项目页更清楚、真实、易读。

Tasks:

- Add screenshots using fictional data only.
- Update run instructions.
- Review docs for consistency.
- Add privacy reminders.
- Keep project status honest.

任务：

- 使用虚拟数据补充截图。
- 更新本地运行说明。
- 检查文档一致性。
- 补充隐私提醒。
- 如实说明项目状态。

## Later Ideas / 后续可考虑

Possible future work:

- Local notification reminders.
- Document expiry reminders.
- Subscription reminders.
- CSV / JSON export.
- App passcode lock.
- Dark mode.
- Optional backup after privacy design is reviewed.
- Country or region-specific checklist packs.

后续可以考虑：

- 本地通知提醒。
- 文件到期提醒。
- 订阅提醒。
- CSV / JSON 导出。
- App 密码锁。
- 暗色模式。
- 在重新设计隐私方案后考虑备份。
- 不同国家或地区的默认 checklist。
