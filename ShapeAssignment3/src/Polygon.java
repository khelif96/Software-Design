import java.awt.*;


/**
 * Created by mohamed on 6/27/17.
 * File: Polygon.java
 */
public class Polygon extends Shape {
    private int nSides;
    private int radius = 100;
    private int side;

    // Constructors
    public Polygon(int n){
        this.nSides = n;
    }
    public Polygon(int x, int y, int r, int n){
        setX(x);
        setY(y);
        this.radius = r;
        this.nSides = n;
    }
    public Polygon(int x, int y, int r, int n, Color c){
        setX(x);
        setY(y);
        this.radius = r;
        this.nSides = n;
        setColor(c);
    }



    @Override
    public String toString() {
        return "Polygon X: " + this.x + " Y: " +this.y + " nSides: " + this.nSides + "\n Angle: " + getAngle() + " Area: " + (int)getArea() + " Perimeter: " + getPerimeter()
                + " Color: " + getColor();
    }

    public double getArea(){
        switch(nSides){
            case 3: return((Math.pow(3, .5)/4)*Math.pow(getSide(), 2));
            case 4: return(0);
            case 5: return((Math.pow(getSide(), 2)*nSides)/(4*Math.tan(Math.toRadians(180/nSides))));
        }
        return 0;
    }

    public double getPerimeter(){
        return getSide()*nSides;
    }

    public int getAngle(){
        return (180-(360/nSides));
    }

    public int getSide(){
        switch(nSides){
            case 3: side = (int)(2*radius*Math.sin(Math.PI/nSides));
            case 5: side = (int)(2*radius*Math.sin(Math.PI/nSides));
            case 8: side = (int)((radius*Math.sin(Math.toRadians(45))) / 2);
        }
        return side;
    }

    public double distanceTo(int x, int y){
        return Math.sqrt((Math.pow((this.x-x),2))+Math.pow((this.y-y),2));
    }

    @Override
    public Rectangle getBoundingBox(){
        Rectangle rect = new Rectangle(getX(),getY(),radius,radius);
        return rect;
    }



    public void paintComponent(Graphics g){
        draw(g);
    }
    @Override
    public void draw(Graphics g) {
        java.awt.Polygon polygon = new java.awt.Polygon();
        for(int i = 0; i < nSides; i++) {
            int xCoord = (int)(x + (Math.sin(2 * Math.PI * i / nSides) * radius));
            int yCoord = (int)(y - (Math.cos(2 * Math.PI * i / nSides) * radius));
            polygon.addPoint(xCoord,yCoord);
        }
        g.setColor(getColor());
        g.fillPolygon(polygon);
        g.setColor(Color.black);
        g.drawString(toString(),x,y+radius+10);
    }


}
