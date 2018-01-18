/**
 * Created by mohamed on 6/10/17.
 */
import javax.swing.JFrame;

public class ShapesTest {

    public static void main(String[] args) {
        int frameWidth = 400;
        int frameHeight = 300;
        Shapes panel = new Shapes(frameWidth,frameHeight);
        JFrame application = new JFrame();
        application.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        application.add(panel);
        application.setSize(frameWidth,frameHeight);
        application.setVisible(true);
        application.setTitle("Shape Assignment 1");
    }
}
