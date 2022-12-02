import * as fs from "fs";
import path from "path";
import getTotalWins from "./getTotalWins";
import getTotalWinsAlternate from "./getTotalWinsAlternate";

const readInput = (filename = "../input.txt"): string[] =>
  fs
    .readFileSync(path.resolve(__dirname, filename))
    .toString()
    .trim()
    .split("\n");

export const solutionOne = (): number => getTotalWins(readInput());
export const solutionTwo = (): number => getTotalWinsAlternate(readInput());

const part: string = process.env.part || "part1";

if (part === "part1") {
  console.log(solutionOne());
} else {
  console.log(solutionTwo());
}
