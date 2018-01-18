/**
 * Created by mohamed on 6/8/17.
 */
import javax.swing.*;
import java.awt.*;

import static javafx.scene.input.KeyCode.G;

public class DrawPanelTest extends JPanel {
    public void main(String[] args) {
        JFrame application = new JFrame(); // Create a new Frame to hold the panel
        DrawPanel panel = new DrawPanel(); // Create a new panel

        // Set Frame Parameters

        application.setSize(1000,1000);
        application.add(panel);
        Graphics graphics;
//        printComponent(graphics);
    }

    public void printComponent(Graphics G){
        super.printComponent(G); // super calls components from parent class
        int width = getWidth();
        int height = getHeight();
        G.drawLine(0,0,width,height);
        G.drawLine(0,height,0,width);
    }

}
