// On selectionne les deux listes déroulantes avec la constante const
// Dans l'ordre des selects html (départements, organismes), grace à la décomposition 
const [dpt, org] = document.querySelectorAll('select')
// On selectionne le bouton de recherche
const button = document.querySelector('button')
// On selectionne la liste à puces
const ul = document.querySelector('ul')

// On crée l'évènement au click sur le bouton de recherche
button.addEventListener('click', () => {
    // Par défaut, on vient vider la liste à puces pour éviter d'ajouter à chaque fois le résulat de la recherche
    ul.innerHTML = ''
    // On utilise les magiques cotes pour éviter de concatainer
    // On récupère l'url et l'uri (/v1/organismes/{departement}/{type}) sur le site de l'api.gouv.fr
    fetch(`https://etablissements-publics.api.gouv.fr/v1/organismes/${dpt.value}/${org.value}`)
            // On utilise la methode then pour récupérer le résultat de ma promesse
            .then(res => {
                // console.log(res); On vérifie que la reponse est à true dans la console
                // Si res est false on lance une erreur
                if (!res.ok) {
                    throw Error(res.statusText)
                }
                return res.json()
            })
            .then(json => {
                // console.log(json); On vérifie que l'on récupère bien la liste de organismes
                // On récupère la propriété features et on vient faire un foreach dessus
                // Pour chaque itération, on vient récupérer l'organisme
                json.features.forEach(org => {
                    // On créera un élément li
                    const li = document.createElement('li')
                    // On récupère la propriété nom de l'organisme
                    li.textContent = org.properties.Nom
                    // On rajoute une classe css bootstrap
                    li.className = 'list-group-item'
                    // On vient ajouter à notre ul un li
                    ul.appendChild(li)
                })
            })
            // On attrape les erreurs
            .catch(e => {
                // On crée un li
                const li = document.createElement('li') 
                // On ajoute le message
                li.textContent = e.message
                // On ajoute une classe bootstrap pour afficher le li en ruoge
                li.className = 'list-group-item list-group-item-danger'
                // On 
                ul.appendChild(li)
                // On ajoute à notre ul le li
                console.log(e)
            })
})





