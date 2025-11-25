import java.rmi.*;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Replicas extends UnicastRemoteObject implements Replicas_I {
    private Replicas_I replica;
    private Registry registry;
    private int idReplica;
    private int numReplicas;
    private Map<Integer, Double> registrados = new HashMap<Integer, Double>();  // Id de usuarios registrados y cantidad donada
    private Map<Integer, String> datos = new HashMap<Integer, String>();
    private double subTotal = 0.0;

    public Replicas(String host, int idReplica, int numReplicas) throws RemoteException{
        registry = LocateRegistry.getRegistry(host, 1099);
        this.idReplica = idReplica;
        this.numReplicas = numReplicas;
    }

    @Override
    public double getTotalDonaciones(int id) throws RemoteException, NotBoundException {
        double total = 0.0;

        if(registrados.containsKey(id) && registrados.get(id)>0){
            total = subTotal;

            for (int i=0; i< this.numReplicas; i++){
                if(i!=this.idReplica){
                    replica = (Replicas_I) registry.lookup("Replica"+i);
                    total+=replica.getSubTotalDonaciones();
                }
            }
        }
        return total;
    }

    @Override
    public double getSubTotalDonaciones() throws RemoteException {
        return subTotal;
    }

    @Override
    public Pair<Integer,Boolean> registroCliente(int id, String pswd) throws RemoteException, NotBoundException {

        if (estaRegistrado(id)) {
            return new Pair<>(idReplica, false);
        }

        int replicaRegistro = idReplica;
        for (int i = 0; i < this.numReplicas; i++) {
            if (i!= this.idReplica) {
                Replicas_I replica = (Replicas_I) registry.lookup("Replica" + i);
                if(replica.estaRegistrado(id))
                {
                    return new Pair<>(i, false);
                }
                if (replica.getNumRegistrados() < this.getNumRegistrados()) {
                    replicaRegistro = i;
                }
            }
        }

        if (replicaRegistro!= idReplica) {
            Replicas_I replica = (Replicas_I) registry.lookup("Replica" + replicaRegistro);
            replica.registrar(id, pswd);
        } else {
            registrar(id, pswd);
        }


        return new Pair<Integer,Boolean>(replicaRegistro, true);
    }

    @Override
    public void registrar(int id, String pswd) throws RemoteException {
        this.registrados.put(id, 0.0);
        this.datos.put(id, pswd);
    }

    @Override
    public boolean estaRegistrado(int id) throws RemoteException {
        return registrados.containsKey(id);
    }

    @Override
    public int getNumRegistrados() throws RemoteException {
        return this.registrados.size();
    }

    @Override
    public void donar(int id, double cantidad) throws RemoteException {
        double total = registrados.get(id) + cantidad;
        registrados.put(id, total);
        subTotal+=cantidad;
    }

    @Override
    public List<Integer> getListaDonantes(int id) throws RemoteException, NotBoundException {
        List<Integer> lista = new ArrayList<>();


        if(registrados.containsKey(id) && registrados.get(id)>0){
            for (int i=0; i< this.numReplicas; i++){
                replica = (Replicas_I) registry.lookup("Replica"+i);
                for(Map.Entry<Integer, Double> it : replica.getRegistrados().entrySet()){
                    lista.add(it.getKey());
                }
                
            }
        }

        return lista;
    }

    @Override
    public Map<Integer, Double> getRegistrados() throws RemoteException {
       return registrados;
    }

    @Override
    public Pair<Integer, Boolean> iniciarSesion(int id, String pswd) throws RemoteException, NotBoundException {
        int replicaRegistro = idReplica;
        boolean registrado = this.estaRegistrado(id);

        for (int i = 0 ; i < this.numReplicas && !registrado ; i++) {
            // Comunicarse con el resto de réplicas
            if (i != this.idReplica) {
                replica = (Replicas_I) registry.lookup("Replica" + i);

                // Comprobar si el cliente ya estaba registrado antes
                registrado = replica.estaRegistrado(id);
                
                if (registrado){
                    replicaRegistro = i;
                    registrado = correctPassword(id, pswd);
                }

            }
        }

        if (registrado && replicaRegistro == idReplica) {
            if(this.getDatos().get(id)!= null && this.getDatos().get(id).equals(pswd))
                registrado = true;
            else
                registrado = false;
        }

        return new Pair<Integer,Boolean>(replicaRegistro, registrado);
    }

    @Override
    public boolean haDonado(int id) throws RemoteException, NotBoundException {

        if(registrados.containsKey(id) && registrados.get(id)>0){
            for (int i=0; i< this.numReplicas; i++){
                replica = (Replicas_I) registry.lookup("Replica"+i);
                for(Map.Entry<Integer, Double> it : replica.getRegistrados().entrySet()){
                    //if(it.getKey() instanceof Integer)
                    if(it.getKey()==id)
                        return(it.getValue()>0.0);
                }
                
            }
        }
        return false;
    }

    @Override
    public Map<Integer, String> getDatos() throws RemoteException {
        return datos;
    }

    @Override
    public void modificarPassword(int id, String pswd) throws RemoteException {
        datos.put(id, pswd);
    }

    @Override
    public double getTotalCliente(int id) throws RemoteException {
        return registrados.get(id);
    }

    @Override
    public boolean correctPassword(int id, String pswd) throws RemoteException {
        return (pswd == datos.get(id));
    }

}
