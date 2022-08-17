<template>
    <div class="container add-formdata">
        <h2 class="center-align indigo-text">Form Add Course</h2>
        <form @submit.prevent="addCourse()">
            <div class="field title">
                <label for="title">Course Title : </label>
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index"> 
                <label for="course-data">Ingredient</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field title">
                <label for="another">Add Ingredient : </label>
                <input type="text" name="another" @keydown.tab.prevent="addIng()" v-model="another">
            </div>
            <div class="field title">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Save Course</button>
            </div>
        </form>
    </div>    
</template>

<script>
import db from "@/firebase/init"
import { title } from "process"
import slugify from "slugify"

export default{
    name: 'AddCourse',
    data(){
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addCourse(){
            if(this.title){
                this.feedback = null
                //create slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~()'"!\-:@]/g,
                    lower: true
                })
                db.collection('project-1').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug : this.slug
                }).then(() =>{
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else {
                this.feedback = 'Please insert all data!!'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
}
</script>

<style>
    .add-formdata{
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-formdata h2{
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