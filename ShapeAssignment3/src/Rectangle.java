import java.awt.*;

/**
 * Created by mohamed on 7/11/17.
 * File: Rectangle.java
 */
public class Rectangle extends Shape {
    int width,height;
    // Constructors
    public Rectangle(){
        System.out.println("Constructor1");
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 50;
    }
    public Rectangle(int x, int y, int width, int height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    public Rectangle(int x, int y, int width, int height,Color color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        setColor(color);
    }


    @Override
    public String toString() {
        return "Rectangle X: " + this.x + " Y: " +this.y + " width" + this.width + " height " + height + " Area: " + (int)getArea() + " Perimeter: " + getPerimeter()
                + " Color: " + getColor();
    }

    public double distanceTo(int x,int y){
        return Math.sqrt((Math.pow((this.x-x),2))+Math.pow((this.y-y),2));
    }
    public double getArea(){

        return this.width*this.height;
    }

    public double getPerimeter(){
        return (this.height*2)+(this.width*2);
    }

    @Override
    public Rectangle getBoundingBox(){
        Rectangle rect = new Rectangle(getX(),getY(),this.width,this.height);
        return rect;
    }



//    public void paintComponent(Graphics g){
//        draw(g);
//    }
    @Override
    public void draw(Graphics g) {
        System.out.println("Drawing Rectangle");
        g.setColor(this.color);
        g.fillRect(this.x,this.y,this.width,this.height);
//        g.setColor(Color.black);
//        g.drawString(toString(),x,y+radius+10);
    }
}
