import javax.swing.*;
import java.awt.*;
import java.awt.geom.Area;

/**
 * Created by mohamed on 6/27/17.
 * File: Shape.java
 */
public abstract class Shape extends JPanel implements ShapePositionInterface {
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
        System.out.println("Color Gottten");
        return this.color;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setColor(Color color){
        System.out.println("Color Set");
        this.color = color;
    }

    // Shape Position Interface
    public void moveTo(int x, int y) {
        this.x+=x;
        this.y+=y;
    }

    public double getPerimeter(){
        return getX();
    }
    public Point getPoint(){
        Point point = new Point(this.x,this.y);
        return point;
    }

    public boolean doOverlap(Shape shapeA, Shape shapeB){
        Rectangle rectA = shapeA.getBoundingBox();
        java.awt.Rectangle shapeARect = new java.awt.Rectangle(rectA.getX(),rectA.getY(),rectA.getWidth(),rectA.getHeight());
        Rectangle rectB = shapeA.getBoundingBox();
        java.awt.Rectangle shapeBRect = new java.awt.Rectangle(rectB.getX(),rectB.getY(),rectB.getWidth(),rectB.getHeight());
        Area area = new Area(shapeARect);
        area.intersect(new Area(shapeBRect));
        if(area.isEmpty()){
            System.out.println("Overlap");
        }else{
            System.out.println("Doesnt Overlap");
        }
        return area.isEmpty();

    }
    public abstract Rectangle getBoundingBox();
//    {
//        Rectangle rect = new Rectangle(getX(),getY(),getWidth(),getHeight());
//        return rect;
//    }

    public double distanceTo(Point point){
        return Math.sqrt((Math.pow((this.x-point.getX()),2))+Math.pow((this.y-point.getY()),2));
    }
    // Abstract methods that over ridden by the sub classes
    public abstract String toString();

    public abstract void draw(Graphics g);

//    public abstract void paintComponent(Graphics g);
}
