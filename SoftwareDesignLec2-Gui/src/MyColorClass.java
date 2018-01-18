/**
 * Created by mohamed on 6/8/17.
 */
public class MyColorClass {
    private int r;
    private int g;
    private int b;
    private String rgb;

    public static void main(String[] args) {
        Color(255,0,0);
        System.out.println(getARGB());
    }
    public static void Color(int r, int g, int b){
        this.r = r;
        this.g = g;
        this.b = b;
        this.rgb = "(" + r + "," + g + "," + b + ")";
    }
    public staticint getARGB(){
        return (this.r<<16) & 0X00FF0000;  // Bitwise Shift & is the Bitwase AND Operation Shifting Bits to position FF
    }
}
