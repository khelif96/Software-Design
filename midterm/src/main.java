/**
 * Created by mohamed on 6/29/17.
 */
public class main {
   public abstract class HelloInterface{
       public String hello = "Hello";
//       default void sayHello(){
//           System.out.println(hello);
//       }
   }
   public abstract class GoodbyInterface{
       public String goodby = "Goodby";
//       default void sayGoodby(){
//           System.out.println(goodby);
//       }
   }
   public abstract class HelloGoodbyClass{
       public  void sayGoodby() {
           System.out.println(HelloInterface.hello);
       }
   }
   public class HelloGoodBySubclass extends HelloGoodbyClass{
       HelloGoodBySubclass(){
            sayHello();
            sayGoodby();
       }
       @Override
       public void sayHello() {
           super.sayHello();
       }

       @Override
       public void sayGoodby() {
           super.sayGoodby();
       }
   }

}
