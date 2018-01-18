import javax.swing.*;
import java.awt.*;

/**
 * Created by mohamed on 6/27/17.
 * File: Shape.java
 */
public abstract class Shape extends JPanel {
    protected int x;
    protected int y;
    protected Color color;

    // Super Class methods
    public int getX(){
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public Color getColor() {
        return this.color;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setColor(Color color){
        this.color = color;
    }

    public void moveTo(int x, int y) {
        this.x+=x;
        this.y+=y;
    }

    // Abstract methods that over ridden by the sub classes
    public abstract String toString();

    public abstract void draw(Graphics g);

//    public abstract void paintComponent(Graphics g);
}
