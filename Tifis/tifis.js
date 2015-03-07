var tablero, direccion;
var teclas =
{
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo =
{
	imagenURL:"fondo.png",
	imagenOK: false
};

var tifis =
{
	x: 100,
	y: 100,
	frenteURL: "diana-frente.png",
	frenteOK: false,
	atrasURL: "diana-atras.png",
	atrasOK: false,
	derURL: "diana-der.png",
	derOK: false,
	izqURL: "diana-izq.png", 
	izqOK: false,	
	velocidad: 20
};

var liz =
{
	lizURL: "liz.png",
	lizOK: false,
	x: 400,
	y: 200
};

function inicio()
{
	var canvas =document.getElementById("campo");
	tablero = canvas.getContext("2d");

	fondo.imagen = new Image();
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;//onload es un evento de carga
	
	var movimientos = {
		frente: {url:"frenteURL", 	onload: confirmarFrente},
		atras: 	{url:"atrasURL", 	onload: confirmarAtras},
		izq: 	{url:"izqURL", 		onload: confirmarIzq},
		der: 	{url:"derURL", 		onload: confirmarDer} 
	};
	
	for(var key in movimientos) {
		var movimiento = movimientos[key];
		tifis[key] = new Image ();
		tifis[key].src 		= tifis[movimiento.url];
		tifis[key].onload 	= movimiento.onload;
	}

//	var m = document.getElementById("mover");
//	m.addEventListener("click", movimiento);
 	liz.lizy = new Image();
 	liz.lizy.src = liz.lizURL;
 	liz.lizy.onload = confirmarLiz;

 	document.addEventListener("keydown", teclado);
}

function validaposicion(x,y)
{

	var valido = true;
	console.log (x,y);
	 // limite inferior y superior, derecha e izquierda
	if( y < 0 || y > 450 || x < 0 || x > 450)
	{
		valido = false;
	}

	//obstaculo 1
	if(x>=180 && x<=230 && y > 0 && y < 220)
	{
		valido= false;
	}

	//obstaculo 2
	if(x>=0 && x<=130 && y > 150  && y < 220)
	{
		valido= false;
	}
	//obstaculo 3
	if(x>=130 && x <=450 && y > 300 && y < 350)
	{
		valido= false;
	}
	return valido;
}
 
function teclado(datos)
{

	var codigo = datos.keyCode;
	var tifisx = tifis.x;
	var tifisy = tifis.y;

	if( codigo == teclas.UP)
	{
		tifisy -= tifis.velocidad;
	}

	if( codigo == teclas.DOWN)
	{
		tifisy += tifis.velocidad;		
	}

	if( codigo == teclas.LEFT)
	{
		tifisx -= tifis.velocidad;
	}

	if( codigo == teclas.RIGHT)
	{
		tifisx += tifis.velocidad;
	}

	if (validaposicion(tifisx, tifisy))
	{
		tifis.x = tifisx;
		tifis.y = tifisy;
	}

	direccion = codigo;
	dibujar(codigo);
}

function confirmarLiz()
{
	liz.lizOK = true;
	dibujar();
}

function confirmarFondo()
{
	fondo.imagenOK= true;
	dibujar();
} 	

function confirmarFrente()
{
	tifis.frenteOK = true;
	dibujar();
}

function confirmarAtras()
{
	tifis.atrasOK = true;
	dibujar();
}

function confirmarIzq()
{
	tifis.izqOK = true;
	dibujar();
}

function confirmarDer()
{
	tifis.derOK = true;
	dibujar();
}


function dibujar(direccion)
{
	//Capa 1: Fondo
	if (fondo.imagenOK)
	{
		tablero.drawImage(fondo.imagen, 0, 0);	
	}
	//Capa2. dibuja a Liz
	//Capa 3. Liz, lizOK es booleana no se necesita comparar
	if(liz.lizOK)
	{
		tablero.drawImage(liz.lizy, liz.x, liz.y);
	}
	
	// Capa 3. Diana
	if (tifis.frenteOK && tifis.atrasOK && tifis.derOK && tifis.izqOK)
	{
		var tifiDibujo = tifis.frente;
		
		var direcciones = {"UP":"atras", "DOWN":"frente", "LEFT":"izq", "RIGHT":"der"};
		
		for(var key in direcciones) {
			var item = direcciones[key];
			
			if(direccion == teclas[key])
			{
				tifiDibujo = tifis[item];
			}	
		} 
		
		tablero.drawImage(tifiDibujo, tifis.x, tifis.y);
	}
}

//function movimiento()
//{
//	tifis.x += 10;
//	dibujar();
//}