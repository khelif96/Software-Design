
import javax.swing.JPanel;
import java.awt.Graphics;

/**
 * Created by mohamed on 6/8/17.
 */
public class DrawPanel extends JPanel { // Jpanel is the Sub class
    public static void main(String[] args) {

    }
    public void printComponent(Graphics G){
        super.printComponent(G); // super calls components from parent class
        int width = getWidth();
        int height = getHeight();
        G.drawLine(0,0,width,height);
        G.drawLine(0,height,0,width);
    }

}
