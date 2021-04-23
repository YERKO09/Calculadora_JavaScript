const btn_numero = document.getElementsByName("numero");//todos los numero en array
const btn_operacion = document.getElementsByName("operacion");//todas las operaciones en array
//Al llamar a los elementos por su nombre (getElementsByName) se consideran como un array,
//por lo que se puede llamar a un elemento y su posicion exacta y recorrer en bucles
const btn_igual = document.getElementsByName("igual")[0];
const btn_clear = document.getElementsByName("clear")[0];
var resul = document.getElementById("resul");
var resul2 = document.getElementById("resul2");
var operandoA = '';
var operandoB = '';
var operacion = undefined;


btn_numero.forEach(boton => { 
    boton.addEventListener('click', function(){//boton obtiene al elemento en el array
        agregarNumero(boton.innerText)//recibe el texto interno del boton
        //se puede hacer con .innerHTML y textContent(aunque tienen sus diferencias)
        console.log("opeA", operandoA)
        console.log("opeB", operandoB)
        
    })
});

btn_operacion.forEach(boton => {
    boton.addEventListener('click', function(){
        seleccionaOperacion(boton.innerText)
        actualizarPantalla()
        console.log("operacion",operacion)
        
    })
});

btn_igual.addEventListener('click', function(){// ya que es un solo elemento no es necesario crear el bucle
    calcular();
    actualizarPantalla();
});


btn_clear.addEventListener('click', function(){
    Clear();
    actualizarPantalla();
})

function seleccionaOperacion(op){
    if(op === '+-'){ /////////////VALIDACION PARA SIGNO +-/////////////////////////////////////////
        op = '-'
        if(operandoB.includes("-"))return ////////////////REPETICION DE SIGNO +-//////////////////
        return operandoB = op + operandoB
    }   

    if(op === '^'){ /////////////VALIDACION PARA SIGNO ^/////////////////////////////////////////
        op = '^(2)'
    }   


    //if(operandoB === '')return;
    if(operandoA !== '' || operandoB === ''){//permite calcular si el display superior tiene contenido y el display
        calcular();//inferior esta vacio, util para ingresar otra operacion despues de raiz cuadrada o potencia 
    }
    //se definen para la funcion calcular()
    operacion = op.toString();
    operandoA = operandoB + operacion;/////////////CONCATENACION DE SIGNO DE OPERACION AL DISPLAY SUPERIOR/////////////////////////
    /*operandoB = operandoB;*/
    operandoB = '';
}

function calcular(){
    var calculo;//donde se almacena el calculo de cualquiera de las operaciones
    const anterior = parseFloat(operandoA);//se transforman los valores string a flotante
    const actual = parseFloat(operandoB);//y se guardan ya como numeros en la nueva variable.
    //pregunta si los valores son numericos
    if(isNaN(anterior) && isNaN(actual)) return operandoB = "ERROR-ISNAN!";
    switch(operacion){
        case "+" : calculo = anterior + actual;
        break;
        case "-" : calculo = anterior - actual;
        break;
        case "x" : calculo = anterior * actual;
        break;
        case "/" : calculo = anterior / actual;
        break;
        case "√" : calculo = Math.sqrt(anterior);
        break; 
        case "^(2)" : calculo = anterior * anterior;
                    
        break; 
        default:
            return;       
    }
    
    operandoB = calculo;
    operandoA = '';
    operacion = undefined;
}

function agregarNumero(numero){
    if(numero === "." && operandoB.includes("."))return; //////////////VALIDACION___PUNTO///////////////////////////////////////
    operandoB = operandoB.toString() + numero.toString();
    //se transforma en string para concatenar y no sumar los numeros que entran
    actualizarPantalla();
}

function Clear(){
    operandoB = '';
    operandoA = '';
    operacion = undefined;
}

function actualizarPantalla(){
    resul.value = operandoB;
    resul2.value = operandoA;////////////////////////////////SEGUNDO DISPLAY/////////////////////////////////////////////
}