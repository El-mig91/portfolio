/**
 * ==============================================================================
 * PORTFOLIO - MIGUEL RYAN NONGNI
 * Fichier JavaScript Principal (Vanilla JS clair, commenté et modifiable)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
     * 1. DONNÉES DÉTAILLÉES DES PROJETS (Pour la Modale Simple & Efficace)
     * Vous pouvez modifier ou ajouter des projets ici très facilement !
     * -------------------------------------------------------------------------- */
    const projectsData = {
        'cwad': {
            title: "Plateforme Web & Identité Visuelle CWAD",
            subtitle: "Conception graphique et développement front-end",
            category: "Développement Web ",
            image: "img/projeth.PNG",
            context: "Conception complète de l'identité visuelle et développement du site web vitrine responsive pour un complexe de loisirs moderne. L'objectif était de proposer une expérience utilisateur fluide et immersive.",
            tasks: [
                "Création de la charte graphique : logo vectoriel, harmonie chromatique et typographies.",
                "Développement front-end responsive en HTML, CSS et JavaScript.",
                "Optimisation pour l'affichage multi-écrans (ordinateurs, tablettes et smartphones).",
                "Hiérarchisation des informations : présentation des activités, tarifs et modules de contact."
            ],
            technologies: ["HTML", "CSS", "JavaScript"],
            competences: "Concevoir et développer une interface web fonctionnelle et ergonomique."
        },
        'caribou': {
            title: "Recueil de Besoins & Spécifications - Éditions du Caribou",
            subtitle: "Analyse fonctionnelle et cahier des charges technique",
            category: "Ingénierie Logicielle & Gestion de Projet",
            image: "img/projetr.png",
            context: "Analyse des processus métiers et formalisation des exigences pour la refonte du système d'information d'une maison d'édition. Cadrage rigoureux des besoins avant le cycle de développement.",
            tasks: [
                "Analyse des besoins métiers : gestion des manuscrits, catalogue éditorial, stocks et droits d'auteur.",
                "Modélisation des cas d'utilisation (Use Cases) et des diagrammes de flux d'activités.",
                "Conception de maquettes d'interface utilisateur pour valider les parcours utilisateurs.",
                "Rédaction du cahier des charges fonctionnel et technique avec critères d'acceptation."
            ],
            technologies: ["Cahier des charges", "Analyse Métier", "UML", "Prototypage", "Gestion de projet"],
            competences: "Identifier et formaliser les besoins clients pour préparer le projet informatique."
        },
        'algo-c': {
            title: "Moteur de Jeu 2D & Algorithmique (C++)",
            subtitle: "Développement en C++ avec la bibliothèque graphique SDL2",
            category: "Développement Logiciel & C++",
            image: "img/projetc.png",
            context: "Conception et programmation d'un jeu vidéo 2D en C++ afin d'étudier l'architecture logicielle orientée objet, la gestion bas niveau des ressources et l'efficacité algorithmique.",
            tasks: [
                "Implémentation d'une boucle principale cadencée (Game Loop) avec gestion du rendu graphique via SDL2.",
                "Développement d'un moteur physique de détection des collisions.",
                "Gestion modulaire des spritesheets, des animations et des états du personnage.",
                "Chargement dynamique des niveaux depuis des fichiers de configuration et optimisation des performances."
            ],
            technologies: ["C++", "Bibliothèque SDL2", "Programmation Orientée Objet", "Algorithmique"],
            competences: "Développer une application en langage compilé et optimiser les algorithmes."
        },
        'bdd': {
            title: "Conception & Gestion de Base de Données",
            subtitle: "Modélisation relationnelle et requêtes SQL optimisées",
            category: "Bases de Données & Modélisation",
            image: "img/projetb.jpg",
            context: "Étude et réalisation d'une base de données relationnelle complète répondant aux contraintes métier d'une organisation, assurant l'intégrité des informations et la performance des requêtes.",
            tasks: [
                "Modélisation conceptuelle (MCD) et logique (MLD) selon la méthode Merise.",
                "Normalisation de la base de données (3NF) pour supprimer les doublons et garantir la fiabilité des informations.",
                "Création des tables sous MySQL, avec mise en place des clés étrangères et des règles d'intégrité pour sécuriser les données.",
                "Écriture de requêtes SQL  : jointures multi-tables, agrégations et vues d'analyse."
            ],
            technologies: ["SQL", "Méthode Merise (MCD/MLD)", "MySQL", "Modélisation"],
            competences: "Concevoir, implémenter et administrer une base de données relationnelle."
        }
    };


    /* --------------------------------------------------------------------------
     * 2. NAVBAR SCROLL & MENU MOBILE
     * -------------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Effet d'ombre sur la navbar lors du scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Ouverture / Fermeture du menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        // Fermer le menu lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // Mise en surbrillance du lien actif selon la section visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    /* --------------------------------------------------------------------------
     * 3. FILTRAGE DES PROJETS (Simple & Fluide)
     * -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activer le bon bouton
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrer les cartes
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* --------------------------------------------------------------------------
     * 4. GESTION DE LA MODALE DES PROJETS
     * -------------------------------------------------------------------------- */
    const modalBackdrop = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalContext = document.getElementById('modalContext');
    const modalTasksList = document.getElementById('modalTasksList');
    const modalTags = document.getElementById('modalTags');
    const modalCompetences = document.getElementById('modalCompetences');

    // Boutons "Voir les détails"
    const openModalButtons = document.querySelectorAll('.btn-open-modal');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = button.getAttribute('data-project');
            const data = projectsData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalSubtitle.textContent = data.subtitle;
                modalImage.src = data.image;
                modalImage.alt = data.title;
                modalContext.textContent = data.context;
                modalCompetences.textContent = data.competences;

                // Tâches
                modalTasksList.innerHTML = '';
                data.tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = task;
                    modalTasksList.appendChild(li);
                });

                // Tags
                modalTags.innerHTML = '';
                data.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'project-tag';
                    span.textContent = tech;
                    modalTags.appendChild(span);
                });

                // Ouvrir la modale
                modalBackdrop.classList.add('open');
                document.body.style.overflow = 'hidden'; // Empêcher le scroll en arrière-plan
            }
        });
    });

    // Fonction de fermeture de la modale
    function closeModal() {
        if (modalBackdrop) {
            modalBackdrop.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Fermeture lors du clic sur le fond sombre
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
    }

    // Fermeture avec la touche Échap (Escape)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
            closeModal();
        }
    });


    /* --------------------------------------------------------------------------
     * 5. COPIE DE L'EMAIL DANS LE PRESSE-PAPIER + TOAST
     * -------------------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailToCopy = "miguel.nongni1@gmail.com";
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailToCopy).then(() => {
                showToast("✓ Adresse email copiée dans le presse-papier !");
            }).catch(() => {
                // Secours si clipboard n'est pas autorisé
                const tempInput = document.createElement('input');
                tempInput.value = emailToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast("✓ Adresse email copiée !");
            });
        });
    }


    /* --------------------------------------------------------------------------
     * 6. FORMULAIRE DE CONTACT PROFESSIONNEL (Générateur direct Mailto)
     * Fonctionne immédiatement sans nécessiter de serveur backend !
     * -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const senderEmail = document.getElementById('formEmail').value.trim();
            const subject = document.getElementById('formSubject').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !senderEmail || !message) {
                alert("Veuillez renseigner votre nom, email et message.");
                return;
            }

            // Construction du lien mailto encodé
            const mailtoSubject = encodeURIComponent(subject || `Prise de contact portfolio - ${name}`);
            const mailtoBody = encodeURIComponent(
                `Bonjour Miguel,\n\n${message}\n\n---\nExpéditeur : ${name}\nEmail : ${senderEmail}`
            );

            // Redirection vers le client de messagerie de l'utilisateur
            window.location.href = `mailto:${emailToCopy}?subject=${mailtoSubject}&body=${mailtoBody}`;

            showToast("✓ Votre logiciel de messagerie a été ouvert avec le message pré-rempli !");
            contactForm.reset();
        });
    }

});
