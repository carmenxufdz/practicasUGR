import java.io.Serializable;

public class Pair<T, U> implements Serializable{
    private static final long serialVersionUID = 1L;
    private T first;
    private U second;

    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return first;
    }

    public U getSecond() {
        return second;
    }
}