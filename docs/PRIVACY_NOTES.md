# Privacy Notes / 隐私说明

Study Abroad Life Toolkit may handle sensitive personal information. Privacy rules should be clear even while the project is still a prototype.

海外留学生活助手可能会涉及敏感个人信息。即使项目还只是原型，也需要提前把隐私边界写清楚。

## First Version Privacy Scope / 第一版隐私范围

The first version is planned as local-only storage.

It will not include:

- Login.
- Cloud sync.
- Public uploads.
- Shared document links.
- Backend document storage.

第一版计划只做本地保存。

第一版不包含：

- 登录。
- 云端同步。
- 公共上传。
- 共享文件链接。
- 后端文件存储。

## Sensitive Information / 敏感信息

The following files may contain sensitive personal information:

- Passport.
- Visa.
- BRP / eVisa.
- Bank letter.
- University letter.
- CAS / admission document.
- Tenancy agreement.
- Flight ticket.
- Hotel booking.
- Insurance file.
- Student ID.
- Any file containing an address, date of birth, ID number, financial information, or immigration information.

以下文件都可能包含敏感个人信息：

- 护照。
- 签证。
- BRP / eVisa。
- 银行信。
- 大学证明信。
- CAS / 录取文件。
- 租房合同。
- 机票。
- 酒店订单。
- 保险文件。
- 学生证。
- 任何包含地址、出生日期、证件号码、财务信息或移民信息的文件。

## README, Screenshots, And Test Data / README、截图和测试数据

Public project materials must use non-private project data only.

Do not use real sensitive files in:

- README screenshots.
- App screenshots.
- Preview data.
- Test data.
- GitHub issues or pull requests.
- Example files.

Use screen-safe preview images and non-private records instead.

公开项目材料只能使用虚拟数据。

以下位置不能使用真实敏感文件：

- README 截图。
- App 截图。
- 预览数据。
- 测试数据。
- GitHub issue 或 pull request。
- 示例文件。

应使用占位图、模拟文件和虚拟记录代替。

## Local File Handling / 本地文件处理

In the first version, file upload means selecting and saving a local file reference inside the app.

The app should not upload documents to a cloud service in the first version.

第一版中的文件上传，指的是在 App 内选择文件并保存本地文件引用。

第一版不应把文件上传到云端服务。

## In-App Warning Text / App 内提示文案

English:

Your files may contain sensitive personal information. Please store them carefully and do not use real private documents in public screenshots.

中文：

你的文件可能包含敏感个人信息。请谨慎保存，不要在公开演示或截图中使用真实私人文件。

## No Professional Advice / 不提供专业建议

The app does not provide visa, legal, medical, financial, or immigration advice.

It can help users store personal notes and reminders, but users should check official sources or qualified professionals before making important decisions.

这个 App 不提供签证、法律、医疗、金融或移民建议。

它可以帮助用户保存个人备注和提醒，但用户在做重要决定前，应查看官方渠道或咨询合格专业人士。

## Future Cloud Sync Considerations / 未来云同步注意事项

If cloud sync is added later, privacy and security must be redesigned before implementation.

Topics to review:

- Authentication.
- Encryption in transit.
- Encryption at rest.
- Access control.
- Data deletion.
- Backup and recovery.
- Data export.
- Data retention.
- Privacy policy.

如果未来加入云端同步，必须在实现前重新设计隐私和安全方案。

需要重新评估：

- 身份认证。
- 传输加密。
- 存储加密。
- 权限控制。
- 数据删除。
- 备份与恢复。
- 数据导出。
- 数据保留。
- 隐私策略。

Cloud sync should not be treated as a small UI feature because it changes the privacy risk of the app.

云端同步不应被当作一个简单 UI 功能处理，因为它会明显改变 App 的隐私风险。
