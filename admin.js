const apiUrl = "http://localhost/cine_tech_ac/public"; // Altere se necessário

// Função para carregar os gêneros no formulário
async function carregarGeneros() {
  try {
    const res = await fetch(`${apiUrl}/listar-categorias`);
    const generos = await res.json();

    const selects = [
      document.getElementById("generoSelectCadastro"),
      document.getElementById("generoSelectAtualizar")
    ];

    selects.forEach(select => {
      select.innerHTML = '<option value="">Selecione um gênero</option>';
      generos.forEach(genero => {
        const option = document.createElement("option");
        option.value = genero.id;
        option.textContent = genero.nome;
        select.appendChild(option);
      });
    });

  } catch (error) {
    alert("Erro ao carregar gêneros: " + error);
  }
}

// Cadastrar Filme
document.getElementById("formCadastrar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch(`${apiUrl}/cadastrar-filme`, {
      method: "POST",
      body: formData
    });

    const resultado = await res.json();
    alert("Filme cadastrado: " + JSON.stringify(resultado));
    form.reset();
  } catch (error) {
    alert("Erro ao cadastrar filme: " + error);
  }
});

// Atualizar Filme
document.getElementById("formAtualizar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  const { id, ...resto } = dados;

  try {
    const res = await fetch(`${apiUrl}/atualizar-filme/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resto)
    });

    const resultado = await res.json();
    alert("Filme atualizado: " + JSON.stringify(resultado));
  } catch (error) {
    alert("Erro ao atualizar filme: " + error);
  }
});

// Deletar Filme
document.getElementById("formDeletar").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = e.target.id.value;

  try {
    const res = await fetch(`${apiUrl}/deletar-filme/${id}`, {
      method: "DELETE"
    });

    const resultado = await res.json();
    alert("Filme deletado: " + JSON.stringify(resultado));
  } catch (error) {
    alert("Erro ao deletar filme: " + error);
  }
});

// Listar Filmes
document.getElementById("btnListar").addEventListener("click", async () => {
  const lista = document.getElementById("listaFilmes");
  lista.innerHTML = "";

  try {
    const res = await fetch(`${apiUrl}/listar-filme`);
    const filmes = await res.json();

    filmes.forEach((filme) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `ID: ${filme.id} | Título: ${filme.titulo} | Gênero ID: ${filme.genero_id}`;
      lista.appendChild(li);
    });
  } catch (error) {
    alert("Erro ao listar filmes: " + error);
  }
});

// Carrega os gêneros automaticamente ao abrir a página
carregarGeneros();
