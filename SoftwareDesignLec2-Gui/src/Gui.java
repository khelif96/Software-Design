/**
 * Created by mohamed on 6/8/17.
 */
import javax.swing.JOptionPane;

public class Gui{
    public static void main(String[] args) {
        String name = JOptionPane.showInputDialog("Enter your name"); // Takes String as input outputs String
        String message = String.format("Your name is ", name);
        JOptionPane.showMessageDialog(null,message); // Null Places the Dialog at the center of the screen
    }
}
