# 海外留学生活助手 / Study Abroad Life Toolkit

A mobile-first Expo app for organizing everyday study-abroad life: documents, checklists, trips, budgets, emergency contacts, search, profile, and language switching.

海外留学生活助手是一款面向留学生日常生活管理的移动端应用，用来整理文件、清单、旅行、预算、紧急联系人、搜索、个人信息和语言切换。

## Features

- Home dashboard with quick entries, trip progress, document status, checklist progress, and budget summary.
- Document wallet with status labels, expiry-based status calculation, upload/delete actions, and image/PDF-style previews.
- Checklist with tappable completion states and add/delete flows.
- Travel planner with itinerary checklist, saved ticket preview, trip files, and travel checklist progress.
- Budget tracker with monthly budget, expense list, add expense modal, and delete confirmation.
- Emergency contacts with phone/email copy actions.
- Profile page with personal study-abroad information and settings entry.
- Chinese and English interfaces selected from the language screen.

## 功能

- 首页：快速入口、旅行进度、文件状态、清单进度和预算概览。
- 文件：文件状态标签、基于到期日的自动状态判断、上传/删除、图片和 PDF 风格预览。
- 清单：可点击完成状态，并支持新增、编辑和删除。
- 旅行：行程清单、已保存票据预览、旅行文件和旅行清单进度。
- 预算：月度预算、支出列表、新增支出弹窗和删除确认。
- 紧急联系人：支持复制电话和邮箱。
- 个人页：展示个人留学信息，并从个人页进入设置。
- 语言：支持简体中文和英文界面切换。

## Document Status

Document status is calculated from file readiness and expiry date:

- `missing`: no file has been attached.
- `prepared`: a file exists and the expiry date is not close.
- `expired`: the expiry date has passed.
- `needsUpdate`: the expiry date is within the attention window.

文件状态会根据是否已上传文件和到期日期自动判断：

- `missing`：未准备文件。
- `prepared`：已准备文件，并且到期日不临近。
- `expired`：文件已过期。
- `needsUpdate`：文件临近到期，需要更新。

## Screenshots

### 中文界面

| 首页 | 清单 |
| --- | --- |
| ![中文首页](assets/screenshots/zh/home.png) | ![中文清单](assets/screenshots/zh/checklist.png) |

| 文件 | 文件详情 |
| --- | --- |
| ![中文文件](assets/screenshots/zh/documents.png) | ![中文文件详情](assets/screenshots/zh/document-detail.png) |

| 编辑文件 | 旅行 |
| --- | --- |
| ![中文编辑文件](assets/screenshots/zh/document-edit.png) | ![中文旅行](assets/screenshots/zh/travel.png) |

| 旅行详情 | 编辑旅行 |
| --- | --- |
| ![中文旅行详情](assets/screenshots/zh/travel-detail.png) | ![中文编辑旅行](assets/screenshots/zh/travel-edit.png) |

| 预算 | 紧急联系人 |
| --- | --- |
| ![中文预算](assets/screenshots/zh/budget.png) | ![中文紧急联系人](assets/screenshots/zh/emergency.png) |

| 搜索 | 个人 |
| --- | --- |
| ![中文搜索](assets/screenshots/zh/search.png) | ![中文个人](assets/screenshots/zh/profile.png) |

| 语言设置 |
| --- |
| ![中文语言设置](assets/screenshots/zh/language.png) |

### English UI

| Home | Checklist |
| --- | --- |
| ![English home](assets/screenshots/en/home.png) | ![English checklist](assets/screenshots/en/checklist.png) |

| Documents | Document Detail |
| --- | --- |
| ![English documents](assets/screenshots/en/documents.png) | ![English document detail](assets/screenshots/en/document-detail.png) |

| Edit Document | Travel |
| --- | --- |
| ![English edit document](assets/screenshots/en/document-edit.png) | ![English travel](assets/screenshots/en/travel.png) |

| Travel Detail | Edit Travel |
| --- | --- |
| ![English travel detail](assets/screenshots/en/travel-detail.png) | ![English edit travel](assets/screenshots/en/travel-edit.png) |

| Budget | Emergency Contacts |
| --- | --- |
| ![English budget](assets/screenshots/en/budget.png) | ![English emergency contacts](assets/screenshots/en/emergency.png) |

| Search | Profile |
| --- | --- |
| ![English search](assets/screenshots/en/search.png) | ![English profile](assets/screenshots/en/profile.png) |

| Language Settings |
| --- |
| ![English language settings](assets/screenshots/en/language.png) |

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- Local app state and project seed data
- Local file/image selection where the runtime supports it

## Run Locally

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Run the web build preview:

```bash
npm run export:web
npm run serve:dist
```

Then open `http://127.0.0.1:8082`.

## Scripts

```bash
npm start
npm run android
npm run ios
npm run web
npm run export:web
npm run serve:dist
npm run typecheck
```

## Scope

This project focuses on local organization for a first mobile app version. It does not include login, registration, cloud sync, email templates, community forum features, map search, official visa advice, legal advice, medical advice, financial advice, or immigration advice.

本项目第一版聚焦本地整理和移动端基础体验，不包含登录注册、云同步、邮件模板、社区、地图搜索、官方签证建议、法律建议、医疗建议、金融建议或移民建议。

## Privacy Note

The app may store records related to sensitive documents such as passports, visas, bank letters, university letters, tenancy agreements, tickets, hotel bookings, and insurance files. Public screenshots and repository materials should not include real personal files.

这个 App 可能会记录护照、签证、银行信、大学证明、租房合同、机票、酒店订单和保险文件等敏感资料。公开截图和仓库资料中不要使用真实个人文件。

## Documentation

- [Project Brief / 项目说明](docs/PROJECT_BRIEF.md)
- [Features / 功能规划](docs/FEATURES.md)
- [Screens / 页面规划](docs/SCREENS.md)
- [Data Model / 数据结构](docs/DATA_MODEL.md)
- [Default Content / 默认内容](docs/CONTENT.md)
- [Roadmap / 开发路线](docs/ROADMAP.md)
- [Privacy Notes / 隐私说明](docs/PRIVACY_NOTES.md)
