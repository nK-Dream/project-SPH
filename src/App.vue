<<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在登录、注册时隐藏 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
  export default {
    components:{
      Header,
      Footer
    }
  }
</script>

<style lang="scss" scoped>

</style>