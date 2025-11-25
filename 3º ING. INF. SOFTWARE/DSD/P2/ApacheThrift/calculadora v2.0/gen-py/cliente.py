from calculadora import Calculadora

import sys
import math

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

def imprimir_matriz(m):
    for i in range(len(m)):
        for j in range(len(m[0])):
            print(str(m[i][j])+"\t", end="")
            
        print('')

def rellenar_matriz(m):
	for i in range(len(m)):
		print("Fila "+str(i)+" valores: ")
		for j in range(len(m[0])):
			m[i][j]=float(input(""))

def rellenar_vector(v):
	for i in range(len(v)):
		v[i]=float(input(""))

def menu_principal():
    print("ELIJA UNA OPCION DE LA CALCULADORA:")
    print("\t1. Operaciones Basicas")
    print("\t2. Operaciones Avanzadas")
    print("\t3. Operaciones Trigonometricas")
    print("\t4. Operaciones Vectoriales")
    print("\t5. Operaciones Matriciales")
    print("\t6. Salir del Programa")

def operaciones_basicas():
    while True:
        print("ELIJA UNA OPERACION:")
        print("\t1. Suma")
        print("\t2. Resta")
        print("\t3. Multiplicacion")
        print("\t4. Division")
        print("\t5. Volver al menu principal")
        operacion = input()
        print('')

        match operacion:
            case '1':   # SUMA
                n1 = float(input('Introduzca el primer numero: '))
                n2 = float(input('Introduzca el segundo numero: '))
                print('')

                resultado = client.suma(n1,n2)
                print(f'Resultado: {n1} + {n2} = {resultado}\n')
            
            case '2':   # RESTA
                n1 = float(input('Introduzca el primer numero: '))
                n2 = float(input('Introduzca el segundo numero: '))
                print('')

                resultado = client.resta(n1,n2)
                print(f'Resultado: {n1} - {n2} = {resultado}\n')
            
            case '3':   # MULTIPLICACION
                n1 = float(input('Introduzca el primer numero: '))
                n2 = float(input('Introduzca el segundo numero: '))
                print('')

                resultado = client.multiplica(n1,n2)
                print(f'Resultado: {n1} x {n2} = {resultado}\n')
            
            case '4':   # DIVISION
                n1 = float(input('Introduzca el primer numero: '))
                n2 = float(input('Introduzca el segundo numero: '))
                print('')

                resultado = client.divide(n1,n2)
                print(f'Resultado: {n1} / {n2} = {resultado}\n')
            
            case '5':
                print('Volviendo al menu principal...\n')
                break
            
            case _:
                print('Opcion no valida.\n')

def operaciones_avanzadas():
    while True:
        print("ELIJA UNA OPERACION:")
        print("\t1. Logaritmo base X")
        print("\t2. Logaritmo neperiano")
        print("\t3. Logaritmo base 10")
        print("\t4. Modulo")
        print("\t5. Potencia")
        print("\t6. Raiz")
        print("\t7. Factorial")
        print("\t8. Volver al menu principal")
        operacion = input()
        print('')

        match operacion:
            case '1':   # LOGARITMO BASE X
                num = int(input('Introduzca un numero (positivo): '))
                base = int(input('Introduzca la base: '))
                print('')

                if num < 0:
                    print('No existe el logaritmo de un numero negativo\n')
                elif base <= 0:
                    print('No se puede hacer logaritmo en base menor o igual a 0\n')
                else:
                    resultado = client.logaritmo(num,base)
                    print(f'Resultado: log {num} base {base} = {resultado}\n')
            
            case '2':   # LOGARITMO NEPERIANO
                num = int(input('Introduzca un numero: '))
                print('')

                if num < 0:
                    print('No existe el logaritmo de un numero negativo\n')
                else:
                    resultado = client.logaritmo_n(num)
                    print(f'Resultado: logn({num}) = {resultado}\n')
            
            case '3':   # LOGARITMO BASE 10
                num = int(input('Introduzca un numero: '))
                print('')

                if num < 0:
                    print('No existe el logaritmo de un numero negativo\n')
                else:
                    resultado = client.logaritmo10(num)
                    print(f'Resultado: log10({num}) = {resultado}\n')
            
            case '4':   # MODULO
                num = int(input('Introduzca un numero: '))
                mod = int(input('Introduzca el modulo: '))
                print('')

                if mod == 0:
                    print('No se puede hacer modulo 0\n')
                else:
                    resultado = client.modulo(num,mod)
                    print(f'Resultado: {num} mod {mod} = {resultado}\n')
            
            case '5':   # POTENCIA
                base = int(input('Introduzca la base: '))
                exp = int(input('Introduzca el exponente: '))
                print('')

                resultado = client.potencia(base,exp)
                print(f'Resultado: {base} ^ {exp} = {resultado}\n')

            case '6':   # RAIZ
                num = int(input('Introduzca un numero: '))
                raiz = int(input('Introduzca la raiz (numero entero positivo): '))
                print('')

                if raiz <= 0:
                    print('La raiz debe ser un numero positivo diferente de 0\n')
                elif raiz % 2 == 0 and num < 0:
                    print(f'No se puede hacer la raiz {raiz} de un numero negativo\n')
                else:
                    resultado = client.raiz(num,raiz)
                    print(f'Resultado: {num} ^ 1/{raiz} = {resultado}\n')

            case '7':   # FACTORIAL
                num = int(input('Introduzca un numero: '))
                print('')

                resultado = client.factorial(num)
                print(f'Resultado: {num}! = {resultado}\n')
            
            case '8':
                print('Volviendo al menu principal...\n')
                break
            
            case _:
                print('Opcion no valida.\n')

def operaciones_trigonometricas():
    while True:
        print("ELIJA UNA OPERACION:")
        print("\t1. Grados a Radianes")
        print("\t2. Radianes a Grados")
        print("\t3. Seno")
        print("\t4. Coseno")
        print("\t5. Tangente")
        print("\t6. Volver al menu principal")
        operacion = input()
        print('')
        max_value = math.isqrt(sys.maxsize)
        min_value = math.isqrt(sys.maxsize+1)

        match operacion:
            case '1':   # GRADOS A RADIANES
                grados = int(input('Introduzca los grados: '))
                print('')
                resultado = client.grados_a_radianes(grados)
                print(f'Resultado: {grados}° = {resultado} radianes\n')
            
            case '2':   # RADIANES A GRADOS
                radianes = int(input('Introduzca los radianes: '))
                print('')

                resultado = client.radianes_a_grados(radianes)
                print(f'Resultado: {radianes} rad = {resultado}°\n')
            
            case '3':   # SENO
                grados = int(input('Introduzca los grados: '))
                print('')

                resultado = client.seno(grados)
                if (resultado < 0.0001 and resultado > 0.0) or resultado < min_value:
                    resultado = 0

                print(f'Resultado: sen({grados}) = {resultado}\n')
            
            case '4':   # COSENO
                grados = int(input('Introduzca los grados: '))
                print('')


                resultado = client.coseno(grados)
                if (resultado < 0.0001 and resultado > 0.0) or resultado < min_value:
                    resultado = 0
                print(f'Resultado: cos({grados}) = {resultado}\n')
            
            case '5':   # TANGENTE
                grados = int(input('Introduzca los grados: '))
                print('')
                

                resultado = client.tangente(grados)
                if resultado < 0.0001 and resultado > 0.0:
                    resultado = 0
                elif resultado > max_value:
                    resultado = 'infinito'
                elif resultado < min_value:
                    resultado = 'menos infinito'

                print(f'Resultado: tan({grados}) = {resultado}\n')
            
            case '6':
                print('Volviendo al menu principal...\n')
                break
            
            case _:
                print('Opcion no valida.\n')

def operaciones_vectoriales():
    while True:
        print("ELIJA UNA OPERACION:")
        print("\t1. Suma Vectorial")
        print("\t2. Resta Vectorial")
        print("\t3. Multiplicacion por Escalar")
        print("\t4. Producto Escalar")
        print("\t5. Producto Vectorial")
        print("\t6. Volver al menu principal")
        operacion = input()
        print('')

        match operacion:
            case '1':   # SUMA VECTORIAL
                tam = int(input('Introduzca el tamaño del vector: '))
                v1 = [0 for i in range(tam)]
                v2 = [0 for i in range(tam)]
                print('')

                print('Primer vector:')
                rellenar_vector(v1)
                print('Segundo vector:')
                rellenar_vector(v2)
                print('')
                
                result = client.suma_vectorial(v1,v2)
                print(f'Resultado:{v1} + {v2} = {result}\n')
            
            case '2':   # RESTA VECTORIAL
                tam = int(input('Introduzca el tamaño del vector: '))
                v1 = [0 for i in range(tam)]
                v2 = [0 for i in range(tam)]
                print('')

                print('Primer vector:')
                rellenar_vector(v1)
                print('Segundo vector:')
                rellenar_vector(v2)
                print('')
                
                result = client.resta_vectorial(v1,v2)
                print(f'Resultado: {v1} - {v2} = {result}\n')
            
            case '3':   # MULTIPLICACION POR ESCALAR
                tam = int(input('Introduzca el tamaño del vector: '))
                v1 = [0 for i in range(tam)]
                num = float(input('Numero por el cual multipilicar: '))
                print('')

                print('Primer vector:')
                rellenar_vector(v1)
                print('')
                
                result = client.multiplica_por_escalar(v1,num)
                print(f'Resultado: {v1} x {num} = {result}\n')
            
            
            case '4':   # PRODUCTO ESCALAR
                tam = int(input('Introduzca el tamaño del vector: '))
                v1 = [0 for i in range(tam)]
                v2 = [0 for i in range(tam)]
                print('')

                print('Primer vector:')
                rellenar_vector(v1)
                print('Segundo vector:')
                rellenar_vector(v2)
                print('')
                
                result = client.producto_escalar(v1,v2)
                print(f'Resultado: {v1} · {v2} = {result}\n')

            case '5':   # PRODUCTO VECTORIAL
                tam = int(3)
                v1 = [0 for i in range(tam)]
                v2 = [0 for i in range(tam)]
                print('')

                print('Primer vector:')
                rellenar_vector(v1)
                print('Segundo vector:')
                rellenar_vector(v2)
                print('')
                
                result = client.producto_vectorial(v1,v2)
                print(f'Resultado: {v1} x {v2} = {result}\n')

            
            case '6':
                print('Volviendo al menu principal...\n')
                break
            
            case _:
                print('Opcion no valida.\n')

def operaciones_matriciales():
     while True:
        print("ELIJA UNA OPERACION:")
        print("\t1. Suma Matricial")
        print("\t2. Resta Matricial")
        print("\t3. Multiplicacion Matricial")
        print("\t4. Volver al menu principal")
        operacion = input()
        print('')

        match operacion:
            case '1':   # SUMA
                fil = int(input('Matriz num filas: '))
                col = int(input('Matriz num columnas: '))
                print('')

                m1 = [[0 for j in range(col)] for i in range(fil)]
                m2 = [[0 for j in range(col)] for i in range(fil)]
                
                print('Primera matriz: ')
                rellenar_matriz(m1)
                print('Segunda matriz: ')
                rellenar_matriz(m2)
                print('')

                print('Primera matriz: \n')
                imprimir_matriz(m1)
                print('')
                print('Segunda matriz: \n')
                imprimir_matriz(m2)
                print('')

                result = client.suma_matricial(m1, m2)
                print('La suma matricial es: \n')
                imprimir_matriz(result)
                print('')
            
            case '2':   # RESTA
                fil = int(input('Matriz num filas: '))
                col = int(input('Matriz num columnas: '))
                print('')

                m1 = [[0 for j in range(col)] for i in range(fil)]
                m2 = [[0 for j in range(col)] for i in range(fil)]
                
                print('Primera matriz: ')
                rellenar_matriz(m1)
                print('Segunda matriz: ')
                rellenar_matriz(m2)
                print('')

                print('Primera matriz: \n')
                imprimir_matriz(m1)
                print('')
                print('Segunda matriz: \n')
                imprimir_matriz(m2)
                print('')

                result = client.resta_matricial(m1, m2)
                print('La resta matricial es: \n')
                imprimir_matriz(result)
                print('')
            
            case '3':   # MULTIPLICACION
                fil = int(input('Matriz num filas: '))
                col = int(input('Matriz num columnas: '))
                print('')

                m1 = [[0 for j in range(col)] for i in range(fil)]
                m2 = [[0 for j in range(fil)] for i in range(col)]
                
                print('Primera matriz: ')
                rellenar_matriz(m1)
                print('Segunda matriz: ')
                rellenar_matriz(m2)
                print('')

                print('Primera matriz: \n')
                imprimir_matriz(m1)
                print('')
                print('Segunda matriz: \n')
                imprimir_matriz(m2)
                print('')

                result = client.mult_matricial(m1, m2)
                print('La multiplicacion matricial es: \n')
                imprimir_matriz(result)
                print('')
            
            case '4':
                print('Volviendo al menu principal...\n')
                break
            
            case _:
                print('Opcion no valida.\n')



transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)

transport.open()

print("Hacemos ping al server\n")
client.ping()

while True:
    menu_principal()
    opcion = input()
    print('')

    #En python3 introdujeron el match-case a modo de switch-case
    match opcion:
        case '1': 
            operaciones_basicas()
        case '2': 
            operaciones_avanzadas()
        case '3': 
            operaciones_trigonometricas()
        case '4': 
            operaciones_vectoriales()
        case '5':
            operaciones_matriciales()
        case '6':
            print('Saliendo del programa...\n')
            break
        case _:
            print("Opcion no valida.\n")

transport.close()


def menu_principal(self):
    print("ELIJA UNA OPCION DE LA CALCULADORA:\n")
    print("\t1. Operaciones Basicas\n")
    print("\t2. Operaciones Avanzadas\n")
    print("\t3. Operaciones Trigonometricas\n")
    print("\t4. Operaciones Vectoriales\n")
    print("\t5. Operaciones Matriciales\n")
    print("\t6. Salir del Programa\n")
