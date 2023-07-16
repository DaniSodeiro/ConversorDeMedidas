// Definição das variaveis 
let formulario = document.querySelector('#formulario');
let categoriaSelect = document.querySelector('#categoria');
let unidadeOrigemSelect = document.querySelector('#unidadeOrigem');
let unidadeDestinoSelect = document.querySelector('#unidadeDestino');
let resultadoSpan = document.querySelector('#resultado');

// Definição das unidades disponíveis para cada categoria
let unidades = {
    comprimento: ['metros', 'centimetros', 'polegadas'],
    peso: ['quilogramas', 'gramas', 'libras'],
    temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
};

// Função para atualizar as opções das unidades de origem e destino
function atualizarUnidades() {
    let categoria = categoriaSelect.value;
    unidadeOrigemSelect.innerHTML = '';
    unidadeDestinoSelect.innerHTML = '';
    for (let unidade of unidades[categoria]) {
        unidadeOrigemSelect.appendChild(new Option(unidade, unidade));
        unidadeDestinoSelect.appendChild(new Option(unidade, unidade));
    }
}

// Função de conversão
function converter() {
    resultadoSpan.textContent = '...';
}

//  formulário
formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    converter();
});

// categoria selecionada
categoriaSelect.addEventListener('change', atualizarUnidades);

// Chamada inicial para atualizar as unidades
atualizarUnidades();

// Função de conversão para a categoria 'comprimento'
function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
    let conversoes = {
        'metros': {
            'centimetros': valor => valor * 100,
            'polegadas': valor => valor * 39.3701
        },
        'centimetros': {
            'metros': valor => valor / 100,
            'polegadas': valor => valor / 2.54
        },
        'polegadas': {
            'metros': valor => valor / 39.3701,
            'centimetros': valor => valor * 2.54
        }
    };
    return conversoes[unidadeOrigem][unidadeDestino](valor);
}

// Função de conversão para a categoria 'peso'
function converterPeso(valor, unidadeOrigem, unidadeDestino) {
    let conversoes = {
        'quilogramas': {
            'gramas': valor => valor * 1000,
            'libras': valor => valor * 2.20462
        },
        'gramas': {
            'quilogramas': valor => valor / 1000,
            'libras': valor => valor / 453.592
        },
        'libras': {
            'quilogramas': valor => valor / 2.20462,
            'gramas': valor => valor * 453.592
        }
    };
    return conversoes[unidadeOrigem][unidadeDestino](valor);
}

// Função de conversão para a categoria 'temperatura'
function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
    let conversoes = {
            'Celsius': {
            'Fahrenheit': valor => valor * 1.8 + 32,
            'Kelvin': valor => valor + 273.15
        },
            'Fahrenheit': {
            'Celsius': valor => (valor - 32) / 1.8,
            'Kelvin': valor => (valor + 459.67) * (5 / 9)
        },
            'Kelvin': {
            'Celsius': valor => valor - 273.15,
            'Fahrenheit': valor => valor * (9 / 5) - 459.67
        }
    };
    return conversoes[unidadeOrigem][unidadeDestino](valor);
}

function converter() {
    let valor = parseFloat(document.querySelector('#valor').value);
    let categoria = document.querySelector('#categoria').value;
    let unidadeOrigem = document.querySelector('#unidadeOrigem').value;
    let unidadeDestino = document.querySelector('#unidadeDestino').value;
    let resultado;
    if (categoria === 'comprimento') {
        resultado = converterComprimento(valor, unidadeOrigem, unidadeDestino);
    } else if (categoria === 'peso') {
        resultado = converterPeso(valor, unidadeOrigem, unidadeDestino);
    } else if (categoria === 'temperatura') {
        resultado = converterTemperatura(valor, unidadeOrigem, unidadeDestino);
    }

    resultadoSpan.textContent = resultado;
}




