import { globby } from "globby";
import { Tinypool } from "tinypool";
import { Comment, Options } from "./types";

export async function run(globPattern: string, options: Options) {
  const files = await globby(globPattern, { absolute: true });
  const pool = new Tinypool({
    filename: new URL("./worker.js", import.meta.url).href,
  });
  const results = await Promise.all(
    files.map(async (file) => {
      const comments = (await pool.run({
        filepath: file,
        options,
      })) as unknown as Comment[];
      return {
        filepath: file,
        comments,
      };
    })
  );
  return results;
}
