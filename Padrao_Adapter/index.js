// Changes XML to JSON
function xmlToJson(xml) {
    
        xml = xml.replace("<root>", "[ \n").replace("</root>", "]").split("\n");

        let json = "";
        xml.forEach(element => {
            if (element.indexOf("element") != -1 || element.indexOf("row") != -1 ){
                if (element.indexOf("/") != -1){
                    json += "},\n"
                }else{
                    json += "\n{\n"
                }
            }else if(element.indexOf("<") != -1){
                let baraId = element.indexOf("/")
                if( baraId != -1){
                    console.log(element[baraId])
                    element[baraId]= "*"
                    console.log(element)
                }
                let tag_valor = element.split("<")[1].split(">")
                json += `"${tag_valor[0]}": "${tag_valor[1]}",\n` 
            }else{
                json += element
            }

        })

    return json
}


/**
 * O destino define a interface específica do domínio usada pelo código do cliente.
 **/

class Target {
    constructor(){
        this.element = `
            [
                {
                    "nome": "Cleiton Luiz",
                    "idade": "21",
                    "email": "cleitonluiz2014@gmail.com"
                },
                {
                    "nome": "Fulano",
                    "idade": "00",
                    "email": "fulano@gmail.com"
                }
            ]`;
    }
    request() {
        return this.element; //"Alvo: o comportamento do alvo padrão."
    }

    update(){
        this.element = document.getElementById("JSON_txt").value;
    }
}

/**
 * O Adaptee contém alguns comportamentos úteis, mas sua interface é incompatível
 * com o código de cliente existente. O Adaptee precisa de alguma adaptação antes do
 * o código do cliente poder usá-lo.
 **/

class Adaptee {
    constructor(){
        this.element = document.getElementById("XML_txt").value;
    }
    specificRequest() {
        return this.element; // Saida estranha
    }

    update(){
        this.element = document.getElementById("XML_txt").value;
    }
}

/**
 * O Adaptador torna a interface do Adaptador compatível com o do Alvo
 * interface.
 **/

class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }
    request() {
        const result = xmlToJson(this.adaptee.specificRequest())
        document.getElementById('JSON_txt').innerHTML = result;
        return result;
    }
}

/**
 * O código do cliente suporta todas as classes que seguem a interface Target.
 **/
 function viwDados(dados){
    const obj = JSON.parse(dados)
    let html = ''
    for ( item of obj){
        
        html += `<li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <h6 class="my-0">${item.nome}</h6>
            <small class="text-muted">${item.email}</small>
        </div>
        <span class="text-muted">${item.idade}</span>
    </li>`;
    }
    document.getElementById("listView").innerHTML = html;

}


function clientCode() {
    const target = new Target(document.getElementById("XML_txt"));
    viwDados(target.request())
    
}


let adaptee = new Adaptee()
let adapter = new Adapter(adaptee)

toJson = () => {adapter.request()} 


// console.log('Cliente: Posso trabalhar muito bem com os objetos Alvo:');

// const adaptee = new Adaptee();
// console.log('Cliente: A classe Adaptee tem uma interface estranha. Veja, eu não entendo:');
// console.log(`Adaptee: ${adaptee.specificRequest()}`);

// console.log('');
// console.log('Cliente: Mas posso trabalhar com isso por meio do Adaptador: ');

// const adapter = new Adapter(adaptee);
// clientCode(adapter);