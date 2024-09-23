const cep = document.getElementById('cep')
const telefone = document.getElementById('telefone')
const numero = document.getElementById('numero')
const petField = document.getElementById('pets')
const addButton = document.getElementById('novoPet')
const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
let pets = []
let contPet = 0

function rmCad(id){
    const myDiv = document.getElementById('divId' + id)
    myDiv.remove()
}

function fillPetField(id, petCad){
    let inn = petCad.elem
    const elem = document.createElement('div')
    elem.innerHTML = inn
    elem.id = 'divId' + id;
    petField.appendChild(elem)

}

function addPet(){
    let id = contPet;
    const petCad = {elem: '<div class="petCad"><div class="inputCad"><select class="selectBoxCad" ><option value="0">Animal</option><option value="1">Cachorro</option><option value="2">Gato</option><option value="3">Outro</option></select></div><div class="inputCad"><input class="nome dados" type="text" name="nomePet" id="nomePet' + id + '" placeholder="Nome"></div><div class="selGen"><input type="radio" id="Macho' + id + '" name="sexo" value="Macho"><label for="Macho">Macho</label><br><input type="radio" id="Femea' + id + '" name="sexo" value="Femea"><label for="Femea">Fêmea</label><br><input class="idade" type="number" name="idade" id="idade' + id + '" placeholder="idade"></div><input class="rmButton" type="button" value="❌" id="botao' + id + '"></div>', id: id};
    contPet++;
    pets.push(petCad)
    
    fillPetField(id, petCad)

    const idBotao = 'botao' + id;
    const botao = document.getElementById(idBotao)

    botao.addEventListener('click', () => rmCad(id))

}

function cepChange(e){
    
    if(e.key == 'Backspace'){
        return;
    }
    
    let valor = e.target.value
    let final = ''
    
    for(let c of valor){
        if(c in numeros){
            final += c
        }
        if(final.length == 5){
            final += '-'
        }
        if(final.length == 9){
            break;
        }
    }
    
    e.target.value = final
}

function telefoneChange(e){
    if(e.key == 'Backspace'){
        return;
    }
    
    let valor = e.target.value
    let final = ''

    for(let c of valor){
        
        if(final.length == 0){
            final += '('
        }
        
        if(c in numeros){
            final += c
        }

        if(final.length == 3){
            final += ')'
        }

        if(final.length == 9){
            final += '-'
        }
        if(final.length == 14){
            break;
        }
    }
    
    e.target.value = final

}

function numeroChange(e){
    if(e.key == 'Backspace'){
        return;
    }
    
    let valor = e.target.value
    let final = ''

    for(let c of valor){
        if(c in numeros){
            final += c
        }
    }
    
    e.target.value = final
}

addPet()

cep.addEventListener('keyup',cepChange);
telefone.addEventListener('keyup', telefoneChange);
numero.addEventListener('keyup', numeroChange);
addButton.addEventListener('click', addPet)