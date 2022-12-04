import * as fs from "fs";
import path from "path";
import addAll from "./addAll";

const readInput = (filename = "../input.txt"): string[] =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString()
    .trim()
    .split("\n");

const part: string = process.env.part || "part1";

console.log(addAll(readInput(), part));
