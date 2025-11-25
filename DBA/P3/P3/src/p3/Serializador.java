
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package p3;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.*;

public class Serializador {
    
    public static void serializarEntorno(Entorno entorno, String rutaArchivo) {
        // Usamos Gson para convertir la clase Entorno a JSON
        Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()  // Solo serializa los campos con @Expose
            .create();
        String json = gson.toJson(entorno);
        
        // Escribir el JSON en un archivo
        try (FileWriter writer = new FileWriter(rutaArchivo)) {
            writer.write(json);
            writer.flush();
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Error al escribir el archivo JSON.");

        } 
  
    }
}


