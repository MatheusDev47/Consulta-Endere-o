const cepField = document.getElementById('cep')
const btnSend = document.getElementById('send')

btnSend.onclick = () => consultCEP()

function validateCEP () {
    if(!cepField.value) return false
    return true
}

async function consultCEP () {
    const cep = cepField.value
    const url = `https://viacep.com.br/ws/${cep}/json/`
    try {
        if(validateCEP()) {
            const response = await axios(url)
            if(response.status !== 200) throw new Error('Erro ao consultar CEP')
            fillFields(response.data)
        }
    } catch (error) {
        showModal()
    }
}

function fillFields (data) {
    const address = document.getElementById('endereco')
    const district = document.getElementById('bairro')
    const city = document.getElementById('cidade')
    const uf = document.getElementById('estado')

    address.value = data.logradouro
    district.value = data.bairro
    city.value = data.localidade
    uf.value = data.uf
}

function showModal () {
    const modal = new bootstrap.Modal(document.getElementById('modalFeedback'))
    modal.show()
}







