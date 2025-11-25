import java.rmi.RemoteException;
import java.util.List;
import java.rmi.NotBoundException;
import java.rmi.Remote;

public interface Donaciones_I extends Remote{
    public double getTotalDonaciones(int id) throws RemoteException, NotBoundException;
    public double getTotalCliente(int id) throws RemoteException;
    public Pair<Integer,Boolean> registroCliente(int id, String pswd) throws RemoteException, NotBoundException;
    public Pair<Integer,Boolean> iniciarSesion(int id, String pswd) throws RemoteException, NotBoundException;
    public void donar(int id, double cantidad) throws RemoteException;
    public List<Integer> getListaDonantes(int id) throws RemoteException, NotBoundException;
    public int getNumRegistrados() throws RemoteException, NotBoundException;
    public boolean haDonado(int id) throws RemoteException, NotBoundException;
    public void modificarPassword(int id, String pswd) throws RemoteException;
    public boolean correctPassword(int id, String pswd) throws RemoteException;
}
