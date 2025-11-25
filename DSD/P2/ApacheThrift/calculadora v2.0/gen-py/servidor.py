import glob
import sys

import cmath
import math

from calculadora import Calculadora

# hay que instalar antes el paquete thrift de python 
# (no confundir con el compilador thrift)
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol 
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG )
# Esto es para imprimir cuando haya errores en el 
# servidor y poder depurar!



class CalculadoraHandler:
    def __init__(self):
        self.log = {}
    
    def ping(self):
        print("Me han hecho ping()")
    
    # OPERACIONES BASICAS
    def suma(self, n1, n2):
        print(f'{n1} + {n2}')
        return n1 + n2

    def resta(self, n1, n2):
        print(f'{n1} - {n2}')
        return n1 - n2
    
    def multiplica(self, n1, n2):
        print(f'{n1} x {n2}')
        return n1 * n2
    
    def divide(self, n1, n2):
        print(f'{n1} / {n2}')
        return n1 / n2

    # OPERACIONES AVANZADAS
    def logaritmo(self, num, base):
        print(f'logaritmo base {base} de {num}')
        return math.log(float(num))/math.log(float(base))
    
    def logaritmo_n(self, num):
        print(f'logaritmo neperiano de {num}')
        return math.log(float(num))
    
    def logaritmo10(self, num):
        print(f'logaritmo base 10 de {num}')
        return math.log10(float(num))
    
    def modulo(selg, num, mod):
        print(f'{num} % {mod}')
        return num % mod
    
    def potencia(self, num, exp):
        print(f'{num}^{exp}')
        return num**exp
    
    def raiz(self, num, raiz):
        print(f'raiz {raiz} de {num}')
        return num**(1/raiz)
    
    def factorial(self, num):
        print(f'{num}!')
        max_value = math.isqrt(sys.maxsize)
        result = 1
        for i in range(1, num+1):
            if result > max_value or result * i > max_value:
                result=-1
            else:
                result *= i
        return result
    

    # OPERACIONES TRIGONOMETRICAS
    def grados_a_radianes(self, grados):
        print(f'Conversion de {grados}° a radianes')
        return math.radians(grados)
    
    def radianes_a_grados(self, radians):
        print(f'Conversion de {radians} radianes a grados')
        return math.degrees(radians)
    
    def seno(self, grados):
        print(f'sen({grados})')
        radians = math.radians(grados)
        return math.sin(radians)
    
    def coseno(self, grados):
        print(f'cos({grados})')
        radians = math.radians(grados)
        return math.cos(radians)
    
    def tangente(self, grados):
        print(f'tan({grados})')
        if grados == 90 or grados == 270:
            print("Tangente = infinito\n")
            radians = math.radians(grados)
            return math.tan(radians)
        else:
            radians = math.radians(grados)
            return math.tan(radians)
    

    # OPERACIONES VECTORIALES
    def suma_vectorial(self, v1, v2):
        result = [0 for i in range(len(v1))]
        print(f'{v1} + {v2} ')

        for i in range(len(v1)):
            result[i] = v1[i] + v2[i]
        
        return result

    def resta_vectorial(self, v1, v2):
        result = [0 for i in range(len(v1))]
        print(f'{v1} - {v2} ')

        for i in range(len(v1)):
            result[i] = v1[i] - v2[i]
        
        return result
    
    def multiplica_por_escalar(self, v1, num):
        result = [0 for i in range(len(v1))]
        print(f'{v1} x {num} ')

        for i in range(len(v1)):
            result[i] = v1[i] * num
        
        return result
    
    def producto_escalar(self, v1, v2):
        result = [0 for i in range(len(v1))]
        print(f'{v1} · {v2} ')
        result = 0.0

        for i in range(len(v1)):
            result += v1[i] * v2[i]
        
        return result
    
    def producto_vectorial(self, v1, v2):
        result = [0 for i in range(3)]
        print(f'{v1} x {v2} ')

        result[0] = v1[1]*v2[2] - v1[2]*v2[1]
        result[1] = v1[2]*v2[0] - v1[0]*v2[2]
        result[2] = v1[0]*v2[1] - v1[1]*v2[0]
        
        return result

    # OPERACIONES MATRICIALES
    def suma_matricial(self, m1, m2):
        result = [[0 for j in range(len(m1[0]))] for i in range(len(m1))]

        for i in range(len(m1)):
            for j in range(len(m1[i])):
                result[i][j] = m1[i][j] + m2[i][j]
        
        print('Suma Matricial')
        return result

    def resta_matricial(self, m1, m2):
        result = [[0 for j in range(len(m1[0]))] for i in range(len(m1))]

        for i in range(len(m1)):
            for j in range(len(m1[i])):
                result[i][j] = m1[i][j] - m2[i][j]

        print('Resta Matricial')
        return result

    def mult_matricial(self, m1, m2):
        result = [[0 for j in range(len(m2[0]))] for i in range(len(m1))]

        for i in range(len(m1)):
            for j in range(len(m2[0])):
                for k in range(len(m1[0])):
                    result[i][j]+=m1[i][k]*m2[k][j]
                
        print('Multiplicacion Matricial')
        return result



if __name__ == "__main__":
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")