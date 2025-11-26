import conexao from "../config/conexao.js";

const ObraSchema = conexao.Schema({
    nome: { type: String, required: true },
    nomeartista: { type: String, required: true },
    materiais: { type: String, required: true },
    dataobra: { type: Date, required: true },
     foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
        }

});

const Obra = conexao.model("Obra", ObraSchema);
export default Obra
