<p align="center">
<!-- Substitua a URL abaixo por uma imagem ou GIF de demonstração da sua aplicação -->
<img src="https://www.google.com/search?q=https://placehold.co/800x400/e2e8f0/334155%3Ftext%3DDemonstra%25C3%25A7%25C3%25A3o%2Bda%2BFerramenta" alt="Demonstração da Ferramenta" width="700"/>
</p>

<h1 align="center">Análise Completa de Veículos</h1>

<p align="center">
Uma ferramenta web completa para consulta da Tabela FIPE, análise de leilão, simulação de seguro, cálculo de IPVA e projeção de custos.
</p>

<p align="center">
<img alt="HTML5" src="https://www.google.com/search?q=https://img.shields.io/badge/HTML5-E34F26%3Fstyle%3Dfor-the-badge%26logo%3Dhtml5%26logoColor%3Dwhite"/>
<img alt="Tailwind CSS" src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite"/>
<img alt="JavaScript" src="https://www.google.com/search?q=https://img.shields.io/badge/JavaScript-F7DF1E%3Fstyle%3Dfor-the-badge%26logo%3Djavascript%26logoColor%3Dblack"/>
</p>

📖 Sobre o Projeto
Este projeto é uma aplicação web front-end, desenvolvida em um único arquivo HTML, que serve como uma central de análise de custos para veículos. A ferramenta permite que o usuário consulte o valor de um veículo na Tabela FIPE e, a partir desse dado, realize diversas simulações financeiras para auxiliar na tomada de decisão de compra.

✨ Funcionalidades
A aplicação é dividida em um fluxo intuitivo, começando pela consulta FIPE e se desdobrando em várias análises:

Consulta à Tabela FIPE:

Seleção de tipo de veículo (Carros, Motos, Caminhões).

Busca encadeada e dinâmica de Marcas, Modelos e Anos.

Exibição do valor FIPE atualizado, consumindo uma API pública em tempo real.

Análise para Leilão:

Calcula o lance máximo sugerido para uma compra vantajosa (definido como 55% abaixo do valor FIPE).

Mostra a taxa do leiloeiro (5% sobre o lance).

Apresenta o custo total estimado da arrematação.

Simulador de Seguro:

Calcula um prêmio de seguro estimado com base em múltiplos fatores.

Parâmetros de entrada: Origem do veículo, idade do motorista, localização (capital/interior) e tipo de cobertura.

Aplica ajustes percentuais sobre um prêmio base (5% da FIPE) e exibe todos os fatores considerados no cálculo.

Emite um alerta para veículos com histórico de sinistro.

Simulador de IPVA:

Estima o valor do IPVA com base no valor FIPE.

Permite ao usuário selecionar qualquer estado do Brasil.

Aplica a alíquota correspondente ao estado selecionado e a exibe no resultado.

Projeção de Custos (4 Anos):

Gera uma tabela com a previsão de gastos anuais para os próximos 4 anos.

Custos considerados: Depreciação (taxa fixa de 10% a.a.), Seguro e IPVA (recalculados anualmente sobre o valor depreciado).

Apresenta o custo total no período e uma média de gasto mensal, oferecendo uma visão completa do investimento a longo prazo.

🛠️ Tecnologias Utilizadas
O projeto foi intencionalmente mantido em um único arquivo para simplicidade e portabilidade, utilizando tecnologias web padrão.

HTML5: Estrutura semântica do conteúdo.

Tailwind CSS: Framework CSS utility-first para uma estilização rápida e responsiva.

JavaScript (Vanilla): Manipulação do DOM, lógica das simulações e comunicação com a API.

FIPE API: Os dados da Tabela FIPE são consumidos da API pública https://parallelum.com.br/fipe/api/v1.

🚀 Como Utilizar
Clone o repositório:

git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

Abra o arquivo index.html em qualquer navegador web moderno.

O uso da aplicação é direto:

Consulta Principal:

Selecione o Tipo de Veículo.

Aguarde o carregamento das Marcas e selecione uma.

Faça o mesmo para Modelo e Ano.

Análise dos Resultados:

Após selecionar o ano, o valor FIPE será exibido.

Navegue entre as abas para realizar as simulações desejadas.

Para habilitar a Projeção de Custos, é necessário primeiro calcular um valor nas abas de Seguro e IPVA.

🤝 Contribuição
Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será muito apreciada.

Faça um Fork do projeto

Crie uma Branch para sua modificação (git checkout -b feature/FuncionalidadeIncrivel)

Faça o Commit de suas mudanças (git commit -m 'Adiciona FuncionalidadeIncrivel')

Faça o Push da Branch (git push origin feature/FuncionalidadeIncrivel)

Abra um Pull Request

📝 Licença
Distribuído sob a licença MIT. Veja o arquivo LICENSE para mais informações.
