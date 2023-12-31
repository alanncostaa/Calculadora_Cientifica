const anteriorOperacao = document.querySelector("#anterior-operacao");
const atualOperacao = document.querySelector("#digitada-operacao");
const botoes = document.querySelectorAll("#buttons-container button");

class Calculadora{

    constructor(anteriorOperacao, atualOperacao){
        this.anteriorOperacao = anteriorOperacao;
        this.atualOperacao = atualOperacao;
        this.noMomento = "";
    }

    addDigito(digito){

        if(digito === "." && this.atualOperacao.innerText.includes(".")){
            return;
        }

        this.noMomento = digito;
        this.atualizarTela();

    }

    processarOp(operacao){


        if(this.atualOperacao.innerText === "" && operacao !== "C"){
            if(this.anteriorOperacao.innerText !== ""){
                this.mudarOp(operacao);
            }
            return;
        }


        let valorOperacao;
        let antiga = +this.anteriorOperacao.innerText.split(" ")[0];
        let atual = +this.atualOperacao.innerText;

        switch(operacao){
            case "+":
                valorOperacao = antiga + atual;
                this.atualizarTela(valorOperacao, operacao, atual, antiga);
                break;

            case "-":
                valorOperacao = antiga - atual;
                this.atualizarTela(valorOperacao, operacao, atual, antiga);
                break;
            case "x":
                valorOperacao = antiga * atual;
                this.atualizarTela(valorOperacao, operacao, atual, antiga);
                break;
            case "÷":
                if(atual === 0){
                    alert("Não é possivel realizar divisao por 0")
                }else{
                    valorOperacao = antiga / atual;
                    this.atualizarTela(valorOperacao, operacao, atual, antiga);
                }
                
                break;
            case "√":
                valorOperacao = Math.sqrt(atual);
                this.atualizarTela(valorOperacao, operacao, atual, atual);
                break;
            case "^":
                valorOperacao = antiga ** atual;
                this.atualizarTela(valorOperacao, operacao, atual, antiga);
                break;
            case "DEL":
                this.processarDel();
                break;
            case "C":
                this.processarC();
                break;
            case "=":
                this.processarIgual();
                break;
            default:
                return;
        }

    }

    atualizarTela(valorOperacao = null, operacao = null, atual = null, antiga = null){

        if(valorOperacao === null ){
            this.atualOperacao.innerText += this.noMomento;
        }else{
            if(antiga === 0){
                valorOperacao = atual;
            }

            this.anteriorOperacao.innerText = `${valorOperacao} ${operacao}`;
            this.atualOperacao.innerText = "";
        }

        console.log(valorOperacao, operacao, atual, antiga);

        

    }

    mudarOp(operacao){
        const opMat = ["+", "-", "x", "÷", "^", "√"];

        if(!opMat.includes(operacao)){
            return;
        }

        this.anteriorOperacao.innerText = this.anteriorOperacao.innerText.slice(0, -1) + operacao;
    }

    processarC(){
        this.atualOperacao.innerText = "";
        this.anteriorOperacao.innerText = "";
    }

    processarDel(){
        this.atualOperacao.innerText = this.atualOperacao.innerText.slice(0, -1);
    }

    processarIgual(){

        let operacao = this.anteriorOperacao.innerText.split(" ")[1];
        this.processarOp(operacao);
    }

}

const calc = new Calculadora(anteriorOperacao, atualOperacao);

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) =>{

        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            calc.addDigito(value);
        }else{
            calc.processarOp(value);
        }

        
    })
})

