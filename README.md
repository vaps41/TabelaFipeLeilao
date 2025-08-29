Análise Completa de Veículos - Ferramenta de Consulta FIPE e Simulações
Este projeto é uma aplicação web front-end, desenvolvida em um único arquivo HTML, que serve como uma central de análise de custos para veículos. A ferramenta permite que o usuário consulte o valor de um veículo na Tabela FIPE e, a partir desse dado, realize diversas simulações financeiras, como análise de compra em leilão, estimativa de seguro, cálculo de IPVA e uma projeção de custos totais para os próximos 4 anos.

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
Abra o arquivo index.html em qualquer navegador web moderno.

Consulta Principal:

Selecione o Tipo de Veículo.

Aguarde o carregamento das Marcas e selecione uma.

Faça o mesmo para Modelo e Ano.

Análise dos Resultados:

Após selecionar o ano, o valor FIPE será exibido, junto com a primeira aba, Análise de Leilão.

Navegue entre as abas Simulador de Seguro, Simulador de IPVA e Projeção de Custos para realizar as demais análises.

Para habilitar a Projeção de Custos, é necessário primeiro calcular um valor nas abas de Seguro e IPVA.

Nova Consulta:

Clique no botão "Fazer Nova Consulta" para limpar todos os campos e resultados e começar novamente.

📂 Estrutura do Código
Todo o código está contido em um único arquivo HTML, organizado da seguinte forma:

<head>: Inclui os metadados, a importação do Tailwind CSS via CDN, fontes do Google Fonts e estilos CSS customizados para animações e ajustes finos.

<body>: Contém toda a estrutura HTML da aplicação, dividida entre o formulário de consulta e os containers de resultados (que ficam ocultos inicialmente).

<script>: Localizado no final do <body>, contém todo o código JavaScript responsável por:

Mapeamento de elementos do DOM.

Lógica para as chamadas à API FIPE.

Funções para popular, resetar e controlar os selects do formulário.

Lógica de navegação e exibição das abas.

Cálculos para todas as simulações.

Manipulação do DOM para exibir os resultados dinamicamente.
