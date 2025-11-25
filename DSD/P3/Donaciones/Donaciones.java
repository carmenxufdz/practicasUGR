import java.rmi.*;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class Donaciones extends UnicastRemoteObject implements Donaciones_I {
    Registry registry;
    Replicas replica;

    public Donaciones(String host, Replicas replica) throws RemoteException {
        //registry = LocateRegistry.getRegistry(host, 1099);
        this.replica = replica;
    }

    @Override
    public double getTotalDonaciones(int id) throws RemoteException, NotBoundException {
        return replica.getTotalDonaciones(id);
    }

    @Override
    public void donar(int id, double cantidad) throws RemoteException {
        replica.donar(id, cantidad);
    }

    @Override
    public Pair<Integer,Boolean> registroCliente(int id, String pswd) throws RemoteException, NotBoundException {
        return replica.registroCliente(id, pswd);
    }

    @Override
    public List<Integer> getListaDonantes(int id) throws RemoteException, NotBoundException {
        return replica.getListaDonantes(id);
    }

    @Override
    public int getNumRegistrados() throws RemoteException, NotBoundException {
        return replica.getNumRegistrados();
    }

    @Override
    public Pair<Integer, Boolean> iniciarSesion(int id, String pswd) throws RemoteException, NotBoundException {
        return replica.iniciarSesion(id, pswd);
    }

    @Override
    public boolean haDonado(int id) throws RemoteException, NotBoundException {
        return replica.haDonado(id);
    }

    @Override
    public void modificarPassword(int id, String pswd) throws RemoteException {
        replica.modificarPassword(id, pswd);
    }

    @Override
    public double getTotalCliente(int id) throws RemoteException {
        return replica.getTotalCliente(id);
    }

    @Override
    public boolean correctPassword(int id, String pswd) throws RemoteException {
        return replica.correctPassword(id, pswd);
    }
}
