export type QueryOptions = {
  page: number;
  pageSize: number;
  sortBy: "byTitle" | "byPrice" | "byCategory" | "byName";
  sortOrder: "Ascending" | "Descending";
};
