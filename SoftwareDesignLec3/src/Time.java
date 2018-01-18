/**
 * Created by mohamed on 6/13/17.
 */
public class Time {
    // Instance variables
    private int hours;
    private int minutes;
    private int seconds;
    // Constructors
    public Time(){
        this(0,0,0);
    }
    public Time(int hours){
        this(hours,0,0);
    }
    public Time(int hours, int minutes){
        this(hours,minutes,0);
    }
    public Time(int hours,int minutes,int seconds){
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }


}
