<template>
    <footer>
        <div class="img-container">
            <img src="@/assets/images/footer/LinkedIn.svg" /><img src="@/assets/images/footer/Instagram.svg"/><img src="@/assets/images/footer/Mail.svg"/>
        </div>
    </footer>
</template>

<script>

</script>

<style>
footer{
    background-color: rgb(115, 230, 250);
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
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