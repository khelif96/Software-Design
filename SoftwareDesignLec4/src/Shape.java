import java.awt.*;

/**
 * Created by mohamed on 6/15/17.
 */
public class Shape {
    // Instance Variables
    private int x;
    private int y;
    private Color color;
    // Constructor
    public Shape(int x, int y, Color color){
        this.x = x;
        this.y = y;
        this.color = color;
    }
    // Set and Get Methods
    void setX(int x){
        this.x = x;
    }
    void setY(int y){
        this.y = y;
    }
    int getX(){
        return this.x;
    }
    int getY(){
        return this.y;
    }
    // Move/Shift methods
    void moveTo(int deltaX, int deltaY){
        setX(getX() + deltaX);
        setY(getY() + deltaY);
    }
    // Draw
    void draw(){

    }
}
