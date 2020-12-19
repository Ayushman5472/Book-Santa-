import * as React from 'react'
import {TextInput, TouchableOpacity, KeyboardAvoidingView, Text, Alert, FlatList, View} from 'react-native'
import firebase from 'firebase'
import db from '../config.js'
import {ListItem} from 'react-native-elements'

export default class BookDonation extends React.Component{
    constructor(){
        super()
        this.state={
            BookList:[],
        }
        this.requestRef = null
    }
    getBookList=()=>{
        this.requestRef = db.collection("Request").onSnapshot(snapshot=>{
        var Books = snapshot.docs.map(doc=>doc.data())
        
        this.setState({
            BookList:Books
        })
    })
}
    componentDidMount(){
        this.getBookList()
       
        
    }
    componentWillUnmount(){
        this.requestRef()
    }
    keyExtractor=(item,index)=>index.toString()
    renderItem=({item,i})=>{
        return(<ListItem key={i} title={item.BookName} subtitle={item.Reason} 
            titleStyle={{color:"red", fontWeight:"bold"}} 
            rightElement={<TouchableOpacity><Text>View</Text></TouchableOpacity>}
            bottomDivider
            ></ListItem>)
        
    }
    render(){
        return(<View>
            {
            this.state.BookList.length === 0
            ? (<View><Text>List Of All Requested Books</Text></View>)
        :(<FlatList keyExtractor={this.keyExtractor} data={this.state.BookList} renderItem={this.renderItem}>
        </FlatList>)}
        { console.log(this.state.BookList.length)}
        {this.state.BookList.map(text=>{
            <Text>text</Text>
        })}
        <FlatList keyExtractor={this.keyExtractor} data={this.state.BookList} renderItem={this.renderItem}>
        </FlatList>
        </View>)
    }
}
