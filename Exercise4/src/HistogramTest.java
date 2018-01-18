import javax.swing.*;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/**
 * Created by mohamed on 7/18/17.
 * File: HistogramTest.java
 */
public class HistogramTest {
    public static JPanel panel;
    public static JButton button;
    public static JTextField textField;
    private static void prepareGUI(JComponent chart){
        panel = new JPanel();
        panel.setSize(300,300);
        panel.setLayout(new BorderLayout());

        button = new JButton("Submit");
        textField = new JTextField(5);
        panel.add(textField,BorderLayout.NORTH);
        panel.add(button,BorderLayout.NORTH);
//        headerLabel = new JLabel("PieChart",JLabel.CENTER);
//        frame.add(headerLabel,BorderLayout.NORTH);

//        frame.add(controlPanel,BorderLayout.NORTH);
//        frame.add(submitButton,BorderLayout.LINE_END);
         panel.add(chart,BorderLayout.CENTER);
        panel.setVisible(true);
    }
    public static void main(String[] args) {
        String file = "res/Emma.txt";
        HistogramLetters test = new HistogramLetters(file);
        test.OpenFile();
        test.scanFile();
        test.CloseFile();

        JFrame frame = new JFrame();
        frame.setSize(500,500);
        frame.setTitle("Histogram Pie Chart");
        PieChart pieChart = new PieChart();
        int i = 0;
        System.out.println("Sorted Letters by amount of occurences");
        for(String key: test.sortByValue(test.hashMap).keySet()){
            System.out.println(key + " = " + test.getProbability(key));
            if(i < 26) {
                Slice slice = new Slice(test.hashMap.get(key), key);
                pieChart.addSlice(slice);
                i++;
            }else{
                Slice slice = new Slice(test.hashMap.get(key),key);
                pieChart.addRemainingSlices(slice);
            }
        }
        prepareGUI(pieChart);
//       frame.add(pieChart);
        frame.add(panel);
        frame.setVisible(true);
//        Slice slice =
    }
}
