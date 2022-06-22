import meow from "meow";
import type { TypedFlags } from "meow";
import type { Options } from "./types";
import { run } from "./run.js";

type Flags = {
  typescript: {
    type: "boolean";
    default: false;
  };
  prefix: {
    type: "string";
    default: string;
  };
};

const cli = meow<Flags>(
  `
    Usage
      $ ftl-dependency-analyzer <input>
    Options
      --format, -f
      --base, -b
    Examples
      $ ftl-dependency-analyze ./index.ftl --format=tree`,
  {
    importMeta: import.meta,
    flags: {
      typescript: {
        type: "boolean",
        default: false,
      },
      prefix: {
        type: "string",
        default: "TODO:",
      },
    },
  }
);

async function processCli(input: string, flags: TypedFlags<Flags>) {
  if (!input) {
    throw new Error("input is required.");
  }
  const options: Options = {
    typescript: flags.typescript,
    prefix: flags.prefix,
  };
  const results = await run(input, options);
  let logged = "";
  for (const result of results) {
    if (result.comments.length !== 0) {
      logged += `${result.filepath}\n`;
      for (const comment of result.comments) {
        logged += `  ${comment.position.line}:${comment.position.column}${comment.content}\n`;
      }
    }
  }
  process.stdout.write(logged);
}

processCli(cli.input[0], cli.flags);
