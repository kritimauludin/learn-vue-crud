<template>
    <div class="container edit-course">
        <h2>Edit Course {{ smoothie.title }}</h2>
        <form @submit.prevent="editCourse()">
            <div class="field title">
                <label for="title">Course Title : </label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ing, index) in smoothie.ingredients" :key="index"> 
                <label for="course-data">Ingredient</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field title">
                <label for="another">Add Ingredient : </label>
                <input type="text" name="another" @keydown.tab.prevent="addIng()" v-model="another">
            </div>
            <div class="field title">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update Course</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default{
    name: 'EditCourse',
    data(){
        return  {
            smoothie: null,
            ingredient: null,
            feedback: null
            
        }
    },
    methods: {
        editCourse(){
            if(this.smoothie.title){
                this.feedback = null
                //create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~()'"!\-:@]/g,
                    lower: true
                })
                db.collection('project-1').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug : this.smoothie.slug
                }).then(() =>{
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else {
                this.feedback = 'Please insert all data!!'
            }
        },
        deleteIng(ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created(){
        let ref = db.collection('project-1').where('slug', '==', this.$route.params.course_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
               this.smoothie = doc.data()
               this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
    .edit-course{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .edit-course h2{
        font-size: 2em;
        margin: 20px auto;
    }
    .field{
        margin: 20px auto;;
    }
    .delete{
        position: absolute;
        cursor: pointer;
    }
</style>