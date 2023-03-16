const unidade_de_comparacao_simples_falsa = {
    primeiro_componente: 10,
    segundo_componente:2,
    tipo_de_comparacao:"==",
    tipo_de_unidade:"simples"
}

const unidade_de_comparacao_simples_verdadeira = {
    primeiro_componente: 10,
    segundo_componente:2,
    tipo_de_comparacao:">",
    tipo_de_unidade:"simples"
}

const unidade_de_comparacao_composta_falsa = {
    primeiro_componente: unidade_de_comparacao_simples_falsa,
    segundo_componente:unidade_de_comparacao_simples_verdadeira,
    tipo_de_comparacao:"and",
    tipo_de_unidade:"composta"
}

const unidade_de_comparacao_duplamente_composta_verdadeira = {
    primeiro_componente: unidade_de_comparacao_composta_falsa,
    segundo_componente:unidade_de_comparacao_composta_falsa,
    tipo_de_comparacao:"or not",
    tipo_de_unidade:"composta"
}

const unidade_de_comparacao_principal = {
    primeiro_componente:unidade_de_comparacao_composta_falsa,
    segundo_componente:unidade_de_comparacao_duplamente_composta_verdadeira,
    tipo_de_comparacao: "or",
    tipo_de_unidade:"composta"
}

const condicional = {
    unidade_de_comparacao:unidade_de_comparacao_principal,
    task_verdadeiro:"id_task1",
    task_falso:"id_task2"
}

const retornar_resultado_de_unidade_de_comparacao_simples = (comparacao) => {
    let primeiro_valor = comparacao.primeiro_componente;
    let segundo_valor = comparacao.segundo_componente;
    let resultado;

    switch (comparacao.tipo_de_comparacao) {
        case "==": 
            resultado = primeiro_valor === segundo_valor;
            break;
        case "!=": 
            resultado = primeiro_valor !== segundo_valor;
            break;
        case "<": 
            resultado = primeiro_valor < segundo_valor;
            break;
        case ">": 
            resultado = primeiro_valor > segundo_valor;
            break;
        case "!<": 
            resultado = !(primeiro_valor < segundo_valor);
            break;
        case "!>": 
            resultado = !(primeiro_valor > segundo_valor);
            break;
    }
    
    return resultado
}

const retornar_resultado_de_unidade_de_comparacao_composta = (comparacao) => {
    let resultado;

    switch (comparacao.tipo_de_comparacao) {
        case "or":
            resultado = retornarResultadoDeUnidadeDeComparacao(comparacao.primeiro_componente) || retornarResultadoDeUnidadeDeComparacao(comparacao.segundo_componente);
            break;

        case "or not":
            resultado = retornarResultadoDeUnidadeDeComparacao(comparacao.primeiro_componente) || !retornarResultadoDeUnidadeDeComparacao(comparacao.segundo_componente);
            break;

        case "and":
            resultado = retornarResultadoDeUnidadeDeComparacao(comparacao.primeiro_componente) && retornarResultadoDeUnidadeDeComparacao(comparacao.segundo_componente);
            break;
        case "and not":
            resultado = retornarResultadoDeUnidadeDeComparacao(comparacao.primeiro_componente) && !retornarResultadoDeUnidadeDeComparacao(comparacao.segundo_componente);
            break;
    }
    
    return resultado
}

const retornarResultadoDeUnidadeDeComparacao = (condicional_recebida) => {
    if(condicional_recebida.tipo_de_unidade === "simples"){
        return retornar_resultado_de_unidade_de_comparacao_simples(condicional_recebida)
    }else{
        return retornar_resultado_de_unidade_de_comparacao_composta(condicional_recebida)
    }
}

const resultado_final = retornarResultadoDeUnidadeDeComparacao(condicional.unidade_de_comparacao);
console.log(resultado_final)
