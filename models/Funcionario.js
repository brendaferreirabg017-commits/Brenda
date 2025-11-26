import conexao from "../config/conexao.js";

const FuncionarioSchema = conexao.Schema({
    nome: { type: String, required: true },
    salario: { type: Number, required: true },
    cargo: { type: String, required: true },
    telefone: { type: String, required: true }
    

});
const Funcionario = conexao.model("Funcionario", FuncionarioSchema);
export default Funcionario