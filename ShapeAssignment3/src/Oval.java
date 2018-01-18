import java.awt.*;
import java.awt.geom.Area;

/**
 * Created by mohamed on 7/10/17.
 */
public class Oval extends Shape {
    int r1,r2;
    public Oval(){
        this.x = 0;
        this.y = 0;
        this.r1 = 0;
        this.r2 = 0;
    }
    public Oval(int x, int y, int r1,int r2){
        this.x = x;
        this.y = x;
        this.r1 = r1;
        this.r2 = r2;
    }
    public Oval(int x, int y, int r1,int r2,Color c){
        this.x = x;
        this.y = x;
        this.r1 = r1;
        this.r2 = r2;
        this.setColor(c);
    }
    public String toString() {
        return "Oval X: " + this.x + " Y: " +this.y +  " Area: " + (int)getArea() + " Perimeter: " + (int)getPerimeter()
                + " Color: " + getColor();    }

    public double getArea(){
        return Math.PI * r1 * r2;
    }

    public double getPerimeter(){
        return 2*Math.PI*Math.sqrt((Math.pow(r1,2)+Math.pow(r2,2))/2);
    }


    public double distanceTo(int x, int y){
        return Math.sqrt((Math.pow((this.x-x),2))+Math.pow((this.y-y),2));
    }

    @Override
    public Rectangle getBoundingBox(){
        Color dimBlue = new Color(0,0,255,55);
        Rectangle BoundingBox = new Rectangle(x-r1,y-r2,r1*2,r2*2);

        return BoundingBox;
    }

    public void paintComponent(Graphics g){
        draw(g);
    }
    public void draw(Graphics g) {
        System.out.println("Drawing Circle");
//        Rectangle rec = g.getClipBounds();
//        int h = rec.height;
//        int w = rec.width;
        g.setColor(getColor());
        g.fillOval(x-r1, y-r2, r1*2, r2*2);
        g.setColor(Color.black);
//        g.drawString(toString(),x,(int)(y+getRadius()));
    }
}
