/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package p3;

import jade.core.Profile;
import jade.core.ProfileImpl;
import jade.wrapper.AgentController;
import jade.wrapper.ContainerController;
import jade.wrapper.StaleProxyException;
import java.util.Scanner;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author carmenxufdz
 */
public class P3interface {
    private static AgentController agenteController;
    private static AgentController elfoController;
    private static AgentController santaController;
    private static AgentController rudolphController;
    private static Socket clientSocket;
    private static Entorno entorno;
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws StaleProxyException, InterruptedException{
        try{
            // TODO code application logic here
            jade.core.Runtime rt = jade.core.Runtime.instance();

            Profile p = new ProfileImpl();

            p.setParameter(Profile.MAIN_HOST, "localhost");
            p.setParameter(Profile.CONTAINER_NAME, "lorena");

            ContainerController cc = rt.createAgentContainer(p);
            agenteController = cc.createNewAgent("Agente", "p3.Agente", null);
            agenteController.start();
            AgenteInterface agenteInterface = (AgenteInterface) agenteController.getO2AInterface(AgenteInterface.class);
            elfoController = cc.createNewAgent("Elfo", "p3.Elfo", null);
            elfoController.start();
            santaController = cc.createNewAgent("Santa", "p3.Santa", null);
            santaController.start();
            rudolphController = cc.createNewAgent("Rudolph", "p3.Rudolph", null);
            rudolphController.start();
            // Inicia el servidor de conexión con Godot
            startServer();
        } catch (IOException e) {
            System.out.println("Error al iniciar el servidor.");
            e.printStackTrace();
        }
    }
    
    private static void startServer() throws IOException, InterruptedException {
        try (ServerSocket serverSocket = new ServerSocket(5000)) {
            System.out.println("Servidor iniciado en el puerto 5000. Esperando conexiones...");
            while (true) {
                try {
                    clientSocket = serverSocket.accept();  // Esto debería bloquear la ejecución hasta que un cliente se conecte
                    System.out.println("Cliente conectado desde: " + clientSocket.getInetAddress().getHostAddress());

                    try (PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {

                        System.out.println("Conexion aceptada, esperando comandos...");

                        String inputLine;
                        while ((inputLine = in.readLine()) != null) {
                            System.out.println("Comando recibido: '" + inputLine.trim() + "'");
                            String response = processCommand(inputLine.trim());
                            
                            out.println(response);  // Enviar respuesta

                            if ("exit".equalsIgnoreCase(inputLine.trim())) {
                                break;
                            }
                        }
                    } catch (IOException e) {
                        System.out.println("Error al leer del cliente");
                        e.printStackTrace();
                    }
                } catch (IOException e) {
                    System.out.println("Error al aceptar conexión");
                    e.printStackTrace();
                }
            }
        }
    }
    
        private static String processCommand(String command) throws InterruptedException {
        switch (command) {
            case "START":
                iniciarAgente();
                return "ELFO-AGENTE: ¿Serías voluntario para completar la misión de salvar la Navidad?";
            case "STEP":
                return next();
            case "EXIT":
                // crearAgente();
                return "Terminado";
            default:
                return "Comando desconocido";
        }
    }

    private static void iniciarAgente() throws InterruptedException {
        try {
            // Intentar obtener la interfaz O2A
            AgenteInterface agenteInterface = (AgenteInterface) agenteController.getO2AInterface(AgenteInterface.class);

            if (agenteInterface != null) {
                agenteInterface.iniciarComportamiento();
                getEntorno();
            } else {
                System.out.println("Error: La interfaz del agente es null. El agente podría no estar completamente inicializado.");
            }
        } catch (StaleProxyException ex) {
            Logger.getLogger(P3interface.class.getName()).log(Level.SEVERE, null, ex);
        }
            
    }
    
    private static String next(){
        try {
            if (agenteController != null) {
                // Llama al método para establecer el mapa en el agente
                String message = agenteController.getO2AInterface(AgenteInterface.class).next();
                System.out.println(message);
                if(message == "NEXT")
                {
                    getEntorno();
                    String energia = (agenteController.getO2AInterface(AgenteInterface.class).Energia());
                    return energia;
                }
                else{
                    return message;
                }

            } else {
                return "Agente no iniciado. Usa el comando 'INICIAR' primero.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al cargar el mapa.";
        }
    }
    
    private static void getEntorno(){
        try {
            if (agenteController != null) {
                // Llama al método para establecer el mapa en el agente
                entorno = agenteController.getO2AInterface(AgenteInterface.class).getEntorno();
                Serializador.serializarEntorno(entorno, "./json/entorno.json");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
