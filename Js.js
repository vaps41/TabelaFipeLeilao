        const API_BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

        // Elementos do DOM
        const vehicleTypeSelect = document.getElementById('vehicleType');
        const brandSelect = document.getElementById('brand');
        const modelSelect = document.getElementById('model');
        const yearSelect = document.getElementById('year');
        const resultsContainer = document.getElementById('results-container');
        const loader = document.getElementById('loader');
        const errorDiv = document.getElementById('error');
        const resetButton = document.getElementById('resetButton');
        
        // Elementos das Abas
        const tabLeilao = document.getElementById('tab-leilao');
        const tabSeguro = document.getElementById('tab-seguro');
        const tabIpva = document.getElementById('tab-ipva');
        const tabCustos = document.getElementById('tab-custos');
        const contentLeilao = document.getElementById('tab-content-leilao');
        const contentSeguro = document.getElementById('tab-content-seguro');
        const contentIpva = document.getElementById('tab-content-ipva');
        const contentCustos = document.getElementById('tab-content-custos');

        // Elementos do Simulador de Seguro
        const vehicleOriginSelect = document.getElementById('vehicleOrigin');
        const driverAgeInput = document.getElementById('driverAge');
        const locationSelect = document.getElementById('location');
        const coverageTypeSelect = document.getElementById('coverageType');
        const calculateInsuranceBtn = document.getElementById('calculateInsuranceBtn');
        const insuranceWarning = document.getElementById('insurance-warning');
        const insuranceResultContainer = document.getElementById('insurance-result-container');
        const insuranceAnnual = document.getElementById('insurance-annual');
        const insuranceMonthly = document.getElementById('insurance-monthly');
        const insuranceAdjustments = document.getElementById('insurance-adjustments');
        
        // Elementos do IPVA
        const stateSelect = document.getElementById('stateSelect');
        const ipvaResultContainer = document.getElementById('ipva-result-container');
        const ipvaResult = document.getElementById('ipva-result');
        const ipvaRateInfo = document.getElementById('ipva-rate-info');
        
        // Elementos da Projeção de Custos
        const calculateProjectionBtn = document.getElementById('calculateProjectionBtn');
        const projectionHelperText = document.getElementById('projection-helper-text');
        const projectionResultContainer = document.getElementById('projection-result-container');
        const projectionTableBody = document.getElementById('projection-table-body');
        const projectionTotalCost = document.getElementById('projection-total-cost');
        const projectionMonthlyCost = document.getElementById('projection-monthly-cost');


        let currentFipeValue = 0;
        let annualInsuranceCost = 0;
        let annualIpvaCost = 0;
        let selectedIpvaRate = 0;

        // Alíquotas de IPVA
        const ipvaRates = {
            'AC': 2, 'AL': 3, 'AP': 3, 'AM': 3, 'BA': 2.5, 'CE': 3.5, 'DF': 3.5, 'ES': 2,
            'GO': 3.75, 'MA': 2.5, 'MT': 3, 'MS': 3.5, 'MG': 4, 'PA': 2.5, 'PB': 2.5,
            'PR': 3.5, 'PE': 2.4, 'PI': 2.5, 'RJ': 4, 'RN': 3, 'RS': 3, 'RO': 3,
            'RR': 3, 'SC': 2, 'SP': 4, 'SE': 2.5, 'TO': 2
        };
        
        // Funções de UI
        function toggleLoader(show) { loader.classList.toggle('hidden', !show); }
        function showError(message) { errorDiv.textContent = message; errorDiv.classList.remove('hidden'); }
        function clearError() { errorDiv.classList.add('hidden'); }
        function hideResults() { resultsContainer.classList.add('hidden'); }
        function formatCurrency(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
        function parseCurrency(valueString) { return parseFloat(valueString.replace('R$ ', '').replace(/\./g, '').replace(',', '.')); }

        // Lógica das Abas
        function switchTab(activeTab) {
            const tabs = {
                leilao: { btn: tabLeilao, content: contentLeilao },
                seguro: { btn: tabSeguro, content: contentSeguro },
                ipva:   { btn: tabIpva,   content: contentIpva },
                custos: { btn: tabCustos, content: contentCustos }
            };

            for (const key in tabs) {
                const is_active = key === activeTab;
                tabs[key].btn.classList.toggle('border-blue-500', is_active);
                tabs[key].btn.classList.toggle('text-blue-600', is_active);
                tabs[key].btn.classList.toggle('border-transparent', !is_active);
                tabs[key].btn.classList.toggle('text-gray-500', !is_active);
                tabs[key].content.classList.toggle('hidden', !is_active);
            }
        }

        tabLeilao.addEventListener('click', () => switchTab('leilao'));
        tabSeguro.addEventListener('click', () => switchTab('seguro'));
        tabIpva.addEventListener('click', () => switchTab('ipva'));
        tabCustos.addEventListener('click', () => switchTab('custos'));

        // Lógica Principal
        async function fetchData(url) {
            toggleLoader(true);
            clearError();
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Não foi possível obter os dados.');
                return await response.json();
            } catch (err) {
                showError(err.message);
                return null;
            } finally {
                toggleLoader(false);
            }
        }

        function populateSelect(select, data, defaultText) {
            select.innerHTML = `<option value="">${defaultText}</option>`;
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.codigo;
                option.textContent = item.nome;
                select.appendChild(option);
            });
            select.disabled = false;
        }

        function resetSelect(select, defaultText) {
            select.innerHTML = `<option value="">${defaultText}</option>`;
            select.disabled = true;
        }

        function resetForm() {
            hideResults();
            clearError();
            vehicleTypeSelect.value = '';
            resetSelect(brandSelect, 'Selecione a marca');
            resetSelect(modelSelect, 'Selecione o modelo');
            resetSelect(yearSelect, 'Selecione o ano');
            
            driverAgeInput.value = '';
            insuranceResultContainer.classList.add('hidden');
            insuranceResultContainer.classList.remove('visible');
            
            ipvaResultContainer.classList.add('hidden');
            stateSelect.value = '';
            
            projectionResultContainer.classList.add('hidden');
            calculateProjectionBtn.disabled = true;
            projectionHelperText.classList.remove('hidden');

            annualInsuranceCost = 0;
            annualIpvaCost = 0;
            selectedIpvaRate = 0;

            switchTab('leilao');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Event Listeners FIPE
        vehicleTypeSelect.addEventListener('change', async () => {
            hideResults();
            resetSelect(brandSelect, 'Selecione a marca');
            if (vehicleTypeSelect.value) {
                const brands = await fetchData(`${API_BASE_URL}/${vehicleTypeSelect.value}/marcas`);
                if (brands) populateSelect(brandSelect, brands, 'Selecione a marca');
            }
        });
        brandSelect.addEventListener('change', async () => {
            hideResults();
            resetSelect(modelSelect, 'Selecione o modelo');
            if (brandSelect.value) {
                const data = await fetchData(`${API_BASE_URL}/${vehicleTypeSelect.value}/marcas/${brandSelect.value}/modelos`);
                if (data && data.modelos) populateSelect(modelSelect, data.modelos, 'Selecione o modelo');
            }
        });
        modelSelect.addEventListener('change', async () => {
            hideResults();
            resetSelect(yearSelect, 'Selecione o ano');
            if (modelSelect.value) {
                const years = await fetchData(`${API_BASE_URL}/${vehicleTypeSelect.value}/marcas/${brandSelect.value}/modelos/${modelSelect.value}/anos`);
                if (years) populateSelect(yearSelect, years, 'Selecione o ano');
            }
        });
        yearSelect.addEventListener('change', async () => {
            hideResults();
            if (yearSelect.value) {
                const data = await fetchData(`${API_BASE_URL}/${vehicleTypeSelect.value}/marcas/${brandSelect.value}/modelos/${modelSelect.value}/anos/${yearSelect.value}`);
                if (data) displayResult(data);
            }
        });
        resetButton.addEventListener('click', resetForm);
        
        // Funções de Cálculo e Exibição
        function displayResult(data) {
            document.getElementById('result-title').textContent = `${data.Marca} ${data.Modelo}`;
            document.getElementById('result-price').textContent = data.Valor;
            currentFipeValue = parseCurrency(data.Valor);
            calculateAuctionValues(currentFipeValue);
            resultsContainer.classList.remove('hidden');
            stateSelect.value = '';
            ipvaResultContainer.classList.add('hidden');
            driverAgeInput.value = '';
            insuranceResultContainer.classList.add('hidden');
            projectionResultContainer.classList.add('hidden');
            calculateProjectionBtn.disabled = true;
            projectionHelperText.classList.remove('hidden');
            annualInsuranceCost = 0;
            annualIpvaCost = 0;
        }

        function calculateAuctionValues(fipeValue) {
            const maxBid = fipeValue * 0.45;
            const fee = maxBid * 0.05;
            const totalCost = maxBid + fee;
            document.getElementById('auction-price').textContent = formatCurrency(maxBid);
            document.getElementById('auctioneer-fee').textContent = formatCurrency(fee);
            document.getElementById('total-auction-cost').textContent = formatCurrency(totalCost);
        }

        // Lógica do Simulador de Seguro
        calculateInsuranceBtn.addEventListener('click', () => {
            const age = parseInt(driverAgeInput.value);
            if (!age || age <= 0) {
                alert("Por favor, insira uma idade válida.");
                return;
            }

            const basePremium = currentFipeValue * 0.05;
            let finalPremium = basePremium;
            const adjustments = [`<li>Prêmio Base (5% FIPE): ${formatCurrency(basePremium)}</li>`];

            // Ajuste por Origem
            const origin = vehicleOriginSelect.value;
            if (origin === 'financeira') {
                finalPremium += basePremium * 0.10;
                adjustments.push('<li>Origem (Financeira): +10%</li>');
            } else if (origin === 'furto_roubo') {
                finalPremium += basePremium * 0.15;
                adjustments.push('<li>Origem (Furto/Roubo): +15%</li>');
            } else if (origin === 'sinistro') {
                finalPremium += basePremium * 0.50;
                adjustments.push('<li>Origem (Sinistro): +50%</li>');
            }

            // Ajuste por Idade
            if (age < 25) {
                finalPremium += basePremium * 0.30;
                adjustments.push('<li>Idade (&lt; 25 anos): +30%</li>');
            } else if (age > 45) {
                finalPremium -= basePremium * 0.10;
                adjustments.push('<li>Idade (&gt; 45 anos): -10%</li>');
            }

            // Ajuste por Localização
            if (locationSelect.value === 'capital') {
                finalPremium += basePremium * 0.15;
                adjustments.push('<li>Local (Capital): +15%</li>');
            }
            
            annualInsuranceCost = finalPremium;
            insuranceAnnual.textContent = formatCurrency(finalPremium);
            insuranceMonthly.textContent = formatCurrency(finalPremium / 12);
            insuranceAdjustments.innerHTML = adjustments.join('');
            
            insuranceResultContainer.classList.remove('hidden');
            setTimeout(() => insuranceResultContainer.classList.add('visible'), 10);

            checkProjectionButtonState();
        });
        
        vehicleOriginSelect.addEventListener('change', () => {
            insuranceWarning.classList.toggle('hidden', vehicleOriginSelect.value !== 'sinistro');
        });

        // Lógica do IPVA
        function populateStates() { 
            for (const state in ipvaRates) {
                const option = document.createElement('option');
                option.value = state;
                option.textContent = state;
                stateSelect.appendChild(option);
            }
        }

        stateSelect.addEventListener('change', () => {
            const selectedState = stateSelect.value;
            if (selectedState && currentFipeValue > 0) {
                const rate = ipvaRates[selectedState];
                const ipvaValue = currentFipeValue * (rate / 100);
                
                annualIpvaCost = ipvaValue;
                selectedIpvaRate = rate;
                
                ipvaResult.textContent = formatCurrency(ipvaValue);
                ipvaRateInfo.textContent = `Cálculo baseado na alíquota de ${rate}% para ${selectedState}.`;
                ipvaResultContainer.classList.remove('hidden');
                checkProjectionButtonState();
            } else {
                ipvaResultContainer.classList.add('hidden');
                annualIpvaCost = 0;
                checkProjectionButtonState();
            }
        });
        
        // Lógica da Projeção de Custos
        function checkProjectionButtonState() {
            if (annualInsuranceCost > 0 && annualIpvaCost > 0) {
                calculateProjectionBtn.disabled = false;
                projectionHelperText.classList.add('hidden');
            } else {
                calculateProjectionBtn.disabled = true;
                projectionHelperText.classList.remove('hidden');
            }
        }

        calculateProjectionBtn.addEventListener('click', () => {
            let vehicleValue = currentFipeValue;
            const insuranceRate = annualInsuranceCost / currentFipeValue;
            const ipvaRatePercent = selectedIpvaRate / 100;
            const depreciationRate = 0.10; // 10%
            let totalCost = 0;

            projectionTableBody.innerHTML = ''; // Limpa a tabela anterior

            for (let i = 1; i <= 4; i++) {
                const depreciationValue = vehicleValue * depreciationRate;
                const insuranceValue = vehicleValue * insuranceRate;
                const ipvaValue = vehicleValue * ipvaRatePercent;
                const yearlyCost = depreciationValue + insuranceValue + ipvaValue;
                totalCost += yearlyCost;

                const row = `
                    <tr class="border-b hover:bg-teal-50">
                        <td class="px-4 py-3 font-medium">${i}</td>
                        <td class="px-4 py-3">${formatCurrency(depreciationValue)}</td>
                        <td class="px-4 py-3">${formatCurrency(insuranceValue)}</td>
                        <td class="px-4 py-3">${formatCurrency(ipvaValue)}</td>
                        <td class="px-4 py-3 font-bold">${formatCurrency(yearlyCost)}</td>
                    </tr>
                `;
                projectionTableBody.innerHTML += row;
                
                // Atualiza o valor do veículo para o próximo ano
                vehicleValue -= depreciationValue;
            }
            
            projectionTotalCost.textContent = formatCurrency(totalCost);
            projectionMonthlyCost.textContent = `(Média de ${formatCurrency(totalCost / 48)} por mês)`;
            projectionResultContainer.classList.remove('hidden');
            setTimeout(() => projectionResultContainer.classList.add('visible'), 10);
        });

        // Inicialização
        populateStates();