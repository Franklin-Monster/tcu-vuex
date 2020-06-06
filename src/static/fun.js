export default {
    install(Vue) {
        Vue.prototype.makeNone = function (item) {
            this.$refs[item].style.display = "none"
        },
        Vue.prototype.makeBlock = function (item) {
            this.$refs[item].style.display = "inline-block";
        },
        Vue.prototype.isNull = function (word) {
            if (word.replace(/(^s*)|(s*$)/g, "").length == 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}