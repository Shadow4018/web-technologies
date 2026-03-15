import java.util.ArrayList;
import java.util.List;

public class task6 {

static abstract class Shape {
    public abstract double getAr();
}

static class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double getAr() {
        return Math.PI * radius * radius;
    }

    @Override
    public String toString() {
        return "Circle(radius=" + radius + ")";
    }
}

static class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getAr() {
        return width * height;
    }

    @Override
    public String toString() {
        return "Rectangle(" + width + "x" + height + ")";
    }
}

    public static double calculateArea(List<? extends Shape> shapes) {
        double total = 0.0;
        for (Shape shape : shapes) {
            total += shape.getAr();
        }
        return total;
    }
    public static void main(String[] args) {

        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle(2));          
        shapes.add(new Rectangle(3, 4));      
        shapes.add(new Circle(1.5));        

        System.out.println("Shapes list: " + shapes);

        double totalArea = calculateArea(shapes);
        System.out.println("Total area: " + totalArea);
    }
}