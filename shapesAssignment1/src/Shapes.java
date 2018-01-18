import javax.swing.JPanel;
import java.awt.*;
import java.util.Random;

/**
 * Created by mohamed on 6/10/17.
 */
public class Shapes extends JPanel {
    // Private member variables for panel
   private int frameHeight;
   private int frameWidth;

    // Constructor
   public Shapes(int frameWidth,int frameHeight){
       this.frameWidth = frameWidth;
       this.frameHeight = frameHeight;
   }

   // Paints a Centered Circle of Color c and radius
   public void paintCircle(Graphics g, Color c, int radius){
       g.setColor(c);
       g.fillOval(((this.frameWidth/2)-radius),((this.frameHeight/2)-radius), radius*2,radius*2);

   }


   public void paintPentagon(Graphics g,  Polygon pentagon, Color color){
       g.setColor(color);
       g.fillPolygon(pentagon);
   }

    // Generates the vertices for a centered multi sided polygon
   public Polygon generateVertices(int sides, int radius){
       Polygon temp = new Polygon();
       int x = this.frameWidth/2;
       int y = this.frameHeight/2;
       for(int i = 0; i < sides; i++) {
           int xCoord = (int)(x + (Math.sin(2 * Math.PI * i / sides) * radius));
           int yCoord = (int)(y - (Math.cos(2 * Math.PI * i / sides) * radius));
           temp.addPoint(xCoord,yCoord);
       }
       return temp;
   }

   public void paintComponent(Graphics g){
       super.paintComponent(g);
       Random rand = new Random();
       int radius = 0;
       if(this.frameWidth > this.frameHeight){
           radius = this.frameHeight/2;
       }else{
           radius = this.frameWidth/2;
       }
       float r,gr,b;
       for(int i = 0; i<3; i++) {
           // Generate 3 Random Colors
           r = rand.nextFloat();
           gr = rand.nextFloat();
           b = rand.nextFloat();
           Color c = new Color(r, gr, b);
           paintCircle(g, c, radius);
           r = rand.nextFloat();
           gr = rand.nextFloat();
           b = rand.nextFloat();
           c = new Color(r,gr,b);
           Polygon pentagon = generateVertices(5,radius);
           paintPentagon(g,pentagon,c);
           radius = radius - radius/pentagon.npoints; // Calculate the radius of the next circle
       }
       // Draw central white Circle
       g.setColor(Color.white);
       g.fillOval((this.frameWidth/2)-radius,(this.frameHeight/2)-radius, radius*2,radius*2);

       // Draw horizontal and vertical Lines
       g.setColor(Color.black);
       g.drawLine(0,0,frameWidth,frameHeight);
       g.drawLine(frameWidth,0,0,frameHeight);

   }

}

