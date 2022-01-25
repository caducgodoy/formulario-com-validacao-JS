let validacao = {
    handleSubmit:(event) =>{
        event.preventDefault();
        let send = true;
        
        let inputs = form.querySelectorAll('input');

        validacao.clearErrors();

        for(let i =0; i<inputs.length;i++){
            let input = inputs[i];
            let check = validacao.checkInput(input);

            if(check !== true){
                send = false;
                //exibir erro
                validacao.showError(input, check);
            }
        }
        
        if(send){
            form.submit();
        }
    },

    checkInput:(input) =>{
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split(',');
            for(let i in rules){
                let rDetails = rules[i].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo Obrigatorio';
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo deve ter o minimo de ${rDetails[1]} caracteres`;
                        }
                    break;

                    case 'email':
                        if(input.value !== ''){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            
                            if(!regex.test(input.value.toLowerCase())){
                                return `Este email não é valido`; 
                            }
                        }
                    break;
                }
            }
        }
        return true
    },

    showError: (input, error) =>{
        //bordar vermelha quando nao atender a regra funcao check
        input.style.borderColor = '#ff0000';//acessando style e adicionando o color na borda
        //criando uma DIV no html quando NAO atender a regra "required" funcao check
        let errorElement = document.createElement('div');//cria a DIV
        errorElement.classList.add('error');//adiciona class="error"
        errorElement.innerHTML = error;//joga no DOM

        input.parentElement.insertBefore(errorElement , input.ElementSibling);// posiciona a msg depois do INPUT
    },

    clearErrors: ()=>{
        //remover as bordar vermelhas:
        let inputs = document.querySelectorAll('input');//seleciona todos ALL input
        for(let k=0;k < inputs.length;k++){//for para percorrer todos os inputs
            inputs[k].style = '';//removendo o stilo da borda
        }
        //TODAS as div que tiverem a classe Error e msg de erro vao ser removidas:
        let errorElements = document.querySelectorAll('.error');//seleciona todas as classes ERROR
        for(let i = 0; i< errorElements.length; i++){//for para percorrer todos as DIVs criadas na funcao SHOWERROR()
            errorElements[i].remove();//removendo todas as DIVS
        }
    }
};

let form = document.querySelector('.validator');// classe aplicada no FORM para fazer as verificações
form.addEventListener('submit', validacao.handleSubmit);//escutador SUBMIT, com o objeto que contem as funcoes:

/*      OBJETO COM AS FUNCOES:

        handleSubmit(event)
Contem o parametro event
        esta função contem a funcao:
event.preventDefault() - para nao enviar o formulario sem que tenha preenchido.

clearErrors() - que limpa as DIVs e Classes geradas por nao atender as Regras.
checkInput(input) - Funcao responsavel 

*/

// OBSERVAÇÔES PARA ESTUDO

/* input.parentElement.insertBefore(errorElement , input.ElementSibling); */

/* input. - seleciona o INPUT */
/* .parentElement - para voltar e pegar a TAG LABEL */
/* .insertBefore( DOIS PARAMENTROS ) para pegar a TAG depois do input */
/* primeiro parametro errorElement - div criada*/
/* segundo parametro input.ElementSubling = colocar o aviso abaixo da div selecionada "INPUT"*/