import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.Scanner;

public class Cliente {

    private int replica;

    public Cliente(int replica){
        this.replica = replica;
    }
    public static void main(String args[]) {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try{
            String host = "localhost";
            int replica = 0;
            Scanner scanner = new Scanner(System.in);
            int opcion;
            boolean registrado = false;
            int idUsuario;
            String pswd;

            
            
            Registry registry = LocateRegistry.getRegistry(host, 1099);

            
            System.out.println("=====BIENVENIDO=====");
            System.out.println("\t1. Nuevo Usuario");
            System.out.println("\t2. Iniciar Sesion");
            System.out.println("\t0. Salir");
            opcion = scanner.nextInt();
            
            if(opcion!=0 && (opcion==1 || opcion==2)){
                System.out.println("Introduzca su ID de usuario: ");
                idUsuario = scanner.nextInt();
                scanner.nextLine();
                
                System.out.println("Introduzca su contraseña: ");
                pswd = scanner.nextLine();

                Donaciones_I local = (Donaciones_I) registry.lookup("Replica" + 0 + "Donaciones");
                Pair<Integer, Boolean> respuesta;
                switch(opcion){
                    case 1:
                        respuesta = local.registroCliente(idUsuario, pswd);
                        replica = respuesta.getFirst();
                        
                        if (respuesta.getSecond())
                            registrado = true;
                        else{
                            do{
                                System.out.println("Nombre de usuario ya registrado, elija uno diferente: ");
                                idUsuario = Integer.parseInt(scanner.nextLine());
                                respuesta = local.registroCliente(idUsuario, pswd);
                                replica = respuesta.getFirst();
                                if (respuesta.getSecond())
                                    registrado = true;
                            }while(!registrado);
                        }

                    break;

                    case 2:
                        respuesta = local.iniciarSesion(idUsuario, pswd);
                        replica = respuesta.getFirst();

                        do{
                            if (respuesta.getSecond())
                                registrado = true;
                            else {
                                System.out.println("Datos incorrectos, vuelva a introducirlos.\n");
                                
                                System.out.println("Introduzca su ID de usuario: ");
                                idUsuario = scanner.nextInt();
                                scanner.nextLine();
                                
                                System.out.println("Introduzca su contraseña: ");
                                pswd = scanner.nextLine();

                                respuesta = local.iniciarSesion(idUsuario,pswd);
                                replica = respuesta.getFirst();
                                
                                if (respuesta.getSecond())
                                    registrado = true;
                            }
                        }while(!registrado);

                    break;
                }
                local = (Donaciones_I) registry.lookup("Replica" + replica + "Donaciones");

                System.out.println("ID: " + idUsuario);
                System.out.println("Servidor asignado: " + replica);

                do{
                    System.out.println("=====Siguiente Accion=====");
                    System.out.println("\t1. Donar");
                    System.out.println("\t2. Consultar total donado");
                    System.out.println("\t3. Consultar total donado cliente");
                    System.out.println("\t4. Consultar listado de donantes");
                    System.out.println("\t5. Modificar Contraseña");
                    System.out.println("\t0. Salir");
                    opcion = scanner.nextInt();

                    switch(opcion) {
                        case 1:
                            double cantidad;
                            System.out.println("Introduzca la cantidad que desea donar");
                            cantidad = scanner.nextDouble();
                            local.donar(idUsuario, cantidad);
                        break;
                        case 2:
                            if(local.haDonado(idUsuario)){
                                System.out.println("Recaudaciones totales: " + local.getTotalDonaciones(idUsuario) + "\n");
                            }
                            else{
                                System.out.println("Para consultar las recaudaciones totales primero debe donar.\n");
                            }
                        break;
                        case 3:
                            if(local.haDonado(idUsuario)){
                                System.out.println("Recaudaciones individuales: " + local.getTotalCliente(idUsuario) + "\n");
                            }
                            else{
                                System.out.println("Para consultar las recaudaciones individuales primero debe donar.\n");
                            }
                        break;
                        case 4:
                            if(local.haDonado(idUsuario)){
                                System.out.println("Listado donantes: " + local.getListaDonantes(idUsuario));
                            }
                            else{
                                System.out.println("Para consultar la lista de donantes primero debe donar.\n");
                            }
                        break;
                        case 5:
                            scanner.nextLine();
                            System.out.println("Introduzca su nueva contraseña: ");
                            pswd = scanner.nextLine();
                            local.modificarPassword(idUsuario, pswd);
                            
                        break;
                    }
                }while(opcion != 0);

            }

            
        } 
        catch(NotBoundException | RemoteException e) {
            System.err.println("Exception del sistema: " + e);
        }

        System.exit(0);
        
    }
}