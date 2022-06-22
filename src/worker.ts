import { getCommentsFromFilePath } from "./core.js";
import type { Options } from "./types";

export default function ({
  filepath,
  options,
}: {
  filepath: string;
  options: Options;
}) {
  return getCommentsFromFilePath(filepath, options);
}
