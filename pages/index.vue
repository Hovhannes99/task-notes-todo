<template>
  <div>
    <Notes/>
  </div>
</template>


<style lang="scss">
   @import "assets/variables";
   .button-wrapper{
      width: 100%;
      display: flex;
      justify-content: center;
      column-gap: 20px;
      padding-top: 20px;
      padding-bottom: 20px;
      @media screen and (max-width: $sm) {
           flex-direction: column;
           align-items: center;
           row-gap: 10px;
      }
   }
   .container {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-content: center;
      row-gap: 20px;
    &-buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 20px;
    }
   }

</style>
