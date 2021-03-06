describe(`Changement de la photo de profil dans les paramètres`, () => {
  before(() => {
    cy.visit('fr/me/settings/account')

    cy.fixture('ids/data').then((data) => {

      cy.get('.sc-igXgud > [data-testid="login-field-email"]').type(data.email)
      cy.get('[data-testid="login-field-password"]').type(data.password)
      cy.get('[data-testid="login-button-submit"]').click()

    })
  })
  it("Update de la photo de profil", () => {

    cy.get('#axeptio_btn_acceptAll').click()

    cy.get('.dfcLOV').attachFile('img/inqom.png', { subjectType: 'drag-n-drop' })
    cy.get('[data-testid="account-edit-button-submit"]')
    cy.get('.sc-hlGDCY').should('not.contain', 'Ajouter un fichier').then(() => {
      cy.get('[data-testid="account-edit-button-submit"]').click()
    })

    cy.reload()

    cy.get('.bZzTqu > .sc-fyrocj').click().then(() => {
      cy.get('[data-testid="account-edit-button-submit"]').click()
      cy.get('.sc-hkgtus').should('contain', 'Mise à jour réussie !')
      cy.contains('Ajouter un fichier').should('be.visible')
    })
  })
})
