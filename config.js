/* A MODIFIER UNE SEULE FOIS : votre serveur Supabase + l'adresse publique de ce site.
   La cle 'anon' (ou 'publishable') est PUBLIQUE par nature : la protection vient des comptes
   et des regles de la base. Ne mettez JAMAIS ici la cle service_role. */
window.FCN_WEB={
  url:"https://VOTRE-PROJET.supabase.co",
  anon:"VOTRE-CLE-ANON",
  site:"https://VOTRE-NOM.github.io/VOTRE-DEPOT/",
  /* Droits (3 operations gratuites, credits, abonnements) : laissez false tant que vous n'avez
     pas lance supabase-droits.sql ET active billing dans la base (voir le guide). */
  billing:false,
  /* Paiement en ligne (FedaPay) : true seulement apres deploiement des 2 fonctions pay-create et pay-webhook. */
  pay:false
};
