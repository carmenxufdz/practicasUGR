/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package p3;

import jade.core.Agent;
import jade.core.behaviours.Behaviour;
import jade.lang.acl.ACLMessage;

/**
 *
 * @author Usuario
 */
public class Rudolph extends Agent {
    private int [][] renos = new int [8][2];
    private String [] nombres = new String [8];
    private Behaviour comportamiento = new Behaviour() {
        boolean finish = false;
        int step = 0;

        String CODIGO = "71KI71KI";

        ACLMessage msg, reply;

        int index = 0;

        @Override
        public void action() {
            switch (this.step) {
                case 0 -> {
                    msg = myAgent.blockingReceive();

                    if (msg.getPerformative() == ACLMessage.REQUEST) {
                        System.out.println("El pana dice al Rudolph mediante el canal " + msg.getConversationId() + 
                                            ": " + msg.getContent());
                        if (msg.getConversationId().equals(CODIGO)) {
                            reply = msg.createReply(ACLMessage.AGREE);
                            reply.setContent("El código es CORRECTO. Son muchos renos eh.");
                            this.step = 1;
                        }
                        else {
                            reply = msg.createReply(ACLMessage.REFUSE);
                            reply.setContent("El código es INCORRECTO");
                            this.finish = true;
                        }
                        this.myAgent.send(reply);

                    } else {
                        System.out.println("Error in the coversation protocol - step " + 0);
                        myAgent.doDelete();
                    }
                }

                case 1 -> {
                    msg = myAgent.blockingReceive();

                    if (msg.getPerformative() == ACLMessage.INFORM) {
                        System.out.println("El pana dice al Rudolph: " + msg.getContent());
                        darReno(index);
                        index++;
                        if (index == 8)
                            this.step = 2;
                    } else {
                        System.out.println("Error in the coversation protocol - step" + 1);
                        myAgent.doDelete();
                    }
                }

                case 2 -> {
                    msg = myAgent.blockingReceive();

                    if (msg.getPerformative() == ACLMessage.INFORM) {
                        System.out.println("El pana dice al Rudolph: " + msg.getContent());
                        reply = msg.createReply(ACLMessage.FAILURE);
                        reply.setContent("Ya están todos los renos ENCONTRADOS.");
                        this.myAgent.send(reply);
                        this.finish = true;
                    } else {
                        System.out.println("Error in the coversation protocol - step" + 2);
                        myAgent.doDelete();
                    }

                }

                default -> {
                    System.out.println("Error in the Rudolph coversation protocol");
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

        public void darReno(int index) {
            reply = msg.createReply(ACLMessage.INFORM);
            reply.setContent("El " + (index+1) + "º reno es " + nombres[index] + ", está en la posición " 
                                   + renos[index][0] + ", " + renos[index][1] + ".");
            this.myAgent.send(reply);
        }
    };
    
    @Override
    protected void setup() {
        System.out.println("Rudolph iniciado.");
        
        renos[0] = new int [] {7,3};
        renos[1] = new int [] {1,0};
        renos[2] = new int [] {2,0};
        renos[3] = new int [] {3,0};
        renos[4] = new int [] {4,0};
        renos[5] = new int [] {5,0};
        renos[6] = new int [] {6,0};
        renos[7] = new int [] {7,0};
        
        nombres[0] = "Dasher";
        nombres[1] = "Dancer";
        nombres[2] = "Vixen";
        nombres[3] = "Prancer";
        nombres[4] = "Cupido";
        nombres[5] = "Comet";
        nombres[6] = "Blitzen";
        nombres[7] = "Donner";

        addBehaviour(comportamiento);
     
    }
    
    @Override
    public void takeDown() {
        System.out.println("Terminating Rudolph...");
    }
    
    
}
