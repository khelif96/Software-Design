
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Created by mohamed on 7/18/17.
 * File: HistogramLetters.java
 */
public class HistogramLetters {
//    File file = new File("res/emma.txt");
    static Path filePath;

    String parsedString = "";
    public HashMap<String,Integer> hashMap;

    public static Scanner input;

    HistogramLetters(String filePath){
        this.filePath = Paths.get(filePath);
        System.out.println("Constructor");
        System.out.println(this.filePath.toString());
        hashMap = new HashMap<String,Integer>(26);
    }

    public static void OpenFile(){
        try{
            input = new Scanner(filePath);
        }catch(IOException ioException){
            System.err.println("Error Message");
//            exit(1);
        }
    }
    public static void CloseFile(){
        if(input != null){
            input.close();
        }
    }

    public double getProbability(String tableKEY) {
        double totalFrequency = 0;
        for (String key : hashMap.keySet()) {
            totalFrequency+=hashMap.get(key);
//            System.err.println(hashMap.get(key));
        }
        double result = hashMap.get(tableKEY)/totalFrequency;
//        System.out.println("totalFrequency: " + totalFrequency + "prob: " + result);
        return result;
    }


    public void addHashMap(String input){
        input = input.toLowerCase();
        String alphaRegex = "[a-zA-Z]";
        Pattern p = Pattern.compile(alphaRegex);
        if(input.matches(alphaRegex)) {
            if (hashMap.containsKey(input)) {
                int count = (int) hashMap.get(input);
                hashMap.remove(input);
                count++;
                hashMap.put(input, count);
            } else {
                hashMap.put(input, 1);
            }
        }
    }

    // sort a hashmap by value
    public static HashMap<String, Integer> sortByValue(Map<String, Integer> unsortMap) {
        // Convert Map to List of Map
        List<Map.Entry<String, Integer>> list =
                new LinkedList<Map.Entry<String,Integer>>(unsortMap.entrySet());
        // Sort list with Collections.sort(), provide a custom Comparator
        Collections.sort(list, new Comparator<Map.Entry<String, Integer>>() {
            public int compare(Map.Entry<String, Integer> o2,
                               Map.Entry<String, Integer> o1) {
                return (o1.getValue()).compareTo(o2.getValue());
            }
        });
        // Loop the sorted list and put it into a new insertion order Map LinkedHashMap
        HashMap<String, Integer> sortedMap = new LinkedHashMap<String, Integer>();
        for (Map.Entry<String, Integer> entry : list) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        return sortedMap;
    }


//    SortedMap<String input, int count> sortedMap = new SortedMap<String input, int count>;
    public void scanFile(){

//        String alphaRegex = "[a-zA-Z]";
//        Pattern p = Pattern.compile(alphaRegex);
        try{
            Scanner input = new Scanner(this.filePath);
            while(input.hasNext()){
                input.useDelimiter("");

//                System.out.println("Ok");
                addHashMap(input.next());
//                parsedString += input.next();
////                System.out.println(parsedString);
            }
        }catch(IOException e){
            System.err.println(e.toString());
        }catch(InputMismatchException e){
            System.err.println(e.toString());
        }
//        return parsedString;
    }
}
