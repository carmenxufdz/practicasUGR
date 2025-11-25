package p3;

import com.google.gson.annotations.Expose;
import static java.lang.Math.pow;
import static java.lang.Math.sqrt;
import javafx.util.Pair;

public class Entorno {
    @Expose
    private Mapa mapa;
    @Expose
    private int[] posAgente = new int[2];
    @Expose
    private int[] posObjetivo = new int[2];
    // private int[][] recorrido;
    private Agente agente;
  
    public Entorno (String ruta, int filAgente, int colAgente, Agente agente) {
        mapa = new Mapa (ruta);
        // Al inicio por todas las celdas se ha pasado 0 veces
        // recorrido = new int[mapa.getFilas()][mapa.getColumnas()];
        posAgente[0] = filAgente;
        posAgente[1] = colAgente;
        // El agente ya ha estado una vez en la coordenada inicial
        this.agente = agente;
        this.agente.pasarPor(filAgente, colAgente);
        // Al inicio aún no hay objetivo
        posObjetivo[0] = -1;
        posObjetivo[1] = -1;
    }
    
    public Entorno (Mapa m, int filAgente, int colAgente, Agente agente) {
        mapa = m;
        // Al inicio por todas las celdas se ha pasado 0 veces
        // recorrido = new int[mapa.getFilas()][mapa.getColumnas()];
        posAgente[0] = filAgente;
        posAgente[1] = colAgente;
        // El agente ya ha estado una vez en la coordenada inicial
        this.agente = agente;
        this.agente.pasarPor(filAgente, colAgente);
        // Al inicio aún no hay objetivo
        posObjetivo[0] = -1;
        posObjetivo[1] = -1;
    }
      
    
    public void mostrarEntorno() {
        for (int fila=0; fila<mapa.getFilas() ; fila++) {
            for (int columna=0; columna<mapa.getColumnas(); columna++) {
                if (fila==posAgente[0] && columna==posAgente[1])
                    System.out.print("A"); // agente
                else if (fila==posObjetivo[0] && columna==posObjetivo[1])
                    System.out.print("X"); // objetivo
                else if (mapa.getPos(fila, columna)==-1)
                    System.out.print("M"); // muro
                else System.out.print(this.agente.getVeces(fila, columna));
                
                System.out.print("\t");
            }
            System.out.print("\n");
        }
        System.out.print("\n");
    }
    
    public boolean agenteEnMeta() {
        return posAgente[0] == posObjetivo[0] && posAgente[1] == posObjetivo[1];
    }
    
    public Pair<Double, Integer> getEstado (Movimiento mov) {
        // Hay que inicializarlas para que permita hacer calcularDistancia al final
        int fila = -1, columna = -1;
        // =-2 fuera del mapa, =-1 obstáculo, =0 libre
        double estado = -2;
        // En sentido de las agujas del reloj
        switch (mov) {
            case NORTE:
               fila = posAgente[0]-1;
                if (fila > -1) {
                   columna = posAgente[1];
                   estado = mapa.getPos(fila, columna);
                }
                break;
            case NORESTE:
                // Si no se puede norte ni este, no se puede noreste
                if (getEstado(Movimiento.NORTE).getKey() >=0 || getEstado(Movimiento.ESTE).getKey() >=0) {
                   fila = posAgente[0]-1;
                   columna = posAgente[1]+1;
                    if (fila > -1 && columna < mapa.getColumnas()) {
                        estado = mapa.getPos(fila, columna);
                    }
                }
                break;
            case ESTE:
               columna = posAgente[1]+1;
                if (columna < mapa.getColumnas()) {
                   fila = posAgente[0];
                   estado = mapa.getPos(fila, columna);
                }
                break;
            case SURESTE:
                // Si no se puede sur ni este, no se puede sureste
                if (getEstado(Movimiento.SUR).getKey() >=0 || getEstado(Movimiento.ESTE).getKey() >=0) {
                   fila = posAgente[0]+1;
                   columna= posAgente[1]+1;
                    if (fila < mapa.getFilas() && columna < mapa.getColumnas()) {
                        estado = mapa.getPos(fila, columna);
                    }
                }
                break;
            case SUR:
               fila = posAgente[0]+1;
                if (fila < mapa.getFilas()) {
                   columna = posAgente[1];
                   estado = mapa.getPos(fila, columna);
                }
                break;
            case SUROESTE:
                // Si no se puede sur ni oeste, no se puede suroeste
                if (getEstado(Movimiento.SUR).getKey() >=0 || getEstado(Movimiento.OESTE).getKey() >=0) {
                   fila = posAgente[0]+1;
                   columna = posAgente[1]-1;
                    if (fila < mapa.getFilas() && columna > -1) {
                        estado = mapa.getPos(fila, columna);
                    }
                }
                break;
            case OESTE:
               columna = posAgente[1]-1;
                if (columna > -1) {
                   fila = posAgente[0];
                   estado = mapa.getPos(fila, columna);
                }
                break;
            case NOROESTE:
                // Si no se puede norte ni oeste, no se puede noroeste
                if (getEstado(Movimiento.NORTE).getKey() >=0 || getEstado(Movimiento.OESTE).getKey() >=0) {
                   fila = posAgente[0]-1;
                   columna = posAgente[1]-1;
                    if (fila > -1 && columna > -1) {
                        estado = mapa.getPos(fila, columna);
                    }
                }
                break;
        }
        
        int veces = 0;
        // Celda libre
        if (estado == 0) {
            // Se le añade el coste de la distancia
            estado = calcularDistancia(fila, columna);     
            veces += this.agente.getVeces(fila, columna);
        }
        
        return new Pair<>(estado, veces);
    }
    
    private double calcularDistancia (int x, int y) {
        // Distancia Euclidiana
        return sqrt(pow(x-posObjetivo[0],2) + pow(y-posObjetivo[1],2));
        
        //Distancia Manhattan
        //return abs(x-posObjetivo[0]) + abs(y-posObjetivo[1]);
    }
    
    public double getDistanciaActual(){
        return calcularDistancia(posAgente[0], posAgente[1]);
    }
    
    public void moverAgente(Movimiento mov) {
        // En sentido de las agujas del reloj
        switch (mov) {
            case NORTE:
                posAgente[0]--;
                break;
            case NORESTE:
                posAgente[0]--;
                posAgente[1]++;
                break;
            case ESTE:
                posAgente[1]++;
                break;
            case SURESTE:
                posAgente[0]++;
                posAgente[1]++;
                break;
            case SUR:
                posAgente[0]++;
                break;
            case SUROESTE:
                posAgente[0]++;
                posAgente[1]--;
                break;
            case OESTE:
                posAgente[1]--;
                break;
            case NOROESTE:
                posAgente[0]--;
                posAgente[1]--;
                break;
        }
        this.agente.pasarPor(posAgente[0], posAgente[1]);
    }
    
    public int getFilas(){
        return mapa.getFilas();
    }
    
    public int getColumnas(){
        return mapa.getColumnas();
    }
    
    public void setObjetivo (int f, int c) {
        posObjetivo[0] = f;
        posObjetivo[1] = c;
    }
    
    public void desbloquearMapa() {
        for (int fila = 0; fila < mapa.getFilas(); fila++) {
            for (int columna = 0; columna < mapa.getColumnas(); columna++) {
                if (mapa.getPos(fila, columna) != -1)
                    this.agente.desbloquearCasilla(fila, columna);
            }
        }
    }
    
    public void setPosAgente(int x, int y) {
        posAgente[0] = x;
        posAgente[1] = y;
    }
    
    public int[] getPosAgente() {
        return new int[] {posAgente[0], posAgente[1]};
    }
    
    public int[] getPosObjetivo() {
        return new int[] {posObjetivo[0], posObjetivo[1]};
    }
   
}


