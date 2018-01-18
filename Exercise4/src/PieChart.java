import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Random;

/**
 * Created by mohamed on 7/15/17.
 * File: PieChart.java
 */
class Slice {
    int value;
    String title;
    double Probability;
    Color color;
//  Slice Constructor
    public Slice(int value,String title) {
        // Assign a random color to each slice
        Random rand = new Random();
        Color c = new Color(rand.nextFloat(),rand.nextFloat(),rand.nextFloat());

        this.value = value;
        this.title = title;
        this.color = c;
    }
}

class PieChart extends JComponent {
    double totalFrequency;
    ArrayList<Slice> slices = new ArrayList<Slice>();
    PieChart() {

    }
    Slice remainingSlice = new Slice(0,"All Other Letters");

    public void addRemainingSlices(Slice slice){
//        totalFrequency += slice.value;
        remainingSlice.value += slice.value;
    }

    public void addSlice(Slice slice){
        this.slices.add(slice);
        totalFrequency += slice.value;
    }

    public void assignProbabilites(){
        addSlice(remainingSlice);
        for (int i = 0; i < slices.size(); i++) {
            slices.get(i).Probability = (slices.get(i).value/totalFrequency);
        }
    }
    public void clear(){
        slices.clear();
        remainingSlice.Probability = 0;


    }
    public void paint(Graphics g) {
//        Generate a bounding box for the pie chart that takes up 1/4 of the panel centered to allow room for text
        int horizontalComponent = (int)getBounds().getWidth()/2;
        int verticalComponent = (int)getBounds().getHeight()/2;
        Rectangle bounds;
        if(horizontalComponent>=verticalComponent) {
            bounds = new Rectangle(horizontalComponent / 2, horizontalComponent / 2, horizontalComponent, horizontalComponent);
        }else{
            bounds = new Rectangle(verticalComponent / 2, verticalComponent / 2, verticalComponent, verticalComponent);
        }
            draw((Graphics2D) g, bounds, slices);
    }

    void draw(Graphics2D g, Rectangle area, ArrayList<Slice> slices) {
        assignProbabilites();

        // Make the circles look nice
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        double total = 0.0D;
        for (int i = 0; i < slices.size(); i++) {
            total += slices.get(i).value;
        }

        double curValue = 0.0D;
        int startAngle = 0;

        for (int i = 0; i < slices.size(); i++) {
            startAngle = (int) (curValue * 360 / total);
            int arcAngle = (int) (slices.get(i).value * 360 / total);

            g.setColor(slices.get(i).color);
            g.fillArc(area.x, area.x, area.width, area.height, startAngle, arcAngle);
//            double innerArcAngle = startAngle/2;
            g.setColor(Color.black);
//            g.drawOval((area.x*2)-50,(area.y*2-50),100,100);

            // Draw the labels terrible implementation can probably be done better
            if(startAngle <= 180){
                // isolate horizontal and vertical components of central angles
                // establish a point in the same trajectory of said angle
                int x = (int)((area.getWidth()+area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2)))));
                int y = (int)(area.getWidth()-area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2))));
                // Create vector components and scale down those points established earlier
                Point a = new Point((int)area.getX()*2,(int)area.getX()*2);
                Point b = new Point(x,y);
                double deltaX = b.getX()-a.getX();
                double deltaY = b.getY() - a.getY();
                double coeff = 0.6;
                a.setLocation(a.getX()+coeff*deltaX,a.getY()+coeff*deltaY);
//                g.drawLine(area.x*2,area.x*2,(int)((area.getWidth()+area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2))))),(int)(area.getWidth()-area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2)))));
                g.drawString(slices.get(i).title + " : " + String.format("%.4f",slices.get(i).Probability),(int)a.getX()-15,(int)a.getY());

            } else if(startAngle< 180 && startAngle < 270){
                int x = (int)(area.getWidth()+(area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2)))));
                int y = (int)(area.getWidth()+area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2))));
                Point a = new Point((int)area.getX()*2,(int)area.getX()*2);
                Point b = new Point(x,y);
                double deltaX = b.getX()-a.getX();
                double deltaY = b.getY() - a.getY();
                double coeff = 0.6;
                a.setLocation(a.getX()+coeff*deltaX,a.getY()+coeff*deltaY);
//                System.out.println(arcAngle);
//                g.drawString(slices.get(i).title,(int)(area.getWidth()+(area.getWidth()*Math.sin(startAngle+(arcAngle/2)))),(int)(area.getWidth()+area.getWidth()*Math.cos(startAngle+(arcAngle/2))));

                g.drawString(slices.get(i).title + " : " + String.format("%.4f",slices.get(i).Probability),(int)a.getX()-15,(int)a.getY());
//                g.drawLine(area.x*2,area.x*2,(int)(area.getWidth()+(area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2))))),(int)(area.getWidth()+area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2)))));

            }else{
                int x = (int)(area.getWidth()+(area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2)))));
                int y = (int)(area.getWidth()-area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2))));
                Point a = new Point((int)area.getX()*2,(int)area.getX()*2);
                Point b = new Point(x,y);
                double deltaX = b.getX()-a.getX();
                double deltaY = b.getY() - a.getY();
                double coeff = 0.6;
                a.setLocation(a.getX()+coeff*deltaX,a.getY()+coeff*deltaY);
                g.drawString(slices.get(i).title + " : " + String.format("%.4f",slices.get(i).Probability),(int)a.getX(),(int)a.getY());
//                g.drawLine(area.x*2,area.x*2,(int)(area.getWidth()+(area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2))))),(int)(area.getWidth()-area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2)))));
            }
//            System.out.println("Iteration: " + i + " Arc Angle " + arcAngle + " Start Angle " + startAngle +  " point X:"+ (int)(area.getWidth()+(area.getWidth()*Math.cos(Math.toRadians(startAngle+(arcAngle/2))))) + " Point Y: " + (int)(area.getWidth()+area.getWidth()*Math.sin(Math.toRadians(startAngle+(arcAngle/2)))) );

            // System.out.println(slices.get(i).title + " innerArcAngle " + innerArcAngle + "cos" + (int)(area.width*Math.cos(innerArcAngle))+ "sin" + (int)(area.width*Math.sin(innerArcAngle)));
            curValue += slices.get(i).value;
        }

//        g.setColor(Color.white);
//        g.draw(area);
//        g.fillOval((area.x*2)-50,(area.y*2-50),100,100);

    }
}

