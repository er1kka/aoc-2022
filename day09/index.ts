import { solutionOne, solutionTwo } from "./puzzle.ts";

if (import.meta.main) {
    const part: string = Deno.env.get("part") || "part1";
    if (part === "part1") {
        console.log(await solutionOne());
    } else {
        console.log(await solutionTwo());
    }
}
