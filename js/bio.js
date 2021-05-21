/**
 * RECUPERATION DE L'ID DU PHOTOGRAPHE
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const IDPhotographe = urlParams.get('ID');

var allLikes = 297081;

//TABLEAU CONTENANT LES DONNEES DU PHOTOGRAPHE EN COURS
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
   f_js_get_json_photographes(IDPhotographe = 250){
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

    //AJOUT DU PORTFOLIO
    const portFolio = document.querySelector(".portfolio");
    
    //DOM LIGTHBOX
    const ligthBoxContent = document.querySelector(".ligthbox-content");
    
    //BOUCLE SUR LES MEDIAS
    aa_photographe[1].media.forEach((media,index) =>{

      let typeMedia = media.image ? true : false;

      const newMedia = this.f_js_gen_portfolio(media,index,typeMedia);
      portFolio.appendChild(newMedia);

      const newMediaLigthBox = this.f_js_gen_mediaLigthBox(media,typeMedia);
      ligthBoxContent.appendChild(newMediaLigthBox);
    });

    const caption = document.createElement("p");
    caption.setAttribute("id", "caption");
    caption.classList.add("ligthbox-content-imgTitle");
    ligthBoxContent.appendChild(caption);   

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
    buttonContact.setAttribute("onclick", "classContactModal.launchModal();");
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
      linkPortfolioContent.setAttribute("href", "#");
      linkPortfolioContent.setAttribute("onclick", "classLigthbox.openLigthbox();classLigthbox.currentSlide(" + ai_index + ")");
  
      const imgPortfolioContent = document.createElement("img");
      imgPortfolioContent.classList.add("portfolio-img");
      imgPortfolioContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.image);
  
      linkPortfolioContent.appendChild(imgPortfolioContent);
      portfolioContent.appendChild(linkPortfolioContent);
    }else{
      const videoPortfolioContent= document.createElement("video");
      videoPortfolioContent.classList.add("portfolio-img");
      videoPortfolioContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.video);
      //videoPortfolioContent.setAttribute("autoplay", true); 
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
    portfolioLikeImg.innerText = 12;
    portfolioDesc.appendChild(portfolioLikeImg);

    const iconLikeImg = document.createElement("i");
    iconLikeImg.setAttribute("class", "far fa-heart fas");

    portfolioDesc.appendChild(iconLikeImg);
    
    portfolioContent.appendChild(portfolioDesc);

    return portfolioContent;
  }


  /**
 * 
 * @param {objet} ao_media 
 * @param {1} ai_index 
 * @returns DOM
 */
  f_js_gen_mediaLigthBox(ao_media,as_typeMedia){

    const linkMediaLigthBox = document.createElement("a");
    linkMediaLigthBox.classList.add("slides");
    linkMediaLigthBox.setAttribute("href", "#");

    if(as_typeMedia){
      const imgLigthBoxContent = document.createElement("img");
      imgLigthBoxContent.classList.add("slides-img");
      imgLigthBoxContent.setAttribute("alt", ao_media.title);
      imgLigthBoxContent.setAttribute("id", "tata");
      imgLigthBoxContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.image);
      linkMediaLigthBox.appendChild(imgLigthBoxContent);
    }else{
      const videoLigthBoxContent= document.createElement("video");
      videoLigthBoxContent.classList.add("slides-img");
      videoLigthBoxContent.setAttribute("alt", ao_media.title);
      videoLigthBoxContent.setAttribute("src", "./images/"+ ao_media.photographerId + "/" + ao_media.video);
      //videoPortfolioContent.setAttribute("autoplay", true); 
      linkMediaLigthBox.appendChild(videoLigthBoxContent);
    }


    

    return linkMediaLigthBox;
  }
  

}

/******************************************
 * INITIALISATION DE LA CLASSE PHOTOGRAPHES
 ******************************************/
const classPhotographe = new PHOTOGRAPHE(IDPhotographe);



/******************************************
 * CLASS LIGTHBOX
 ******************************************/
class Ligthbox {
  constructor(width, height){
    this.slideIndex = 1;
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
    
    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[this.slideIndex-1].style.display = "block";
    console.log(slides[this.slideIndex-1].lastElementChild.alt)
    captionText.innerHTML = slides[this.slideIndex-1].lastElementChild.alt;
  }

}

/******************************************
 * INITIALISATION DE LA CLASSE openLigthbox
 ******************************************/
const classLigthbox = new Ligthbox();
  

/******************************************
 * CLASS CONTACT MODAL
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
 * INITIALISATION DE LA CLASSE contactModal
 ******************************************/
const classContactModal = new contactModal();



class triByAttribut{

  portfolioContents = document.querySelectorAll(".portfolio-content");
  li_nb_portfolioContents = portfolioContents.length;
  // launch modal form
  triByDate() {   
  
    if(this.li_nb_portfolioContents > 0){
      this.portfolioContents.forEach((portfolioContent, key) => {
        console.log(portfolioContent)
        //articles.removeChild(photographes[key]);
      });
      //classPhotographes.f_js_get_json_photographes(as_tag);
    }else{
     // classPhotographes.f_js_get_json_photographes();
    }

    dataPhotographe[1].media.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });

    

  }


}

/**
 * RACCOURCI CLAVIE
 */
document.addEventListener('keydown', keyCodeAccessiblity);

function keyCodeAccessiblity(e) {

  //OUVRE LA MODAL AVEC CTRL + ALT + M
  if (e.ctrlKey  && e.altKey && e.keyCode === 77) {
    classContactModal.launchModal();
  }

  //OUVRE LA MODAL AVEC CTRL + ALT + C
  if (e.ctrlKey && e.altKey && e.keyCode === 67) {
    classContactModal.closeModal();
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


/**
 * MENU TRIE
 */

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


/**
 * INITIALISATION EVENT LIKE APRES CREATION DES DOM EN JS
 * INCREMENT LES LIKES PAR IMAGE
 * INCREMENT LES LIKES TOTAL
 */
setTimeout(() => {
  const iconHeart = document.querySelectorAll(".fa-heart");
  const allSpanLikes = document.querySelectorAll(".portfolio-like");
  const spanAllLikes = document.querySelector(".popular-likes");

  iconHeart.forEach((icon,index) => icon.addEventListener('click', () => {

    //INCREMENTATION DES SPAN INDIVIDUELLEMENT
    allSpanLikes[index-1].innerText=parseInt(allSpanLikes[index-1].innerText) + 1 ;
    allLikes += 1;

    //INCREMENTATION DU SPAN CONTENANT TOTAL LIKE
    spanAllLikes.innerText = allLikes.toLocaleString();
    
  }));
}, 3000);