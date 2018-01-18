import java.awt.*;

/**
 * Created by mohamed on 7/11/17.
 * File: PositionInterface.java
 */
public interface PositionInterface {
    Point getPoint();
    void moveTo(int x, int y);
    double distanceTo(int x, int y);

}
