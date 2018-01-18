import javax.swing.*;
import javax.swing.border.Border;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * Created by mohamed on 7/16/17.
 * File: PieChartTest.java
 */
public class PieChartTest {
    private static JFrame frame;
    private static JLabel headerLabel;
    private static JLabel EnterNLabel;
    private static JTextArea NInput;
    private static JButton submitButton;
    private static JPanel controlPanel;
    private static void prepareGUI(JComponent chart){
        frame = new JFrame("Pie Chart");
        frame.setSize(500,500);
        frame.setLayout(new BorderLayout(10,10));
        frame.addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent windowEvent){
                System.out.println("GOODBYE");
                System.exit(0);
            }
        });

//        headerLabel = new JLabel("PieChart",JLabel.CENTER);
//        frame.add(headerLabel,BorderLayout.NORTH);

//        frame.add(controlPanel,BorderLayout.NORTH);
//        frame.add(submitButton,BorderLayout.LINE_END);
        frame.add(chart,BorderLayout.CENTER);
        frame.setVisible(true);
    }

    public static void main(String[] argv) {
        Slice slice = new Slice(25,"A");
//        HistogramLetters histogramLetters = new HistogramLetters("etc/Emma.txt");
        PieChart pieChart = new PieChart();
        pieChart.addSlice(slice);
        slice = new Slice(25,"B");
        pieChart.addSlice(slice);
        slice = new Slice(25,"C");
        pieChart.addSlice(slice);
        slice = new Slice(25,"D");
        pieChart.addSlice(slice);
        slice = new Slice(25,"C");
        pieChart.addSlice(slice);
        slice = new Slice(25,"D");
        pieChart.addSlice(slice);
        slice = new Slice(25,"C");
        pieChart.addSlice(slice);
        slice = new Slice(25,"D");
        pieChart.addSlice(slice);
        slice = new Slice(25,"C");
        pieChart.addSlice(slice);
        slice = new Slice(25,"D");
        pieChart.addSlice(slice);
//        drawControlPanel();
        prepareGUI(pieChart);
        draw();

    }
    public static void drawControlPanel(){
        NInput = new JTextArea();
        controlPanel = new JPanel();
        controlPanel.setLayout(new BorderLayout(10,10));
        submitButton = new JButton("Submit");
//        controlPanel = new JPanel(new BorderLayout(5,5));
        JPanel panel = new JPanel();
        panel.setBackground(Color.WHITE);
        panel.add(NInput,BorderLayout.NORTH);
        panel.add(submitButton,BorderLayout.CENTER);
        controlPanel.add(panel);
        frame.setVisible(true);
    }
    public static void draw(){
        headerLabel.setText("Pie Chart");
        JPanel panel = new JPanel();
        panel.setSize(300,300);
        BorderLayout layout = new BorderLayout(10,10);
        panel.setLayout(layout);
        panel.setVisible(true);
    }

}
