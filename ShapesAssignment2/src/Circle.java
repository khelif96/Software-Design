import java.awt.*;

/**
 * Created by mohamed on 6/27/17.
 * File: Circle.java
 */
public class Circle extends Shape {
    private int r = 50;

    // Constructors
    public Circle(){
    }
    public Circle(int r){
        this.r = r;
    }

    public Circle(int r, int x, int y){
        setX(x);
        setY(y);
        this.r = r;
    }

    public Circle(int r, int x, int y, Color c){
        setX(x);
        setY(y);
        this.r = r;
        setColor(c);
    }
    
    public String toString() {
        return "Circle X: " + this.x + " Y: " +this.y + " radius: " + getRadius()+  " Area: " + (int)getArea() + " Perimeter: " + (int)getPerimeter()
                + " Color: " + getColor();    }

    public double getArea(){
        return Math.PI*r*r;
    }

    public double getPerimeter(){
        return 2*Math.PI*r;
    }

    public double getRadius(){
        return r;
    }
    
    public void draw(Graphics g) {
        System.out.println("Drawing Circle");
        Rectangle rec = g.getClipBounds();
        int h = rec.height;
        int w = rec.width;
        g.setColor(getColor());
        g.fillOval(x-r, y-r, r*2, r*2);
        g.setColor(Color.black);
        g.drawString(toString(),x,(int)(y+getRadius()));
    }


    
//    public void paintComponent(Graphics g) {
//        this.g = g;
//    }
}
