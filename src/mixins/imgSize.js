const imgSize = {
    methods: {
        heightT(el){
            if(document.documentElement.clientHeight < 750){
                el.style.height = '750px';
              }else{
                el.style.height = '100vh';
            }
        },
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'min-width:0px')
      },
    mounted() {
        const backImg = document.querySelector('.backImg-player');
        this.heightT(backImg);
        this.heightT(document.querySelector('body'));
        document.body.minWidth = '0px';
        window.addEventListener("resize",() => {
        this.heightT(backImg);
        this.heightT(document.querySelector('body'));
        });
    },
}
export default imgSize;