import actionBuilder from "@/utils/table/action-builder.ts";
import { Case } from "../types/query.types";

const caseActionConfig = actionBuilder<Case>({
  // Search configuration
  search: {
    placeholder: "Search users...",
  },
});

export default caseActionConfig;
