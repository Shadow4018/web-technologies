import java.util.*;
public class task8 {

static abstract class Animal {
    public abstract void makeSound();
}

static class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog: Woof!");
    }
}

static class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat: Meow!");
    }
}

static class Labrador extends Dog {
    @Override
    public void makeSound() {
        System.out.println("Labrador: Woof! I'm friendly!");
    }
}

static class AnimalShltr {

    private List<Dog> dogs;
    private List<Animal> others;

    public AnimalShltr() {
        dogs = new ArrayList<>();
        others = new ArrayList<>();
    }

    public void AddAnimals(Dog dog) {
        dogs.add(dog);
    }

    public void AddAnimalsOther(Animal animal) {
        if (!(animal instanceof Dog)) {
            others.add(animal);
        } else {
            System.out.println("Use AddAnimals() for dogs!");
        }
    }

    public void printAnimalSunds() {
        System.out.println("Dogs:");
        for (Dog dog : dogs) {
            dog.makeSound();
        }
        System.out.println("Other animals:");
        for (Animal animal : others) {
            animal.makeSound();
        }
    }
}

    public static void main(String[] args) {

        Dog dog1 = new Dog();
        Cat cat1 = new Cat();
        Labrador lab1 = new Labrador();

        AnimalShltr shelter = new AnimalShltr();

        shelter.AddAnimals(dog1);
        shelter.AddAnimals(lab1);

        shelter.AddAnimalsOther(cat1);

        shelter.printAnimalSunds();
    }
}