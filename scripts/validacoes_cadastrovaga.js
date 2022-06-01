    /**     //função de validação dos campos
    function validar() {
        var nome = formcadastro.nome;
        var sobrenome = formcadastro.sobrenome;
        var email = formcadastro.email;
        var senha = formcadastro.senha;
        var confsenha = formcadastro.senha;
        let checkbox = document.getElementById('termosdeuso');

        if (nome.value == ""){
            $("#msg-error").html('<div class="msg-alert">Necessário prencher o campo nome!</div>');
            nome.focus();
            return false;
        } else if (sobrenome.value == ""){
            $("#msg-error").html('<div class="msg-alert">Necessário prencher o campo Sobrenome!</div>');
            sobrenome.focus();
            return false;
        } else if (email.value == ""){
            $("#msg-error").html('<div class="msg-alert">Necessário informar um email!</div>');
            email.focus();
            return false;
        }else if (email.value == ""){
            $("#msg-error").html('<div class="msg-alert">Necessário informar um email!</div>');
            email.focus();
            return false;
        } else if(!checkbox.checked) {
            $("#msg-error").html('<div class="msg-alert">Necessário aceitar os termos e politicas!</div>');
           
        } else{
            return true;
        }
    

     else if (senha.value = confsenha.value) {
            console.log("senha.value");
            console.log("confsenha.value");
            $("#msg-error").html('<div class="msg-alert">As senhas não coincidem</div>');
            senha.focus();
            return false;

    }

    const form = document.querySelector('form[name="formcadastro"]');
form.addEventListener("submit", function(event) {
    event.preventDefault(); //Cancelando o evento padrão

    const validated = validar(); //Executando a função de validação

    if (validated) {
        console.log("aqui")
        form.submit(); //Realizando o submit do formulário caso validação esteja correta
    }
}); */
    


    //select de estados e cidades
    const urlestados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const uf = document.getElementById("uf");
    const cidades = document.getElementById("cidade");

    uf.addEventListener('change', async function () {
        const urlCidades = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf.value+'/municipios';
        const request = await fetch(urlCidades);
        const response = await request.json();
        
        let options = ''
        response.forEach(function (cidades) {
            options += '<option>'+cidades.nome+'</option>'
        })
        cidades.innerHTML = options;
    })
        
    window.addEventListener('load', async ()=>{
        const request = await fetch(urlestados);
        const response = await request.json();

        const options = document.createElement('optgroup');
        //options.setAttribute('label', '');

        response.forEach(function(estado){
            //console.log(estado.nome);
            options.innerHTML += '<option>'+estado.sigla+'</option>';
        });

        uf.append(options);
        
});