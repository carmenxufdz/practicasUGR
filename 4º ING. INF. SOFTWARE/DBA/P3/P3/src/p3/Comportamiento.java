package p3;

import jade.core.AID;
import jade.lang.acl.ACLMessage;
import jade.core.behaviours.Behaviour;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javafx.util.Pair;

public class Comportamiento extends Behaviour {
    private Entorno entorno;
    private Agente agente;
    private int step;
    ACLMessage msgElfo, msgSanta, msgRudolph;
    private String codigo;
    private int[] objetivo;
    private boolean hayObjetivo;
    private int index;
    public boolean next;
    private String message;
 
    public Comportamiento(Entorno e, Agente a) {
        entorno = e;
        agente = a;
        step = 0;
        codigo = "incorrecto";
        objetivo = new int[2];
        hayObjetivo = false;
        index = 0;
        next = false;
    }
    
    @Override
    public void action() {
        if (next) {
            switch (this.step) {
                case 0 -> {
                    msgElfo = myAgent.blockingReceive();

                    if (msgElfo.getPerformative() == ACLMessage.PROPOSE) {
                        System.out.println("Elfo propone: " + msgElfo.getContent());
                        if (Agente.inicioSanta)
                            objetivo = extraerPosicion(msgElfo.getContent());
                        msgElfo = msgElfo.createReply(ACLMessage.ACCEPT_PROPOSAL);
                        msgElfo.setContent("Bro, me ofrezco voluntario pa hacer la misión. En plan, no tengo na mejor que hacer.");
                        myAgent.send(msgElfo);
                        message = "AGENTE-ELFO: " + msgElfo.getContent();
                        this.step = 1;
                    } else {
                        System.out.println("Error in the coversation protocol - step " + 0);
                        myAgent.doDelete();
                    }
                }
                
                case 1 -> {
                    if (!hayObjetivo) {
                        msgElfo = myAgent.blockingReceive();
                        if (msgElfo.getConversationId().equals("elfo-conversation")) {
                            System.out.println("Elfo traduce: " + msgElfo.getContent());
                            if (Agente.inicioSanta) {
                                entorno.setObjetivo(objetivo[0], objetivo[1]);
                                entorno.mostrarEntorno();
                                message = "NEXT";
                                hayObjetivo = true;
                            } else {
                                msgSanta = new ACLMessage(ACLMessage.REQUEST);
                                msgSanta.addReceiver(new AID("Santa", AID.ISLOCALNAME));
                                msgSanta.setConversationId("santa-conversation");
                                msgSanta.setContent(msgElfo.getContent());
                                myAgent.send(msgSanta);
                                message = "AGENTE-SANTA: " + msgSanta.getContent();
                                this.step = 2;
                            } 
                        } else {
                            System.out.println("Error in the Agente coversation protocol - step" + 1);
                            myAgent.doDelete();
                        }
                    }
                    else {
                        if (entorno.agenteEnMeta()) {
                            hayObjetivo = false;
                            agente.resetVeces();
                            int[] pos = entorno.getPosAgente();
                            agente.pasarPor(pos[0], pos[1]);
                            msgSanta = new ACLMessage(ACLMessage.REQUEST);
                            msgSanta.addReceiver(new AID("Santa", AID.ISLOCALNAME));
                            msgSanta.setConversationId("santa-conversation");
                            msgSanta.setContent(msgElfo.getContent());
                            myAgent.send(msgSanta);
                            message = "AGENTE-SANTA: " + msgSanta.getContent();
                            this.step = 2;
                        }
                        else {
                            moverAgente();
                            message = "NEXT";
                        }
                    }
                }

                case 2 -> {
                    msgSanta = myAgent.blockingReceive();
                    if (msgSanta.getConversationId().equals("santa-conversation")) {
                        System.out.println("Santa dice: " + msgSanta.getContent());
                        msgElfo = msgElfo.createReply(ACLMessage.REQUEST);
                        msgElfo.setContent("Bro, el Santa me ha respondido. En plan, dice: " + msgSanta.getContent());
                        myAgent.send(msgElfo);
                        message = "AGENTE-ELFO: " + msgElfo.getContent();
                        this.step = 3;
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 2);
                        myAgent.doDelete();
                    }
                }

                case 3 -> {
                    msgElfo = myAgent.blockingReceive();
                    if (msgElfo.getConversationId().equals("elfo-conversation")) {
                        System.out.println("Elfo traduce: " + msgElfo.getContent());
                        if (msgElfo.getContent().contains("MALO")) agente.soyMalo = true;
                        else {
                            int inicio = msgElfo.getContent().indexOf("CÓDIGO: ");
                            if (inicio != -1)
                                codigo = msgElfo.getContent().substring(inicio + "CÓDIGO: ".length());
                        }
                        msgRudolph = new ACLMessage(ACLMessage.REQUEST);
                        msgRudolph.addReceiver(new AID("Rudolph", AID.ISLOCALNAME));
                        msgRudolph.setConversationId(codigo);
                        msgRudolph.setContent("Bro, que el Santa me ha dado la misión. En plan, dime dónde están los renos.");
                        myAgent.send(msgRudolph);
                        message = "AGENTE-RUDOLPH: " + msgRudolph.getContent();
                        this.step = 4;
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 3);
                        myAgent.doDelete();
                    }
                }

                case 4 -> {
                    msgRudolph = myAgent.blockingReceive();
                    if (msgRudolph.getConversationId().equals(codigo)) {
                        System.out.println("Rudolph dice: " + msgRudolph.getContent());
                        if (msgRudolph.getPerformative() == ACLMessage.AGREE) {
                            msgRudolph = msgRudolph.createReply(ACLMessage.INFORM);
                            msgRudolph.setContent("Bro, dime dónde está el " + (index+1) + "º. En plan, las coordenadas.");
                            myAgent.send(msgRudolph);
                            message = "AGENTE-RUDOLPH: " + msgRudolph.getContent();
                            index++;
                            this.step = 5;
                        } 
                        else if (msgRudolph.getPerformative() == ACLMessage.REFUSE){
                            agente.codigoIncorrecto = true;
                        }
                        else {
                            System.out.println("Error in the Agente coversation protocol - step" + 4);
                            myAgent.doDelete();
                        }
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 4);
                        myAgent.doDelete();
                    }
                }

                case 5 -> {
                    if (!hayObjetivo) {
                        msgRudolph = myAgent.blockingReceive();
                        if (msgRudolph.getConversationId().equals(codigo)) {
                            System.out.println("Rudolph dice: " + msgRudolph.getContent());
                            if (msgRudolph.getPerformative() == ACLMessage.FAILURE) {
                                msgElfo = msgElfo.createReply(ACLMessage.REQUEST);
                                msgElfo.setContent("Bro, necesito preguntarle al Santa su ubicación. En plan, cómo se la pregunto.");
                                myAgent.send(msgElfo);
                                message = "AGENTE-ELFO: " + msgElfo.getContent();
                                this.step = 6;
                            }
                            else if (msgRudolph.getPerformative() == ACLMessage.INFORM) {
                                objetivo = extraerPosicion(msgRudolph.getContent());
                                entorno.setObjetivo(objetivo[0], objetivo[1]);
                                entorno.mostrarEntorno();
                                message = "NEXT";
                                hayObjetivo = true;
                                if (agente.visitadaAnteriormente(objetivo[0], objetivo[1]))
                                    agente.calcularCamino();
                            }
                            else {
                                System.out.println("Error in the Agente coversation protocol - step" + 5);
                                myAgent.doDelete();
                            }
                        } else {
                            System.out.println("Error in the Agente coversation protocol - step" + 5);
                            myAgent.doDelete();
                        }
                    }
                    else {
                        if (entorno.agenteEnMeta()) {
                            hayObjetivo = false;
                            // Cuando ya se ha completado el objetivo, se resetean las veces que se ha pasado por las casillas conocidas
                            agente.resetVeces();
                            // Y se añade la posición actual del agente que será la primera por la que pase la próx. vez
                            int[] pos = entorno.getPosAgente();
                            agente.pasarPor(pos[0], pos[1]);
                            recibirReno(index);
                            message = "NEXT";
                            index++; 
                        }
                        else {
                            moverAgente();
                            message = "NEXT";
                        }
                    }

                }

                case 6 -> {
                    msgElfo = myAgent.blockingReceive();

                    if (msgElfo.getConversationId().equals("elfo-conversation")) {
                        System.out.println("Elfo traduce: " + msgElfo.getContent());
                        msgSanta = msgSanta.createReply(ACLMessage.INFORM);
                        msgSanta.setContent(msgElfo.getContent());
                        myAgent.send(msgSanta);
                        message = "AGENTE-SANTA: " + msgSanta.getContent();
                        this.step = 7;
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 6);
                        myAgent.doDelete();
                    }
                }

                case 7 -> {
                    msgSanta = myAgent.blockingReceive();
                    if (msgSanta.getConversationId().equals("santa-conversation")) {
                        System.out.println("Santa dice: " + msgSanta.getContent());
                        msgElfo = msgElfo.createReply(ACLMessage.REQUEST);
                        msgElfo.setContent("Bro, el Santa me ha respondido. En plan, dice: " + msgSanta.getContent());
                        myAgent.send(msgElfo);
                        message = "AGENTE-ELFO: " + msgElfo.getContent();
                        this.step = 8;
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 7);
                        myAgent.doDelete();
                    }
                }

                case 8 -> {
                    if (!hayObjetivo) {
                        msgElfo = myAgent.blockingReceive();

                        if (msgElfo.getConversationId().equals("elfo-conversation")) {
                            System.out.println("Elfo traduce: " + msgElfo.getContent());
                            objetivo = extraerPosicion(msgElfo.getContent());
                            entorno.setObjetivo(objetivo[0], objetivo[1]);
                            entorno.mostrarEntorno();
                            message = "NEXT";
                            hayObjetivo = true;
                        } else {
                            System.out.println("Error in the Agente coversation protocol - step" + 8);
                            myAgent.doDelete();
                        }
                    }
                    else {
                        if (entorno.agenteEnMeta()) {
                            hayObjetivo = false;
                            agente.resetVeces();
                            int[] pos = entorno.getPosAgente();
                            agente.pasarPor(pos[0], pos[1]);
                            msgElfo = msgElfo.createReply(ACLMessage.REQUEST);
                            msgElfo.setContent("Bro, necesito avisarle al Santa de que ya estoy en su ubicación. En plan, cómo le aviso.");
                            myAgent.send(msgElfo);
                            message = "AGENTE-ELFO: " + msgElfo.getContent();
                            this.step = 9;
                        }
                        else {
                            moverAgente();
                            message = "NEXT";
                        }
                    }

                }

                case 9 -> {
                    msgElfo = myAgent.blockingReceive();

                    if (msgElfo.getConversationId().equals("elfo-conversation")) {
                        System.out.println("Elfo traduce: " + msgElfo.getContent());
                        msgSanta = msgSanta.createReply(ACLMessage.REQUEST);
                        msgSanta.setContent(msgElfo.getContent());
                        myAgent.send(msgSanta);
                        message = "AGENTE-SANTA: " + msgSanta.getContent();
                        this.step = 10;
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 9);
                        myAgent.doDelete();
                    }
                }

                case 10 -> {
                    msgSanta = myAgent.blockingReceive();
                    if (msgSanta.getConversationId().equals("santa-conversation")) {
                        System.out.println("Santa dice: " + msgSanta.getContent());
                        message = "SANTA-AGENTE: " + msgSanta.getContent();
                        if (msgSanta.getContent().contains("HoHoHo"))
                            agente.misionCompletada = true;
                        else {
                            System.out.println("Error in the Agente coversation protocol - step" + 10);
                            myAgent.doDelete();
                        }
                    } else {
                        System.out.println("Error in the Agente coversation protocol - step" + 10);
                        myAgent.doDelete();
                    }
                }

                default -> {
                    System.out.println("Error in the Agente coversation protocol");
                    myAgent.doDelete();
                }
            }
        }
           
        next = false;
    }

    @Override
    public boolean done() {
        if (agente.misionCompletada || (agente.soyMalo && agente.codigoIncorrecto))
            agente.doDelete();
        return agente.misionCompletada || (agente.soyMalo && agente.codigoIncorrecto);
    }
    
    public void recibirReno(int index) {
        msgRudolph = msgRudolph.createReply(ACLMessage.INFORM);
        msgRudolph.setContent("Bro, dime dónde está el " + (index+1) + "º. En plan, las coordenadas.");
        myAgent.send(msgRudolph);
        System.out.println("ññññññññññññññññññññññññññññññññññññññññññ " + agente.usadas);
    }
    
    public int[] extraerPosicion(String texto) {
        int coma = texto.indexOf(", ", texto.indexOf("posición "));
        String posicion = texto.substring(coma - 1, coma - 1 + 4);
        int [] pos = {Character.getNumericValue(posicion.charAt(0)), Character.getNumericValue(posicion.charAt(3))};
        return pos;
    }
    
    public void moverAgente(){
        agente.mover();
        if (agente.hayCamino()) agente.seguirCamino();
        else {
            ArrayList<Movimiento> movimientos = agente.getMovs();
            
            // pair <distancia, veces>
            Pair<Double, Integer> estado;
            // pair <movimiento, (distancia, veces)>
            Pair<Movimiento, List<Double>> optimo = null;

            int i = 0;
            for (Movimiento mov = movimientos.get(i); i !=  movimientos.size() ; i++) {
                mov = movimientos.get(i);
                // Se obtiene la distancia y las veces del evaluado
                estado = entorno.getEstado(mov);
                // Si la distancia no es negativa (muro o fuera de límite)
                if (!(estado.getKey() < 0)) {
                    // Si no había óptimo o el movimiento evaluado es mejor (menos veces o mismas pero menor distancia)
                    if (optimo == null || estado.getValue() < optimo.getValue().get(1) ||
                        (estado.getValue() == optimo.getValue().get(1).intValue() 
                         && estado.getKey() < optimo.getValue().get(0))) { // Menor distancia en empate
                        // El evaluado ahora es el óptimo
                        optimo = new Pair<>(mov, Arrays.asList(estado.getKey(), estado.getValue().doubleValue()));
                    }
                }
            }

            entorno.moverAgente(optimo.getKey());
        }
        
        entorno.mostrarEntorno();
        agente.setDistanciaActual();
    }
    
    public void next(){
        next = true;
    }
    
    public String getMessage(){
        return message;
    }
}