/*****************************
 * CLASSE PHOTOGRAPHES
 * RECUPERE LES DONNEES EN JSON
 * CREER LES PROFIL DES PHOTOGRAPHES
 ****************************/
const articles = document.querySelector(".articles");
class PHOTOGRAPHES {
  constructor() {
    this.f_js_get_json_photographes();
  }

  /****************************************
   * 
   * @param {*} as_filter_tags 
   * RECUPERE LES DONNEES JSON
   ****************************************/
   f_js_get_json_photographes(as_filter_tags = ''){
    const ls_url_data_photographes = "json/FishEyeData.json";
    fetch(ls_url_data_photographes)
    .then(res => res.json())
    .then(value => {
     
        //RECUPERATION DE LA LISTE DES PHOTOGRAPHES
        let la_photographes = value.photographers;
        if(as_filter_tags != ''){
          console.log(as_filter_tags)
          la_photographes = la_photographes.filter(photographe => photographe.tags.toString().indexOf(as_filter_tags.toLowerCase()) !== -1);        
        }
        this.f_js_create_article_photographes(la_photographes);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  /*********************************************************
   * 
   * @returns CREER LA BALISE ARTCILE
   *********************************************************/
  f_js_gen_article_photographe(){
      //CREATION DES ARTICLES PAR PHOTOGRAPHES
      const newArticle = document.createElement("article");
      newArticle.classList.add("photographe"); 
      return newArticle;
  }

  /*****************************************
   * CREER L ESPACE PORTRAIT DU PHOTOGRAPHE
   * @param {*} ao_photographe 
   * @returns 
   *****************************************/
   f_js_gen_portrait_photographe(ao_photographe){
    let ls_src_img_portrait = "images/photographes/Photographers_Photos/" + ao_photographe.portrait;

    const newLinkPortrait = document.createElement("a");
    newLinkPortrait.classList.add("photographe-portrait");
    newLinkPortrait.setAttribute("href","profilPhotographe.html?ID=" + ao_photographe.id);

    const imgPortrait = document.createElement("img");
    imgPortrait.classList.add("photographe-img");
    imgPortrait.setAttribute("src", ls_src_img_portrait);
    imgPortrait.setAttribute("alt", "Portrait du photographe " + ao_photographe.name + ", cliquer sur la photo pour consulter son profil");

    const namePhotographe = document.createElement("h2");
    namePhotographe.classList.add("photographe-name");
    namePhotographe.innerText = ao_photographe.name;

    newLinkPortrait.appendChild(imgPortrait);
    newLinkPortrait.appendChild(namePhotographe);
    return newLinkPortrait;
  }

  /*********************************************
   * CREER L ESPACE DESCRIPTION DU PHOTOGRAPHE
   * @param {*} ao_photographe 
   * @returns 
   *********************************************/
  f_js_gen_desc_photographe(ao_photographe){
    const newDivDesc = document.createElement("div");
    newDivDesc.classList.add("photographe-description");
    newDivDesc.setAttribute("role", "description");
    newDivDesc.setAttribute("aria-label", "Description du photographe");

    const location = document.createElement("p");
    location.classList.add("photographe-location");
    location.innerText = ao_photographe.city + ", " + ao_photographe.country;

    const slogan = document.createElement("p");
    slogan.classList.add("photographe-slogan");
    slogan.innerText = ao_photographe.city + ", " + ao_photographe.tagline;

    const price = document.createElement("p");
    price.classList.add("photographe-price");
    price.innerText = ao_photographe.price + "€/jour";

    newDivDesc.appendChild(location);
    newDivDesc.appendChild(slogan);
    newDivDesc.appendChild(price);
    return newDivDesc;
  }

  /**************************************
   * CREER L ESPACE TAGS DU PHOTOGRAPHE
   * @param {*} ao_photographe 
   * @returns 
   **************************************/
  f_js_gen_tags_photographe(ao_photographe){
    const newDivTags = document.createElement("div");
    newDivTags.classList.add("photographe-tags");
    newDivTags.setAttribute("role", "dialog");
    newDivTags.setAttribute("aria-label", "Liste des étiquettes du photographes " + ao_photographe.name);

    const ulTags = document.createElement("ul");
    ao_photographe.tags.forEach(ls_tag => {

        const liTags = document.createElement("li");
        liTags.classList.add("photographe-tags-item");

        const linkTags = document.createElement("a");
        linkTags.setAttribute("href", "#");
        linkTags.setAttribute("href", "javascript:void(0);");
        linkTags.innerText = "#" + ls_tag ;

        liTags.appendChild(linkTags);
        ulTags.appendChild(liTags);
    });

    newDivTags.appendChild(ulTags);
    return newDivTags;
  }

  /*********************************************************** 
   * APPEL LES FONCTIONS DE CREATION DE L ARTICLE PHOTOGRAPHE
   * *********************************************************/
  f_js_create_article_photographes(aa_photographes){
    aa_photographes.forEach(lo_photographe => {

        const newArticle = this.f_js_gen_article_photographe();

        const newLinkPortrait = this.f_js_gen_portrait_photographe(lo_photographe);

        newArticle.appendChild(newLinkPortrait);

        const newDivDesc = this.f_js_gen_desc_photographe(lo_photographe);
        newArticle.appendChild(newDivDesc);

        const newDivTags = this.f_js_gen_tags_photographe(lo_photographe);
        
        newArticle.appendChild(newDivTags);

        articles.appendChild(newArticle);
    });
  }//f_js_create_article_photographes(aa_photographes){


}

/******************************************
 * INITIALISATION DE LA CLASSE PHOTOGRAPHES
 ******************************************/
const classPhotographes = new PHOTOGRAPHES();

/**
 * DOM BUTTON PASSER AU CONTENU
 */
var linkToMain = document.getElementById("linkToMain");
linkToMain.addEventListener("click", goToMain);

/**
 * AFFICHAGE DU BOUTON PASSER AU MENU SI UTILISATEUR SCROLL VERS LE BAS
 */
window.onscroll = function() {displayLinkToMain()};

function displayLinkToMain() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 20) {
    linkToMain.style.display = "block";
  }
}

/**
 * DIRIGE UTILISATEUR VERS LE CONTENU
 */
function goToMain(){
  window.scrollTo({ top: 150, behavior: 'smooth' });
  document.querySelectorAll('.photographe-portrait')[0].focus();
}

/***************************
 * 
 * @param {*} as_tag
 * FILTRES SUR LES TAGS
 ***************************/
 function f_js_filter_tags(as_tag){
  const photographes = document.querySelectorAll(".photographe");
  const li_nb_photoraphes = photographes.length;

  if(li_nb_photoraphes > 0){
    photographes.forEach((photographe, key) => {
      articles.removeChild(photographes[key]);
    });
    classPhotographes.f_js_get_json_photographes(as_tag);
  }else{
    classPhotographes.f_js_get_json_photographes();
  }
}

/**
 * DOM TAGS
 */
var filterTags = document.querySelectorAll(".header-navigation-item > a");

/**
 * ADDEVENT SUR LES TAGS
 */
filterTags.forEach(tags => tags.addEventListener('click', () => {
  f_js_filter_tags(tags.innerText.replace("#",""));
}));



