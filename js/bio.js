
/******************************************
 * RECUPERATION DE L'ID DU PHOTOGRAPHE
 ******************************************/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const IDPhotographe = urlParams.get('ID') ? urlParams.get('ID') : 243;

/******************************************
 * INITIALISATION DU TOTAL DE LIKES
 ******************************************/
var allLikes = 297081;
const spanAllLikes = document.querySelector(".popular-likes");
/**************************************************************
 * TABLEAU GLOBAL CONTENANT LES DONNEES DU PHOTOGRAPHE EN COURS
 **************************************************************/
var dataPhotographe = new Array();



/*****************************
 * CETTE CLASSE PHOTOGRAPHES
 * RECUPERE LES DONNEES DU PHOTOGRAPHES
 * CREER LE PROFIL ET PORTFOLIO DU PHOTOGRAPHE
 ****************************/
 class PHOTOGRAPHE{
  constructor(IDPhotographe) {
    this.f_js_get_json_photographes(IDPhotographe);
  }

  /****************************************
   * 
   * @param {*} as_filter_tags 
   * RECUPERE LES DONNEES DES PHOTOGRAPHES
   ****************************************/
   f_js_get_json_photographes(IDPhotographe){
    const ls_url_data_photographes = "json/FishEyeData.json";
    fetch(ls_url_data_photographes)
    .then(res => res.json())
    .then(value => {

        //RECUPERATION DE LA LISTE DES PHOTOGRAPHES
        let la_photographes = value.photographers;
        let la_photographe = la_photographes.filter(photographe => photographe.id.toString().indexOf(IDPhotographe) !== -1); 
        dataPhotographe.push({profil : la_photographe});

        let la_mediaPhotographes = value.media;
        let la_mediaPhotographe = la_mediaPhotographes.filter(mediaPhotographe => mediaPhotographe.photographerId.toString().indexOf(IDPhotographe) !== -1); 
        dataPhotographe.push({media : la_mediaPhotographe});

        
        this.f_js_create_profil_photographes(dataPhotographe);
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }


  /*********************************************************** 
 * APPEL LES FONCTIONS DE CREATION DE L ARTICLE PHOTOGRAPHE
 * *********************************************************/
  f_js_create_profil_photographes(aa_photographe){

    const newDescBio = this.f_js_gen_desc_bio(aa_photographe[0].profil[0]);
    
    //AJOUT DE LA BIO
    const bio = document.querySelector(".bio");
    bio.appendChild(newDescBio);

    //AJOUT DU PORTRAIT DU PHOTOGRAPHE DANS LA BIO
    let ls_src_img_portrait = "images/photographes/Photographers_Photos/" + aa_photographe[0].profil[0].portrait;
    const imgPortrait = document.createElement("img");
    imgPortrait.classList.add("bio-img");
    imgPortrait.setAttribute("src", ls_src_img_portrait);
    imgPortrait.setAttribute("alt", "Portrait du photographe " + aa_photographe[0].profil[0].name);
    bio.appendChild(imgPortrait);

    const titleFormModal = document.querySelector(".headerModal-titleFormModal");
    titleFormModal.innerText = "Contactez-moi " + aa_photographe[0].profil[0].name;

    this.f_js_create_portfolio_photographes(aa_photographe);

  }//f_js_create_profil_photographes(aa_photographes){



  /*****************************************
   * CREER L ESPACE PORTRAIT DU PHOTOGRAPHE
   * @param {*} ao_photographe 
   * @returns 
   *****************************************/
   f_js_gen_desc_bio(ao_photographe){
    
    
    const bioDesc = document.createElement("div");
    bioDesc.classList.add("bio-description");

    //DOM BIO INFO
    const bioInfo = document.createElement("div");
    bioInfo.classList.add("bio-info");

    const namePhotographe = document.createElement("h1");
    namePhotographe.classList.add("bio-name");
    namePhotographe.innerText = ao_photographe.name;

    const buttonContact = document.createElement("BUTTON");
    buttonContact.setAttribute("class", "btn default bio-btn");
    buttonContact.setAttribute("aria-label", "Ouvrir le formulaire pour contacter le photographe " + ao_photographe.name);
    buttonContact.innerText = "Contactez-moi";
    namePhotographe.appendChild(buttonContact);
    bioInfo.appendChild(namePhotographe);

    const bioLocation = document.createElement("p");
    bioLocation.classList.add("bio-location");
    bioLocation.innerText = ao_photographe.city + ", " + ao_photographe.country;
    bioInfo.appendChild(bioLocation);

    const bioSlogan = document.createElement("p");
    bioSlogan.classList.add("bio-slogan");
    bioSlogan.innerText = ao_photographe.tagline;
    bioInfo.appendChild(bioSlogan);   
    bioDesc.appendChild(bioInfo);

    //DOM TAGS
    const bioTags = document.createElement("div");
    bioTags.classList.add("bio-tags");
    bioTags.setAttribute("role", "tags");
    bioTags.setAttribute("aria-label", "Étiquette du photographe");

    const ulTags = document.createElement("ul");
    ao_photographe.tags.forEach(ls_tag => {

        const liTags = document.createElement("li");
        liTags.classList.add("bio-tags-item");

        const linkTags = document.createElement("a");
        linkTags.setAttribute("href", "#");
        linkTags.innerText = "#" + ls_tag ;

        liTags.appendChild(linkTags);
        ulTags.appendChild(liTags);
    });

    bioTags.appendChild(ulTags);
    bioDesc.appendChild(bioTags);

    return bioDesc;
  }

  /*********************************************************** 
 * APPEL LES FONCTIONS DE CREATION DE L ARTICLE PHOTOGRAPHE
 * *********************************************************/
   f_js_create_portfolio_photographes(aa_photographe){

    //AJOUT DU PORTFOLIO
    const portFolio = document.querySelector(".portfolio");
    
    //DOM LIGTHBOX
    const ligthBoxContent = document.querySelector(".ligthbox-content");
    
    //BOUCLE SUR LES MEDIAS
    aa_photographe[1].media.forEach((media,index) =>{

      let typeMedia = media.image ? true : false;

      const newMedia = this.f_js_gen_portfolio(media,index,typeMedia);
      portFolio.appendChild(newMedia);

      const newMediaLigthBox = this.f_js_gen_mediaLigthBox(media,index,typeMedia);
      ligthBoxContent.appendChild(newMediaLigthBox);
    });

    const caption = document.createElement("p");
    caption.setAttribute("id", "caption");
    caption.classList.add("ligthbox-content-imgTitle");
    ligthBoxContent.appendChild(caption);   

    //INITIALISATION DES LIKES TOTAL
    spanAllLikes.innerText = allLikes.toLocaleString();
  }//f_js_create_profil_photographes(aa_photographes){


  /**
   * 
   * @param {objet} ao_media 
   * @param {1} ai_index 
   * @returns DOM
   */
  f_js_gen_portfolio(ao_media,ai_index,as_typeMedia){

    const portfolioContent = document.createElement("div");
    portfolioContent.classList.add("portfolio-content");
  
    if(as_typeMedia){

      const linkPortfolioContent = document.createElement("a");
      linkPortfolioContent.classList.add("portfolio-link");
      linkPortfolioContent.setAttribute("href", "javascript:void(0);");
      linkPortfolioContent.setAttribute("aria-label", "Cliquer ou appuyer sur entrée pour afficher la gallerie.");
      
      const imgPortfolioContent = document.createElement("img");
      imgPortfolioContent.classList.add("portfolio-img");
      imgPortfolioContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.image);
      imgPortfolioContent.setAttribute('alt',ao_media.title);
      linkPortfolioContent.appendChild(imgPortfolioContent);

      portfolioContent.appendChild(linkPortfolioContent);
    }else{

      let indexPosterAleatoire = dataPhotographe[1].media[ai_index + 1] ? ai_index + 1 : ai_index - 1;
      
      const videoPortfolioContent= document.createElement("video");
      videoPortfolioContent.classList.add("portfolio-img");
      videoPortfolioContent.setAttribute("id", "player"); 
      videoPortfolioContent.setAttribute("playsinline", true); 
      videoPortfolioContent.setAttribute("controls", true); 
      videoPortfolioContent.setAttribute("poster", "./images/"+ ao_media.photographerId + "/" + dataPhotographe[1].media[indexPosterAleatoire].image);
      videoPortfolioContent.setAttribute("alt", ao_media.title);

      const sourceVideoPortfolio= document.createElement("source");
      sourceVideoPortfolio.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.video);
      sourceVideoPortfolio.setAttribute("type", "video/mp4"); 

      const trackVideoPortfolio= document.createElement("track");
      trackVideoPortfolio.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.photographerId + ".fr.vtt");
      trackVideoPortfolio.setAttribute("kind", "subtitles"); 
      trackVideoPortfolio.setAttribute("srclang", "fr"); 
      trackVideoPortfolio.setAttribute("label", "Français"); 

      videoPortfolioContent.appendChild(sourceVideoPortfolio);
      videoPortfolioContent.appendChild(trackVideoPortfolio);
      portfolioContent.appendChild(videoPortfolioContent);
    }


    const portfolioDesc = document.createElement("div");
    portfolioDesc.classList.add("portfolio-description");

    const portfolioImgTitle = document.createElement("p");
    portfolioImgTitle.classList.add("portfolio-imgTitle");
    portfolioImgTitle.innerText = ao_media.title;

    portfolioDesc.appendChild(portfolioImgTitle);
    
    const portfolioLikeImg = document.createElement("span");
    portfolioLikeImg.setAttribute("class", "portfolio-like");
    portfolioLikeImg.innerText = ao_media.likes;
    allLikes += ao_media.likes;

    portfolioDesc.appendChild(portfolioLikeImg);

    const iconLikeImg = document.createElement("i");
    iconLikeImg.setAttribute("class", "far fa-heart fas portfolio-icon");
    iconLikeImg.setAttribute("aria-label", "Appuyer ou cliquer sur l'icone pour mettre un j'aime à la photo.");
    //iconLikeImg.setAttribute("href", "javascript:void(0);");

    portfolioDesc.appendChild(iconLikeImg);
    
    portfolioContent.appendChild(portfolioDesc);

    //AJOUT DU PRIX JOURNALIER
    const pricePhotographe = document.querySelector('.popular-price');
    pricePhotographe.innerText = ao_media.price + "€ / jour";

    return portfolioContent;
  }


  /**
 * 
 * @param {objet} ao_media 
 * @param {1} ai_index 
 * @returns DOM
 */
  f_js_gen_mediaLigthBox(ao_media,ai_index,as_typeMedia){

    const linkMediaLigthBox = document.createElement("a");
    linkMediaLigthBox.classList.add("slides");
    linkMediaLigthBox.setAttribute("href", "#");

    if(as_typeMedia){
      const imgLigthBoxContent = document.createElement("img");
      imgLigthBoxContent.classList.add("slides-img");
      imgLigthBoxContent.setAttribute("alt", ao_media.title);
      imgLigthBoxContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.image);
      linkMediaLigthBox.appendChild(imgLigthBoxContent);
    }else{
      let indexPosterAleatoire = dataPhotographe[1].media[ai_index + 1] ? ai_index + 1 : ai_index - 1;
      const videoLigthBoxContent= document.createElement("video");
      videoLigthBoxContent.classList.add("slides-img");
      videoLigthBoxContent.setAttribute("alt", ao_media.title);
      videoLigthBoxContent.setAttribute("playsinline", true); 
      videoLigthBoxContent.setAttribute("controls", true); 
      videoLigthBoxContent.setAttribute("poster", "./images/"+ ao_media.photographerId + "/" + dataPhotographe[1].media[indexPosterAleatoire].image);

      const sourceVideoLigthBox= document.createElement("source");
      sourceVideoLigthBox.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.video);
      sourceVideoLigthBox.setAttribute("type", "video/mp4"); 

      const trackLigthBox= document.createElement("track");
      trackLigthBox.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.photographerId + ".fr.vtt");
      trackLigthBox.setAttribute("kind", "subtitles"); 
      trackLigthBox.setAttribute("srclang", "fr"); 
      trackLigthBox.setAttribute("label", "Français"); 
 
      videoLigthBoxContent.appendChild(sourceVideoLigthBox);
      videoLigthBoxContent.appendChild(trackLigthBox);

      linkMediaLigthBox.appendChild(videoLigthBoxContent);
    }
    return linkMediaLigthBox;
  }
  
}

/******************************************
 * INITIALISATION DE LA CLASSE PHOTOGRAPHE
 ******************************************/
const classPhotographe = new PHOTOGRAPHE(IDPhotographe);

/**
 * DOM BIO
 */
setTimeout(() => {
  const bioBtn = document.querySelector(".bio-btn");
  const portFolioImg = document.querySelectorAll(".portfolio-img");
    
  /** ADDEVENTLISTER BIO */
  bioBtn.addEventListener('click', () => {
    classContactModal.launchModal();
  });

  portFolioImg.forEach((img,index) => img.addEventListener('click', () => {
    classLigthbox.openLigthbox();
    classLigthbox.currentSlide(index);
  }));
}, 3000);
//imgPortfolioContent.setAttribute("onclick", "classLigthbox.openLigthbox();classLigthbox.currentSlide(" + ai_index + ")");



/******************************************
 * CLASS LIGTHBOX
 ******************************************/
class Ligthbox {
  constructor(width, height){
    this.slideIndex = 0;
    this.ligthbox = document.getElementById("ligthbox");
    this.closeModalLigthbox = document.getElementById("closeLigthbox");
  }

  openLigthbox() {
    this.ligthbox.style.display = "block";
    this.closeModalLigthbox.focus();
  }
    
  closeLigthbox() {
    this.ligthbox.style.display = "none";
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    var i;
    const slides = document.getElementsByClassName("slides");
    const captionText = document.getElementById("caption");
    
    if (n >= slides.length) {this.slideIndex = 0}
    if (n < 0) {this.slideIndex = slides.length -1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[this.slideIndex].style.display = "block";
    //captionText.innerHTML = slides[this.slideIndex-1].lastElementChild.alt;
    captionText.innerHTML = slides[this.slideIndex].children[0].attributes.alt.nodeValue;
  }

}

/******************************************
 * INITIALISATION DE LA CLASSE LIGTHBOX
 ******************************************/
const classLigthbox = new Ligthbox();

/**
 * DOM LIGTHBOX
 */
 const closeLigthbox = document.querySelector(".closeLigthbox");
 const prev = document.querySelector(".prev");
 const next = document.querySelector(".next");
 
 
 /** ADDEVENTLISTER LIGTHBOX */
 
 closeLigthbox.addEventListener('click', () => {
    classLigthbox.closeLigthbox()
 });

 prev.addEventListener('click', () => {
  classLigthbox.plusSlides(-1);
});

next.addEventListener('click', () => {
  classLigthbox.plusSlides(1);
});
  

/******************************************
 * CLASS FORMULAIRE
 ******************************************/
class contactModal {
  constructor(){
    this.modalContent = document.querySelector(".bgroundModal");  
    this.blockForm = document.getElementById("reserve");
  }

  // launch modal form
  launchModal() {
    this.blockForm.style.display ="block";
    this.modalContent.style.display = "block";

    //FOCUS SUR LE PREMIER CHAMP
    document.getElementById("first").focus();
  }

  closeModal(){
    this.blockForm.style.display = "none";
    this.modalContent.style.display = "none";
  }

  focusCloseModal(){
    document.getElementById("first").focus();
  }

}

/******************************************
 * INITIALISATION DE LA CLASSE FORMULAIRE
 ******************************************/
const classContactModal = new contactModal();


/**
 * DOM MODAL FORMULAIRE
 */
const blockForm = document.getElementsByTagName("form")[0];
const formData = document.querySelectorAll(".formData");
const inputFormData = document.querySelectorAll(".text-control");
const textareaFormData = document.querySelector(".textarea-control");
const closeModal = document.querySelector(".closeModal");


/** ADDEVENTLISTER MODAL FORMULAIRE */
inputFormData.forEach((input,index) => input.addEventListener('change', () => {
  f_js_check_saisie(input,index);
}));

textareaFormData.addEventListener('change', () => {
  f_js_check_saisie(textareaFormData,formData.length-1)
});

closeModal.addEventListener('click', () => {
  classContactModal.closeModal();
});

/**
 * 
 * @param {DOM INPUT} ao_input 
 * @param {NUMBER} ai_index 
 */
function f_js_check_saisie(ao_input, ai_index){
  /*console.log(ai_index);
  return false;*/
  switch (ao_input.id) {
    case "first":
    case "last":
        if((ao_input.value.length < 2)){
          formData[ai_index].setAttribute("data-error-visible","true");
          formData[ai_index].setAttribute("data-error","Veuillez saisir un minimum de deux caractères.");
        }else{
          formData[ai_index].setAttribute("data-error-visible","false");
        }  
    break;
    
    case "email":
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(ao_input.value))
      {
        formData[ai_index].setAttribute("data-error-visible","false");
        statutForm = true;
      }else{
        formData[ai_index].setAttribute("data-error-visible","true");
        formData[ai_index].setAttribute("data-error","Veuillez saisir un email valide.");e;
      }
    break;
  
    default:
        if((ao_input.value == '')){
          formData[ai_index].setAttribute("data-error-visible","true");
          formData[ai_index].setAttribute("data-error","Veuillez saisir un message.");
        }else{
          formData[ai_index].setAttribute("data-error-visible","false");
        }
    break;
  }

}//function f_js_check_saisie(ao_input, ai_index){


/**
 * VALIDATION DU FORMULAIRE
 * @returns 
 */
 function f_js_validate(){
  
  /* Controle du statut du formulaire */
  
  let statutForm = true;

  //RESET DU FORMULAIRE SI VALIDATION OK
  for (var i = 0; i < blockForm.length; i++) {
      if(blockForm[i].type == "submit"){continue;}
      if(blockForm[i].value.trim() == ""){statutForm = false;}
      console.log(blockForm[i].id," = ",blockForm[i].value)
  }

  if(!statutForm){return false;}
  
  blockForm.reset();
  return false;
}


/******************************************
 * CLASSE FILTER
 ******************************************/
var FILTER = ["ASC","ASC","ASC"];

class triByAttribut{

  getDomPortfolioContents(){
    let portfolioContents = document.querySelectorAll(".portfolio-content");
    return portfolioContents;
  }

  getDomPortfolioSlides(){
    let portfolioSlides = document.querySelectorAll(".slides");
    return portfolioSlides;
  }

  deleteCaption(){
    let caption = document.querySelector(".ligthbox-content-imgTitle");
    caption.remove();
  }

  /********************************************
   * SUPPRIME LA GALLERIE
   * TRI LE TABLEAU PAR POPULARITE
   * RENVOI UNE GALLERIE TRIEE
   *******************************************/
   triByPopular() {   

    let portfolioContents = this.getDomPortfolioContents();
    let li_nb_portfolioContents = portfolioContents.length;
    let portfolioSlides = this.getDomPortfolioSlides();

    if(li_nb_portfolioContents > 0){
      this.deleteCaption();
      portfolioContents.forEach((portfolioContent,index) => {
        portfolioContent.remove();
        portfolioSlides[index].remove();
      });

      if(FILTER[0] == "ASC"){
        FILTER[0] = "DESC";
        dataPhotographe[1].media.sort(function(a,b){
          
            return b.likes - a.likes ;  
        });
      }else{
        FILTER[0] = "ASC";
        dataPhotographe[1].media.sort(function(a,b){
            return a.likes - b.likes;
        });
      }

      classPhotographe.f_js_create_portfolio_photographes(dataPhotographe);
      f_js_init_likes();
    }
  }
  
  /********************************************
   * SUPPRIME LA GALLERIE
   * TRI LE TABLEAU PAR DATE
   * RENVOI UNE GALLERIE TRIEE
   *******************************************/
  triByDate() {   

    let portfolioContents = this.getDomPortfolioContents();
    let li_nb_portfolioContents = portfolioContents.length;
    let portfolioSlides = this.getDomPortfolioSlides();
    if(li_nb_portfolioContents > 0){
      this.deleteCaption();
      portfolioContents.forEach((portfolioContent,index) => {
        portfolioContent.remove();
        portfolioSlides[index].remove();
      });

      if(FILTER[1] == "ASC"){
        FILTER[1] = "DESC";
        dataPhotographe[1].media.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);   
        });
      }else{
        FILTER[1] = "ASC";
        dataPhotographe[1].media.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);   
        });
      }

      classPhotographe.f_js_create_portfolio_photographes(dataPhotographe);
      f_js_init_likes();
    }
  }

 /********************************************
 * SUPPRIME LA GALLERIE
 * TRI LE TABLEAU PAR TITRE
 * RENVOI UNE GALLERIE TRIEE
 *******************************************/
  triByTitle() {   

    let portfolioContents = this.getDomPortfolioContents();
    let li_nb_portfolioContents = portfolioContents.length;
    let portfolioSlides = this.getDomPortfolioSlides();
    if(li_nb_portfolioContents > 0){
      this.deleteCaption();
      portfolioContents.forEach((portfolioContent,index) => {
        portfolioContent.remove();
        portfolioSlides[index].remove();
      });

      if(FILTER[2] == "ASC"){
        FILTER[2] = "DESC";
        dataPhotographe[1].media.sort(function(a,b){
          return ('' + b.title).localeCompare(a.title);  
        });
      }else{
        FILTER[2] = "ASC";
        dataPhotographe[1].media.sort(function(a,b){
            return ('' + a.title).localeCompare(b.title);  
        });
      }

      classPhotographe.f_js_create_portfolio_photographes(dataPhotographe);
      f_js_init_likes();
    }
  }

}

/******************************************
 * INITIALISATION DE LA CLASSE FILTER
 ******************************************/
const classTriByAttribut = new triByAttribut();

/**
 * DOM TRI
 */
const triByPopular = document.getElementById("triByPopular");
const triByDate = document.getElementById("triByDate");
const triBytitle = document.getElementById("triBytitle");


triByPopular.addEventListener('click', () => {
classTriByAttribut.triByPopular();
});

triByDate.addEventListener('click', () => {
  classTriByAttribut.triByDate();
});

triBytitle.addEventListener('click', () => {
  classTriByAttribut.triByTitle();
});



/******************************************
 * RACCOURCI CLAVIER
 ******************************************/
document.addEventListener('keydown', keyCodeAccessiblity);

function keyCodeAccessiblity(e) {

  //OUVRE LA MODAL AVEC CTRL + ALT + M
  if (e.ctrlKey  && e.altKey && e.keyCode === 77) {
    classContactModal.launchModal();
  }

  //OUVRE LA LIGTHBOX AVEC CTRL + ALT + L
  if (e.ctrlKey && e.altKey && e.keyCode === 76) {
    classLigthbox.openLigthbox();
    classLigthbox.currentSlide(1);
  }

  //IMAGE SUIVANTE DANS SLIDE
  if (e.keyCode === 39) {
    classLigthbox.plusSlides(1);
  }

  //IMAGE PRECEDENTE DANS SLIDE
  if (e.keyCode === 37) {
    classLigthbox.plusSlides(-1);
  }

  //FERME TOUTES LES MODALS
  if (e.keyCode === 27) {
    classLigthbox.closeLigthbox();
    classContactModal.closeModal();
  }

}


/******************************************
 * DROPDOWN MENU TRI
 ******************************************/

$dropdownMenu = document.querySelector('.filter-dropdown-content');
$dropdownLink = document.querySelector('.filter-dropbtn');


function toggleNavbar() {
    if (!$dropdownMenu.getAttribute('style') || $dropdownMenu.getAttribute('style') === 'display: none;') {
        $dropdownMenu.style.display = 'block';
        $dropdownLink.setAttribute('aria-expanded', 'true');
        $dropdownLink.setAttribute('style', 'border-radius:0');
    } else {
        $dropdownMenu.style.display = 'none';
        $dropdownLink.setAttribute('aria-expanded', 'false');
        $dropdownLink.setAttribute('style', 'border-radius:5px');
    }
}

$dropdownLink.addEventListener('click', function(e) {
    e.preventDefault();
    toggleNavbar();
})


/******************************************
 * INITIALISATION EVENT LIKE APRES CREATION DES DOM EN JS
 * INCREMENT LES LIKES PAR IMA
 * INCREMENT LES LIKES TOTAL
 ******************************************/
setTimeout(() => {
  f_js_init_likes();
}, 3000);


function f_js_init_likes(){
  const iconHeart = document.querySelectorAll(".fa-heart");
  const allSpanLikes = document.querySelectorAll(".portfolio-like");


  iconHeart.forEach((icon,index) => icon.addEventListener('click', () => {

    //INCREMENTATION DES SPAN INDIVIDUELLEMENT
    allSpanLikes[index-1].innerText=parseInt(allSpanLikes[index-1].innerText) + 1 ;
    allLikes += 1;

    //INCREMENTATION DU SPAN CONTENANT TOTAL LIKE
    spanAllLikes.innerText = allLikes.toLocaleString();    
    
  }));
}