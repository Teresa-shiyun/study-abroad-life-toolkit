# 海外留学生活助手 / Study Abroad Life Toolkit

## Overview / 项目简介

Study Abroad Life Toolkit is a mobile app prototype for international students who want to organize practical study-abroad life information in one place.

The first version focuses on everyday student life management: important documents, life checklists, travel materials, budget records, emergency contacts, search, and English/Chinese language switching. It is planned as a local-first personal project, not a large platform.

海外留学生活助手是一个面向海外留学生的手机端 App 原型，用来集中整理留学生活中常用但容易分散的信息。

第一版主要关注文件管理、生活事项、旅行材料、预算记录、紧急联系方式、搜索和中英切换。项目定位是 personal project / mobile app prototype，不是大型平台，也不是已经完成上线的产品。

## Why I Built This / 为什么做这个项目

International students often keep important life information across notes, screenshots, emails, PDFs, chat messages, and photo albums. This can become messy when they need to find a document, check a travel booking, review a budget item, or copy an emergency phone number quickly.

This project explores a simple app structure for keeping those everyday records organized locally on the phone.

留学生的生活资料经常分散在备忘录、截图、邮件、PDF、聊天记录和相册里。需要临时找护照信息、机票截图、租房合同、预算记录或紧急电话时，会比较不方便。

这个项目希望先做一个清楚、实用的手机端原型，把这些日常资料按模块整理起来，并优先考虑本地保存。

## Core Features / 核心功能

Planned first-version modules:

- Home Dashboard: overview of pending tasks, missing documents, budget status, upcoming trips, recent files, and emergency contacts.
- Life Checklist: common study-abroad tasks with categories and status tracking.
- Document Wallet: local records for important documents and uploaded file references.
- Travel Planner / Travel Wallet: trip information, travel screenshots, travel files, and trip checklists.
- Budget Tracker: simple monthly budget and expense records.
- Emergency Contacts: important contacts with quick copy actions.
- Search: local search across documents, checklists, trips, expenses, contacts, and notes.
- Language: English and Chinese interface support.

第一版计划包含以下模块：

- 首页总览：查看待办事项、缺少文件、预算状态、即将到来的旅行、最近文件和紧急联系方式入口。
- 生活事项清单：管理常见留学生活事项，并支持分类和状态。
- 重要文件夹：记录重要文件信息，并保存本地文件或图片引用。
- 旅行材料管理：管理旅行计划、机票/酒店/签证/保险截图和旅行 checklist。
- 生活预算记录：记录简单的月度预算和支出。
- 紧急联系方式：保存重要电话和邮箱，并支持快速复制。
- 搜索：在本地记录中搜索文件、事项、旅行、预算、联系人和备注。
- 中英文切换：支持英文和中文界面文案。

## Tech Stack / 技术栈

Suggested stack:

- Expo
- React Native
- TypeScript
- Expo Router
- Local mock data for the static prototype
- Local-first storage, to be confirmed during implementation
- Local file/image picker, to be confirmed during implementation

计划技术栈：

- Expo
- React Native
- TypeScript
- Expo Router
- 静态原型阶段使用本地 mock data
- 本地优先的数据存储，具体方案在开发阶段确认
- 本地文件/图片选择器，具体方案在开发阶段确认

## Current Status / 当前状态

Basic Expo project and static screens created.

The project now includes an Expo + React Native + TypeScript setup, Expo Router navigation, static screens, shared components, mock data, TypeScript types, and a basic i18n folder.

No real local storage, real file upload, backend service, login system, cloud sync, or public deployment is included at this stage.

已完成基础 Expo + React Native + TypeScript 项目结构和静态页面。

当前项目包含 Expo Router 导航、静态页面、通用组件、mock data、TypeScript 类型文件和基础 i18n 文件夹。

现阶段不包含真实本地存储、真实文件上传、后端服务、登录系统、云端同步或公开部署。

## First Version Scope / 第一版范围

The first version should stay focused on a useful local mobile prototype:

- Local checklist management.
- Local document records and local file references.
- Local trip records, travel files, and trip checklists.
- Simple local budget records.
- Local emergency contacts.
- Local search.
- English and Chinese labels.

第一版应保持轻量和真实，先完成一个可本地使用的手机端原型：

- 本地生活事项清单。
- 本地重要文件记录和本地文件引用。
- 本地旅行记录、旅行材料和旅行 checklist。
- 简单的本地预算记录。
- 本地紧急联系方式。
- 本地搜索。
- 中英文界面文案。

## Not Included In The First Version / 第一版暂不包含

The first version will not include:

- Login or registration.
- Cloud sync.
- AI chat.
- Email templates.
- Community forum.
- Map search for GPs, banks, or local services.
- Official visa advice.
- Legal advice.
- Medical advice.
- Financial or immigration advice.

第一版暂不包含：

- 登录或注册。
- 云端同步。
- AI 聊天。
- 邮件模板。
- 社区论坛。
- 地图查找 GP、银行或本地服务。
- 官方签证建议。
- 法律建议。
- 医疗建议。
- 金融或移民建议。

## Privacy Reminder / 隐私提醒

The app may store records related to sensitive personal documents, such as passports, visas, BRP/eVisa records, bank letters, university letters, tenancy agreements, tickets, hotel bookings, and insurance files.

For the first version, file upload is planned as local storage only. Files should not be uploaded to a cloud service.

GitHub screenshots, demo data, and test data must use fictional data, placeholder images, or mock documents only. Do not use real passports, real visas, real bank letters, real tickets, or other private files.

这个 App 可能会记录护照、签证、BRP/eVisa、银行信、大学证明、租房合同、机票、酒店订单和保险文件等敏感资料。

第一版的文件上传只计划做本地保存，不上传云端。

GitHub 截图、demo 和测试数据只能使用虚拟数据、占位图或模拟文件，不能使用真实护照、签证、银行信、机票或其他私人文件。

## Screenshots / 项目截图

Screenshots will be added after the static screens are reviewed with fictional data.

项目截图会在静态页面用虚拟数据检查后补充。

## How to Run / 本地运行

Install dependencies and start the Expo development server:

安装依赖并启动 Expo 开发服务器：

```bash
npm install
npx expo start
```

Mobile preview:

- Install Expo Go on your phone.
- Run `npm start`.
- Scan the QR code shown by Expo.

手机预览：

- 在手机上安装 Expo Go。
- 运行 `npm start`。
- 使用 Expo 显示的二维码在手机上打开。

You can also run the app in an Android Emulator or iOS Simulator if those tools are installed.

如果电脑上已经安装 Android Studio 模拟器或 Xcode iOS Simulator，也可以用模拟器运行。

Available npm scripts:

```bash
npm start
npm run android
npm run ios
npm run web
npm run export:web
npm run serve:dist
npm run typecheck
```

For a static web preview:

```bash
npm run export:web
npm run serve:dist
```

Then open `http://127.0.0.1:8082`.

## Documentation / 项目文档

- [Project Brief / 项目说明](docs/PROJECT_BRIEF.md)
- [Features / 功能规划](docs/FEATURES.md)
- [Screens / 页面规划](docs/SCREENS.md)
- [Data Model / 数据结构](docs/DATA_MODEL.md)
- [Default Content / 默认内容](docs/CONTENT.md)
- [Roadmap / 开发路线](docs/ROADMAP.md)
- [Privacy Notes / 隐私说明](docs/PRIVACY_NOTES.md)

## Roadmap / 后续计划

Current roadmap status:

- Phase 1: Documentation and planning — completed.
- Phase 2: Basic Expo project setup — completed.
- Phase 3: Static screens and navigation — completed as a static prototype.
- Phase 4: Local storage and CRUD — next suggested phase.

当前路线图状态：

- Phase 1：文档与规划 — 已完成。
- Phase 2：基础 Expo 项目搭建 — 已完成。
- Phase 3：静态页面与导航 — 已完成静态原型。
- Phase 4：本地存储与增删改查 — 建议下一步开始。

See [Roadmap / 开发路线](docs/ROADMAP.md) for details.
