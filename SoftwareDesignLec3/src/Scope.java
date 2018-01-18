/**
 * Created by mohamed on 6/13/17.
 */
public class Scope {
        public static int x = 1;
        public static void main(String[] args){
            int x = 5; // local variable x shadows the public variable within its scope
            System.out.println(x);
            useLocalVariable();
            useField();
            useLocalVariable();
            useField();
            System.out.println(x);
        }
        public static void useLocalVariable(){
            int x = 25;
            System.out.println(x);
            ++x;
        }
        public static void useField(){
            System.out.println(x);
            x*=10;
            System.out.println(x);
        }
}
