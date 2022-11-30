package se.er1kka;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws IOException {
        var list = parseInput("input.txt");
        list.forEach(System.out::println);
        String part = System.getenv("part") == null ? "part1" : System.getenv("part");
        System.out.println( "Hello World!" + part + " and then...");
    }

    private static List<Integer> parseInput(String filename) throws IOException {
        return Files.lines(Path.of(filename))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
    }
}
