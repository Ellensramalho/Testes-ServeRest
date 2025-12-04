describe('ServeRest - Login', () => {
  it('Deve fazer login e retornar token', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: "fulano@qa.com",
        password: "teste"
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
    })
  })
})

describe('ServeRest - Criar Usuário', () => {
  it('Deve criar um usuário corretamente', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: "Fulano da Silva",
        email: "usuario" + Date.now() + "@teste.com",
        password: "teste",
        administrador: "true"

      }
    }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      })
  })
})

describe('ServeRest - Produtos', () => {
  it('Deve listar produtos', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos'
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('produtos')
      expect(response.body.produtos).to.be.an('array')
    })
  })
})


describe('ServeRest - Criar produto', () => {
  it('Deve fazer login e criar um produto', () => {

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: "fulano@qa.com",
        password: "teste"
      }
    }).then((loginResponse) => {

      const token = loginResponse.body.authorization

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: {
          Authorization: token
        },
        body: {
          nome: "Produto " + Date.now(),
          preco: 100,
          descricao: "Produto de teste",
          quantidade: 50
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
      })

    })

  })
})
