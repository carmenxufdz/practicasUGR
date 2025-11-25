package p3;

import jade.core.Agent;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import javafx.util.Pair;

/**
 *
 * @author Usuario
 */
public class Agente extends Agent implements AgenteInterface {
    private int energia;
    private ArrayList<Movimiento> sensores;
  
    private int fila_incial = 9;
    private int columna_inicial = 9;
    private int fila_final = 0;
    private int columna_final = 0;
    
    private double distancia_actual;
    
    private Map<List<Integer>, Integer> memoria = new HashMap<>();;
    private Stack<int[]> camino = new Stack<>();;
    
    public boolean misionCompletada, soyMalo, codigoIncorrecto;
            
    private Entorno entorno;
    private Comportamiento comportamiento;
    
    public int usadas = 0;
    public static boolean inicioSanta = true;
    
    public Agente(){
        registerO2AInterface(AgenteInterface.class, this);
    }
    
    @Override
    protected void setup() {
        System.out.println("Agente iniciado.");
        
        energia = 0; 
        sensores = new ArrayList<>();
        sensores.add(Movimiento.NORTE);
        sensores.add(Movimiento.NORESTE);
        sensores.add(Movimiento.ESTE);
        sensores.add(Movimiento.SURESTE);
        sensores.add(Movimiento.SUR);
        sensores.add(Movimiento.SUROESTE);
        sensores.add(Movimiento.OESTE);
        sensores.add(Movimiento.NOROESTE);
        
        misionCompletada = false;
        soyMalo = false;
        codigoIncorrecto = false;
        
        entorno = new Entorno (new Mapa ("./maps/100x100-sinObstaculos.txt"), 9, 9, this);
        
        //entorno.desbloquearMapa();
        
        //entorno = new Entorno (new Mapa ("./maps/mapWithVerticalWall.txt"), 9, 9, 7, 3);
        //entorno = new Entorno (new Mapa ("./maps/mapWithHorizontalWall.txt"), 9, 5, 3, 5);
        //entorno = new Entorno (new Mapa ("./maps/mapWithDiagonalWall.txt"), 9, 9, 0, 9);
        //entorno = new Entorno (new Mapa ("./maps/mapWithComplexObstacle1.txt"), 9, 6, 5, 6);
        //entorno = new Entorno (new Mapa ("./maps/mapWithComplexObstacle2.txt"), 9, 6, 3, 6);
        //entorno = new Entorno (new Mapa ("./maps/mapWithComplexObstacle3.txt"), 6, 6, 9, 4);
        //entorno = new Entorno (new Mapa ("./maps/mapaGrande.txt"), 29, 14, 15, 14);
        
        setEnabledO2ACommunication(true, 10);
    }
    
    public void setDistanciaActual(){
        distancia_actual = entorno.getDistanciaActual();
    }
    
    public double getDistanciaActual(){
        return distancia_actual;
    }
    
    @Override
    public void takeDown() {
        System.out.println("Terminating Agente...");
    }
    
    public ArrayList<Movimiento> getMovs() {
        return sensores;
    }
    
    public void mover() {
        energia++;
        System.out.println("Energia consumida: " + energia);
        System.out.println("Casillas desbloqueadas: " + memoria.size());
    }
    
    public void pasarPor(int f, int c) {
        // recorrido[f][c]++;
        if (memoria.containsKey(Arrays.asList(f, c))){
            memoria.put(Arrays.asList(f, c), memoria.get(Arrays.asList(f, c)) + 1);
        } else {
            if (entorno != null) {
                int[] posicion;
                Pair<Double, Integer> estado;
                for (int i=0; i<sensores.size(); i++) {
                    posicion = getPosicion(sensores.get(i));
                    estado = entorno.getEstado(sensores.get(i));
                    if (estado.getKey() > 0) {
                        memoria.put(Arrays.asList(posicion[0], posicion[1]), estado.getValue());
                    }
                }
            }  
            memoria.put(Arrays.asList(f, c), 1);
        }
    }
    
    public void desbloquearCasilla(int f, int c) {
        if (memoria.containsKey(Arrays.asList(f, c))){
            memoria.put(Arrays.asList(f, c), memoria.get(Arrays.asList(f, c)) + 1);
        } else {
            memoria.put(Arrays.asList(f, c), 1);
        }
    }
    
    public int getVeces (int f, int c) {
        // return recorrido[f][c];
        int veces = 0;
        if (memoria.containsKey(Arrays.asList(f, c))) veces = memoria.get(Arrays.asList(f, c));
        return veces;
    }
    
    public void resetVeces () {
        for (Map.Entry<List<Integer>, Integer> entry : memoria.entrySet()) {
            entry.setValue(0);
        }
    }
    
    public void calcularCamino() {
        int [] posAgente = entorno.getPosAgente();
        int [] posObjetivo = entorno.getPosObjetivo();
        // Map<posición, [coste, fila-padre, columna-padre]>
        Map<List<Integer>, int[]> visitados = new HashMap<>();
        Map<List<Integer>, int[]> abiertos = new HashMap<>();
        // Para ir almacenando el actual visitado
        List<Integer> visitado;
        // Para ir almacenando el padre del visitado
        List<Integer> padre;
        // Para controlar si se abren nuevos nodos
        boolean abren = false;
        // Para tener los abiertos ordenados por coste e ir visitando los de menor coste, se diseña una "cola de prioridad"
        List<Map.Entry<List<Integer>, int[]>> abiertosPrioQueue = new ArrayList<>(abiertos.entrySet());
        // Para almacenar las entradas de la cola
        Map.Entry<List<Integer>, int[]> entrada;
        // En principio, el coste será el número de casillas para llegar a la objetivo
        int coste = 0;
        
        // El primero que se visita es el origen
        visitado = Arrays.asList(posAgente[0], posAgente[1]);
        // El origen es su propio padre
        padre = visitado;
        // Se realiza hasta que se llega al objetivo
        while (!(visitado.get(0) == posObjetivo[0] && visitado.get(1) == posObjetivo[1])) {
            visitados.put(visitado, new int[] {coste, padre.get(0), padre.get(1)});
            // Se abren las posiciones vecinas que se hayan visitado anteriormente
            for (int fila = visitado.get(0)-1; fila <= visitado.get(0)+1; fila++) // Recorrer casillas colindantes según fila
                for (int columna = visitado.get(1)-1; columna <= visitado.get(1)+1; columna++) // Recorrer casillas colindantes según columna
                    // Comprobar si la casilla colindante a la posición analizada se ha recorrido anteriormente
                    if (memoria.containsKey(Arrays.asList(fila, columna))) { 
                        // Comprobar si la casilla colindante se ha abierto anteriormente
                        if (abiertos.containsKey(Arrays.asList(fila, columna))) {
                            // Si se ha abierto anteriormente, se actualiza con el padre que tenga menor coste
                            if (abiertos.get(Arrays.asList(fila, columna))[0] > coste) {
                                abiertos.put(Arrays.asList(fila, columna), new int[]{coste, visitado.get(0), visitado.get(1)});
                                abren = true;
                            }
                        }
                        // Si no se ha abierto anteriormente
                        else {
                            // Se comprueba si se ha visitado anteriormente
                            if (visitados.containsKey(Arrays.asList(fila, columna))) {
                                // Si se ha visitado anteriormente, se actualiza con el padre que tenga menor coste
                                if (visitados.get(Arrays.asList(fila, columna))[0] > coste) {
                                    visitados.put(Arrays.asList(fila, columna), new int[]{coste, visitado.get(0), visitado.get(1)});
                                }
                            }
                            // Si no se ha visitado anteriormente, se abre con el coste actual
                            else {
                                abiertos.put(Arrays.asList(fila, columna), new int[]{coste, visitado.get(0), visitado.get(1)});
                                abren = true;
                            }

                        }
                    }

            // Si se abren nuevos, se actualiza la cola
            if (abren) {
                abiertosPrioQueue = new ArrayList<>(abiertos.entrySet());
                abiertosPrioQueue.sort(Comparator.comparingInt(entry -> entry.getValue()[0]));
                abren = false;
            }

            // Se obtiene la siguiente posición a visitar
            entrada = abiertosPrioQueue.get(0);
            List<Integer> clave = entrada.getKey();
            int[] valor = entrada.getValue();

            // Asignar la posición a visitado
            visitado = clave;
            // Asignar el padre
            padre = Arrays.asList(valor[1], valor[2]);
            // El coste del hijo es uno más que el del padre
            coste = valor[0] + 1;
            // Añadirla a visitados
            visitados.put(clave, valor);
            // Eliminarla de abiertos
            abiertos.remove(clave);
            abiertosPrioQueue.remove(0);
        }
        
        // Cuando se llegue al objetivo
        // El último paso es la primera inserción en la pila
        List<Integer> posActual = Arrays.asList(posObjetivo[0], posObjetivo[1]);
        // Se van añadiendo los padres de cada nodo hasta el inicial
        while (!posActual.equals(Arrays.asList(posAgente[0], posAgente[1]))) {
            camino.push(new int[] {posActual.get(0), posActual.get(1)});
            int[] info = visitados.get(posActual);
            posActual = Arrays.asList(info[1], info[2]);
        }
        // Finalmente, se añade el inicial
        // camino.push(new int[] {posAgente[0], posAgente[1]});
        
        usadas++;
    }
    
    public boolean hayCamino() {
        return !camino.isEmpty();
    }
    
    public void seguirCamino() {
        int[] paso = camino.pop();
        entorno.setPosAgente(paso[0], paso[1]);
        pasarPor(paso[0], paso[1]);
    }
    
    public boolean visitadaAnteriormente(int f, int c) {
        return memoria.containsKey(Arrays.asList(f, c));
    }
    
    public int[] getPosicion(Movimiento mov) {
        int[] pos = entorno.getPosAgente();
        switch (mov) {
            case NORTE:
                pos[0]--;
                break;
            case NORESTE:
                pos[0]--;
                pos[1]++;
                break;
            case ESTE:
                pos[1]++;
                break;
            case SURESTE:
                pos[0]++;
                pos[1]++;
                break;
            case SUR:
                pos[0]++;
                break;
            case SUROESTE:
                pos[0]++;
                pos[1]--;
                break;
            case OESTE:
                pos[1]--;
                break;
            case NOROESTE:
                pos[0]--;
                pos[1]--;
                break;
        }
        return pos;
    }
    
    // Implementación de la interfaz para iniciar el comportamiento
    @Override
    public void iniciarComportamiento() {

        entorno.mostrarEntorno();
        
        comportamiento = new Comportamiento(entorno, this);
        addBehaviour(comportamiento);
    }

    @Override
    public String next() {
        comportamiento.next();
        while (comportamiento.next) {
            try {
                // Espera un momento
                Thread.sleep(100);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        return comportamiento.getMessage();
    }

    @Override
    public String Energia() {
        return "Energia:" + this.energia;
    }

    @Override
    public Entorno getEntorno() {
        return entorno;
    }

    
}