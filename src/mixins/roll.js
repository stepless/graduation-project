const roll = {
    data(){
        return {
            "scrollTopValue": window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        }
    },
    methods:{
        monitorScroll(el,showTime,vanishTime){
            this.scrollTopValue =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(this.scrollTopValue >= showTime){
                if(el.className.indexOf('block') < 0)
                    el.className += ' block';
            }else if(this.scrollTopValue < vanishTime){
                if(el.className.indexOf('block') >= 0){
                    el.className = el.className.replace(' block','');
                }
            }
        }
    },
}
export default roll;