export type Options = {
  typescript: boolean;
  prefix: string;
};

export type Comment = {
  prefix: string;
  content: string;
  file: string;
  position: Position;
};

export type Position = {
  line: number;
  column: number;
};
