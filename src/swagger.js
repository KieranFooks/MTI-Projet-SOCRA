const swaggerAutogen = require('swagger-autogen')()

const outputFile = 'src/swagger.json'
const endpointsFiles = ['src/app.ts']

const doc = {
  info: {
    title: 'SOCRA Parcours',
    description: 'Project for SOCRA'
  },
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    myParcour: [
      {
        title: 'MTI',
        campus: 'Paris',
        durantion: 24,
        type: 'Master',
        cost: 25000,
        presential: 50,
        start: new Date('2025-02'),
        modules: [
          {
            title: 'S7',
            subjects: [
              {
                title: 'Stage en entreprise',
                description: 'Stage effectué en entreprise'
              }
            ]
          },
          {
            title: 'S8',
            subjects: [
              {
                title: 'Fondamentaux et éléments de langage du domaine médical',
                description: 'Initiation aux bases du domaine médical'
              },
              {
                title: 'Systèmes d’information de santé',
                description: 'Initiation aux bases des systèmes d’information de santé'
              },
              {
                title: 'Intelligence Artificielle appliquée à la santé',
                description: 'Initiation aux bases de l’intelligence artificielle appliquée à la santé'
              }
            ]
          },
          {
            title: 'S9',
            subjects: [
              {
                title: 'Bio-Informatique',
                description: 'Initiation aux bases de la bio-informatique'
              },
              {
                title: 'Sécurité & Santé',
                description: 'Initiation aux bases de la sécurité et de la santé'
              },
              {
                title: 'Projet IoT / Objet Connecté Médical OpenSource',
                description: 'Initiation aux bases du projet IoT / Objet Connecté Médical OpenSource'
              }
            ]
          }
        ],
        description: 'La Majeure Santé a pour objectif de former de futurs ingénieurs en informatique pouvant s’interfacer efficacement avec des médecins et tous les professionnels du domaine de la santé.Les étudiants pourront ainsi donner du sens à leur carrière professionnelle en participant à la révolution des applications des données médicales et de l’IA pour la Santé comme, par exemple, l’analyse d’images médicales ou l’analyses de données génétiques ou le développement d’algorithmes pour mieux gérer les maladies des patients via des objets connectés.Du signal à la Data et de la Data à l’IA, les innovations numériques changent les habitudes des soignants et des patients et les ingénieurs font partie de ceux qui révolutionneront la santé de demain.'
      }
    ]
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc)