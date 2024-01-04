<template>
    <!-------------------------------Pied de la Page------------------------------->
    <footer id="Pied_de_Page">
        <div id="Contenu_Pied_Page">
            <!-- <div id="Les_Listes_du_Footer">
                <ul class="ListeStyle">
                    <li><a href="#" class="Premier_de_Liste">AIDE</a></li>
                    <li><a href="#" class="Reste_de_Liste">Statut de commande</a></li>
                    <li><a href="#" class="Reste_de_Liste">Expédition et livraison</a></li>
                    <li><a href="#" class="Reste_de_Liste">Retours</a></li>
                    <li><a href="#" class="Reste_de_Liste">Modes de paiement</a></li>
                    <li><a href="#" class="Reste_de_Liste">Nous contacter</a></li>
                </ul>
                <ul class="ListeStyle">
                    <li><a href="#" class="Premier_de_Liste">A PROPOS</a></li>
                    <li><a href="#" class="Reste_de_Liste">Conditions d'utilisation</a></li>
                    <li><a href="#" class="Reste_de_Liste">Conditions générales de vente</a></li>
                    <li><a href="#" class="Reste_de_Liste">Mentions légales</a></li>
                    <li><a href="#" class="Reste_de_Liste">Paramètres des cookies</a></li>
                    <li><a href="#" class="Reste_de_Liste">Politique de Confidentialité</a></li>
                </ul>
                <ul class="ListeStyle">
                    <li><a href="#" class="Premier_de_Liste">INFORMATIONS D'ENTREPRISE</a></li>
                    <li><a href="#" class="Reste_de_Liste">Qui sommes-nous?</a></li>
                    <li><a href="#" class="Reste_de_Liste">Emploi</a></li>
                    <li><a href="#" class="Reste_de_Liste">Presse</a></li>
                    <li><a href="#" class="Reste_de_Liste">Mobile Apps</a></li>
                    <li><a href="#" class="Reste_de_Liste">Creators Club</a></li>
                </ul>
            </div>
            <p id="Copyright_Alerte">&copy; Tout droits réservés. Mahydine - 2021</p> -->
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterComp"
}
</script>

<style scoped>
/* Pied de la Page */


#Pied_de_Page {
    background-color: #161616;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

#Contenu_Pied_Page {
    margin-top: 3em;
    display: flex;
    flex-direction: column;
    width: 88em;
}

#Les_Listes_du_Footer {
    display: flex;
    flex-direction: row;
    margin-bottom: 2em;
}

.ListeStyle {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-right: 10px;
    margin-left: 6em;
}

.Premier_de_Liste {
    font-weight: bold;
    text-decoration: none;
    font-size: 1.1em;
    color: rgb(255, 255, 255);
    font-family: Bebas, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.Premier_de_Liste:hover {
    color: rgb(214, 214, 214);
}

.Reste_de_Liste {
    text-decoration: none;
    font-size: 1em;
    color: rgb(121, 121, 121);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.Reste_de_Liste:hover {
    color: white;
}

#Copyright_Alerte {
    color: white;
    margin: 1em;
    font-family: LGC_Fin;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>