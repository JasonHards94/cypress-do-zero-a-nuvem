describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário.', () => {
    cy.get('input[name="firstName"]').type('John')
    cy.get('input[name="lastName"]').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#phone').type('1234567890')
    cy.get('#open-text-area').type('This is a test message.', { delay: 0 })
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  });
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#email').type('john.doe@example..com')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  });
  it('valor não-numérico for digitado, seu valor continuará vazio.', () => {
    cy.get('#phone').type('asdsfds')
    cy.get('button[type="submit"]').click()
    cy.get('#phone').should('have.value', '')
  });
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    cy.get('#phone').should('have.value', '')
    cy.get('.error').should('be.visible')
  });
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  });
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Jane',
      email: 'jane.doe@example.com'
    })
    cy.get('.success').should('be.visible')
  });
  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube').should('have.value', 'youtube')
  });
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select').select('mentoria').should('have.value', 'mentoria')
  });
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  });
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  });
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((radio) => {
      cy.wrap(radio).check().should('have.value', radio.val())
    })
  });
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
  });
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  });
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  });
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('example')
    cy.get('#file-upload')
      .selectFile('@example')
      .should((input) => {
        expect(input[0].files[0].name).to.eq('example.json')
      });
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  });
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') 
  });
})
