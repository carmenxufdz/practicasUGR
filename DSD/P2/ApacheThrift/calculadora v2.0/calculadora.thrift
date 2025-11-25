/*
CALCULADORA VERSION 2.0
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
        3.1.Conversion de Grados a Radianes
        3.2.Conversion de Radianes a Grados
		3.3.Seno 
		3.4.Coseno
		3.5.Tangente

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
service Calculadora{
    void ping(),
    double suma(1:double n1, 2:double n2),
    double resta(1:double n1, 2:double n2),
    double multiplica(1:double n1, 2:double n2),
    double divide(1:double n1, 2:double n2),
    
    double logaritmo(1:i64 num, 2:i64 base),
    double logaritmo_n(1:i64 num),
    double logaritmo10(1:i64 num),
    i64 modulo(1:i64 num, 2:i64 mod),
    i64 potencia(1:i64 num, 2:i64 exp),
    double raiz(1:double num, 2:i64 raiz),
    i64 factorial(1:i64 num),

    double grados_a_radianes(1:double grados),
    double radianes_a_grados(1:double radians),

    double seno(1:double grados),
    double coseno(1:double grados),
    double tangente(1:double grados),

    list<double> suma_vectorial(1:list<double> v1, 2:list<double> v2)
    list<double> resta_vectorial(1:list<double> v1, 2:list<double> v2)
    list<double> multiplica_por_escalar(1:list<double> v1, 2:double num)
    double producto_escalar(1:list<double> v1, 2:list<double> v2)
    list<double> producto_vectorial(1:list<double> v1, 2:list<double> v2)


    list<list<double>> suma_matricial(1:list<list<double>> m1, 2:list<list<double>> m2),
    list<list<double>> resta_matricial(1:list<list<double>> m1, 2:list<list<double>> m2),
    list<list<double>> mult_matricial(1:list<list<double>> m1, 2:list<list<double>> m2),
}