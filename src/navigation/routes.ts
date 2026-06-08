export const routes = {
  home: "/",
  checklist: "/checklist",
  documents: "/documents",
  documentDetail: (id: string) => `/documents/${id}`,
  documentEdit: "/documents/edit",
  travel: "/travel",
  travelDetail: (id: string) => `/travel/${id}`,
  travelEdit: "/travel/edit",
  budget: "/budget",
  emergency: "/emergency",
  search: "/search",
  settings: "/settings",
  profile: "/profile"
} as const;

export const mainTabLabels = ["Home", "Checklist", "Documents", "Travel", "Budget"] as const;
