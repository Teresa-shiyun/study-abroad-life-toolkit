# Data Model / 数据结构

This document describes TypeScript-style data structures for the planned first version. It is documentation only, not full app code.

本文档使用 TypeScript 风格说明第一版需要的数据结构。这里只是文档说明，不是完整 App 代码。

## Implementation Notes / 实现说明

The final fields may be adjusted during implementation based on the chosen Expo file picker, image picker, and local storage solution.

`fileUri` should store only a local file path or local file reference in the first version. Real sensitive files should not be committed to GitHub.

后续开发时，字段可以根据 Expo 文件选择器、图片选择器和本地存储方案微调。

第一版中，`fileUri` 只应保存本地文件路径或本地文件引用。真实敏感文件不应提交到 GitHub。

## Common Fields / 通用字段

Most records should include:

- `id`: local unique identifier.
- `createdAt`: ISO date string.
- `updatedAt`: ISO date string.
- `notes`: optional user notes.

多数记录建议包含：

- `id`：本地唯一标识。
- `createdAt`：创建时间，建议使用 ISO 日期字符串。
- `updatedAt`：更新时间，建议使用 ISO 日期字符串。
- `notes`：可选备注。

## AppLanguage / 应用语言

```ts
type AppLanguage = "en" | "zh";
```

Used to store the selected interface language.

用于保存当前选择的界面语言。

## ChecklistItem / 生活事项

```ts
type ChecklistStatus = "notStarted" | "inProgress" | "done";

type ChecklistCategory =
  | "banking"
  | "health"
  | "housing"
  | "university"
  | "travel"
  | "other";

interface ChecklistItem {
  id: string;
  title: string;
  category: ChecklistCategory;
  status: ChecklistStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one life checklist item, such as opening a bank account or registering with a GP.

用于保存一条生活事项，例如开通银行账户或注册 GP。

## DocumentItem / 文件记录

```ts
type DocumentCategory =
  | "passport"
  | "visa"
  | "bankLetter"
  | "universityLetter"
  | "casOrAdmission"
  | "tenancyAgreement"
  | "travelInsurance"
  | "studentId"
  | "other";

type DocumentStatus = "missing" | "prepared" | "expired" | "needsUpdate";

interface DocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  status: DocumentStatus;
  fileUri?: string;
  fileName?: string;
  fileType?: string;
  expiryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one important document record and optional local file reference.

`status` is used by the Home Dashboard and document list to count missing, prepared, expired, or needs-update documents.

`fileUri` should not point to a public URL in the first version.

用于保存一条重要文件记录，以及可选的本地文件引用。

`status` 用于首页和文件列表统计未准备、已准备、已过期或需要更新的文件。

第一版中，`fileUri` 不应指向公开 URL。

## TravelTrip / 旅行记录

```ts
interface TravelTrip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
  files: TravelFile[];
  checklist: TravelChecklistItem[];
  createdAt: string;
  updatedAt: string;
}
```

Stores one trip with its files and checklist items.

用于保存一次旅行，以及这次旅行下的文件和 checklist。

## TravelFile / 旅行文件

```ts
type TravelFileCategory =
  | "flightTicket"
  | "hotelBooking"
  | "visaOrEVisa"
  | "insurance"
  | "other";

interface TravelFile {
  id: string;
  tripId: string;
  title: string;
  category: TravelFileCategory;
  fileUri?: string;
  fileName?: string;
  fileType?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one travel file, such as a flight ticket screenshot or hotel booking screenshot.

用于保存一条旅行文件记录，例如机票截图或酒店订单截图。

## TravelChecklistItem / 旅行 Checklist 项

```ts
interface TravelChecklistItem {
  id: string;
  tripId: string;
  title: string;
  isDone: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one checklist item for a specific trip.

用于保存某次旅行下的一条 checklist。

## BudgetItem / 支出记录

```ts
type BudgetCategory =
  | "rent"
  | "food"
  | "transport"
  | "shopping"
  | "travel"
  | "subscription"
  | "other";

interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  currency: string;
  category: BudgetCategory;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one expense record.

用于保存一条支出记录。

## MonthlyBudget / 月度预算

```ts
interface MonthlyBudget {
  id: string;
  month: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores the budget amount for a month.

用于保存某个月的预算金额。

## EmergencyContact / 紧急联系人

```ts
type EmergencyContactCategory =
  | "university"
  | "accommodation"
  | "gp"
  | "bankLostCard"
  | "embassy"
  | "localPoliceNonEmergency"
  | "friendOrFamily"
  | "other";

interface EmergencyContact {
  id: string;
  name: string;
  category: EmergencyContactCategory;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

Stores one important contact.

用于保存一个重要联系人。

## LocalizedLabel / 多语言标签

```ts
interface LocalizedLabel {
  key: string;
  en: string;
  zh: string;
}
```

Used for category names, status labels, buttons, and other interface text.

用于保存分类名、状态、按钮和其他界面文案。

Example:

```ts
{
  key: "banking",
  en: "Banking",
  zh: "银行"
}
```

## Searchable Fields / 可搜索字段

Local search can use:

- Checklist: `title`, `notes`, `category`, `status`.
- Documents: `title`, `notes`, `category`, `fileName`.
- Trips: `name`, `destination`, `notes`.
- Travel files: `title`, `notes`, `category`, `fileName`.
- Budget: `title`, `notes`, `category`, `amount`.
- Contacts: `name`, `phone`, `email`, `address`, `notes`, `category`.

本地搜索可以覆盖：

- 生活事项：`title`、`notes`、`category`、`status`。
- 文件：`title`、`notes`、`category`、`fileName`。
- 旅行：`name`、`destination`、`notes`。
- 旅行文件：`title`、`notes`、`category`、`fileName`。
- 预算：`title`、`notes`、`category`、`amount`。
- 联系人：`name`、`phone`、`email`、`address`、`notes`、`category`。
