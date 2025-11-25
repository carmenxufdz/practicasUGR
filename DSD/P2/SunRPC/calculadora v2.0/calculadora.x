/*
CALCULADORA VERSION 2.0 COMPLETA

OPERACIONES:
	1.BÁSICAS:
		1.1.Suma
		1.2.Resta
		1.3.Multiplicacion
		1.4.Division

	2.AVANZADAS:
		2.1.Logaritmo base X
		2.2.Logaritmo neperiano
		2.3.Logaritmo base 10
		2.4.Módulo
		2.5.Potencia
		2.6.Raíz
		2.7.Factorial

	3.TRIGONOMETRÍA:
		3.1.Seno 
		3.2.Coseno
		3.3.Tangente
		3.4.Secante
		3.5.Cosecante
		3.6.Cotangente

	4.VECTORES:
		4.1.Suma
		4.2.Resta
		4.3.Multiplicacion por Escalar
		4.4.Producto Escalar
		4.5.Producto Vectorial

	5.MATRICES:
		5.1.Suma
		5.2.Resta
		5.3.Multiplicacion

*/

typedef double m<>;

struct matrix{
    int fil;
    int col;
    m m;
};

typedef double v<>;

program CALCULADORA {
	version COMPLETA {
		double SUMA(double,double) = 1;
		double RESTA(double,double) = 2;
		double MULTIPLICA(double,double) = 3;
		double DIVIDE(double,double) = 4;
		int MODULO (int, int) = 5;
		int POTENCIA (int, int) =6;
		double RAIZ (double, double) = 7;
		int FACTORIAL (int) = 8;
		
		double LOGARITMO(int, int) = 9;
		double LOG_N (int) = 10;
		double LOG10 (int) = 11;
		
		double SENO (double) = 12;
		double COSENO (double) = 13;
		double TANGENTE (double) = 14;
		double SECANTE (double) = 15;
		double COSECANTE (double) = 16;
		double COTANGENTE (double) = 17;

		v SUMAVECTORIAL(v, v) = 18;
		v RESTAVECTORIAL(v, v) = 19;
		v MULTIPLICAPORESCALAR(v, double) = 20;
		double PRODUCTOESCALAR(v, v) = 21;
		v PRODUCTOVECTORIAL(v, v) = 22;

		matrix SUMAMATRICIAL(matrix, matrix) = 23;
        matrix RESTAMATRICIAL(matrix, matrix) = 24;
        matrix MULTMATRICIAL(matrix, matrix) = 25;
	}=1;
} = 0x2000001;