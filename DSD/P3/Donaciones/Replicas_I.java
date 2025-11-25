import java.rmi.NotBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Map;

public interface Replicas_I extends Remote{
    public double getTotalDonaciones(int id) throws RemoteException, NotBoundException;
    public double getTotalCliente(int id) throws RemoteException;
    public double getSubTotalDonaciones() throws RemoteException;
    public Pair<Integer,Boolean> registroCliente(int id, String pswd) throws RemoteException, NotBoundException;
    public Pair<Integer,Boolean> iniciarSesion(int id, String pswd) throws RemoteException, NotBoundException;
    public void registrar(int id, String pswd) throws RemoteException;
    public boolean estaRegistrado(int id) throws RemoteException;
    public int getNumRegistrados() throws RemoteException;
    public void donar(int id, double cantidad) throws RemoteException;
    public List<Integer> getListaDonantes(int id) throws RemoteException, NotBoundException;
    public Map<Integer,Double> getRegistrados() throws RemoteException;
    public Map<Integer,String> getDatos() throws RemoteException;
    public boolean haDonado(int id) throws RemoteException, NotBoundException;
    public void modificarPassword(int id, String pswd) throws RemoteException;
    public boolean correctPassword(int id, String pswd) throws RemoteException;
}
