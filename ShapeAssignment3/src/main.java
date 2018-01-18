import javax.swing.*;
import java.awt.*;
import java.util.Random;

import static java.lang.Math.sqrt;

/**
 * Created by mohamed on 7/10/17.
 * File: main.java
 */


public class main {
    public static void main(String[] args) {
//
        int frameWidth = 400, frameHeight = 400;
        int r1 = frameWidth/2, r2 = frameHeight/4;
        DrawPanel drawPanel = new DrawPanel();
        Random rand = new Random();
        Color c = new Color(rand.nextFloat(),rand.nextFloat(),rand.nextFloat());
        Shape rect;
        Shape oval;
        for (int i = 0; i < 3; i++) {
            oval = new Oval(frameWidth/2,frameHeight/2,r1,r2,c);
            rect = oval.getBoundingBox();
            c = new Color(rand.nextFloat(),rand.nextFloat(),rand.nextFloat());
            rect.setColor(c);
            drawPanel.add(rect);
            drawPanel.add(oval);
            r1 = (int)(r1-((r1/2)/sqrt(2)));
            r2 = (int)(r2-(r2/2)/sqrt(4.5)); // Magic number
            c = new Color(rand.nextFloat(),rand.nextFloat(),rand.nextFloat());

        }
        oval = new Oval(frameWidth/2,frameHeight/2,r1,r2,c);
        rect = oval.getBoundingBox();

        rect.doOverlap(rect,oval);
//        drawPanel.add(rect);

//        circle.setColor(Color.green);
        JFrame application  = new JFrame();
//        application.add(polygon);
        application.add(drawPanel);
//        application.add(rectangle);
        application.setSize(frameWidth,frameHeight);
        application.setVisible(true);
        application.setTitle("Shape Assignment 3");
        application.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    }
}
