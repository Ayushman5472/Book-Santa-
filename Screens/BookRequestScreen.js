import * as React from 'react'
import {TextInput, TouchableOpacity, KeyboardAvoidingView, Text, Alert} from 'react-native'
import firebase from 'firebase'
import db from '../config.js'
export default class BookRequest extends React.Component{
    constructor(){
        super()
        this.state={
        UserID:firebase.auth().currentUser.email,
        BookName:"",
        Reason:"",
        }
    }
    addRequest=(Book,Reason)=>{
    db.collection("Request").add({
        Book:Book,
        Reason:Reason,
        UserID:this.state.UserID,
        RequestID: Math.random().toString(36).substring(7)
    })
    alert("Your Book Request has been given to Santa! :-)")
    this.setState({
        BookName:"",
        Reason:"",

    })
    }
    render(){
        return(
        <KeyboardAvoidingView>
            <TextInput placeholder={"Book Name"} onChangeText={text=>{
                this.setState({
                    BookName:text,
                })
            }} value={this.state.BookName} >
            
            </TextInput>
            <TextInput placeholder={"Reason"} multiline numberOfLines={5} onChangeText={text=>{
                this.setState({
                    Reason:text,
                })
            }} value = {this.state.Reason}>
            </TextInput>
            <TouchableOpacity style= {{borderWidth:5, padding: 10, borderColor:"black"}} onPress={
                ()=>{
                    this.addRequest(this.state.BookName, this.state.Reason)

                }
            }>
                <Text>
                Submit
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        )

        }
    
}