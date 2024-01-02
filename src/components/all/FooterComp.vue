<template>
    <footer>
        <div class="img-container">
            <img src="@/assets/images/footer/LinkedIn.svg" /><img src="@/assets/images/footer/Instagram.svg"/><img src="@/assets/images/footer/Mail.svg"/>
        </div>
    </footer>
</template>

<script>
    export default{
        name : "FooterComp"
    }
</script>

<style scoped>
footer{
    background-color: #43acfd;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
}
footer .img-container{
    margin-left: 150px;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
footer .img-container img{
    width: 30px;
}


</style>