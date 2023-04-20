import { ContentBlock, Text } from "../../components/builder";

export const ELEMENT_TYPES = {
  EMPTY_BLOCK: "EMPTY_BLOCK",
  TEXT: "TEXT",
};

export const ELEMENTS_BY_TYPES = {
  [ELEMENT_TYPES.EMPTY_BLOCK]: {
    element: ContentBlock,
  },
  [ELEMENT_TYPES.TEXT]: {
    element: Text,
  },
};
