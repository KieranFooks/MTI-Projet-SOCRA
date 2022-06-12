conn = new Mongo()
db = conn.getDB('SOCRA')

db.user.insert({ 'email': 'test@gmail.com', 'password': 'pwd' })
db.user.insert({ 'email': 'test@outlook.com', 'password': '123456' })

//Parcours 1
db.parcours.insert({
  'title': 'Génie Logiciel',
  'campus': 'Paris',
  'duration': 24,
  'type': 'Master',
  'cost': 12000,
  'presential': 50,
  'start' : '2023-02',
  'modules' : [
    {
      'title': 'S1',
      'subjects': [
        {
          'title': 'Systèmes d\'information',
          'description': 'description : Autour de la gestion de l\'information'
        },
        {
          'title': 'ERP',
          'description': 'Préparation Certification SAP'
        }
      ]
    },
    {
      'title': 'S2',
      'subjects': [
        {
          'title': 'VueJS',
          'description': 'Initiation au VueJS'
        },
        {
          'title': 'SCRUM',
          'description': 'Initiation au SCRUM'
        }
      ]
    }
  ],
  'description': 'Un master dédié à l\'étude des systèmes d\'information ainsi que leur implémentation dans les entreprises'
})

//Parcours 2
db.parcours.insert({
  'title': 'Multimédia et Technologies de l’Information',
  'campus': 'Paris',
  'duration': 24,
  'type': 'Master',
  'cost': 20000,
  'presential': 80,
  'start' : '2023-09',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'DotNet',
          'description': 'Initiation au DotNet'
        },
        {
          'title': 'Unity 3D',
          'description': 'Initiation à Unity 3D'
        },
        {
          'title': 'Android',
          'description': 'Initiation à Android'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Devops',
          'description': 'Initiation au Devops'
        },
        {
          'title': 'iOS',
          'description': 'Initiation à iOS'
        },
        {
          'title': 'PHP',
          'description': 'Initiation à PHP'
        }
      ]
    },
    {
      'title': 'S10',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    }
  ],
  'description': 'La Majeure MTI a pour ambition de former les « Leaders du Numérique», capables d’innover, de proposer de nouveaux contenus, de nouveaux usages, de nouveaux services, et cela autour des technologies libres ou celles des grands éditeurs (Microsoft, Apple…). Dans une société mondialisée où les enjeux du numérique deviennent stratégiques, l’ingénieur MTI s’intègre dans tous les secteurs économiques comme architecte de nouveaux services ou conducteur de chantiers innovants, avec une rigueur technologique couplée à une qualité d’écoute et un management du facteur humain lié aux nouvelles situations d’usage.'
})

//Parcours 3
db.parcours.insert({
  'title': 'Systèmes, Réseaux et Sécurité',
  'campus': 'Paris',
  'duration': 24,
  'type': 'Master',
  'cost': 20000,
  'presential': 80,
  'start' : '2023-09',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Technique d’audits et de tests d’intrusion, de virologie',
          'description': 'Initiation aux techniques d’audits et de tests d’intrusion, de virologie'
        },
        {
          'title': 'Bonnes pratiques, normes et réglementations',
          'description': 'Initiation aux bonnes pratiques, normes et réglementations'
        },
        {
          'title': 'Réseaux et protocoles LAN, WAN, Wireless',
          'description': 'Initiations aux réseaux et protocoles LAN, WAN, Wireless'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Forensic et reverse engineering',
          'description': 'Initiation aux forensic et reverse engineering'
        },
        {
          'title': 'Supervision de sécurité, ingénierie des SOC, détection opérationnelle',
          'description': 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle'
        },
        {
          'title': 'Cybersécurité pour la mobilité et le cloud',
          'description': 'Initiation à la cyber sécurité pour la mobilité et le cloud'
        }
      ]
    },
    {
      'title': 'S10',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    }
  ],
  'description': 'La Majeure SRS permet de maîtriser les enjeux de cybersécurité et la conduite à tenir face à une menace cyber. La majeure conjugue les apprentissages système (de la conception à l’administration), réseaux (existants et de nouvelles générations) et cybersécurité (organisationnelle et technique).'
})


//Parcours 4
db.parcours.insert({
  'title': 'Epita SUP',
  'campus': 'Paris',
  'duration': 12,
  'type': 'Licence',
  'cost': 10000,
  'presential': 100,
  'start' : '2023-09',
  'modules' : [
    {
      'title': 'S1',
      'subjects': [
        {
          'title': 'Mathématiques',
          'description': 'Enseignement des intégrales et des différentielles'
        },
        {
          'title': 'Algèbre',
          'description': 'Enseignement des fonctions et des vecteurs'
        },
        {
          'title': 'Géométrie',
          'description': 'Enseignement des vecteurs et des matrices'
        }
      ]
    },
    {
      'title': 'S2',
      'subjects': [
        {
          'title': 'Physique',
          'description': 'Enseignement des forces, des mouvements et des équations'
        },
        {
          'title': 'Python',
          'description': 'Initiation au Python'
        },
        {
          'title': 'C#',
          'description': 'Initiation au C#'
        }
      ]
    }
  ],
  'description': 'Première année de prépa à l\'EPITA'
})

//Parcours 5
db.parcours.insert({
  'title': 'Epita SPE',
  'campus': 'Paris',
  'duration': 12,
  'type': 'Licence',
  'cost': 10000,
  'presential': 80,
  'start' : '2023-09',
  'modules' : [
    {
      'title': 'S3',
      'subjects': [
        {
          'title': 'Physique',
          'description': 'Enseignement des forces, des mouvements et des équations'
        },
        {
          'title': 'Informatique',
          'description': 'Enseignement des algorithmes et des structures de données'
        }
      ]
    },
    {
      'title': 'S4',
      'subjects': [
        {
          'title': 'Echange culturel',
          'description': 'Echange dans une école ou université étrangère afin d’acquérir des compétences linguistiques'
        }
      ]
    }
  ],
  'description': 'Deuxième année de prépa à l\'EPITA'
})

//Parcours 6
db.parcours.insert({
  'title': 'IT, CONSULTING & EXPLORATION',
  'campus': 'Paris',
  'duration': 6,
  'type': 'Master',
  'cost': 30000,
  'presential': 90,
  'start' : '2024-09',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Méthodologie de gestion de projet',
          'description': 'Initiation à la méthodologie de gestion de projet'
        },
        {
          'title': 'Management de l’innovation',
          'description': 'Initiation au management de l’innovation'
        },
        {
          'title': 'Consulting essentials',
          'description': 'Initiation aux bases du consulting'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Intelligence économique',
          'description': 'Initiation aux bases de l’intelligence économique'
        },
        {
          'title': 'Knowledge Management',
          'description': 'Initiation aux bases du management de connaissances'
        },
        {
          'title': 'IT strategy and governance',
          'description': 'Initiation aux bases de la stratégie IT et de la gouvernance'
        }
      ]
    }
  ],
  'description': 'La majeure ICE forme au consulting en IT et au management de l’innovation. En constante évolution, ICE transmet à ses étudiants les compétences nécessaires pour s’adapter avec succès à un monde professionnel riche et changeant.'
})

//Parcours 7
db.parcours.insert({
  'title': 'Global IT Management',
  'campus': 'Paris',
  'duration': 36,
  'type': 'Master',
  'cost': 50000,
  'presential': 30,
  'start' : '2023-03',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Business Applications : ERP, CRM, SCM',
          'description': 'Initiation aux systèmes d’information de gestion d’entreprise'
        },
        {
          'title': 'Knowledge Management & Innovation',
          'description': 'Initiation aux bases du management de connaissances et de l’innovation'
        },
        {
          'title': 'Creativity & Design Thinking',
          'description': 'Initiation aux bases du design thinking'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Cross-Border Management',
          'description': 'Initiation aux bases du management des échanges étrangers'
        },
        {
          'title': 'Managing International Teams',
          'description': 'Initiation aux bases du management d’équipes internationnales'
        },
        {
          'title': 'Data Visualisation & BI',
          'description': 'Initiation aux bases de la visualisation de données et de l’analyse de données'
        }
      ]
    }
  ],
  'description': 'La Majeure GITM prépare aux métiers du consulting et de la gestion de projets internationaux innovants avec une formation exclusivement en anglais, axée sur : Compétences en « Design Thinking » gestion du projet, Compréhension approfondie des implications des décisions technologiques et des changements dans le monde des affaires, Importance de l’architecture des systèmes d’information d’entreprise pour définir la vision et les principes de l’entreprise.'
})

//Parcours 8
db.parcours.insert({
  'title': 'DATA SCIENCE ET INTELLIGENCE ARTIFICIELLE',
  'campus': 'Paris',
  'duration': 30,
  'type': 'Master',
  'cost': 15000,
  'presential': 60,
  'start' : '2023-01',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Data Representation and Feature Extraction',
          'description': 'Initiation aux bases de la représentation et de l’extraction des données'
        },
        {
          'title': 'Logic and Knowledge Representation',
          'description': 'Initiation aux bases de la représentation des connaissances et des logiques'
        },
        {
          'title': 'Generative Methods for Machine Learning',
          'description': 'Initiation aux bases des méthodes génératrices pour la machine learning'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Deep Learning Introduction',
          'description': 'Initiation aux bases de la deep learning'
        },
        {
          'title': 'Optimization',
          'description': 'Initiation aux bases de l’optimisation'
        },
        {
          'title': 'Convolutional Neural Networks',
          'description': 'Initiation aux bases des réseaux de neurones convolutionnels'
        }
      ]
    }
  ],
  'description': 'La Majeure SCIA a pour objectif d’industrialiser les résultats récents de la recherche dans le domaine de l’Intelligence Artificielle, particulièrement dans les domaines de l’analyse de données (Big Data, Data Science, Systèmes de recommandations, etc.) et de la reconnaissance des formes (parole, image, etc.) et de l’apprentissage automatique (Machine Learning).'
})

//Parcours 9
db.parcours.insert({
  'title': 'TRAITEMENT, SYNTHESE ET ANALYSE D’IMAGES',
  'campus': 'Paris',
  'duration': 18,
  'type': 'Licence',
  'cost': 5000,
  'presential': 30,
  'start' : '2023-09',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Traitement d’images fondamental',
          'description': 'Initiation aux bases du traitement d’images'
        },
        {
          'title': 'Vision par Ordinateur',
          'description': 'Initiation aux bases de la vision par ordinateur'
        },
        {
          'title': 'Traitement et Compression Vidéo',
          'description': 'Initiation aux bases du traitement et de la compression vidéo'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Imagerie médicale',
          'description': 'Initiation aux bases de l’imagerie médicale'
        },
        {
          'title': 'Imagerie satellitaire',
          'description': 'Initiation aux bases de l’imagerie satellitaire'
        },
        {
          'title': 'Machine Learning pour la reconnaissance des formes',
          'description': 'Initiation aux bases de la reconnaissance des formes'
        }
      ]
    }
  ],
  'description': 'La majeure IMAGE a pour objectif de former les étudiants à concevoir et maîtriser les nouveaux les outils de traitement, de synthèse et d’analyse d’images, dotant les futurs ingénieurs issus de la filière d’une double compétence informatique et image, leur permettant de développer efficacement de nouveaux algorithmes tout en ayant un bagage théorique conséquent.'
})

//Parcours 10
db.parcours.insert({
  'title': 'Numérique et Santé',
  'campus': 'Paris',
  'duration': 24,
  'type': 'Master',
  'cost': 25000,
  'presential': 40,
  'start' : '2025-02',
  'modules' : [
    {
      'title': 'S7',
      'subjects': [
        {
          'title': 'Stage en entreprise',
          'description': 'Stage effectué en entreprise'
        }
      ]
    },
    {
      'title': 'S8',
      'subjects': [
        {
          'title': 'Fondamentaux et éléments de langage du domaine médical',
          'description': 'Initiation aux bases du domaine médical'
        },
        {
          'title': 'Systèmes d’information de santé',
          'description': 'Initiation aux bases des systèmes d’information de santé'
        },
        {
          'title': 'Intelligence Artificielle appliquée à la santé',
          'description': 'Initiation aux bases de l’intelligence artificielle appliquée à la santé'
        }
      ]
    },
    {
      'title': 'S9',
      'subjects': [
        {
          'title': 'Bio-Informatique',
          'description': 'Initiation aux bases de la bio-informatique'
        },
        {
          'title': 'Sécurité & Santé',
          'description': 'Initiation aux bases de la sécurité et de la santé'
        },
        {
          'title': 'Projet IoT / Objet Connecté Médical OpenSource',
          'description': 'Initiation aux bases du projet IoT / Objet Connecté Médical OpenSource'
        }
      ]
    }
  ],
  'description': 'La Majeure Santé a pour objectif de former de futurs ingénieurs en informatique pouvant s’interfacer efficacement avec des médecins et tous les professionnels du domaine de la santé.Les étudiants pourront ainsi donner du sens à leur carrière professionnelle en participant à la révolution des applications des données médicales et de l’IA pour la Santé comme, par exemple, l’analyse d’images médicales ou l’analyses de données génétiques ou le développement d’algorithmes pour mieux gérer les maladies des patients via des objets connectés.Du signal à la Data et de la Data à l’IA, les innovations numériques changent les habitudes des soignants et des patients et les ingénieurs font partie de ceux qui révolutionneront la santé de demain.'
})
