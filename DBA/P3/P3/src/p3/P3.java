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

// java -cp jade.jar jade.Boot -name dba_server -gui

public class P3 {

    private static AgentController agenteController;
    private static AgentController elfoController;
    private static AgentController santaController;
    private static AgentController rudolphController;

    public static void main(String[] args) throws StaleProxyException {
        jade.core.Runtime rt = jade.core.Runtime.instance();
        
        Profile p = new ProfileImpl();
        
        p.setParameter(Profile.MAIN_HOST, "localhost");
        p.setParameter(Profile.CONTAINER_NAME, "lorena");
        
        ContainerController cc = rt.createAgentContainer(p);
        agenteController = cc.createNewAgent("Agente", "p3.Agente", null);
        agenteController.start();
        AgenteInterface agenteInterface = (AgenteInterface) agenteController.getO2AInterface(AgenteInterface.class);
        agenteInterface.iniciarComportamiento();
        elfoController = cc.createNewAgent("Elfo", "p3.Elfo", null);
        elfoController.start();
        santaController = cc.createNewAgent("Santa", "p3.Santa", null);
        santaController.start();
        rudolphController = cc.createNewAgent("Rudolph", "p3.Rudolph", null);
        rudolphController.start();
        
    }
    
}
