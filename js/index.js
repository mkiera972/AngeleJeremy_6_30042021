// DOM Elements
const articles = document.querySelector(".articles");


f_js_get_json_photographes();

/**
 * 
 * @param {*} as_tag
 * SUPPRIME LES NOEUDS ARTICLES ET FILTRE SUR LE PHOTOGRAPHE TAGUES 
 */
function f_js_filter_tags(as_tag){
  const photographes = document.querySelectorAll(".photographe");
  const li_nb_photoraphes = photographes.length;

  if(li_nb_photoraphes > 0){
    photographes.forEach((photographe, key) => {
      articles.removeChild(photographes[key]);
    });
    f_js_get_json_photographes(as_tag)
  }else{
    f_js_get_json_photographes()
  }

}


/**
 * 
 * @param {*} as_filter_tags 
 * RECUPERE LES DONNEES DES PHOTOGRAPHES
 */
function f_js_get_json_photographes(as_filter_tags = ''){
    const ls_url_data_photographes = "json/FishEyeData.json";
    fetch(ls_url_data_photographes)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
        //RECUPERATION DE LA LISTE DES PHOTOGRAPHES
        la_photographes = value.photographers;

        if(as_filter_tags != ''){
          console.log(as_filter_tags)
          la_photographes = la_photographes.filter(photographe => photographe.tags.toString().indexOf(as_filter_tags.toLowerCase()) !== -1);
          console.log(la_photographes)
        }
       
        f_js_create_article_photographes(la_photographes);
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
}

/** 
 * CREATION DES ARTICLES PHOTOGRAPHES
 * */
function f_js_create_article_photographes(aa_photographes){
    aa_photographes.forEach(lo_photographe => {

        ls_src_img_portrait = "images/photographes/Photographers_Photos/" + lo_photographe.portrait;

        //CREATION DES ARTICLES PAR PHOTOGRAPHES
        const newArticle = document.createElement("article");
        newArticle.classList.add("photographe"); 
        newArticle.setAttribute("role", "article");

        //ESPACE PORTRAIT
        const newLinkPortrait = document.createElement("a");
        newLinkPortrait.classList.add("photographe-portrait");
        newLinkPortrait.setAttribute("href", "#");
        
        const imgPortrait = document.createElement("img");
        imgPortrait.classList.add("photographe-img");
        imgPortrait.setAttribute("src", ls_src_img_portrait);

        const namePhotographe = document.createElement("h2");
        namePhotographe.classList.add("photographe-name");
        namePhotographe.innerText = lo_photographe.name;

        newLinkPortrait.appendChild(imgPortrait);
        newLinkPortrait.appendChild(namePhotographe);
        newArticle.appendChild(newLinkPortrait);

        //ESPACE DESCRIPTION
        const newDivDesc = document.createElement("div");
        newDivDesc.classList.add("photographe-description");
        newDivDesc.setAttribute("role", "description");
        newDivDesc.setAttribute("aria-label", "Description du photographe");
   
        const location = document.createElement("p");
        location.classList.add("photographe-location");
        location.innerText = lo_photographe.city + ", " + lo_photographe.country;

        const slogan = document.createElement("p");
        slogan.classList.add("photographe-slogan");
        slogan.innerText = lo_photographe.city + ", " + lo_photographe.tagline;

        const price = document.createElement("p");
        price.classList.add("photographe-price");
        price.innerText = lo_photographe.price + "€/jour";

        newDivDesc.appendChild(location);
        newDivDesc.appendChild(slogan);
        newDivDesc.appendChild(price);
        newArticle.appendChild(newDivDesc);


        //ESPACE TAGS
        const newDivTags = document.createElement("div");
        newDivTags.classList.add("photographe-tags");
        newDivTags.setAttribute("role", "tags");
        newDivTags.setAttribute("aria-label", "Étiquette du photographe");

        const ulTags = document.createElement("ul");
        lo_photographe.tags.forEach(ls_tag => {

            const liTags = document.createElement("li");
            liTags.classList.add("photographe-tags-item");

            const linkTags = document.createElement("a");
            linkTags.setAttribute("href", "#");
            linkTags.innerText = "#" + ls_tag ;

            liTags.appendChild(linkTags);
            ulTags.appendChild(liTags);
        });

        newDivTags.appendChild(ulTags);
        newArticle.appendChild(newDivTags);

        //AJOUT DE L'ARTICLE
        articles.appendChild(newArticle);


    });
}