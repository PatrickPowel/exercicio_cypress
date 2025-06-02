describe('Agenda de Contatos', () => {
  const contatos = [
    { nome: 'Gian Souza', telefone: '11912345678', email: 'gian@ebac.com.br' },
    { nome: 'Bruna Costa', telefone: '11987654321', email: 'bruna@ebac.com.br' },
  ];

  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/');
    // Aguarda o formulário estar visível para garantir que a página carregou
    cy.get('input[placeholder="Nome"]', { timeout: 10000 }).should('be.visible');
  });

  it('Deve adicionar vários contatos na agenda', () => {
    contatos.forEach((contato) => {
      cy.get('input[placeholder="Nome"]').clear().type(contato.nome);
      cy.get('input[placeholder="Telefone"]').clear().type(contato.telefone);
      cy.get('input[placeholder="Email"]', { timeout: 10000 }).should('be.visible').clear().type(contato.email);
      cy.contains('Adicionar').click();
      // Verifica se o contato foi adicionado na lista
      cy.contains(contato.nome).should('exist');
    });
  });

  it('Deve editar um contato existente', () => {
    const contatoOriginal = contatos[0];
    const contatoEditado = {
      nome: 'Gian Souza Editado',
      telefone: '11911112222',
      email: 'gian.editado@ebac.com.br',
    };

    // Espera o contato original existir
    cy.contains(contatoOriginal.nome, { timeout: 10000 }).should('exist')
      .parent() // pega o elemento pai da linha do contato
      .within(() => {
        cy.contains('Editar').click();
      });

    cy.get('input[placeholder="Nome"]').clear().type(contatoEditado.nome);
    cy.get('input[placeholder="Telefone"]').clear().type(contatoEditado.telefone);
    cy.get('input[placeholder="Email"]').clear().type(contatoEditado.email);
    cy.contains('Salvar').click();

    // Verifica se o contato editado aparece na lista
    cy.contains(contatoEditado.nome).should('exist');
  });

  it('Deve excluir um contato', () => {
    const contatoParaExcluir = contatos[1];

    cy.contains(contatoParaExcluir.nome, { timeout: 10000 }).should('exist')
      .parent()
      .within(() => {
        cy.contains('Excluir').click();
      });

    // Verifica se o contato sumiu da lista
    cy.contains(contatoParaExcluir.nome).should('not.exist');
  });
});
