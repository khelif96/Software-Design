import javax.swing.*;
import java.awt.*;
import java.util.Random;

/**
 * Created by mohamed on 6/27/17.
 * File: main.java
 */
public class main{


    public static void main(String[] args) {
        // Frame Dimensions
        int frameWidth = 800;
        int frameHeight = 600;

        // Part 2 Different shapes
        // Panel to draw items
        DrawPanel drawPanel1 = new DrawPanel();


        // Create new Polygon object
        Polygon Triangle = new Polygon(100,100,50,3);
        Color color = new Color(0,0,255);
        Triangle.setColor(color);
        drawPanel1.add(Triangle);
        color = new Color(255,0,0);
        Polygon Pentagon = new Polygon(100,220,50,5,color);
        drawPanel1.add(Pentagon);
        color = new Color(0,255,0);
        Polygon Octagon = new Polygon(100,350,50,8);
        Octagon.setColor(color);
        drawPanel1.add(Octagon);

        // Create Circle Object
        color = new Color(255,255,0);
        Circle circle = new Circle();
        circle.setX(100);
        circle.setY(450);
        circle.setColor(color);
        drawPanel1.add(circle);
        System.out.println(circle.toString());
        System.out.println(Triangle.toString());

        JFrame application = new JFrame();
        application.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        application.add(drawPanel1);
        application.setSize(frameWidth,frameHeight);
        application.setVisible(true);
        application.setTitle("Shape Assignment 2 Part 2");

        // Part 3 nested Pentagons and Circles
        DrawPanel drawPanel2 = new DrawPanel();
        int radius = 0;
        if(frameWidth > frameHeight){
            radius = frameHeight/2;
        }else{
            radius = frameWidth/2;
        }
        float r,gr,b;
        Random rand = new Random();
        for(int i = 0; i<3; i++){
            r = rand.nextFloat();
            gr = rand.nextFloat();
            b = rand.nextFloat();
            Color c = new Color(r, gr, b);
            Circle circle1 = new Circle(radius,frameWidth/2,frameHeight/2,c);
            drawPanel2.add(circle1);
            r = rand.nextFloat();
            gr = rand.nextFloat();
            b = rand.nextFloat();
            c = new Color(r,gr,b);
            Polygon pentagon1 = new Polygon(frameWidth/2,frameHeight/2,radius,5,c);
            drawPanel2.add(pentagon1);
            radius = radius - radius/5; // Calculate the radius of the next circle
            System.out.println("Radius: " + radius);
        }
        JFrame application2 = new JFrame();
        application2.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        application2.add(drawPanel2);
        application2.setSize(frameWidth,frameHeight);
        application2.setVisible(true);
        application2.setTitle("Shape Assignment 2 Part 3");



    }


}
