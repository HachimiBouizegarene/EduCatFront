
<template>
    <NavBar></NavBar>
    <div id="Container">
        <p style="background: transparent;line-height: 130%;margin-bottom: 0in;text-align: center;"><span
                style="color: #313131; font-size: 30px;">Politique de Confidentialité</span></p>
        <p style="background: transparent;line-height: 130%;margin-bottom: 0in;text-align: center;">
            <br><br>Conform&eacute;ment aux dispositions de la loi n&deg; 2004-575 du 21 juin 2004 pour la confiance en
            l&rsquo;&eacute;conomie num&eacute;rique, il est pr&eacute;cis&eacute; aux utilisateurs du site natividi.com
            l&rsquo;identit&eacute; des diff&eacute;rents intervenants dans le cadre de sa r&eacute;alisation et de son
            suivi.<br>Edition du site<br><br>Le site educat.fr au capital 1 &euro; euro, mmatricul&eacute;e au Registre du
            Commerce et des Soci&eacute;t&eacute;s de Paris sous le num&eacute;ro 123456789 dont le si&egrave;ge social est
            situ&eacute; au 66 rue des martyrs paris<br>N&deg; de TVA intracommunautaire : FR 40
            123456890<br><br>Responsable de publication<br>Guichard
            Julien<br><br>H&eacute;bergeur<br><br>L&apos;h&eacute;bergeur du Site est la soci&eacute;t&eacute; Hostinger,
            dont le si&egrave;ge social est situ&eacute; au HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023
            Larnaca, Chypre , avec le num&eacute;ro de t&eacute;l&eacute;phone : 01 49 45 49 20 + <a data-fr-linked="true"
                href="mailto:press@hostinger.com">press@hostinger.com</a><br><br>Nous contacter<br><br>Par
            t&eacute;l&eacute;phone : 0607080910<br>Par mail : <a data-fr-linked="true"
                href="mailto:educat@gmail.com">educat@gmail.com</a></p>


    </div>
    <FooterComp></FooterComp>
</template>

<style scoped>
#Container {
    margin: 100px auto;
    width: 50vw;
    max-width: 785px;
    background-color: #ececec;
    padding: 33px;
    color: black;
}

#Container P {
    font-weight: 100;
    font-size: 19px;
}

</style>


<script>
import NavBar from "@/components/all/NavBar.vue"
import FooterComp from "@/components/all/FooterComp.vue";

export default {
    name: "PolitiqueConfidentialite",

    components: {
        NavBar,
        FooterComp
    },


    data() {
        return {
        };
    },

    methods: {
    }
}
</script>