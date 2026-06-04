# Data Model / 数据模型

This document uses TypeScript-style field names and types for planning. It is not implementation code.

本文档使用 TypeScript 风格的字段名称和类型做规划说明，不是完整实现代码。

## Shared Fields / 通用字段

Most records should include:

- `id: string`
- `createdAt: string`
- `updatedAt: string`
- `notes?: string`

大部分记录都应包含唯一 id、创建时间、更新时间和可选备注字段。

## ChecklistItem / 生活事项

- `id: string`
- `title: string`
- `category: ChecklistCategory`
- `status: ChecklistStatus`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于记录生活事项，例如银行开户、注册 GP 或准备租房文件。

## DocumentItem / 文件记录

- `id: string`
- `name: string`
- `category: DocumentCategory`
- `fileUri?: string`
- `fileType?: string`
- `expiryDate?: string`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于记录护照、签证、银行信、学校信等重要文件。`fileUri` 只指向本地文件。

## TravelTrip / 旅行

- `id: string`
- `name: string`
- `destination: string`
- `startDate: string`
- `endDate: string`
- `notes?: string`
- `files: TravelFile[]`
- `checklist: TravelChecklistItem[]`
- `createdAt: string`
- `updatedAt: string`

用于记录一次旅行的基础信息、文件列表和旅行 checklist。

## TravelFile / 旅行文件

- `id: string`
- `tripId: string`
- `name: string`
- `category: TravelFileCategory`
- `fileUri?: string`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于记录机票、酒店预订、旅行保险、签证截图等旅行相关文件。

## TravelChecklistItem / 旅行 Checklist

- `id: string`
- `tripId: string`
- `title: string`
- `done: boolean`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于记录每次旅行需要准备的事项，例如护照、充电器、银行卡和药品。

## BudgetItem / 预算记录

- `id: string`
- `title: string`
- `category: BudgetCategory`
- `amount: number`
- `currency: string`
- `date: string`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于记录一笔生活支出。

## EmergencyContact / 紧急联系人

- `id: string`
- `name: string`
- `category: EmergencyContactCategory`
- `phone?: string`
- `email?: string`
- `address?: string`
- `notes?: string`
- `createdAt: string`
- `updatedAt: string`

用于保存学校、住宿、GP、银行挂失、使馆、家人朋友等重要联系方式。

## AppLanguage / 应用语言

- `AppLanguage = "en" | "zh"`

用于控制界面语言。第一版计划支持英文和中文。

## Category Types / 分类类型

- `ChecklistCategory`: Banking, Health, Housing, University, Travel, Other
- `ChecklistStatus`: Not Started, In Progress, Done
- `DocumentCategory`: Passport, Visa, Bank Letter, University Letter, CAS, Tenancy Agreement, Travel Insurance, Student ID, Other
- `TravelFileCategory`: Flight Ticket, Hotel Booking, Visa, Insurance, Other
- `BudgetCategory`: Rent, Food, Transport, Shopping, Travel, Subscription, Other
- `EmergencyContactCategory`: University, Accommodation, GP, Bank, Embassy, Police, Friend or Family, Other

分类名称需要支持英文和中文显示。实际存储可以保存稳定英文 key，界面显示时再根据语言切换。
