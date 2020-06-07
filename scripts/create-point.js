
    function populateUfs(){ 
        const ufSelect=document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json() )
        .then(states =>{

            for(const state of states) {
                ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
            }
        })
    }

    populateUfs()

    function getCities(event){
        const citySelect=document.querySelector("[name=city]")
        const stateInput =document.querySelector("[name=city]")

        const ufValue = event.target.value
        
        const indexOfselectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfselectedState].text


        const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
        
        citySelect.innerhtml = "<option value>Selecione a Cidade</opition>"
        citySelect.dieabled = true

        fetch(url)
        .then(res => res.json() )
        .then(cities =>{

            for(const city of cities) {
                citySelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
        })


    }



    document
        .querySelector("select[name=uf]")
        .addEventListener("change",getCities)


    // Itens de coleta
    const itemsToCollect = document.querySelectorAll(".items-grid li")


    for (const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
       
    }

    const collectedItems = document.querySekector("input[name=items]")

    let selectedItems = []

    function handleSelectedItem(event) {
        const itemLi = event.target
        // adicionar ou remover uma classe com javascript
        itemLi.classList.toggle("selected")
        
        const itemId = itemLi.dataset.id

        //verificar se existem itens selecionados, se sim
        //pegar os selecionados
        const alreadySelected = selectedItems.findIndex(item =>{
            const itemFound =item == itemId //isso será true ou false
            return itemFound
        })

        //se ja estiver selecionados,
        if(alreadySelected >= 0){
    //tirar da seleção
      const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
    return itemIsDifferent
    })
     selectedItems = filteredItems
    } else{
            //se não estiver selecionado
            // adicionarà seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido dom os itens selecionados
   collectedItems.value = selectedItems






}