/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package p3;

import jade.core.Agent;
import jade.core.behaviours.Behaviour;
import jade.lang.acl.ACLMessage;
import java.util.Random;

/**
 *
 * @author Usuario
 */
public class Santa extends Agent {
    public static int fila = 0, columna = 7;
    private Behaviour comportamiento = new Behaviour() {
        boolean finish = false;
        int step = 0;

        ACLMessage msg, reply;

        @Override
        public void action() {
            switch (this.step) {                
                case 0 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("santa-conversation")) {
                        System.out.println("El pana dice a Santa: " + msg.getContent());
                        String response;
                        if ((new Random()).nextInt(5) == 0) {
                            response = "Hyvää joulua. Olet ollut TUHMA, saat muutaman läpsyn. Nähdään pian.";
                            this.finish = true;
                        }
                        else {
                            response = "Hyvää joulua. Kysy Rudolphilta ja kommunikoi koodilla. Nähdään pian. KOODI: 71KI71KI";
                            this.step = 1;
                        }
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent(response);
                        myAgent.send(reply);
                    } else {
                        System.out.println("Error in the Santa coversation protocol - step" + 0);
                        myAgent.doDelete();
                    }
                }

                case 1 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("santa-conversation")) {
                        System.out.println("El pana dice a Santa: " + msg.getContent());
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent("Hyvää joulua. Lempiasennossani " + fila + ", " + columna + ". Nähdään pian.");
                        myAgent.send(reply);
                        this.step = 2;
                    } else {
                        System.out.println("Error in the Santa coversation protocol - step" + 1);
                        myAgent.doDelete();
                    }
                }

                case 2 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("santa-conversation")) {
                        System.out.println("El pana dice a Santa: " + msg.getContent());
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent("HoHoHo");
                        myAgent.send(reply);
                        this.finish = true;
                    } else {
                        System.out.println("Error in the Santa coversation protocol - step" + 2);
                        myAgent.doDelete();
                    }
                }

                default -> {
                    System.out.println("Error in the Santa coversation protocol");
                    myAgent.doDelete();
                }
            }                                       
        }

        @Override
        public boolean done() {
            if (finish)
                doDelete();
            return finish;
        }
    };
    
    @Override
    protected void setup() {
        System.out.println("Santa Claus iniciado.");

        addBehaviour(comportamiento);
     
    }
    
    @Override
    public void takeDown() {
        System.out.println("Terminating Santa...");
    }
}
