import fs from "node:fs/promises";
import { parse } from "@babel/parser";
import type { ParserPlugin } from "@babel/parser";
import type { Comment, Options } from "./types";

export async function getCommentsFromFilePath(
  filepath: string,
  options: Options
): Promise<Comment[]> {
  const data = await fs.readFile(filepath, "utf-8");
  return getCommentsFromSource(data, filepath, options);
}

// TODO: こここ
function getCommentsFromSource(
  source: string,
  filepath: string,
  options: Options
): Comment[] {
  const plugins: ParserPlugin[] = [];
  if (options.typescript) {
    plugins.push("typescript");
  }
  const result = parse(source, {
    plugins,
    errorRecovery: true,
    sourceType: "module",
  });
  const comments: Comment[] = [];
  if (result.comments == null || result.comments.length === 0) {
    return comments;
  }
  for (const comment of result.comments) {
    if (comment.value.trim().startsWith(options.prefix)) {
      comments.push({
        prefix: options.prefix,
        content: comment.value,
        file: filepath,
        position: {
          line: comment.loc.start.line,
          column: comment.loc.start.column,
        },
      });
    }
  }
  return comments;
}
