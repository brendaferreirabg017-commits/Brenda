import mongoose from "mongoose";

const url = "mongodb+srv://Aluno:123@cluster0.ac7dgph.mongodb.net/?appName=Cluster 0"

const conexao = await mongoose.connect(url);

export default conexao; 