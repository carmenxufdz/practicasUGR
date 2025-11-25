/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package p3;

import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.Behaviour;
import jade.lang.acl.ACLMessage;

/**
 *
 * @author Usuario
 */
public class Elfo extends Agent {
    private Behaviour comportamiento = new Behaviour() {
        boolean finish = false;
        int step = 0;

        ACLMessage msg, reply;

        @Override
        public void action() {
            switch (this.step) {
                case 0 -> {
                    msg = new ACLMessage(ACLMessage.PROPOSE);
                    msg.addReceiver(new AID("Agente", AID.ISLOCALNAME));
                    msg.setConversationId("elfo-conversation");
                    String contenido = "¿Serías voluntario para completar la misión de salvar la Navidad?";
                    if (Agente.inicioSanta) {
                        contenido += " Santa se encuentra en la posición " + Santa.fila + ", " + Santa.columna + '.';
                    }
                    msg.setContent(contenido);
                    myAgent.send(msg);
                    this.step = 1;
                }
                
                case 1 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("elfo-conversation")) {
                        if (msg.getPerformative() == ACLMessage.ACCEPT_PROPOSAL) {
                            System.out.println("El pana dice al Elfo: " + msg.getContent());
                            reply = msg.createReply(ACLMessage.INFORM);
                            reply.setContent("Rakas Joulupukki. Haluan olla sinun, anna minulle tehtävä. Kiitos.");
                            myAgent.send(reply);
                            this.step = 2;
                        } 
                        else {
                            System.out.println("Error in the Elfo coversation protocol - step" + 1);
                            myAgent.doDelete();
                        }
                        
                    } else {
                        System.out.println("Error in the Elfo coversation protocol - step" + 1);
                        myAgent.doDelete();
                    }
                }

                case 2 -> {
                    msg = myAgent.blockingReceive();

                    if (msg.getConversationId().equals("elfo-conversation")) {
                        System.out.println("El pana dice al Elfo: " + msg.getContent());
                        String response;
                        if (msg.getContent().contains("TUHMA")) {
                            response = "Mi loco que dice el Santa que has sido un niño MALO y que te pires.";
                            this.finish = true;
                        }
                        else {
                            int inicio = msg.getContent().indexOf("KOODI: ");
                            String codigo = "";
                            if (inicio != -1)
                                codigo = msg.getContent().substring(inicio + "KOODI: ".length());
                            response = "Mi loco que dice el Santa que te comuniques con el Rudolph mediante el CÓDIGO: " + codigo;
                            this.step = 3;
                        }
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent(response);
                        this.myAgent.send(reply);
                    } else {
                        System.out.println("Error in the Elfo coversation protocol - step" + 2);
                        myAgent.doDelete();
                    }
                }

                case 3 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("elfo-conversation")) {
                        System.out.println("El pana dice al Elfo: " + msg.getContent());
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent("Rakas Joulupukki. Missä olet, vanha herkullinen? Kiitos.");
                        myAgent.send(reply);
                        this.step = 4;
                    } else {
                        System.out.println("Error in the Elfo coversation protocol - step" + 3);
                        myAgent.doDelete();
                    }
                }

                case 4 -> {
                    msg = myAgent.blockingReceive();

                    if (msg.getConversationId().equals("elfo-conversation")) {
                        System.out.println("El pana dice al Elfo: " + msg.getContent());
                        int coma = msg.getContent().indexOf(", ", msg.getContent().indexOf("dice: "));
                        String posicion = msg.getContent().substring(coma - 1, coma - 1 + 4);
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent("Mi loco que dice el Santa que está en la posición " + posicion);
                        this.myAgent.send(reply);
                        this.step = 5;
                    } else {
                        System.out.println("Error in the Elfo coversation protocol - step" + 4);
                        myAgent.doDelete();
                    }
                }

                case 5 -> {
                    msg = myAgent.blockingReceive();
                    if (msg.getConversationId().equals("elfo-conversation")) {
                        System.out.println("El pana dice al Elfo: " + msg.getContent());
                        reply = msg.createReply(ACLMessage.INFORM);
                        reply.setContent("Rakas Joulupukki. Olen jo täällä, papu. Kiitos.");
                        myAgent.send(reply);
                        this.finish = true;
                    } else {
                        System.out.println("Error in the Elfo coversation protocol - step" + 5);
                        myAgent.doDelete();
                    }
                }

                default -> {
                    System.out.println("Error in the Elfo coversation protocol");
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
        System.out.println("Elfo iniciado.");

        addBehaviour(comportamiento);
     
    }
    
    @Override
    public void takeDown() {
        System.out.println("Terminating Elfo...");
    }
}
