// Bibliotecas e códigos de terceiros
const formatador = (data) => {
    return {
        dia: {
            numerico: dayjs(data).format('DD'),

            semana:
            {
                curto: dayjs(data).format('ddd.'),
                longo: dayjs(data).format('dddd'),
            }
        },
        mes: dayjs(data).format('MMMM'),
        hora: dayjs(data).format('HH:mm')
    }
}

// Object
const atividade = {
   /*  nome: "Almoço",
    data: new Date("2024-07-09 20:07"),
    finalizada: true */
}

// lista, array, vetor []
let atividades = [
   /*  atividade, */
  /*   {
        nome: 'Academia em grupo',
        data: new Date("2024-07-09 20:03"),
        finalizada: true
    },

    {
        nome: 'Gaming session',
        data: new Date("2024-07-13 10:00"),
        finalizada: false
    },
    {
        nome: 'Jantar',
        data: new Date("2024-07-12 19:00"),
        finalizada: false
    }, */
]

/* atividades = [] */

const criarItemDeAtividade = (atividade) => {
    let input = `
    <input 
    onchange="concluirAtividade(event)"
    value="${atividade.data}"
    type="checkbox"
    `
    if (atividade.finalizada) {
        input += 'checked'
    }

    input += '>'
    const formatar = formatador(atividade.data);

    return `
        <div class="card-bg">
            ${input}
            
            <div>
            <img src="/src/checked.svg" class="active">

            <img src="/src/unchecked.svg" class="inactive">

            <span>${atividade.nome}</span>
            </div>

            <time class="short">
                ${formatar.dia.semana.curto}
                ${formatar.dia.numerico} <br>            
                ${formatar.hora}h
            </time>

            <time class="full">
                ${formatar.dia.semana.longo}  
                dia ${formatar.dia.numerico}
                de ${formatar.mes}
                ás ${formatar.hora}h.            
            </time>
        </div>
    `
}

const atualizarListaDeAtividades = () => {
    //coleta de dados
    const section = document.querySelector('section')
    section.innerHTML = ''


    // verificar se a lista está vazia
    if (atividades.length == 0) {
        section.innerHTML = `<p>Nenhuma atividade cadastrada</p>`
        return
    }


    // estrutura de repetição - for
    for (let atividade of atividades) {
        section.innerHTML += criarItemDeAtividade(atividade)
    }

}

atualizarListaDeAtividades();

const salvarAtividade = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const nome = dadosDoFormulario.get('atividade')
    const dia = dadosDoFormulario.get('dia')
    const hora = dadosDoFormulario.get('hora')
    const data = `${dia} ${hora}`

    const novaAtividade = {
        nome,
        data,
        finalizada: false
    }

    const atividadeExiste = atividades.find((atividade) => {
        return atividade.data == novaAtividade.data
    })
    if (atividadeExiste) {
        return alert('Dia/Hora não disponível')
    }

    atividades = [novaAtividade, ...atividades]
    atualizarListaDeAtividades()
}

const criarDiasSelecao = () => {
    const dias = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]

    let diasSelecao = ''

    for(let dia of dias) {
        const formatar = formatador(dia)
        const diaFormatado = `${formatar.dia.numerico} de ${formatar.mes}`

        diasSelecao +=
            `
            <option value="${dia}"> ${diaFormatado} </option>

        `
    }

    document
        .querySelector('select[name="dia"]')
        .innerHTML = diasSelecao
}
criarDiasSelecao();

const criarHorasSelecao = () => {
    let horasDisponiveis = ''

    for (let i = 1; i < 24; i++) {
        const hora = String(i).padStart(2, '0')
        horasDisponiveis += `<option value="${hora}:00"> ${hora}:00 </option>`
        horasDisponiveis += `<option value="${hora}:30"> ${hora}:30 </option>`
    }

    document
        .querySelector('select[name="hora"]')
        .innerHTML = horasDisponiveis
}
criarHorasSelecao();

const concluirAtividade = (event) => {
    const input = event.target
    const dataDesteInput = input.value

    const atividade = atividades.find((atividade) => {
        return atividade.data = dataDesteInput
    })
    
    if(!atividade){
        return
    }

    atividade.finalizada = !atividade.finalizada
}