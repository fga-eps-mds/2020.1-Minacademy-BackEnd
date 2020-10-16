const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const userAuth = require('../config/userAuth');

module.exports = {
    async getLearners(req, res) {
        const learner = await Learner.find();
        return res.json(learner);
    },

    async mentorRequest(req, res){
        try {
            const {email} = req.user;
            console.log(email)
            //Mentor.populate("learners")
            const avaliableMentors = await (Mentor.find({isAvailable:true}));
            //console.log(avaliableMentors);
            if(avaliableMentors.length==0){
                throw new Error('there are no monitors available at the moment');
            }

            function min(arr){
                arr[0].execPopulate('learners')
                //console.log("entrou na função")
                let min = arr[0].learners.length
                let minObject = arr[0]
               /*  console.log("Valor inicial do minimo")
                console.log(min)
                console.log("Quantidade de mentores")
                console.log(arr.length) */

                for(let i = 1; i<arr.length; i++){
                    //console.log("entrou no for")
                    arr[i].execPopulate('learners')
                    //console.log("Valor comparado com o minimo")
                    //console.log(arr[i].learners.length)
                    if(arr[i].learners.length<min){
                        //console.log("entrou no if")
                        min = arr[i].learners.length
                        minObject = arr[i]

                    }
                }
                return minObject
            }

            const chosen_mentor = min(avaliableMentors)
            //console.log("Mentor escolhido")
            //console.log(chosen_mentor)
            
            req.user.mentor = chosen_mentor._id
            await req.user.save()
           
            // console.log("Mentor escolhido antes de salvar o id do aluno")
            //console.log(chosen_mentor.learners)
           
            chosen_mentor.learners = [...chosen_mentor.learners, req.user._id]
            //console.log("Mentor escolhido depois de salvar o id do aluno")
           
            console.log(chosen_mentor.learners)
            await chosen_mentor.save()
            
            return res.status(200).send(chosen_mentor);
            
        } catch (err) {
            return res.status(400).send({ error: err.message });
        }
    },

}
