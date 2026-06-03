/**
 * CRM NÁUTICO PREMIUM - APLICAÇÃO PRINCIPAL
 * Desenvolvido por Antigravity para Gabriel Lima
 */

// ==================== 1. ESTADO DA APLICAÇÃO (STORE) ====================
const STORAGE_KEY = 'crm_nautico_premium_data';
const API_URL = 'http://localhost:3000/api';

const DEFAULT_PRODUCTS = [
  // Preserved non-boat products
  { id: 'p2', name: 'Jet Ski Yamaha FX Cruiser SVHO', category: 'Jet Skis', line: 'Sport', status: 'Disponível', price: 95000, img: 'assets/jetski.png', gallery: ['assets/jetski.png'], desc: 'Jet ski de alta performance com motor supercharger, capacidade para 3 pessoas e acabamento de luxo.', notes: 'Disponível para entrega imediata no showroom.' },
  { id: 'p3', name: 'Quadriciclo Can-Am Outlander 570', category: 'Quadriciclos', line: 'Sport', status: 'Disponível', price: 65000, img: 'assets/quadriciclo.png', gallery: ['assets/quadriciclo.png'], desc: 'Quadriciclo robusto preparado para qualquer terreno, suspensão independente e motor Rotax de alta potência.', notes: '2 unidades em estoque físico.' },
  { id: 'p4', name: 'UTV Polaris RZR XP 1000', category: 'UTVs', line: 'Sport', status: 'Disponível', price: 120000, img: 'assets/utv.png', gallery: ['assets/utv.png'], desc: 'O máximo em off-road. UTV de alta cilindrada com gaiola de proteção integrada, suspensão ativa de competição.', notes: 'Encomendas com sinal de 30%.' },

  // Linha Pontoon
  { id: 'p_v_pontoon250', name: 'Pontoon 250', category: 'Embarcações', line: 'Pontoon', status: 'Disponível', price: 180000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Pontoon de 25 pés ideal para águas abrigadas, oferecendo o máximo em espaço, estabilidade e conforto para reuniões familiares.', notes: 'Disponibilidade imediata no showroom.' },
  { id: 'p_v_pontoon320', name: 'Pontoon 320', category: 'Embarcações', line: 'Pontoon', status: 'Disponível', price: 320000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Super pontoon de 32 pés com dois andares (Double Deck), escorregador e capacidade para até 16 passageiros. O clube flutuante definitivo.', notes: 'Prazo de entrega: 60 dias.' },

  // Linha Comfort
  { id: 'p_v_v195_c', name: 'V195 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 130000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Lancha compacta com proa aberta de 19,5 pés, ideal para passeios rápidos e esportes aquáticos.', notes: 'Disponível em 4 cores de estofamento.' },
  { id: 'p_v_v210_c', name: 'V210 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 160000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Evolução natural do mercado de 21 pés. Cockpit otimizado com assentos giratórios e excelente aproveitamento de espaço.', notes: 'Entregue com capota retrátil.' },
  { id: 'p_v_v215_cc', name: 'V215 Cabin Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 195000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Lancha de 21,5 pés com cabine compacta para pernoite de casal. Alia a esportividade com a praticidade de abrigo.', notes: 'Opção de sanitário químico na cabine.' },
  { id: 'p_v_v230_g2c', name: 'V230 GII Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 230000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Modelo de 23 pés de segunda geração com acabamento aprimorado, lines modernas e casco projetado para navegação suave.', notes: 'Homologada para 8 passageiros.' },
  { id: 'p_v_v250_c', name: 'V250 Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 290000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Lancha de 25 pés com amplo cockpit, solário de popa, acabamento refinado e capacidade para até 11 passageiros.', notes: 'Disponível para test-drive.' },
  { id: 'p_v_v265_cc', name: 'V265 Cabin Comfort', category: 'Embarcações', line: 'Comfort', status: 'Disponível', price: 360000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Uma das cabinadas mais tradicionais da categoria. Cabine espaçosa com cama de casal, banheiro fechado e minicozinha.', notes: 'Prazo médio de laminação: 45 dias.' },

  // Linha Sport
  { id: 'p_v_v250_s', name: 'V250 Sport', category: 'Embarcações', line: 'Sport', status: 'Disponível', price: 280000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'Edição esportiva de 25 pés com layout de assentos otimizado para navegação rápida e design agressivo.', notes: 'Disponível com motor de popa de até 300HP.' },
  { id: 'p_v_v220_surf', name: 'V220 Surf', category: 'Embarcações', line: 'Sport', status: 'Disponível', price: 210000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Desenvolvida especialmente para a prática de wakeboard e wakesurf. Conta com flaps específicos e sistema de lastro.', notes: 'Torre de wakeboard em alumínio inclusa.' },

  // Linha Crossover
  { id: 'p_v_v205_cross', name: 'V205 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 180000, img: 'assets/lancha.png', gallery: ['assets/lancha.png'], desc: 'A crossover de entrada da marca. Excelente espaço interno de proa aberta combinada com soluções inteligentes de cabine de apoio.', notes: 'Sucesso de vendas.' },
  { id: 'p_v_v300_cross', name: 'V300 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 480000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Day Cruiser que combina a conveniência de uma proa aberta com o conforto de uma cabine com pé-direito alto.', notes: 'Lancha mais vendida da categoria no Brasil.' },
  { id: 'p_v_v370_cross', name: 'V370 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 780000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Crossover espetacular de 37 pés com solário de proa integrado, cabine luxuosa com pernoite para 4 pessoas e ampla praça de popa.', notes: 'Motorização parelha recomendada.' },
  { id: 'p_v_v400_cross', name: 'V400 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 980000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Embarcação premium de grande porte com cabine de luxo, espaço gourmet na popa e teto rígido elétrico. O máximo de conforto e status.', notes: 'Prazo de entrega: 90 dias.' },
  { id: 'p_v_v550_cross', name: 'V550 Crossover', category: 'Embarcações', line: 'Crossover', status: 'Disponível', price: 4500000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Iate Crossover monumental de 55 pés. Layout integrado de convés aberto com suítes de alto luxo abaixo do deck.', notes: 'Faturamento direto de fábrica.' },

  // Linha Premium
  { id: 'p_v_v300_dc', name: 'V300 Day Cruiser', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 510000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Versão cabinada clássica de 30 pés. Cabine fechada luxuosa, banheiro completo e cockpit perfeito para navegação oceânica.', notes: 'Acabamento interno customizável.' },
  { id: 'p_v_v400_ht', name: 'V400 HT', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 1100000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Lancha Hard Top de 40 pés com fechamento traseiro em vidro, ar-condicionado de alta capacidade e gerador inclusos.', notes: 'Modelo de showroom disponível.' },
  { id: 'p_v_v450_p', name: 'V450 Premium', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 1800000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_header.png'], desc: 'Iate premium de 45 pés com design italiano, plataforma de popa submergível e acabamento interno em couro e madeira nobre.', notes: 'Prazo de construção: 120 dias.' },
  { id: 'p_v_v550_fly', name: 'V550 Flybridge', category: 'Embarcações', line: 'Premium', status: 'Disponível', price: 4800000, img: 'assets/lancha.png', gallery: ['assets/lancha.png', 'assets/yacht_footer.png'], desc: 'Flagship da Ventura Marine com 55 pés e Flybridge gigante. 3 cabines, 2 banheiros e salão principal totalmente integrado.', notes: 'Opção de motorização IPS.' }
];

const DEFAULT_CLIENTS = [
  {
    id: 'c1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    email: 'joao.silva@gmail.com',
    product: 'Lancha FS 275 Concept',
    value: 280000,
    temp: 'Quente',
    stage: 'Visita Agendada',
    created: '2026-05-25',
    notes: 'Cliente demonstrou forte interesse em fechar antes do final do mês. Quer test-drive na represa.',
    timeline: [
      { date: '25/05/2026', text: 'Lead captado via formulário do site.', isSystem: true },
      { date: '26/05/2026', text: 'Primeiro contato realizado. Cliente solicitou informações da FS 275.', isSystem: false },
      { date: '28/05/2026', text: 'Qualificado com sucesso. Renda e perfil de compra validados.', isSystem: true },
      { date: '01/06/2026', text: 'Visita técnica agendada para showroom.', isSystem: false }
    ],
    lastAction: 'Visita agendada para o Showroom'
  },
  {
    id: 'c2',
    name: 'Maria Oliveira',
    phone: '(21) 99887-6655',
    email: 'maria.oliveira@uol.com.br',
    product: 'Jet Ski Yamaha FX Cruiser SVHO',
    value: 95000,
    temp: 'Quente',
    stage: 'Em Negociação',
    created: '2026-05-28',
    notes: 'Negociando parcelamento. Solicitou 5% de desconto à vista.',
    timeline: [
      { date: '28/05/2026', text: 'Lead captado via WhatsApp.', isSystem: true },
      { date: '29/05/2026', text: 'Primeiro contato telefônico. Apresentação das opções de Jet Skis.', isSystem: false },
      { date: '02/06/2026', text: 'Enviada proposta comercial com opção de financiamento.', isSystem: true }
    ],
    lastAction: 'Proposta enviada para análise'
  },
  {
    id: 'c3',
    name: 'Carlos Souza',
    phone: '(31) 98866-5544',
    email: 'carlos.souza@yahoo.com',
    product: 'Quadriciclo Can-Am Outlander 570',
    value: 65000,
    temp: 'Morno',
    stage: 'Em Negociação',
    created: '2026-05-20',
    notes: 'Quer comprar para usar no sítio da família. Em dúvida sobre a cilindrada.',
    timeline: [
      { date: '20/05/2026', text: 'Lead captado via indicação de outro cliente.', isSystem: true },
      { date: '22/05/2026', text: 'Contato inicial. Cliente analisando o Outlander 570 e o 450.', isSystem: false }
    ],
    lastAction: 'Enviado comparativo técnico'
  },
  {
    id: 'c4',
    name: 'Roberto Lima',
    phone: '(11) 97755-3322',
    email: 'roberto.lima@corporativo.com',
    product: 'UTV Polaris RZR XP 1000',
    value: 120000,
    temp: 'Quente',
    stage: 'Visita Agendada',
    created: '2026-05-22',
    notes: 'Cliente experiente em off-road. Quer fazer a visita acompanhado do mecânico.',
    timeline: [
      { date: '22/05/2026', text: 'Lead captado via Instagram.', isSystem: true },
      { date: '25/05/2026', text: 'Ligação produtiva. Cliente conhece bem o UTV Polaris.', isSystem: false },
      { date: '01/06/2026', text: 'Agendada vistoria do veículo em estoque para amanhã.', isSystem: true }
    ],
    lastAction: 'Agendada visita de vistoria técnica'
  },
  {
    id: 'c5',
    name: 'Eduardo Santos',
    phone: '(19) 98122-3344',
    email: 'edu.santos@terra.com.br',
    product: 'Lancha Coral 36 Crossover',
    value: 450000,
    temp: 'Frio',
    stage: 'Lead Captado',
    created: '2026-06-01',
    notes: 'Interessado em lanchas cabinadas grandes. Perfil investidor.',
    timeline: [
      { date: '01/06/2026', text: 'Lead captado por formulário web de alta conversão.', isSystem: true }
    ],
    lastAction: 'Aguardando primeiro contato telefônico'
  },
  {
    id: 'c6',
    name: 'Patrícia Costa',
    phone: '(11) 99111-2222',
    email: 'patricia.costa@adv.oab.org',
    product: 'Jet Ski Yamaha FX Cruiser SVHO',
    value: 95000,
    temp: 'Longo Prazo',
    stage: 'Primeiro Contato',
    created: '2026-05-15',
    notes: 'Cliente de férias no exterior. Retorna em 15 dias para retomar conversas.',
    timeline: [
      { date: '15/05/2026', text: 'Lead captado. Cliente atendeu ligação rápido e pediu contato em junho.', isSystem: false }
    ],
    lastAction: 'Adiado contato para meados de Junho'
  },
  {
    id: 'c7',
    name: 'Leonardo Ferreira',
    phone: '(47) 98811-2233',
    email: 'leo.ferreira@ferreira.com.br',
    product: 'Lancha Coral 36 Crossover',
    value: 450000,
    temp: 'Quente',
    stage: 'Qualificado',
    created: '2026-05-24',
    notes: 'Aprovou a planta estrutural da lancha. Falta definir motorização.',
    timeline: [
      { date: '24/05/2026', text: 'Lead captado em evento náutico de Balneário Camboriú.', isSystem: true },
      { date: '26/05/2026', text: 'Reunião virtual para apresentação da Coral 36.', isSystem: false }
    ],
    lastAction: 'Preparando simulação de motores Volvo Penta'
  }
];

const DEFAULT_SALES = [
  // Won sales summing up to R$ 640.000,00 and totalizing R$ 8.000,00 in commissions (standardized at 1.25%)
  { id: 's1', clientName: 'Flávio Augusto', product: 'Lancha Coral 36 Crossover', value: 450000, commission: 5625, date: '2026-06-01', status: 'Ganho', notes: 'Venda concluída com motores mercruiser. Pagamento via Pix.' },
  { id: 's2', clientName: 'Marcos Pontes', product: 'UTV Polaris RZR XP 1000', value: 120000, commission: 1500, date: '2026-06-02', status: 'Ganho', notes: 'Cliente optou pelo modelo de vitrine com acessórios.' },
  { id: 's3', clientName: 'Juliana Mendes', product: 'Quadriciclo Can-Am Outlander 570', value: 70000, commission: 875, date: '2026-06-02', status: 'Ganho', notes: 'Incluiu carretinha de transporte no pacote.' },
  
  // Lost Sales
  { id: 'sl1', clientName: 'Bruno Alencar', product: 'Lancha FS 275 Concept', value: 280000, commission: 0, date: '2026-05-30', status: 'Perdido', notes: 'Preço elevado / Budget estourado - Optou por uma embarcação seminova de menor porte.' },
  { id: 'sl2', clientName: 'Aline Schmidt', product: 'Jet Ski Yamaha FX Cruiser SVHO', value: 95000, commission: 0, date: '2026-05-28', status: 'Perdido', notes: 'Comprou da concorrência - Fechou com concessionária Sea-Doo local por facilidade de oficina.' },
  { id: 'sl3', clientName: 'Ricardo Bastos', product: 'UTV Polaris RZR XP 1000', value: 120000, commission: 0, date: '2026-05-25', status: 'Perdido', notes: 'Desistiu da compra (Momento inadequado) - Adiou compra do UTV devido a viagem prolongada.' }
];

const DEFAULT_AGENDA = [
  { id: 'a1', clientId: 'c1', clientName: 'João Silva', task: 'Ligar para João Silva', subText: 'Lancha FS 275 Concept', time: '09:00', date: '2026-06-02', priority: 'medium' },
  { id: 'a2', clientId: 'c2', clientName: 'Maria Oliveira', task: 'Reunião com Maria Oliveira', subText: 'Apresentação de proposta', time: '10:30', date: '2026-06-02', priority: 'high' },
  { id: 'a3', clientId: 'c3', clientName: 'Carlos Souza', task: 'Follow-up Carlos Souza', subText: 'Quadriciclo Outlander 570', time: '14:00', date: '2026-06-02', priority: 'low' },
  { id: 'a4', clientId: 'c4', clientName: 'Roberto Lima', task: 'Visita técnica Roberto Lima', subText: 'UTV Polaris RZR XP 1000', time: '16:00', date: '2026-06-02', priority: 'visit' }
];

const DEFAULT_SCRIPTS = [
  {
    title: 'Abordagem Inicial - Lancha FS 275 Concept',
    category: 'Embarcações',
    script: `Olá [Nome], tudo bem? Aqui é o Gabriel Lima, Consultor Náutico.
Vi que você solicitou mais informações sobre a nossa Lancha FS 275 Concept no site.

A FS 275 é uma das embarcações mais completas da categoria, com um acabamento sofisticado e excelente navegação. Para eu te passar uma proposta ideal, você pretende navegar mais em represa ou mar? E qual seria a lotação ideal para os seus passeios?

Fico no aguardo para desenharmos a configuração perfeita para você.`
  },
  {
    title: 'Fechamento de Negócio - UTV Polaris RZR XP 1000',
    category: 'UTVs',
    script: `Olá [Nome], boa tarde! Conseguiu analisar a simulação que enviei para o UTV Polaris RZR XP 1000?

Tenho uma boa notícia: consegui com a diretoria manter aquela condição de taxa subsidiada e o bônus dos acessórios de proteção (teto e para-brisa) para faturamento até esta sexta-feira. 

Como o estoque desse modelo está super restrito devido às importações, conseguimos segurar o chassi reservado para você se fizermos o fechamento do contrato hoje. O que acha de garantirmos sua máquina de aventura para o próximo fim de semana?`
  },
  {
    title: 'Follow-up Pós-Visita Concessionária - Geral',
    category: 'Geral',
    script: `Olá [Nome], tudo bem? Passando para agradecer sua visita ontem ao nosso Showroom.
Foi excelente apresentar as opções e entender melhor o seu perfil.

Conforme conversamos, estou anexando aqui a ficha técnica detalhada dos modelos que você mais gostou. Qual deles mais balançou o seu coração após vê-los de perto?

Fico à disposição se precisar de qualquer simulação adicionais!`
  }
];

const DEFAULT_CONFIG = {
  userName: 'Gabriel Lima',
  userRole: 'Consultor Náutico',
  monthlyGoal: 1000000,
  defaultCommission: 1.25 // Standardized to 1.25%
};

const DEFAULT_NOTIFICATIONS = [
  { id: 'n1', title: 'Visita técnica agendada', text: 'Roberto Lima - Hoje às 16:00 - UTV Polaris RZR XP 1000', time: 'Há 10 min', unread: true },
  { id: 'n2', title: 'Novo lead captado', text: 'Eduardo Santos demonstrou interesse em Coral 36 Crossover', time: 'Há 1 hora', unread: true },
  { id: 'n3', title: 'Venda concluída com sucesso', text: 'Flávio Augusto - Lancha Coral 36 Crossover - R$ 450.000,00', time: 'Ontem', unread: false }
];

class AppStore {
  constructor() {
    this.data = {
      clients: [],
      products: [],
      sales: [],
      agenda: [],
      scripts: [],
      config: {},
      notifications: []
    };
    this.load();
  }

  async load() {
    // 1. Carrega local primeiro para velocidade instantânea
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
        this.migrate();
      } catch (e) {
        console.error('Erro ao ler do localStorage. Restaurando dados padrão.', e);
        this.restoreDefaults();
      }
    } else {
      this.restoreDefaults();
    }

    // 2. Tenta carregar os dados mais recentes do servidor backend
    try {
      const res = await fetch(`${API_URL}/store`);
      if (res.ok) {
        const serverData = await res.json();
        this.data = serverData;
        this.migrate();
        this.saveLocally();
        // Recarrega a view ativa para atualizar o dashboard/tabelas com os novos dados
        const activeTabEl = document.querySelector('.menu-item.active');
        if (activeTabEl) {
          const activeTab = activeTabEl.getAttribute('data-tab');
          renderActiveView(activeTab);
        }
      }
    } catch (e) {
      console.warn('Servidor backend offline. Usando cache local do navegador.');
    }
  }

  migrate() {
    if (!this.data.notifications) {
      this.data.notifications = JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS));
    }

    let migrated = false;
    
    // --- ONE-TIME AUTO-MIGRATION FOR 1.25% COMMISSION RATE ---
    if (this.data.config && (this.data.config.defaultCommission === 20 || this.data.config.defaultCommission === 10)) {
      this.data.config.defaultCommission = 1.25;
      migrated = true;
    }

    if (this.data.sales) {
      const s1 = this.data.sales.find(s => s.id === 's1');
      if (s1 && s1.commission === 90000) {
        this.data.sales.forEach(s => {
          if (s.status === 'Ganho') {
            s.commission = parseFloat((s.value * 0.0125).toFixed(2));
          }
        });
        migrated = true;
      }
    }

    // --- AUTO-MIGRATION FOR VENTURA MARINE PRODUCTS CATALOG ---
    if (this.data.products) {
      let addedCount = 0;
      DEFAULT_PRODUCTS.forEach(dp => {
        const exists = this.data.products.some(p => p.name === dp.name);
        if (!exists) {
          this.data.products.push(JSON.parse(JSON.stringify(dp)));
          addedCount++;
        }
      });
      
      this.data.products.forEach(p => {
        if (!p.line) {
          if (p.name.includes('Pontoon')) p.line = 'Pontoon';
          else if (p.name.includes('Comfort') || p.name.includes('FS 275')) p.line = 'Comfort';
          else if (p.name.includes('Sport') || p.name.includes('Surf') || p.name.includes('Yamaha') || p.name.includes('Can-Am') || p.name.includes('Polaris')) p.line = 'Sport';
          else if (p.name.includes('Crossover') || p.name.includes('Coral 36')) p.line = 'Crossover';
          else if (p.name.includes('Cruiser') || p.name.includes('HT') || p.name.includes('Premium') || p.name.includes('Flybridge')) p.line = 'Premium';
          else p.line = 'Nenhuma';
        }
        if (!p.status) p.status = 'Disponível';
        if (!p.gallery) p.gallery = [p.img || 'assets/lancha.png'];
      });
      
      if (addedCount > 0) {
        migrated = true;
      }
    }

    if (migrated) {
      this.save();
    }
  }

  saveLocally() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  save() {
    this.saveLocally();
    fetch(`${API_URL}/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.data)
    }).catch(e => console.warn('Erro ao sincronizar com o servidor:', e));
  }

  restoreDefaults() {
    this.data = {
      clients: JSON.parse(JSON.stringify(DEFAULT_CLIENTS)),
      products: JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)),
      sales: JSON.parse(JSON.stringify(DEFAULT_SALES)),
      agenda: JSON.parse(JSON.stringify(DEFAULT_AGENDA)),
      scripts: JSON.parse(JSON.stringify(DEFAULT_SCRIPTS)),
      config: JSON.parse(JSON.stringify(DEFAULT_CONFIG)),
      notifications: JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS))
    };
    this.save();
  }
}

const store = new AppStore();

// ==================== 2. INICIALIZAÇÃO DE GRÁFICOS (CHART.JS) ====================
let salesChartInstance = null;
let faturamentoChartInstance = null;
let categoriesChartInstance = null;

function initCharts() {
  // Chart.js global theme overrides for premium dark/gold style
  Chart.defaults.color = '#8E9FB8';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.scale.grid.color = 'rgba(212, 176, 106, 0.08)';

  // 1. Dashboard: Sales Performance Chart
  const salesCtx = document.getElementById('salesPerformanceChart');
  if (salesCtx) {
    if (salesChartInstance) salesChartInstance.destroy();
    
    const gradient = salesCtx.getContext('2d').createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(212, 176, 106, 0.25)');
    gradient.addColorStop(1, 'rgba(7, 20, 38, 0)');

    salesChartInstance = new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['01/06', '08/06', '15/06', '22/06', '29/06'],
        datasets: [{
          label: 'Vendas (R$)',
          data: [80000, 240000, 160000, 380000, 360000],
          borderColor: '#D4B06A',
          borderWidth: 3,
          pointBackgroundColor: '#F5F7FA',
          pointBorderColor: '#D4B06A',
          pointHoverBackgroundColor: '#D4B06A',
          pointHoverBorderColor: '#F5F7FA',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          backgroundColor: gradient,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0D2038',
            borderColor: '#D4B06A',
            borderWidth: 1,
            titleColor: '#F5F7FA',
            bodyColor: '#DCE4F0',
            callbacks: {
              label: function(context) {
                return 'R$ ' + context.parsed.y.toLocaleString('pt-BR');
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                if (value >= 1000) return (value / 1000) + 'k';
                return value;
              }
            }
          }
        }
      }
    });
  }

  // 2. Reports: Evolution Chart
  const repEvolutionCtx = document.getElementById('reportsFaturamentoChart');
  if (repEvolutionCtx) {
    if (faturamentoChartInstance) faturamentoChartInstance.destroy();
    
    faturamentoChartInstance = new Chart(repEvolutionCtx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Faturamento Bruto (R$)',
            data: [350000, 480000, 410000, 620000, 750000, 640000],
            backgroundColor: '#17355B',
            borderColor: 'rgba(212, 176, 106, 0.4)',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Comissão Líquida (R$)',
            data: [4375, 6000, 5125, 7750, 9375, 8000], // 1.25% standard
            backgroundColor: '#D4B06A',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#F5F7FA' }
          },
          tooltip: {
            backgroundColor: '#0D2038',
            borderColor: '#D4B06A',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return 'R$ ' + (value / 1000) + 'k';
              }
            }
          }
        }
      }
    });
  }

  // 3. Reports: Category Chart
  const repCatCtx = document.getElementById('reportsCategoriesChart');
  if (repCatCtx) {
    if (categoriesChartInstance) categoriesChartInstance.destroy();
    
    // Count sales value per category
    const categoryTotals = { 'Embarcações': 0, 'Jet Skis': 0, 'Quadriciclos': 0, 'UTVs': 0 };
    store.data.sales.forEach(sale => {
      if (sale.status === 'Ganho') {
        const prod = store.data.products.find(p => p.name === sale.product);
        const cat = prod ? prod.category : 'Embarcações';
        if (categoryTotals[cat] !== undefined) {
          categoryTotals[cat] += sale.value;
        }
      }
    });

    categoriesChartInstance = new Chart(repCatCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryTotals),
        datasets: [{
          data: Object.values(categoryTotals),
          backgroundColor: ['#D4B06A', '#3b82f6', '#10b981', '#8b5cf6'],
          borderColor: '#0D2038',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#F5F7FA', boxWidth: 12 }
          },
          tooltip: {
            backgroundColor: '#0D2038',
            borderColor: '#D4B06A',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return ' ' + context.label + ': R$ ' + context.parsed.toLocaleString('pt-BR');
              }
            }
          }
        },
        cutout: '70%'
      }
    });
  }
}

// ==================== 3. FLUXOS DE COMPONENTES E ABAS DE VIEW ====================
function setupTabs() {
  const menuItems = document.querySelectorAll('.menu-item');
  const sections = document.querySelectorAll('.content-section');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      
      // Update active menu link
      menuItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');

      // Show targeted section
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.getAttribute('id') === `section-${tabId}`) {
          sec.classList.add('active');
        }
      });

      // Reload view specific states
      renderActiveView(tabId);
    });
  });

  // Action links click
  document.getElementById('link-view-all-negoc').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('menu-clientes').click();
  });
  document.getElementById('link-view-calendar').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('menu-agenda').click();
  });

  // Indicator cards clicks mapping to appropriate tabs
  const indicatorCards = document.querySelectorAll('.indicator-card');
  indicatorCards.forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      if (action === 'go-to-followups') document.getElementById('menu-followups').click();
      if (action === 'go-to-agenda') document.getElementById('menu-agenda').click();
      if (action === 'go-to-funil') document.getElementById('menu-funil').click();
      if (action === 'go-to-vendas') document.getElementById('menu-vendas').click();
    });
  });
}

function renderActiveView(tabId) {
  if (tabId === 'dashboard') {
    renderDashboard();
    initCharts(); // Refreshes animation of charts
  } else if (tabId === 'clientes') {
    renderClientsTable();
  } else if (tabId === 'funil') {
    renderKanbanBoard();
  } else if (tabId === 'followups') {
    renderFollowupsPanel();
  } else if (tabId === 'produtos') {
    renderProductsCatalog();
  } else if (tabId === 'vendas') {
    renderSalesHistory();
  } else if (tabId === 'scripts') {
    renderScriptsTemplates();
  } else if (tabId === 'relatorios') {
    renderReportsData();
    initCharts();
  } else if (tabId === 'agenda') {
    renderCalendar();
  } else if (tabId === 'configuracoes') {
    loadSettingsForm();
  }
}

// ==================== 4. IMPLEMENTAÇÃO DE VIEWS DINÂMICAS ====================

// --- VIEW: DASHBOARD ---
function renderDashboard() {
  // Update Indicators counts
  const todayStr = getTodayISOString();
  const todayFollowups = store.data.agenda.filter(item => item.date === todayStr);
  document.getElementById('card-followups-count').innerText = todayFollowups.length;

  const nextVisits = store.data.agenda.filter(item => {
    const d = new Date(item.date);
    const diff = (d - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7 && item.priority === 'visit';
  });
  document.getElementById('card-visits-count').innerText = nextVisits.length;

  // Values aggregation
  let pipelineSum = 0;
  store.data.clients.forEach(c => {
    if (['Lead Captado', 'Primeiro Contato', 'Qualificado', 'Em Negociação', 'Visita Agendada'].includes(c.stage)) {
      pipelineSum += c.value;
    }
  });
  document.getElementById('card-negotiating-value').innerText = formatCurrency(pipelineSum);

  // Won sales sum (this month - filter by current month/year)
  let salesSum = 0;
  let commissionSum = 0;
  store.data.sales.forEach(s => {
    if (s.status === 'Ganho') {
      salesSum += s.value;
      commissionSum += s.commission;
    }
  });
  document.getElementById('card-sales-value').innerText = formatCurrency(salesSum);
  document.getElementById('card-commission-value').innerText = formatCurrency(commissionSum);

  // RENDER CHEVRON FUNNEL WIDGET
  const stages = ['Lead Captado', 'Primeiro Contato', 'Qualificado', 'Em Negociação', 'Visita Agendada', 'Venda Concluída', 'Venda Perdida'];
  const stageMap = {
    'Lead Captado': { class: 'step-lead' },
    'Primeiro Contato': { class: 'step-contact' },
    'Qualificado': { class: 'step-qualified' },
    'Em Negociação': { class: 'step-negotiation' },
    'Visita Agendada': { class: 'step-visit' },
    'Venda Concluída': { class: 'step-won' },
    'Venda Perdida': { class: 'step-lost' }
  };

  const chevronContainer = document.getElementById('funnel-chevron-container');
  chevronContainer.innerHTML = '';

  stages.forEach(st => {
    const clientsInStage = store.data.clients.filter(c => c.stage === st);
    const sumVal = clientsInStage.reduce((acc, c) => acc + c.value, 0);
    
    const stepEl = document.createElement('div');
    stepEl.className = `chevron-step ${stageMap[st].class}`;
    stepEl.innerHTML = `
      <span class="chevron-label">${st}</span>
      <span class="chevron-count">${clientsInStage.length}</span>
      <span class="chevron-value">${formatShortCurrency(sumVal)}</span>
    `;
    stepEl.addEventListener('click', () => {
      // Navigate to funil view
      document.getElementById('menu-funil').click();
    });
    chevronContainer.appendChild(stepEl);
  });

  // RENDER ACTIVE NEGOTIATIONS WIDGET (Max 4 items)
  const negocContainer = document.getElementById('widget-active-negotiations');
  negocContainer.innerHTML = '';
  
  const activeOpports = store.data.clients
    .filter(c => ['Em Negociação', 'Visita Agendada', 'Qualificado'].includes(c.stage))
    .slice(0, 4);

  if (activeOpports.length === 0) {
    negocContainer.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted);">Nenhuma negociação ativa.</div>';
  } else {
    activeOpports.forEach(c => {
      const prod = store.data.products.find(p => p.name === c.product);
      const imgPath = prod ? prod.img : 'assets/lancha.png';
      
      const row = document.createElement('div');
      row.className = 'negotiation-row';
      row.innerHTML = `
        <img class="nego-product-img" src="${imgPath}" alt="${c.product}">
        <div class="nego-details">
          <span class="nego-product-name">${c.product}</span>
          <span class="nego-client">${c.name}</span>
        </div>
        <div class="nego-finance">
          <span class="nego-value">${formatCurrency(c.value)}</span>
          <span class="nego-date">${formatDateBr(c.created)}</span>
        </div>
      `;
      row.addEventListener('click', () => openClientDrawer(c.id));
      negocContainer.appendChild(row);
    });
  }

  // RENDER TODAY AGENDA WIDGET
  const agendaContainer = document.getElementById('widget-today-agenda');
  agendaContainer.innerHTML = '';

  const todayItems = store.data.agenda
    .filter(item => item.date === todayStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  if (todayItems.length === 0) {
    agendaContainer.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:12px;">Nenhuma ação agendada para hoje.</div>';
  } else {
    todayItems.forEach(item => {
      const priorityMap = {
        'high': 'priority-high',
        'medium': 'priority-medium',
        'low': 'priority-low',
        'visit': 'priority-visit'
      };
      
      const el = document.createElement('div');
      el.className = `agenda-item ${priorityMap[item.priority] || 'priority-low'}`;
      el.innerHTML = `
        <div class="agenda-time">${item.time}</div>
        <div class="agenda-bar"></div>
        <div class="agenda-info">
          <div class="agenda-task">${item.task}</div>
          <div class="agenda-sub">${item.subText}</div>
        </div>
      `;
      el.addEventListener('click', () => openClientDrawer(item.clientId));
      agendaContainer.appendChild(el);
    });
  }

  // UPDATE BOTTOM MONTH SUMMARY
  document.getElementById('sum-new-clients').innerText = store.data.clients.length + 5; // Simulating some archives
  document.getElementById('sum-opportunities').innerText = store.data.clients.filter(c => !['Venda Concluída', 'Venda Perdida'].includes(c.stage)).length;
  // Calculate average ticket
  const wonSales = store.data.sales.filter(s => s.status === 'Ganho');
  const totalWonVal = wonSales.reduce((acc, s) => acc + s.value, 0);
  const avgTicket = wonSales.length > 0 ? Math.round(totalWonVal / wonSales.length) : 0;
  document.getElementById('sum-average-ticket').innerText = formatCurrency(avgTicket);
}

// --- VIEW: CLIENTS E LEADS ---
let currentTempFilter = 'all';

function renderClientsTable() {
  const tbody = document.getElementById('clients-table-body');
  tbody.innerHTML = '';
  
  const searchVal = document.getElementById('client-search').value.toLowerCase();
  
  const filtered = store.data.clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchVal) || 
                          c.product.toLowerCase().includes(searchVal) || 
                          c.phone.includes(searchVal);
    const matchesTemp = currentTempFilter === 'all' || c.temp === currentTempFilter;
    return matchesSearch && matchesTemp;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color:var(--text-muted);">Nenhum lead ou cliente encontrado.</td></tr>`;
    return;
  }

  const stageClassMap = {
    'Lead Captado': 'lead',
    'Primeiro Contato': 'contact',
    'Qualificado': 'qualified',
    'Em Negociação': 'negotiation',
    'Visita Agendada': 'visit',
    'Venda Concluída': 'won',
    'Venda Perdida': 'lost'
  };

  const tempClassMap = {
    'Quente': 'hot',
    'Morno': 'warm',
    'Frio': 'cold',
    'Longo Prazo': 'long'
  };

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    
    tr.innerHTML = `
      <td>
        <div class="client-name-cell">
          <svg class="client-avatar" viewBox="0 0 100 100" style="background-color: var(--bg-hover);">
            <path d="M50,22 C59,22 66,28 66,37 C66,45 61,48 57,51 C55,52.5 54,54 54,56 L54,59 L46,59 L46,56 C46,54 45,52.5 43,51 C39,48 34,45 34,37 C34,28 41,22 50,22 Z" fill="#D4B06A"/>
            <path d="M22,78 C22,64 34,62 42,62 L58,62 C66,62 78,64 78,78 L78,85 L22,85 Z" fill="#D4B06A"/>
          </svg>
          <div>
            <div style="font-weight:600; color:var(--text-primary);">${c.name}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${c.phone}</div>
          </div>
        </div>
      </td>
      <td style="font-family:var(--font-title); font-weight:500;">${c.product}</td>
      <td>
        <span class="temp-indicator ${tempClassMap[c.temp]}"></span>
        <span style="margin-left:4px;">${c.temp}</span>
      </td>
      <td>
        <span class="badge-stage ${stageClassMap[c.stage]}">${c.stage}</span>
      </td>
      <td style="color:var(--gold-primary); font-family:var(--font-title); font-weight:700;">${formatCurrency(c.value)}</td>
      <td style="color:var(--text-muted); font-size:12px;">${c.lastAction || 'Sem interações'}</td>
      <td>
        <div style="display:flex; gap:6px;">
          <button class="followup-btn btn-open-profile" data-id="${c.id}">Ver Perfil</button>
          ${!['Venda Concluída', 'Venda Perdida'].includes(c.stage) ? 
            `<button class="followup-btn btn-complete-sale" data-id="${c.id}" style="background-color:rgba(16,185,129,0.1); border-color:var(--stage-won); color:var(--stage-won);">Concluir</button>` : ''
          }
          <button class="followup-btn btn-delete-client" data-id="${c.id}" style="border-color:var(--stage-lost); color:var(--stage-lost);">Excluir</button>
        </div>
      </td>
    `;
    
    // Clicking anywhere on row opens profile drawer, except button click
    tr.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON') {
        openClientDrawer(c.id);
      }
    });
    
    tbody.appendChild(tr);
  });

  // Wire buttons inside table
  document.querySelectorAll('.btn-open-profile').forEach(btn => {
    btn.addEventListener('click', () => {
      openClientDrawer(btn.getAttribute('data-id'));
    });
  });

  document.querySelectorAll('.btn-complete-sale').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerSaleWon(btn.getAttribute('data-id'));
    });
  });

  document.querySelectorAll('.btn-delete-client').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteClient(btn.getAttribute('data-id'));
    });
  });
}

// Setup search/filter events on Clientes View
document.getElementById('client-search').addEventListener('input', renderClientsTable);
document.querySelectorAll('#section-clientes .filter-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    document.querySelectorAll('#section-clientes .filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    currentTempFilter = tag.getAttribute('data-temp');
    renderClientsTable();
  });
});

// --- VIEW: FUNIL COMERCIAL KANBAN (DRAG & DROP) ---
function renderKanbanBoard() {
  const container = document.getElementById('kanban-board-container');
  container.innerHTML = '';
  
  const columns = ['Lead Captado', 'Primeiro Contato', 'Qualificado', 'Em Negociação', 'Visita Agendada', 'Venda Concluída', 'Venda Perdida'];
  
  const colClassMap = {
    'Lead Captado': 'col-lead',
    'Primeiro Contato': 'col-contact',
    'Qualificado': 'col-qualified',
    'Em Negociação': 'col-negotiation',
    'Visita Agendada': 'col-visit',
    'Venda Concluída': 'col-won',
    'Venda Perdida': 'col-lost'
  };

  const tempColorMap = {
    'Quente': 'var(--temp-hot)',
    'Morno': 'var(--temp-warm)',
    'Frio': 'var(--temp-cold)',
    'Longo Prazo': 'var(--temp-long)'
  };

  columns.forEach(col => {
    const colClients = store.data.clients.filter(c => c.stage === col);
    const totalVal = colClients.reduce((acc, c) => acc + c.value, 0);

    const colEl = document.createElement('div');
    colEl.className = `kanban-column ${colClassMap[col]}`;
    
    colEl.innerHTML = `
      <div class="column-header">
        <span class="column-title">${col}</span>
        <div class="column-summary">
          <span>${colClients.length} leads</span>
          <span class="column-value-sum">${formatShortCurrency(totalVal)}</span>
        </div>
      </div>
      <div class="kanban-cards" data-stage="${col}">
        <!-- Cards will go here -->
      </div>
    `;

    const cardsContainer = colEl.querySelector('.kanban-cards');
    
    colClients.forEach(c => {
      const card = document.createElement('div');
      card.className = 'kanban-card';
      card.draggable = true;
      card.setAttribute('data-id', c.id);
      
      card.innerHTML = `
        <div class="card-title-row">
          <span class="card-title">${c.name}</span>
          <span class="card-temp-dot" style="background-color: ${tempColorMap[c.temp] || 'gray'};"></span>
        </div>
        <span class="card-product-tag">${c.product}</span>
        <div class="card-footer">
          <span class="card-client-name">${c.phone}</span>
          <span class="card-value">${formatShortCurrency(c.value)}</span>
        </div>
      `;

      // Double click card opens profile drawer
      card.addEventListener('dblclick', () => openClientDrawer(c.id));
      
      // DRAG START
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', c.id);
        card.style.opacity = '0.5';
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });

      cardsContainer.appendChild(card);
    });

    // DRAG OVER / DROP LOGIC
    cardsContainer.addEventListener('dragover', (e) => {
      e.preventDefault();
      cardsContainer.classList.add('dragover');
    });

    cardsContainer.addEventListener('dragleave', () => {
      cardsContainer.classList.remove('dragover');
    });

    cardsContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      cardsContainer.classList.remove('dragover');
      const clientStrId = e.dataTransfer.getData('text/plain');
      const targetStage = cardsContainer.getAttribute('data-stage');
      
      moveClientStage(clientStrId, targetStage);
    });

    container.appendChild(colEl);
  });
}

function moveClientStage(clientId, targetStage) {
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  const previousStage = client.stage;
  if (previousStage === targetStage) return;

  // Intercepting stage change to won/lost to open forms
  if (targetStage === 'Venda Concluída') {
    triggerSaleWon(clientId);
    return;
  }
  if (targetStage === 'Venda Perdida') {
    triggerSaleLost(clientId);
    return;
  }

  // Update normally
  client.stage = targetStage;
  const actionText = `Movido do estágio '${previousStage}' para '${targetStage}'.`;
  client.lastAction = actionText;
  client.timeline.unshift({
    date: getTodayBrFormatted(),
    text: actionText,
    isSystem: true
  });
  
  store.save();
  renderKanbanBoard();
  renderDashboard();
}

// --- VIEW: FOLLOW-UPS ---
function renderFollowupsPanel() {
  const overdueList = document.getElementById('followups-overdue-list');
  const todayList = document.getElementById('followups-today-list');
  const futureList = document.getElementById('followups-future-list');
  
  overdueList.innerHTML = '';
  todayList.innerHTML = '';
  futureList.innerHTML = '';

  const todayStr = getTodayISOString();

  let countOverdue = 0;
  let countToday = 0;
  let countFuture = 0;

  store.data.agenda.forEach(item => {
    const card = document.createElement('div');
    card.className = 'followup-card';
    card.innerHTML = `
      <div class="followup-header">
        <span class="followup-client">${item.clientName}</span>
        <span class="followup-date-badge">${formatDateBr(item.date)} às ${item.time}</span>
      </div>
      <div class="followup-details">
        <strong>${item.task}</strong>: ${item.subText}
      </div>
      <div class="followup-actions">
        <button class="followup-btn btn-complete-follow" data-id="${item.id}">Concluir</button>
        <button class="followup-btn btn-resched-follow" data-id="${item.id}">Reagendar</button>
      </div>
    `;

    // Hook completing follow-up
    card.querySelector('.btn-complete-follow').addEventListener('click', () => {
      completeFollowup(item.id);
    });

    // Hook rescheduling follow-up
    card.querySelector('.btn-resched-follow').addEventListener('click', () => {
      rescheduleFollowup(item.id);
    });

    // Decide column
    if (item.date < todayStr) {
      overdueList.appendChild(card);
      countOverdue++;
    } else if (item.date === todayStr) {
      todayList.appendChild(card);
      countToday++;
    } else {
      futureList.appendChild(card);
      countFuture++;
    }
  });

  document.getElementById('count-followups-overdue').innerText = countOverdue;
  document.getElementById('count-followups-today').innerText = countToday;
  document.getElementById('count-followups-future').innerText = countFuture;

  // If empty col indicators
  if (countOverdue === 0) overdueList.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:12px;">Sem follow-ups atrasados.</div>';
  if (countToday === 0) todayList.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:12px;">Sem follow-ups para hoje.</div>';
  if (countFuture === 0) futureList.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:12px;">Sem follow-ups agendados.</div>';
}

function completeFollowup(id) {
  const index = store.data.agenda.findIndex(item => item.id === id);
  if (index === -1) return;

  const item = store.data.agenda[index];
  const client = store.data.clients.find(c => c.id === item.clientId);

  if (client) {
    const actionText = `Follow-up realizado: ${item.task} - ${item.subText}`;
    client.lastAction = 'Follow-up concluído';
    client.timeline.unshift({
      date: getTodayBrFormatted(),
      text: actionText,
      isSystem: false
    });
  }

  // Remove from agenda
  store.data.agenda.splice(index, 1);
  store.save();
  renderFollowupsPanel();
  renderDashboard();
}

function rescheduleFollowup(id) {
  const item = store.data.agenda.find(item => item.id === id);
  if (!item) return;
  
  // Show new follow-up modal pre-filled
  document.getElementById('form-follow-client').value = item.clientId;
  document.getElementById('form-follow-notes').value = item.subText;
  
  // Remove the old item first on save
  const index = store.data.agenda.findIndex(i => i.id === id);
  store.data.agenda.splice(index, 1);

  openModal('followup');
}

// --- VIEW: PRODUTOS ---
let currentProductCatFilter = 'all';

function renderProductsCatalog() {
  const grid = document.getElementById('products-catalog-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = store.data.products.filter(p => {
    return currentProductCatFilter === 'all' || p.category === currentProductCatFilter;
  });

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const hasGallery = p.gallery && p.gallery.length > 1;
    const galleryHtml = hasGallery ? `
      <div class="product-gallery-thumbnails">
        ${p.gallery.map((gImg, idx) => `
          <img class="product-thumbnail" src="${gImg}" onmouseover="this.closest('.product-card').querySelector('.product-card-img').src='${gImg}'" onclick="this.closest('.product-card').querySelector('.product-card-img').src='${gImg}'" alt="Thumb ${idx + 1}">
        `).join('')}
      </div>
    ` : '';

    const statusClass = (p.status || 'Disponível').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');

    card.innerHTML = `
      <div class="product-img-wrapper">
        <img class="product-card-img" src="${p.img}" alt="${p.name}">
        <span class="product-category-tag">${p.category}</span>
        <span class="product-status-tag status-${statusClass}">${p.status || 'Disponível'}</span>
        ${galleryHtml}
      </div>
      <div class="product-card-body">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:4px; margin-bottom: 4px;">
          <h3 class="product-card-title">${p.name}</h3>
          <span class="product-line-badge">${p.line || 'Geral'}</span>
        </div>
        <p class="product-card-desc" title="${p.desc}">${p.desc}</p>
        <span class="product-card-price">${formatCurrency(p.price)}</span>
        <div style="font-size:10px; color:var(--text-muted); border-top:1px dashed rgba(212,176,106,0.1); padding-top:6px; margin-top:4px;">
          Obs: ${p.notes || 'Sem observações.'}
        </div>
        <div class="product-card-actions" style="display:flex; gap:8px; margin-top:12px; border-top:1px solid rgba(212, 176, 106, 0.08); padding-top:10px;">
          <button class="followup-btn btn-edit-product" data-id="${p.id}" style="flex:1;">Editar</button>
          <button class="followup-btn btn-delete-product" data-id="${p.id}" style="flex:1; border-color:var(--stage-lost); color:var(--stage-lost);">Excluir</button>
        </div>
      </div>
    `;

    card.querySelector('.btn-edit-product').addEventListener('click', (e) => {
      e.stopPropagation();
      editProduct(p.id);
    });

    card.querySelector('.btn-delete-product').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteProduct(p.id);
    });

    grid.appendChild(card);
  });
}

// Set up product filter actions
document.querySelectorAll('#product-category-filters .filter-tag').forEach(tag => {
  tag.addEventListener('click', () => {
    document.querySelectorAll('#product-category-filters .filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    currentProductCatFilter = tag.getAttribute('data-category');
    renderProductsCatalog();
  });
});

// --- VIEW: VENDAS ---
function renderSalesHistory() {
  const tbody = document.getElementById('sales-history-table-body');
  tbody.innerHTML = '';

  // Reverse to show latest first
  const history = [...store.data.sales].reverse();

  let totalWon = 0;
  let totalCommission = 0;
  let countLost = 0;
  let countWon = 0;

  history.forEach(s => {
    const tr = document.createElement('tr');
    
    if (s.status === 'Ganho') {
      totalWon += s.value;
      totalCommission += s.commission;
      countWon++;
    } else {
      countLost++;
    }

    const prod = store.data.products.find(p => p.name === s.product);
    const cat = prod ? prod.category : 'N/A';

    tr.innerHTML = `
      <td>
        <div style="font-weight:600; color:var(--text-primary);">${s.clientName}</div>
      </td>
      <td>
        <div style="font-family:var(--font-title); font-weight:500;">${s.product}</div>
        <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">${cat}</div>
      </td>
      <td style="font-family:var(--font-title); font-weight:700; color:var(--text-primary);">${formatCurrency(s.value)}</td>
      <td style="font-family:var(--font-title); font-weight:700; color:#10b981;">${s.status === 'Ganho' ? formatCurrency(s.commission) : '-'}</td>
      <td style="font-size:12px;">${formatDateBr(s.date)}</td>
      <td>
        <span class="badge-stage ${s.status === 'Ganho' ? 'won' : 'lost'}">${s.status}</span>
      </td>
      <td style="color:var(--text-muted); font-size:12px; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${s.notes || ''}">
        ${s.notes || '-'}
      </td>
      <td>
        <button class="followup-btn btn-delete-sale" data-id="${s.id}" style="border-color:var(--stage-lost); color:var(--stage-lost);">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Wire delete buttons inside table
  document.querySelectorAll('.btn-delete-sale').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteSale(btn.getAttribute('data-id'));
    });
  });

  // Calculate rate
  const totalConcluded = countWon + countLost;
  const winRate = totalConcluded > 0 ? Math.round((countWon / totalConcluded) * 100) : 0;

  document.getElementById('sales-won-total-val').innerText = formatCurrency(totalWon);
  document.getElementById('sales-commission-total-val').innerText = formatCurrency(totalCommission);
  document.getElementById('sales-win-rate-val').innerText = winRate + '%';
  document.getElementById('sales-lost-total-count').innerText = countLost;
}

// --- VIEW: SCRIPTS COMERCIAIS ---
function renderScriptsTemplates() {
  const container = document.getElementById('scripts-list-container');
  container.innerHTML = '';

  store.data.scripts.forEach((s, idx) => {
    const card = document.createElement('div');
    card.className = 'script-card';
    card.innerHTML = `
      <div class="script-header">
        <span class="script-title">${s.title}</span>
        <span class="script-cat">${s.category}</span>
      </div>
      <pre class="script-body" id="script-text-${idx}">${s.script}</pre>
      <div class="script-actions">
        <button class="btn-secondary btn-copy-script" data-index="${idx}" style="font-size:12px; padding:6px 12px;">Copiar Script</button>
      </div>
    `;

    card.querySelector('.btn-copy-script').addEventListener('click', () => {
      const text = document.getElementById(`script-text-${idx}`).innerText;
      navigator.clipboard.writeText(text).then(() => {
        const btn = card.querySelector('.btn-copy-script');
        btn.innerText = 'Copiado!';
        btn.style.color = 'var(--stage-won)';
        btn.style.borderColor = 'var(--stage-won)';
        setTimeout(() => {
          btn.innerText = 'Copiar Script';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });

    container.appendChild(card);
  });
}

// --- VIEW: RELATÓRIOS ---
function renderReportsData() {
  let totalSold = 0;
  let totalCommission = 0;
  let countWon = 0;
  let countLost = 0;

  store.data.sales.forEach(s => {
    if (s.status === 'Ganho') {
      totalSold += s.value;
      totalCommission += s.commission;
      countWon++;
    } else {
      countLost++;
    }
  });

  document.getElementById('rep-total-sold').innerText = formatCurrency(totalSold);
  document.getElementById('rep-total-commission').innerText = formatCurrency(totalCommission);
  document.getElementById('rep-total-leads').innerText = store.data.clients.length + 9; // Leads total mock
  document.getElementById('rep-total-followups').innerText = store.data.sales.length + store.data.agenda.length + 15; // Actions mock
}

// --- VIEW: AGENDA CALENDÁRIO ---
let calendarCurrentDate = new Date();

function renderCalendar() {
  const grid = document.getElementById('calendar-grid-days');
  grid.innerHTML = '';

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const monthsBr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  document.getElementById('calendar-month-year').innerText = `${monthsBr[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Prev month filler
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    grid.appendChild(emptyCell);
  }

  const todayStr = getTodayISOString();

  // Days list
  for (let day = 1; day <= lastDay; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day';
    
    // Formatting date to ISO YYYY-MM-DD
    const curDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (curDateStr === todayStr) {
      dayCell.classList.add('today');
    }

    dayCell.innerHTML = `
      <span class="day-number">${day}</span>
      <div class="calendar-events" id="cal-events-${curDateStr}"></div>
    `;

    // Populating events for this day
    const dayEvents = store.data.agenda.filter(item => item.date === curDateStr);
    const eventsContainer = dayCell.querySelector(`.calendar-events`);
    
    dayEvents.forEach(evt => {
      const pill = document.createElement('div');
      let typeClass = 'event-other';
      if (evt.priority === 'visit') typeClass = 'event-visit';
      else if (evt.priority === 'medium' || evt.priority === 'high') typeClass = 'event-follow';

      pill.className = `calendar-event-pill ${typeClass}`;
      pill.innerText = `${evt.time} - ${evt.clientName}`;
      pill.title = `${evt.task}: ${evt.subText}`;
      
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        openClientDrawer(evt.clientId);
      });
      eventsContainer.appendChild(pill);
    });

    // Double clicking calendar cell schedules a visit for this day
    dayCell.addEventListener('dblclick', () => {
      document.getElementById('form-visit-date').value = curDateStr;
      openModal('visit');
    });

    grid.appendChild(dayCell);
  }
}

document.getElementById('calendar-prev-month').addEventListener('click', () => {
  calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() - 1);
  renderCalendar();
});
document.getElementById('calendar-next-month').addEventListener('click', () => {
  calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + 1);
  renderCalendar();
});

// --- VIEW: CONFIGURAÇÕES ---
function loadSettingsForm() {
  document.getElementById('cfg-user-name').value = store.data.config.userName || 'Gabriel Lima';
  document.getElementById('cfg-user-role').value = store.data.config.userRole || 'Consultor Náutico';
  document.getElementById('cfg-monthly-goal').value = store.data.config.monthlyGoal || 1000000;
  document.getElementById('cfg-default-commission').value = store.data.config.defaultCommission || 1.25;
  document.getElementById('cfg-user-bio').value = store.data.config.userBio || '';
}

document.getElementById('config-form').addEventListener('submit', (e) => {
  e.preventDefault();
  store.data.config = {
    userName: document.getElementById('cfg-user-name').value,
    userRole: document.getElementById('cfg-user-role').value,
    monthlyGoal: parseFloat(document.getElementById('cfg-monthly-goal').value),
    defaultCommission: parseFloat(document.getElementById('cfg-default-commission').value),
    userBio: document.getElementById('cfg-user-bio').value
  };

  // Sync back profile UI card
  document.querySelector('.sidebar .user-name').innerText = store.data.config.userName;
  document.querySelector('.sidebar .user-role').innerText = store.data.config.userRole;

  store.save();
  alert('Configurações salvas com sucesso!');
});

document.getElementById('btn-cfg-reset-db').addEventListener('click', () => {
  if (confirm('Deseja redefinir todo o banco de dados para os valores padrão do Gabriel Lima? Isso apagará alterações recentes.')) {
    store.restoreDefaults();
    window.location.reload();
  }
});


// ==================== 5. CONTROLES DE MODAIS & DRAWER ====================
const MODAL_IDS = ['client', 'sale-won', 'sale-lost', 'followup', 'visit', 'product'];

function openModal(type) {
  closeAllModals();
  const overlay = document.getElementById(`modal-${type}-overlay`);
  if (overlay) {
    overlay.classList.add('active');
  }
}

function closeModal(type) {
  const overlay = document.getElementById(`modal-${type}-overlay`);
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function closeAllModals() {
  MODAL_IDS.forEach(type => closeModal(type));
}

// Global modal overlay click to close
MODAL_IDS.forEach(type => {
  const overlay = document.getElementById(`modal-${type}-overlay`);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(type);
      }
    });
  }
  // Setup header close btn
  const closeBtn = document.getElementById(`btn-modal-${type}-close`) || document.getElementById(`btn-modal-${type}-cancel`);
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(type));
  }
});

// Setup specific cancel buttons
document.getElementById('btn-modal-client-cancel').addEventListener('click', () => closeModal('client'));
document.getElementById('btn-modal-won-cancel').addEventListener('click', () => closeModal('sale-won'));
document.getElementById('btn-modal-lost-cancel').addEventListener('click', () => closeModal('sale-lost'));
document.getElementById('btn-modal-follow-cancel').addEventListener('click', () => closeModal('followup'));
document.getElementById('btn-modal-visit-cancel').addEventListener('click', () => closeModal('visit'));
document.getElementById('btn-modal-prod-cancel').addEventListener('click', () => closeModal('product'));

// --- TRIGGER FORMS TRIGGERS ---
function triggerSaleWon(clientId) {
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  document.getElementById('won-client-id').value = client.id;
  document.getElementById('won-client-name').value = client.name;
  document.getElementById('won-product-name').value = client.product;
  document.getElementById('won-sale-value').value = client.value;
  
  // Calculate commission based on default rate in configs
  const rate = store.data.config.defaultCommission || 1.25;
  const comm = parseFloat((client.value * (rate / 100)).toFixed(2));
  document.getElementById('won-commission-value').value = comm;
  document.getElementById('won-sale-date').value = getTodayISOString();
  document.getElementById('won-sale-notes').value = '';

  openModal('sale-won');
}

function triggerSaleLost(clientId) {
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  document.getElementById('lost-client-id').value = client.id;
  document.getElementById('lost-client-name').value = client.name;
  document.getElementById('lost-notes').value = '';
  
  openModal('sale-lost');
}

// --- SUBMIT DE FORMULÁRIOS ---
document.getElementById('form-client-opportunity').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('form-c-name').value;
  const phone = document.getElementById('form-c-phone').value;
  const email = document.getElementById('form-c-email').value;
  const product = document.getElementById('form-c-product').value;
  const value = parseFloat(document.getElementById('form-c-value').value);
  const temp = document.getElementById('form-c-temp').value;
  const stage = document.getElementById('form-c-stage').value;
  const notes = document.getElementById('form-c-notes').value;

  const id = 'c_' + Date.now();
  const todayStr = getTodayBrFormatted();

  const newClient = {
    id,
    name,
    phone,
    email,
    product,
    value,
    temp,
    stage,
    created: getTodayISOString(),
    notes,
    timeline: [
      { date: todayStr, text: `Lead cadastrado no estágio '${stage}' com interesse em ${product}.`, isSystem: true }
    ],
    lastAction: 'Lead cadastrado no sistema'
  };

  if (notes) {
    newClient.timeline.push({ date: todayStr, text: `Notas iniciais: ${notes}`, isSystem: false });
  }

  // Double check if stage is Won/Lost to handle commission logs
  if (stage === 'Venda Concluída') {
    closeModal('client');
    triggerSaleWon(id); // Forwards to won sale modal
    // Push client into temporary array so won sale modal can pull it
    store.data.clients.push(newClient);
    return;
  }
  
  if (stage === 'Venda Perdida') {
    closeModal('client');
    triggerSaleLost(id); // Forwards to lost sale modal
    store.data.clients.push(newClient);
    return;
  }

  store.data.clients.push(newClient);
  store.save();
  closeModal('client');
  
  // Refresh views
  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
  renderDashboard();
});

document.getElementById('form-sale-won').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const clientId = document.getElementById('won-client-id').value;
  const clientName = document.getElementById('won-client-name').value;
  const productName = document.getElementById('won-product-name').value;
  const value = parseFloat(document.getElementById('won-sale-value').value);
  const commission = parseFloat(document.getElementById('won-commission-value').value);
  const date = document.getElementById('won-sale-date').value;
  const notes = document.getElementById('won-sale-notes').value;

  // 1. Log sale record
  const newSale = {
    id: 's_' + Date.now(),
    clientName,
    product: productName,
    value,
    commission,
    date,
    status: 'Ganho',
    notes: notes || 'Venda registrada com sucesso.'
  };
  store.data.sales.push(newSale);

  // 2. Update client details
  const client = store.data.clients.find(c => c.id === clientId);
  if (client) {
    client.stage = 'Venda Concluída';
    client.value = value;
    client.lastAction = 'Venda concluída! R$ ' + value.toLocaleString('pt-BR');
    client.timeline.unshift({
      date: formatDateBr(date),
      text: `🏆 Venda Concluída! Valor final: R$ ${value.toLocaleString('pt-BR')} (Comissão: R$ ${commission.toLocaleString('pt-BR')}). Notas: ${notes}`,
      isSystem: true
    });
  }

  addNotification('Venda Concluída! 🏆', `Cliente: ${clientName} - ${productName} (R$ ${value.toLocaleString('pt-BR')})`, 'Agora');
  store.save();
  closeModal('sale-won');
  
  // Reload current screen
  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
  renderDashboard();
});

document.getElementById('form-sale-lost').addEventListener('submit', (e) => {
  e.preventDefault();

  const clientId = document.getElementById('lost-client-id').value;
  const clientName = document.getElementById('lost-client-name').value;
  const reason = document.getElementById('lost-reason').value;
  const notes = document.getElementById('lost-notes').value;

  const client = store.data.clients.find(c => c.id === clientId);
  let productName = 'Veículo';
  let value = 0;
  if (client) {
    productName = client.product;
    value = client.value;
    client.stage = 'Venda Perdida';
    client.lastAction = 'Oportunidade Perdida: ' + reason;
    client.timeline.unshift({
      date: getTodayBrFormatted(),
      text: `❌ Oportunidade perdida. Motivo: ${reason}. Detalhes: ${notes}`,
      isSystem: true
    });
  }

  // Log in sales history
  const newLostSale = {
    id: 's_' + Date.now(),
    clientName,
    product: productName,
    value,
    commission: 0,
    date: getTodayISOString(),
    status: 'Perdido',
    notes: `${reason} - ${notes}`
  };
  store.data.sales.push(newLostSale);

  addNotification('Oportunidade Perdida ⚠️', `Cliente: ${clientName} - Motivo: ${reason}`, 'Agora');
  store.save();
  closeModal('sale-lost');
  
  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
  renderDashboard();
});

document.getElementById('form-new-followup').addEventListener('submit', (e) => {
  e.preventDefault();

  const clientId = document.getElementById('form-follow-client').value;
  const taskText = document.getElementById('form-follow-type').value;
  const date = document.getElementById('form-follow-date').value;
  const time = document.getElementById('form-follow-time').value;
  const notes = document.getElementById('form-follow-notes').value;

  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  const newFollow = {
    id: 'a_' + Date.now(),
    clientId,
    clientName: client.name,
    task: taskText,
    subText: notes,
    time,
    date,
    priority: taskText.includes('Visita') ? 'visit' : 'medium'
  };

  store.data.agenda.push(newFollow);
  
  // Add timeline trace
  client.timeline.unshift({
    date: getTodayBrFormatted(),
    text: `Agendado follow-up: '${taskText}' para ${formatDateBr(date)} às ${time}. Roteiro: ${notes}`,
    isSystem: true
  });
  client.lastAction = `Follow-up agendado (${formatDateBr(date)})`;

  addNotification('Follow-up Agendado 📞', `Cliente: ${client.name} - Ação: ${taskText}`, 'Agora');
  store.save();
  closeModal('followup');

  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
  renderDashboard();
});

document.getElementById('form-new-visit').addEventListener('submit', (e) => {
  e.preventDefault();

  const clientId = document.getElementById('form-visit-client').value;
  const date = document.getElementById('form-visit-date').value;
  const time = document.getElementById('form-visit-time').value;
  const location = document.getElementById('form-visit-location').value;
  const notes = document.getElementById('form-visit-notes').value;

  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  const newVisit = {
    id: 'a_' + Date.now(),
    clientId,
    clientName: client.name,
    task: 'Visita agendada',
    subText: `${location} - ${notes}`,
    time,
    date,
    priority: 'visit'
  };

  store.data.agenda.push(newVisit);

  // Update client's stage to Visita Agendada automatically
  const prevStage = client.stage;
  client.stage = 'Visita Agendada';
  client.timeline.unshift({
    date: getTodayBrFormatted(),
    text: `⛵ Visita técnica agendada para ${formatDateBr(date)} às ${time} em '${location}'. Notas: ${notes}`,
    isSystem: true
  });
  client.lastAction = `Visita agendada para ${formatDateBr(date)}`;

  addNotification('Visita Técnica Agendada ⛵', `Cliente: ${client.name} em ${location}`, 'Agora');
  store.save();
  closeModal('visit');

  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
  renderDashboard();
});

document.getElementById('form-new-product').addEventListener('submit', (e) => {
  e.preventDefault();

  const pId = document.getElementById('prod-id').value;
  const name = document.getElementById('prod-name').value;
  const category = document.getElementById('prod-category').value;
  const line = document.getElementById('prod-line').value;
  const status = document.getElementById('prod-status').value;
  const price = parseFloat(document.getElementById('prod-price').value);
  const defaultImg = document.getElementById('prod-image-select').value;
  const desc = document.getElementById('prod-desc').value;
  const notes = document.getElementById('prod-notes').value;

  const fileInput = document.getElementById('prod-image-file');
  const galleryInput = document.getElementById('prod-gallery-file');

  const readGalleryFiles = (files, callback) => {
    if (!files || files.length === 0) {
      callback([]);
      return;
    }
    let loaded = 0;
    const results = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        results.push(event.target.result);
        loaded++;
        if (loaded === files.length) {
          callback(results);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const saveProduct = (imgSrc, galleryImages) => {
    if (pId) {
      // Editing existing product
      const existingProd = store.data.products.find(prod => prod.id === pId);
      if (existingProd) {
        existingProd.name = name;
        existingProd.category = category;
        existingProd.line = line;
        existingProd.status = status;
        existingProd.price = price;
        
        const selectValue = document.getElementById('prod-image-select').value;
        if (imgSrc) {
          existingProd.img = imgSrc;
        } else if (selectValue !== 'custom') {
          existingProd.img = selectValue;
        }
        
        if (galleryImages && galleryImages.length > 0) {
          existingProd.gallery = galleryImages;
        } else if (!existingProd.gallery) {
          existingProd.gallery = [existingProd.img || 'assets/lancha.png'];
        }
        
        existingProd.desc = desc;
        existingProd.notes = notes;
        
        addNotification('Veículo atualizado', `${name} foi editado com sucesso.`, 'Agora');
      }
    } else {
      // Creating new product
      const mainImg = imgSrc || defaultImg;
      const newProd = {
        id: 'p_' + Date.now(),
        name,
        category,
        line,
        status,
        price,
        img: mainImg,
        gallery: (galleryImages && galleryImages.length > 0) ? galleryImages : [mainImg],
        desc,
        notes
      };

      store.data.products.push(newProd);
      addNotification('Novo veículo cadastrado', `${name} (${category}) foi adicionado ao catálogo.`, 'Agora');
    }

    store.save();
    closeModal('product');

    // Populate options elsewhere
    populateProductsDropdown();
    
    const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
    renderActiveView(activeTab);
  };

  readGalleryFiles(galleryInput.files, (galleryImages) => {
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        saveProduct(event.target.result, galleryImages);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      saveProduct(null, galleryImages);
    }
  });
});

function editProduct(productId) {
  const p = store.data.products.find(prod => prod.id === productId);
  if (!p) return;

  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-line').value = p.line || 'Comfort';
  document.getElementById('prod-status').value = p.status || 'Disponível';
  document.getElementById('prod-price').value = p.price;
  document.getElementById('prod-desc').value = p.desc;
  document.getElementById('prod-notes').value = p.notes || '';
  
  document.getElementById('prod-image-file').value = ''; // Reset file upload
  document.getElementById('prod-gallery-file').value = ''; // Reset gallery upload
  
  const select = document.getElementById('prod-image-select');
  const customOpt = select.querySelector('option[value="custom"]');
  if (customOpt) customOpt.remove();

  const isDefaultImg = ['assets/lancha.png', 'assets/jetski.png', 'assets/quadriciclo.png', 'assets/utv.png'].includes(p.img);
  if (isDefaultImg) {
    select.value = p.img;
  } else {
    // Custom photo
    const opt = document.createElement('option');
    opt.value = 'custom';
    opt.innerText = '✨ Imagem Carregada do Computador';
    opt.selected = true;
    select.appendChild(opt);
    select.value = 'custom';
  }

  document.getElementById('modal-product-title').innerText = 'Editar Veículo / Embarcação';
  openModal('product');
}

function deleteProduct(productId) {
  if (confirm('Tem certeza de que deseja excluir este veículo do catálogo?')) {
    const idx = store.data.products.findIndex(prod => prod.id === productId);
    if (idx !== -1) {
      const name = store.data.products[idx].name;
      store.data.products.splice(idx, 1);
      store.save();
      addNotification('Veículo excluído', `${name} foi removido do catálogo.`, 'Agora');
      renderProductsCatalog();
      populateProductsDropdown();
    }
  }
}

function deleteClient(clientId) {
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  if (confirm(`Tem certeza de que deseja excluir o cliente "${client.name}" do sistema? Isso apagará todas as interações e registros vinculados.`)) {
    // 1. Remove from clients list
    const index = store.data.clients.findIndex(c => c.id === clientId);
    if (index !== -1) {
      store.data.clients.splice(index, 1);
    }

    // 2. Remove related agenda items
    store.data.agenda = store.data.agenda.filter(item => item.clientId !== clientId);

    addNotification('Lead excluído', `${client.name} foi removido do sistema.`, 'Agora');
    store.save();

    // 3. Close drawer if open
    closeClientDrawer();

    // 4. Rerender views
    const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
    renderActiveView(activeTab);
    renderDashboard();
  }
}

function deleteSale(saleId) {
  const sale = store.data.sales.find(s => s.id === saleId);
  if (!sale) return;

  if (confirm(`Tem certeza de que deseja excluir o registro de venda de "${sale.clientName}" (${sale.product})? Isso alterará as estatísticas acumuladas e os gráficos de faturamento.`)) {
    const index = store.data.sales.findIndex(s => s.id === saleId);
    if (index !== -1) {
      store.data.sales.splice(index, 1);
    }
    
    addNotification('Registro de Venda Excluído', `Venda de ${sale.clientName} (Status: ${sale.status}) foi apagada.`, 'Agora');
    store.save();

    // Rerender views
    renderSalesHistory();
    renderDashboard();
  }
}

// --- LATERAL PROFILE DRAWER ACTION NOTE SUBMIT ---
document.getElementById('drawer-add-note-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const clientId = document.getElementById('drawer-client-container').getAttribute('data-client-id');
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  const textVal = document.getElementById('drw-new-note-text').value;
  
  client.timeline.unshift({
    date: getTodayBrFormatted(),
    text: textVal,
    isSystem: false
  });
  client.lastAction = 'Observação registrada';

  store.save();
  document.getElementById('drw-new-note-text').value = '';

  // Rerender drawer timeline
  renderDrawerTimeline(client);
  
  // Refresh current view background
  const activeTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
  renderActiveView(activeTab);
});


// --- DRAWER OPEN / CLOSE ---
function openClientDrawer(clientId) {
  const client = store.data.clients.find(c => c.id === clientId);
  if (!client) return;

  // Pre-fill drawer elements
  document.getElementById('drawer-client-container').setAttribute('data-client-id', clientId);
  document.getElementById('drw-client-name').innerText = client.name;
  
  const stageEl = document.getElementById('drw-client-stage');
  stageEl.innerText = client.stage;
  
  // Clear classes and set correct badge design
  stageEl.className = 'badge-stage';
  const stageClassMap = {
    'Lead Captado': 'lead',
    'Primeiro Contato': 'contact',
    'Qualificado': 'qualified',
    'Em Negociação': 'negotiation',
    'Visita Agendada': 'visit',
    'Venda Concluída': 'won',
    'Venda Perdida': 'lost'
  };
  stageEl.classList.add(stageClassMap[client.stage] || 'lead');

  document.getElementById('drw-client-product').innerText = client.product;
  document.getElementById('drw-client-value').innerText = formatCurrency(client.value);
  document.getElementById('drw-client-email').innerText = client.email || 'Não informado';
  document.getElementById('drw-client-phone').innerText = client.phone;
  document.getElementById('drw-client-temp').innerText = client.temp;
  document.getElementById('drw-client-created').innerText = formatDateBr(client.created);

  renderDrawerTimeline(client);

  // Activate overlays
  document.getElementById('drawer-client-overlay').classList.add('active');
  document.getElementById('drawer-client-container').classList.add('active');
}

function renderDrawerTimeline(client) {
  const container = document.getElementById('drawer-timeline-flow');
  container.innerHTML = '';

  client.timeline.forEach(item => {
    const el = document.createElement('div');
    el.className = `timeline-item ${item.isSystem ? 'system' : ''}`;
    el.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-time">${item.date}</div>
      <div class="timeline-content">${item.text}</div>
    `;
    container.appendChild(el);
  });
}

function closeClientDrawer() {
  document.getElementById('drawer-client-overlay').classList.remove('active');
  document.getElementById('drawer-client-container').classList.remove('active');
}

document.getElementById('btn-drawer-close').addEventListener('click', closeClientDrawer);
document.getElementById('drawer-client-overlay').addEventListener('click', closeClientDrawer);


// ==================== 6. BOTÕES DE ACELERAÇÃO (QUICK ACTIONS) ====================
document.getElementById('btn-quick-new-client').addEventListener('click', () => {
  populateProductsDropdown();
  document.getElementById('form-client-opportunity').reset();
  document.getElementById('form-client-id').value = '';
  document.getElementById('modal-client-title').innerText = 'Cadastrar Novo Lead';
  document.getElementById('form-c-stage').value = 'Lead Captado';
  openModal('client');
});

document.getElementById('btn-add-client-tab').addEventListener('click', () => {
  document.getElementById('btn-quick-new-client').click();
});

document.getElementById('btn-quick-new-opportunity').addEventListener('click', () => {
  populateProductsDropdown();
  document.getElementById('form-client-opportunity').reset();
  document.getElementById('form-client-id').value = '';
  document.getElementById('modal-client-title').innerText = 'Nova Oportunidade Comercial';
  document.getElementById('form-c-stage').value = 'Em Negociação';
  openModal('client');
});

document.getElementById('btn-add-opportunity-funil').addEventListener('click', () => {
  document.getElementById('btn-quick-new-opportunity').click();
});

document.getElementById('btn-quick-schedule-visit').addEventListener('click', () => {
  populateClientsDropdown('form-visit-client');
  document.getElementById('form-new-visit').reset();
  document.getElementById('form-visit-date').value = getTodayISOString();
  openModal('visit');
});

document.getElementById('btn-agenda-new-visit').addEventListener('click', () => {
  document.getElementById('btn-quick-schedule-visit').click();
});

document.getElementById('btn-quick-new-followup').addEventListener('click', () => {
  populateClientsDropdown('form-follow-client');
  document.getElementById('form-new-followup').reset();
  document.getElementById('form-follow-date').value = getTodayISOString();
  openModal('followup');
});

document.getElementById('btn-add-followup-tab').addEventListener('click', () => {
  document.getElementById('btn-quick-new-followup').click();
});

document.getElementById('btn-add-product-tab').addEventListener('click', () => {
  document.getElementById('form-new-product').reset();
  const select = document.getElementById('prod-image-select');
  const customOpt = select.querySelector('option[value="custom"]');
  if (customOpt) customOpt.remove();
  document.getElementById('prod-id').value = '';
  document.getElementById('modal-product-title').innerText = 'Cadastrar Veículo / Embarcação';
  openModal('product');
});

// Trigger sales completion manually from top bar
document.getElementById('btn-mark-won-sale').addEventListener('click', () => {
  populateClientsDropdown('won-client-id', true);
  // Auto load first client's value
  const select = document.getElementById('won-client-id');
  
  function updateWonFields() {
    const cId = select.value;
    const client = store.data.clients.find(c => c.id === cId);
    if (client) {
      document.getElementById('won-client-name').value = client.name;
      document.getElementById('won-product-name').value = client.product;
      document.getElementById('won-sale-value').value = client.value;
      const rate = store.data.config.defaultCommission || 1.25;
      document.getElementById('won-commission-value').value = parseFloat((client.value * (rate / 100)).toFixed(2));
    }
  }

  // Change won client dropdown input to standard select for manual entry
  select.outerHTML = `<select class="form-control" id="won-client-id" required></select>`;
  populateClientsDropdown('won-client-id', true);
  
  const newSelect = document.getElementById('won-client-id');
  newSelect.addEventListener('change', updateWonFields);
  updateWonFields();

  document.getElementById('won-sale-date').value = getTodayISOString();
  document.getElementById('won-sale-notes').value = '';
  openModal('sale-won');
});

document.getElementById('btn-mark-lost-sale').addEventListener('click', () => {
  populateClientsDropdown('lost-client-id', true);
  const select = document.getElementById('lost-client-id');

  function updateLostFields() {
    const cId = select.value;
    const client = store.data.clients.find(c => c.id === cId);
    if (client) {
      document.getElementById('lost-client-name').value = client.name;
    }
  }

  select.outerHTML = `<select class="form-control" id="lost-client-id" required></select>`;
  populateClientsDropdown('lost-client-id', true);
  
  const newSelect = document.getElementById('lost-client-id');
  newSelect.addEventListener('change', updateLostFields);
  updateLostFields();

  document.getElementById('lost-notes').value = '';
  openModal('sale-lost');
});


// --- UTILITY DROPDOWN POPULATORS ---
function populateProductsDropdown() {
  const select = document.getElementById('form-c-product');
  select.innerHTML = '';
  store.data.products.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.name;
    opt.innerText = `${p.name} - ${formatCurrency(p.price)}`;
    select.appendChild(opt);
  });
}

function populateClientsDropdown(selectId, excludeWonLost = false) {
  const select = document.getElementById(selectId);
  select.innerHTML = '';
  
  let list = store.data.clients;
  if (excludeWonLost) {
    list = list.filter(c => !['Venda Concluída', 'Venda Perdida'].includes(c.stage));
  }

  if (list.length === 0) {
    const opt = document.createElement('option');
    opt.innerText = 'Nenhum lead ativo disponível';
    select.appendChild(opt);
    return;
  }

  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.innerText = `${c.name} (${c.product})`;
    select.appendChild(opt);
  });
}

// --- INITIAL SEARCH LISTENERS ---
// Focussing search when '/' is pressed
window.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
    e.preventDefault();
    document.getElementById('global-search').focus();
  }
});

document.getElementById('global-search').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  if (term.length > 1) {
    // If not in clientes view, switch to it automatically to show matches
    const curTab = document.querySelector('.menu-item.active').getAttribute('data-tab');
    if (curTab !== 'clientes') {
      document.getElementById('menu-clientes').click();
    }
    document.getElementById('client-search').value = term;
    renderClientsTable();
  }
});


// ==================== 7. HELPER FUNCTIONS ====================
function getTodayISOString() {
  // Returns 'YYYY-MM-DD' matching local offset
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(Date.now() - tzoffset)).toISOString().split('T')[0];
}

function getTodayBrFormatted() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function formatDateBr(isoStr) {
  if (!isoStr) return '';
  const parts = isoStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  
  // Try treating as Date obj format
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return isoStr;
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function formatCurrency(val) {
  if (isNaN(val)) return 'R$ 0,00';
  return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatShortCurrency(val) {
  if (val >= 1000000) {
    return 'R$ ' + (val / 1000000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + 'M';
  }
  if (val >= 1000) {
    return 'R$ ' + (val / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) + 'k';
  }
  return 'R$ ' + val.toLocaleString('pt-BR');
}

// ==================== 7.1 LOGICA DE NOTIFICAÇÕES ====================
function addNotification(title, text, time = 'Agora') {
  const notif = {
    id: 'n_' + Date.now(),
    title,
    text,
    time,
    unread: true
  };
  
  if (!store.data.notifications) {
    store.data.notifications = [];
  }
  
  store.data.notifications.unshift(notif);
  // Cap at 15 items
  if (store.data.notifications.length > 15) {
    store.data.notifications.pop();
  }
  
  store.save();
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById('notifications-list');
  if (!list) return;

  list.innerHTML = '';
  const notifs = store.data.notifications || [];

  if (notifs.length === 0) {
    list.innerHTML = '<div style="padding: 20px; text-align:center; color: var(--text-muted); font-size:11px;">Nenhuma notificação.</div>';
    document.getElementById('btn-notifications').classList.remove('has-notification');
    return;
  }

  let unreadCount = 0;

  notifs.forEach(n => {
    if (n.unread) unreadCount++;

    const el = document.createElement('div');
    el.className = `notif-item ${n.unread ? 'unread' : ''}`;
    el.innerHTML = `
      <span class="notif-title">${n.title}</span>
      <span style="color:var(--text-secondary); margin-top:2px;">${n.text}</span>
      <span class="notif-time">${n.time}</span>
    `;

    el.addEventListener('click', () => {
      n.unread = false;
      store.save();
      renderNotifications();
    });

    list.appendChild(el);
  });

  const bell = document.getElementById('btn-notifications');
  if (bell) {
    if (unreadCount > 0) {
      bell.classList.add('has-notification');
      bell.setAttribute('data-count', unreadCount);
    } else {
      bell.classList.remove('has-notification');
      bell.removeAttribute('data-count');
    }
  }
}

// ==================== 8. BOOTSTRAP APLICAÇÃO ====================
function renderUserAvatar() {
  const avatar = store.data.config.userAvatar;
  const sidebarSvg = document.getElementById('sidebar-avatar-svg');
  const sidebarImg = document.getElementById('sidebar-avatar-img');
  const configSvg = document.getElementById('config-avatar-svg');
  const configImg = document.getElementById('config-avatar-img');

  if (avatar) {
    if (sidebarSvg) sidebarSvg.style.display = 'none';
    if (sidebarImg) {
      sidebarImg.src = avatar;
      sidebarImg.style.display = 'block';
    }
    if (configSvg) configSvg.style.display = 'none';
    if (configImg) {
      configImg.src = avatar;
      configImg.style.display = 'block';
    }
  } else {
    if (sidebarSvg) sidebarSvg.style.display = 'block';
    if (sidebarImg) sidebarImg.style.display = 'none';
    if (configSvg) configSvg.style.display = 'block';
    if (configImg) configImg.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Setup user details from config
  document.querySelector('.sidebar .user-name').innerText = store.data.config.userName || 'Gabriel Lima';
  document.querySelector('.sidebar .user-role').innerText = store.data.config.userRole || 'Consultor Náutico';
  
  // Set default dates inside headers
  const todayBr = getTodayBrFormatted();
  document.getElementById('header-date-label').innerText = `${todayBr} a ${todayBr}`;

  // Notification dropdown toggle
  const notifBtn = document.getElementById('btn-notifications');
  const notifDropdown = document.getElementById('notifications-dropdown-menu');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      // Toggle dropdown
      notifDropdown.classList.toggle('active');
      e.stopPropagation();
    });

    notifDropdown.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing when clicking dropdown items
    });
  }

  // Hide notification dropdown when clicking outside
  document.addEventListener('click', () => {
    if (notifDropdown) {
      notifDropdown.classList.remove('active');
    }
  });

  // Mark all notifications as read
  const markAllReadBtn = document.getElementById('btn-mark-all-read');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      if (store.data.notifications) {
        store.data.notifications.forEach(n => n.unread = false);
        store.save();
        renderNotifications();
      }
    });
  }

  // Avatar upload listener
  const avatarUploader = document.getElementById('avatar-uploader');
  if (avatarUploader) {
    avatarUploader.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          store.data.config.userAvatar = event.target.result;
          store.save();
          renderUserAvatar();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Won sale value recalculation listener
  const wonSaleValueInput = document.getElementById('won-sale-value');
  if (wonSaleValueInput) {
    wonSaleValueInput.addEventListener('input', () => {
      const saleVal = parseFloat(wonSaleValueInput.value) || 0;
      const rate = store.data.config.defaultCommission || 1.25;
      const comm = parseFloat((saleVal * (rate / 100)).toFixed(2));
      document.getElementById('won-commission-value').value = comm;
    });
  }

  // Drawer delete client listener
  const drawerDeleteBtn = document.getElementById('btn-drawer-delete-client');
  if (drawerDeleteBtn) {
    drawerDeleteBtn.addEventListener('click', () => {
      const clientId = document.getElementById('drawer-client-container').getAttribute('data-client-id');
      deleteClient(clientId);
    });
  }

  setupTabs();
  renderDashboard();
  initCharts();
  renderNotifications();
  renderUserAvatar();
});
