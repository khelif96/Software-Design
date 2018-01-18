/**
 * Created by mohamed on 7/11/17.
 * File: ShapePositionInterface.java
 */
public interface ShapePositionInterface extends PositionInterface,ShapeInterface {

    Rectangle getBoundingBox();
    boolean doOverlap(Shape shapeA, Shape shapeB);
}
