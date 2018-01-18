import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;

/**
 * Created by mohamed on 6/28/17.
 * File: DrawPanel.java
 * Class contains an ArrayList to store shapes and displays them when added to the panel
 */
public class DrawPanel extends JPanel{
// This class

    ArrayList<Shape> shapeArrayList = new ArrayList<Shape>();
    public void add(Shape shape){
        shapeArrayList.add(shape);
    }
    public void paintComponent(Graphics g){
        for(int i = 0; i<shapeArrayList.size(); i++){
            shapeArrayList.get(i).draw(g);
        }
    }
}
