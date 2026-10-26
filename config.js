/* A MODIFIER UNE SEULE FOIS : votre serveur Supabase + l'adresse publique de ce site.
   La cle 'anon' (ou 'publishable') est PUBLIQUE par nature : la protection vient des comptes
   et des regles de la base. Ne mettez JAMAIS ici la cle service_role. */
window.FCN_WEB={
  url:"https://ltrxlnbgtkpxklmfeace.supabase.co",
  anon:"sb_publishable_fIkl1wPHtt60CGfGg0jjuA_A9-URcGU",
  site:"https://bahize1.github.io/suivi/",
  /* Droits (3 operations gratuites, credits, abonnements) : laissez false tant que vous n'avez
     pas lance supabase-droits.sql ET active billing dans la base (voir le guide). */
  billing:true,
  /* Paiement en ligne (FedaPay) : true seulement apres deploiement des 2 fonctions pay-create et pay-webhook. */
  pay:true
   kk:{key:"32a0072d48f01561fc34769a0fd5c59d8da10499",sandbox:false},
};
