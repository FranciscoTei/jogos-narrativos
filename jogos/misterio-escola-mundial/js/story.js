/**
 * Dados Narrativos — Pistas, Suspeitos e Conexões
 * O Mistério da Escola — 100% Offline
 */
window.StoryData = (() => {
  'use strict';

  const ASSET = 'assets/images/';

  const IMAGES = {
    classroom: ASSET + 'sala_aula.png',
    gate: ASSET + 'portaria.png',
    director: ASSET + 'sala_diretora.png',
    library: ASSET + 'biblioteca_clara.png',
    lab: ASSET + 'laboratorio_claro.png',
    archive: ASSET + 'secretaria.png',
    corridor: ASSET + 'corredores.png',
    restricted: ASSET + 'area_interditada.png',
    passage: ASSET + 'passagem_secreta.png',
    secret: ASSET + 'sala_secreta.png',
    outside: ASSET + 'area_externa.png'
  };

  const CLUE_CATALOG = {
    helena_note:           ['Bilhete & Caderno de Helena',      'Anotações da professora apontando o encontro das 18h na Biblioteca.',              '📄 Documento'],
    fake_ambulance_note:   ['Falso Bilhete da Ambulância',      'Escrita forjada sem timbre hospitalar usada para encobrir o sequestro.',           '🔍 Indício'],
    gate_camera_van:       ['Gravação do Furgão Branco',        'Imagens do furgão de carga estacionado no muro lateral em múltiplas datas.',       '📸 Fotografia'],
    shelf6_photo:          ['Fotografia da Estante 6',          'Revela a porta de serviço oculta atrás da estante de história.',                   '📸 Fotografia'],
    olivia_key_log:        ['Registro de Chaves',               'A chave da biblioteca foi retirada fora do horário em datas coincidentes.',        '📋 Registro'],
    carla_auto_part:       ['Peça Mecânica de Carla',           'Componente de furgão de carga encontrado escondido no laboratório.',               '🗝️ Objeto'],
    lab_old_key:           ['Chave da Ala Antiga',              'Chave de latão que encaixa na fechadura da Estante 6.',                            '🗝️ Objeto'],
    augusto_blueprint:     ['Planta da Passagem Secreta',       'Planta arquitetônica mostrando a alavanca lateral da Estante 6.',                  '📄 Documento'],
    enrique_contradiction: ['Contradições de Enrique',          'Mentiras documentadas sobre o hospital e o paradeiro de Helena.',                  '💬 Depoimento'],
    mario_suspicious_call: ['Ligação Suspeita de Mário',        'Inspetor flagrado mencionando "a entrega" e "trancar a ala" ao telefone.',         '💬 Depoimento'],
    olivia_donation_receipt:['Recibos de Doações Suspeitas',    'Comprovantes de pagamentos de "Auto Express Ltda" para fundo da diretoria.',       '📋 Registro']
  };

  const SUSPECT_DEFINITIONS = [
    {
      id: 'olivia',
      name: 'Diretora Olívia',
      base: 'Diretora rígida que tenta abafar os desaparecimentos. Controla todos os acessos da escola.',
      isRevealedCondition: (has, state) => state.visited.has('Sala da diretora Olívia') || has('olivia_key_log'),
      getFacts: (has) => [
        has('olivia_key_log') && 'A chave da biblioteca foi retirada fora do horário sob sua supervisão.',
        has('olivia_donation_receipt') && 'Recebeu pagamentos de uma empresa ligada ao comércio de autopeças.',
        has('gate_camera_van') && 'Tentou impedir a investigação das alunas e acionou a inspetoria.'
      ].filter(Boolean)
    },
    {
      id: 'mario',
      name: 'Inspetor Mário',
      base: 'Inspetor de segurança do turno da tarde. Controla rondas e acessos nos corredores.',
      isRevealedCondition: (has, state) => has('mario_suspicious_call') || has('gate_camera_van') || state.visited.has('Corredores'),
      getFacts: (has) => [
        has('mario_suspicious_call') && 'Flagrado numa ligação telefônica mencionando entregas e a ala antiga.',
        has('gate_camera_van') && 'Estava de plantão em todos os horários em que o furgão apareceu nas câmeras.',
        has('olivia_key_log') && 'Seu crachá aparece nos registros de retirada de chave fora do expediente.'
      ].filter(Boolean)
    },
    {
      id: 'augusto',
      name: 'Senhor Augusto',
      base: 'Antigo zelador que conhece cada canto do prédio. Ronda a ala interditada à noite sem autorização.',
      isRevealedCondition: (has, state) => state.visited.has('Jardins da escola') || has('augusto_blueprint'),
      getFacts: (has) => [
        has('augusto_blueprint') && 'Guardava a planta arquitetônica da passagem secreta há décadas.',
        has('mario_suspicious_call') && 'Faz rondas noturnas na ala antiga por conta própria, sem comunicar à diretoria.'
      ].filter(Boolean)
    },
    {
      id: 'enrique',
      name: 'Enrique',
      base: 'Ex-marido de Helena. Visto frequentando a escola em horários incomuns.',
      isRevealedCondition: (has) => has('enrique_contradiction') || has('gate_camera_van'),
      getFacts: (has) => [
        has('gate_camera_van') && 'Seu furgão aparece repetidamente nas câmeras da portaria em horários suspeitos.',
        has('enrique_contradiction') && 'Mentiu sobre o hospital e o paradeiro de Helena quando confrontado.',
        has('carla_auto_part') && 'As peças automotivas encontradas são compatíveis com a carga do seu furgão.'
      ].filter(Boolean)
    }
  ];

  const CONNECTION_RULES = [
    {
      condition: (has) => has('fake_ambulance_note') && has('gate_camera_van'),
      title: '🚗 O Furgão Disfarçado',
      text: 'O mesmo furgão de carga que aparece nas câmeras em horários suspeitos foi usado para simular um socorro médico. O bilhete não tem timbre de hospital.'
    },
    {
      condition: (has) => has('carla_auto_part') && has('helena_note'),
      title: '🧩 O Depósito na Ala Antiga',
      text: 'Carla e Helena descobriram separadamente que peças automotivas estavam sendo armazenadas na ala desativada da escola.'
    },
    {
      condition: (has) => has('shelf6_photo') && has('lab_old_key') && has('augusto_blueprint'),
      title: '🗝️ O Acesso Oculto',
      text: 'Foto, chave e planta combinadas revelam como destravar a passagem atrás da Estante 6.'
    },
    {
      condition: (has) => has('mario_suspicious_call') && has('gate_camera_van'),
      title: '🔗 O Cúmplice Interno',
      text: 'O inspetor Mário facilitava a entrada do furgão e o acesso à ala antiga. Sem alguém de dentro, o esquema seria impossível.'
    },
    {
      condition: (has) => has('olivia_donation_receipt') && has('olivia_key_log'),
      title: '💰 O Encobrimento Financeiro',
      text: 'Olívia recebia pagamentos de uma empresa fantasma em troca de não questionar as atividades noturnas na escola.'
    },
    {
      condition: (has) => has('enrique_contradiction') && has('mario_suspicious_call'),
      title: '🕵️ A Rede Desmascarada',
      text: 'Enrique comandava a operação de fora e Mário garantia o acesso por dentro. Juntos, transformaram a escola num depósito clandestino.'
    }
  ];

  return {
    IMAGES,
    CLUE_CATALOG,
    SUSPECT_DEFINITIONS,
    CONNECTION_RULES
  };
})();
