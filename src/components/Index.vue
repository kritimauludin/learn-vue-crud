<template>
  <div class="hello container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
          <router-link :to="{ name: 'EditCourse', params: {course_slug: smoothie.slug} }">
              <i class="material-icons edit-icon">edit</i>
          </router-link>
        <i class="material-icons delete-icon" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
          <span class="chip">{{ ing }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init"
export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id){
      
      db.collection('project-1').doc(id).delete()
      .then(()=>{
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id != id
        })
      })
    },
    
  },
  created(){
      db.collection("project-1").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              let smoothie = doc.data()
              smoothie.id = doc.id
              this.smoothies.push(smoothie)
          });
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }
  .hello h2{
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .hello .ingredients{
    margin: 30px auto;;
  }
  .hello .ingredients li {
    display: inline-block;
  }
  .delete-icon{
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: red;
    font-size: 1.4em;
  }
  .edit-icon{
    position: absolute;
    top: 4px;
    right: 30px;
    cursor: pointer;
    color: orange;
    font-size: 1.4em;
  }
</style>
