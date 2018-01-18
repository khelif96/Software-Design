
import java.awt.Color;
import java.awt.Graphics;

/**
 * Created by mohamed on 6/27/17.
 * File: Circle.java
 */
public class Circle extends Oval {
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

    @Override
    public Rectangle getBoundingBox(){
        Color dimBlue = new Color(0,0,255,55);
        Rectangle BoundingBox = new Rectangle(x-r,y-r,r*2,r*2);

        return BoundingBox;
    }
//    public boolean doOverlap(Shape shapeA, Shape shapeB);
    @Override
    public void draw(Graphics g) {
        System.out.println("Drawing Circle");
//        Rectangle rec = g.getClipBounds();
//        int h = rec.height;
//        int w = rec.width;
//        g.setColor(getColor());
        g.fillOval(x-r, y-r, r*2, r*2);
//        g.setColor(Color.black);
//        g.drawString(toString(),x,(int)(y+getRadius()));
    }


    
//    public void paintComponent(Graphics g) {
//        draw(g);
//    }
}
